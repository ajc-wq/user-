/*
 * User Persona WorldForge for SillyTavern
 * v0.1.0
 *
 * UI extension only. Uses SillyTavern.getContext(), native World Info HTTP
 * endpoints, generateQuietPrompt(), and Persona CRUD slash commands when
 * available. No server plugin required.
 */

const EXT = 'user-persona-worldforge';
const VERSION = '0.1.0';
const DEFAULTS = {
  mode: 'standard',
  worldName: '',
  autoWorld: true,
  autoAnalyze: true,
  generationLanguage: 'English keys + Chinese values',
  personaName: '',
  identity: '',
  customRequirements: '',
  selectedModules: [],
  selectedEntries: [],
  generated: '',
  analysis: null,
};

const SCHEMA = {
  basic_info: ['gender','age','species','identity','occupation','era','location'],
  appearance: ['height','weight','physique','skin','hair','face','voice','scent','distinguishing_features','overall_impression'],
  attire: ['daily','formal','style','accessories','belongings'],
  social_persona: ['profession','social_status','public_persona','reputation','social_habits','skills','hobbies_and_interests'],
  personality: ['core_traits','strengths','weaknesses','hidden_personality','self_perception','attitude_toward_strangers','attitude_toward_friends','attitude_toward_enemies'],
  emotional_spectrum: ['default_state','positive_emotions','negative_emotions','anger_response','sadness_response','fear_response','stress_response','loss_of_control'],
  core_psychology: ['worldview','moral_compass','core_desire','core_fear','core_weakness','obsession','inner_secret','emotional_need'],
  psyche_dynamics: ['cognitive_dissonance','internal_conflicts','defense_mechanisms','hidden_motivations'],
  behavioral_patterns: ['decision_making','modus_operandi','habits','unconscious_behaviors','conflict_response','failure_response','betrayal_response'],
  triggers_and_boundaries: ['dislikes','triggers','trigger_response','absolute_boundaries','forbidden_topics'],
  relationship_dynamics: ['family','friends','enemies','attitude_toward_user','first_impression_of_user','hidden_feelings_toward_user','relationship_development','intimacy_patterns'],
  backstory: ['origin','childhood','important_events','traumatic_experiences','turning_points','current_situation','unfinished_goals'],
  values_and_worldview: ['view_of_self','view_of_humanity','view_of_love','view_of_friendship','view_of_power','view_of_money','view_of_morality','view_of_the_world'],
  speech_patterns: ['tone','vocabulary','sentence_style','forms_of_address','emotional_speech','catchphrases'],
  special_settings: ['abilities','special_habits','special_weaknesses','secrets','hidden_settings'],
  roleplay_guidelines: ['behavior_rules','emotional_rules','relationship_rules','consistency_rules'],
};

const LABELS = {
  basic_info:'Basic Info', appearance:'Appearance', attire:'Attire', social_persona:'Social Persona',
  personality:'Personality', emotional_spectrum:'Emotional Spectrum', core_psychology:'Core Psychology',
  psyche_dynamics:'Psyche Dynamics', behavioral_patterns:'Behavioral Patterns', triggers_and_boundaries:'Triggers & Boundaries',
  relationship_dynamics:'Relationship Dynamics', backstory:'Backstory', values_and_worldview:'Values & Worldview',
  speech_patterns:'Speech Patterns', special_settings:'Special Settings', roleplay_guidelines:'Roleplay Guidelines'
};

let ctx;
let settings;
let worldCache = new Map();

function log(...a) { console.debug(`[${EXT}]`, ...a); }
function toast(msg, type='info') {
  try { if (ctx?.toastr?.[type]) ctx.toastr[type](msg); else window.toastr?.[type]?.(msg); }
  catch { /* noop */ }
}
function esc(s='') { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function uid() { return Math.random().toString(36).slice(2,10); }

function ensureSettings() {
  const root = ctx.extensionSettings || (ctx.extensionSettings = {});
  settings = root[EXT] || structuredClone(DEFAULTS);
  root[EXT] = settings;
  ctx.saveSettingsDebounced?.();
}

async function api(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.json();
}

async function listWorlds() {
  try {
    if (typeof ctx.getWorldInfoNames === 'function') {
      const names = await ctx.getWorldInfoNames();
      if (Array.isArray(names)) return names.map(x => typeof x === 'string' ? x : x?.name).filter(Boolean);
    }
  } catch (e) { log('getWorldInfoNames failed', e); }
  try {
    const data = await api('/api/worldinfo/list');
    return (Array.isArray(data) ? data : data?.worlds || []).map(x => x.name || x.file_id).filter(Boolean);
  } catch (e) {
    log('world list failed', e);
    return [];
  }
}

async function getWorld(name) {
  if (!name) return null;
  if (worldCache.has(name)) return worldCache.get(name);
  const data = await api('/api/worldinfo/get', { name });
  worldCache.set(name, data);
  return data;
}

function currentCharacterWorlds() {
  const out = [];
  const c = ctx?.characters?.[ctx?.characterId];
  const ext = c?.data?.extensions || c?.extensions || {};
  if (ext.world) out.push(ext.world);
  if (Array.isArray(ext.worlds)) out.push(...ext.worlds);
  if (Array.isArray(ctx?.world_info?.charLore)) {
    const row = ctx.world_info.charLore.find(x => x?.name === c?.avatar || x?.name === c?.name);
    if (row) out.push(row.name, ...(row.extraBooks || []));
  }
  const chatWorld = ctx?.chatMetadata?.world_info;
  if (chatWorld) out.push(chatWorld);
  return [...new Set(out.filter(Boolean))];
}

function normalizeEntries(world, worldName) {
  const entries = world?.entries || {};
  return Object.entries(entries).map(([id, e]) => ({
    id,
    uid: e.uid ?? id,
    world: worldName,
    name: e.comment || e.name || (Array.isArray(e.key) ? e.key.join(', ') : String(e.key || id)),
    keys: Array.isArray(e.key) ? e.key : [],
    content: e.content || '',
    enabled: e.disable !== true,
    group: e.group || '',
    order: Number(e.order ?? 0),
    position: e.position,
  }));
}

function classifyEntry(entry) {
  const text = `${entry.name} ${entry.keys.join(' ')} ${entry.content}`.toLowerCase();
  const rules = [
    ['factions', /宗门|门派|势力|帮派|教派|家族|世家|皇朝|王朝|帝国|公会|学院|sect|faction|clan|dynasty|empire|guild|school/],
    ['characters', /人物|角色|掌门|长老|弟子|皇帝|宗主|character|master|elder|disciple|emperor/],
    ['locations', /地点|城市|城|山|秘境|大陆|州|国|宫|殿|location|city|mountain|realm|region|palace/],
    ['cultivation_system', /修炼|境界|灵根|功法|灵力|真气|金丹|元婴|筑基|飞升|cultivat|realm|spiritual root|qi|mana|magic system/],
    ['items', /法宝|武器|丹药|神器|灵石|宝物|weapon|artifact|potion|relic|item|treasure/],
    ['rules', /规则|禁忌|制度|法律|天道|契约|规则|rule|law|taboo|system/],
    ['history', /历史|战争|起源|传说|事件|history|war|origin|legend|event/],
  ];
  return rules.find(([,r]) => r.test(text))?.[0] || 'other';
}

function analyzeWorlds(worldNames, worlds) {
  const modules = {};
  for (const category of ['factions','characters','locations','cultivation_system','items','rules','history','other']) modules[category] = [];
  for (const [name, world] of Object.entries(worlds)) {
    for (const e of normalizeEntries(world, name)) {
      const type = classifyEntry(e);
      modules[type].push(e);
    }
  }
  return {
    source_worlds: worldNames,
    modules,
    stats: Object.fromEntries(Object.entries(modules).map(([k,v]) => [k,v.length])),
    generated_at: new Date().toISOString(),
  };
}

function renderAnalysis(analysis) {
  const m = analysis?.modules || {};
  const cats = Object.keys(m).filter(k => m[k]?.length);
  if (!cats.length) return '<div class="upw-empty">暂无可拆分条目。请先读取世界书。</div>';
  return cats.map(cat => `
    <div class="upw-module">
      <div class="upw-module-head"><span>${esc(cat.replaceAll('_',' '))}</span><span>${m[cat].length}</span></div>
      <div class="upw-module-items">${m[cat].map(e => `<label><input type="checkbox" class="upw-entry" data-entry="${esc(e.world+'::'+e.id)}" ${settings.selectedEntries.includes(e.world+'::'+e.id)?'checked':''}> <span>${esc(e.name)}</span></label>`).join('')}</div>
    </div>`).join('');
}

function render() {
  const root = document.querySelector('#upw-root');
  if (!root) return;
  const a = settings.analysis;
  const selectedCount = settings.selectedEntries?.length || 0;
  root.innerHTML = `
    <div class="upw-header">
      <div><div class="upw-title">USER PERSONA <span>WORLDFORGE</span></div><div class="upw-subtitle">World Info → Modules → User Persona</div></div>
      <div class="upw-version">v${VERSION}</div>
    </div>
    <div class="upw-tabs"><button class="upw-tab active">USER</button><button class="upw-tab disabled">CHAR</button></div>
    <div class="upw-layout">
      <aside class="upw-sidebar">
        ${Object.entries(LABELS).map(([k,v]) => `<button class="upw-cat ${settings.selectedModules.includes(k)?'selected':''}" data-cat="${k}">${esc(v)}</button>`).join('')}
      </aside>
      <main class="upw-main">
        <section class="upw-card">
          <div class="upw-card-title">WORLD INFO SOURCE</div>
          <div class="upw-row"><select id="upw-world" class="text_pole"><option value="">Select a World Info book</option></select><button id="upw-load" class="menu_button">Read World Info</button></div>
          <div class="upw-hint">当前角色世界书会自动列在前面；也可以手动选择。</div>
          <div id="upw-world-tags" class="upw-tags">${currentCharacterWorlds().map(x=>`<button class="upw-tag" data-worldtag="${esc(x)}">${esc(x)}</button>`).join('')}</div>
        </section>
        <section class="upw-card">
          <div class="upw-card-title">WORLD ANALYZER</div>
          <div class="upw-controls"><label><input id="upw-auto" type="checkbox" ${settings.autoWorld?'checked':''}> 自动使用当前角色世界书</label><button id="upw-analyze" class="menu_button">Analyze & Split</button></div>
          <div id="upw-analysis" class="upw-analysis">${renderAnalysis(a)}</div>
          <div class="upw-selected">已选择世界模块条目：${selectedCount}</div>
        </section>
        <section class="upw-card">
          <div class="upw-card-title">USER IDENTITY</div>
          <div class="upw-grid">
            <label>Persona Name<input id="upw-name" class="text_pole" value="${esc(settings.personaName)}" placeholder="例如：云岚 / Rowan"></label>
            <label>World Identity<input id="upw-identity" class="text_pole" value="${esc(settings.identity)}" placeholder="例如：青云宗外门弟子"></label>
          </div>
          <label>Custom Requirements<textarea id="upw-req" class="text_pole" rows="3" placeholder="补充性别、年龄、身份倾向、关系需求、禁用设定等">${esc(settings.customRequirements)}</textarea></label>
          <div class="upw-modes"><button data-mode="quick" class="upw-mode ${settings.mode==='quick'?'active':''}">QUICK</button><button data-mode="standard" class="upw-mode ${settings.mode==='standard'?'active':''}">STANDARD</button><button data-mode="deep" class="upw-mode ${settings.mode==='deep'?'active':''}">DEEP</button></div>
        </section>
        <section class="upw-card">
          <div class="upw-card-title">GENERATED PERSONA</div>
          <textarea id="upw-output" class="upw-output" spellcheck="false" placeholder="生成后会出现结构化 English-key persona...">${esc(settings.generated)}</textarea>
        </section>
      </main>
    </div>
    <div class="upw-actions"><button id="upw-random" class="menu_button">🎲 Randomize</button><button id="upw-generate" class="upw-generate">✨ GENERATE USER PERSONA</button><button id="upw-copy" class="menu_button">Copy</button><button id="upw-import" class="upw-import">📥 Import to Native Persona</button></div>
  `;
  populateWorldSelect();
  bind();
}

async function populateWorldSelect() {
  const sel = document.querySelector('#upw-world');
  if (!sel) return;
  const names = await listWorlds();
  const current = settings.worldName;
  const ordered = [...new Set([...currentCharacterWorlds(), ...names])];
  sel.innerHTML = `<option value="">Select a World Info book</option>` + ordered.map(n => `<option value="${esc(n)}" ${n===current?'selected':''}>${esc(n)}</option>`).join('');
}

function bind() {
  document.querySelector('#upw-load')?.addEventListener('click', async () => {
    const name = document.querySelector('#upw-world')?.value;
    if (!name) return toast('请选择世界书', 'warning');
    await loadAndAnalyze([name]);
  });
  document.querySelector('#upw-analyze')?.addEventListener('click', async () => {
    const names = settings.autoWorld ? currentCharacterWorlds() : [document.querySelector('#upw-world')?.value].filter(Boolean);
    if (!names.length) return toast('没有检测到世界书，请手动选择', 'warning');
    await loadAndAnalyze(names);
  });
  document.querySelector('#upw-auto')?.addEventListener('change', e => { settings.autoWorld = e.target.checked; persist(); });
  document.querySelector('#upw-world')?.addEventListener('change', e => { settings.worldName = e.target.value; persist(); });
  document.querySelectorAll('.upw-tag').forEach(b => b.addEventListener('click', () => { settings.worldName=b.dataset.worldtag; persist(); document.querySelector('#upw-world').value=b.dataset.worldtag; }));
  document.querySelectorAll('.upw-entry').forEach(c => c.addEventListener('change', e => {
    const id=e.target.dataset.entry; settings.selectedEntries = settings.selectedEntries || [];
    if(e.target.checked) settings.selectedEntries.push(id); else settings.selectedEntries=settings.selectedEntries.filter(x=>x!==id);
    settings.selectedEntries=[...new Set(settings.selectedEntries)]; persist();
    document.querySelector('.upw-selected').textContent=`已选择世界模块条目：${settings.selectedEntries.length}`;
  }));
  document.querySelectorAll('.upw-cat').forEach(b=>b.addEventListener('click',()=>{
    const k=b.dataset.cat; settings.selectedModules=settings.selectedModules||[];
    settings.selectedModules=settings.selectedModules.includes(k)?settings.selectedModules.filter(x=>x!==k):[...settings.selectedModules,k];
    persist(); b.classList.toggle('selected');
  }));
  document.querySelectorAll('.upw-mode').forEach(b=>b.addEventListener('click',()=>{settings.mode=b.dataset.mode;persist();document.querySelectorAll('.upw-mode').forEach(x=>x.classList.toggle('active',x===b));}));
  ['#upw-name','#upw-identity','#upw-req'].forEach(sel=>document.querySelector(sel)?.addEventListener('input',e=>{ if(sel==='#upw-name')settings.personaName=e.target.value; if(sel==='#upw-identity')settings.identity=e.target.value; if(sel==='#upw-req')settings.customRequirements=e.target.value; persist(false);}));
  document.querySelector('#upw-output')?.addEventListener('input',e=>{settings.generated=e.target.value;persist(false);});
  document.querySelector('#upw-generate')?.addEventListener('click', generatePersona);
  document.querySelector('#upw-random')?.addEventListener('click', randomize);
  document.querySelector('#upw-copy')?.addEventListener('click', async()=>{await navigator.clipboard?.writeText(settings.generated||'');toast('已复制','success');});
  document.querySelector('#upw-import')?.addEventListener('click', importPersona);
}

async function loadAndAnalyze(names) {
  try {
    toast('正在读取世界书…');
    const worlds={};
    for(const n of names) worlds[n]=await getWorld(n);
    settings.worldName=names[0]||'';
    settings.analysis=analyzeWorlds(names, worlds);
    settings.selectedEntries=[];
    persist(); render();
    toast(`已解析 ${names.length} 本世界书，拆出 ${Object.values(settings.analysis.stats).reduce((a,b)=>a+b,0)} 个条目`, 'success');
  } catch(e) { console.error(e); toast(`读取世界书失败：${e.message}`,'error'); }
}

function compactEntry(e) { return {name:e.name, keys:e.keys, content:e.content, group:e.group, world:e.world}; }
function selectedWorldEntries() {
  const all=[]; const a=settings.analysis?.modules||{};
  for(const arr of Object.values(a)) for(const e of arr) if(settings.selectedEntries?.includes(e.world+'::'+e.id)) all.push(e);
  return all;
}

function buildPrompt() {
  const modeFields = settings.mode==='quick'
    ? ['basic_info','appearance','personality','social_persona']
    : settings.mode==='standard'
      ? ['basic_info','appearance','attire','social_persona','personality','emotional_spectrum','core_psychology','behavioral_patterns','backstory','speech_patterns']
      : Object.keys(SCHEMA);
  const allowed = settings.selectedModules?.length ? modeFields.filter(x=>settings.selectedModules.includes(x)) : modeFields;
  const fields = allowed.map(k=>`${k}: ${SCHEMA[k].join(', ')}`).join('\n');
  const entries=selectedWorldEntries().map(compactEntry);
  return `You are a SillyTavern User Persona architect. Create a USER persona that belongs naturally inside the supplied world information.\n\nSTRICT RULES:\n1. Preserve world facts from the supplied World Info. Do not invent a contradictory faction, cultivation rule, era, geography, hierarchy, or character relationship.\n2. English field names are machine-readable and MUST remain exactly as provided. Values may be Chinese.\n3. Return ONLY one YAML-like <user_persona> block. No Markdown fences, no commentary.\n4. The user persona is the player identity, not the NPC/character. Do not write the character's actions as the user's actions.\n5. Use only relevant world modules; do not dump the entire lorebook into the persona.\n6. If a world module is selected/locked, treat it as a hard constraint.\n7. Avoid explicit sexual content. Keep relationship/intimacy fields non-explicit.\n\nGeneration mode: ${settings.mode}\nPersona name: ${settings.personaName||'Generate a fitting name'}\nRequested identity: ${settings.identity||'Choose a plausible identity based on the world'}\nCustom requirements: ${settings.customRequirements||'(none)'}\n\nFIELDS TO GENERATE:\n${fields}\n\nSELECTED WORLD MODULES / ENTRIES:\n${JSON.stringify(entries,null,2)}\n\nWORLD ANALYSIS SUMMARY:\n${JSON.stringify(settings.analysis?.stats||{},null,2)}\n\nOutput schema:\n<user_persona>\nname: "..."\n${allowed.map(k=>`${k}:\n  ${SCHEMA[k].map(f=>`  ${f}: ...`).join('\n')}`).join('\n')}\n</user_persona>`;
}

async function generatePersona() {
  const btn=document.querySelector('#upw-generate'); if(btn)btn.disabled=true;
  try {
    if(settings.autoWorld && !settings.analysis) {
      const names=currentCharacterWorlds(); if(names.length) await loadAndAnalyze(names);
    }
    const prompt=buildPrompt();
    const gen=ctx.generateQuietPrompt || ctx.generateRaw;
    if(typeof gen!=='function') throw new Error('当前 SillyTavern 未提供 generateQuietPrompt/generateRaw API');
    toast('AI 正在生成 User 人设…');
    let out;
    if(ctx.generateQuietPrompt) out=await ctx.generateQuietPrompt({quietPrompt:prompt, quietToLoud:false, skipWIAN:true});
    else out=await ctx.generateRaw({prompt, quietToLoud:false, trimNames:true});
    settings.generated=String(out||'').trim(); persist();
    const ta=document.querySelector('#upw-output'); if(ta)ta.value=settings.generated;
    toast('User 人设生成完成','success');
  } catch(e){ console.error(e); toast(`生成失败：${e.message}`,'error'); }
  finally { if(btn)btn.disabled=false; }
}

function randomize() {
  const traits=['calm and observant','warm but guarded','curious and adaptable','disciplined and pragmatic','idealistic but cautious','quietly ambitious'];
  const ids=['traveler','outer disciple','merchant apprentice','scholar','independent cultivator','minor noble'];
  settings.customRequirements=`Random seed traits: ${traits[Math.floor(Math.random()*traits.length)]}; plausible identity: ${ids[Math.floor(Math.random()*ids.length)]}. Keep all world rules consistent.`;
  persist(); const ta=document.querySelector('#upw-req');if(ta)ta.value=settings.customRequirements;
  toast('已随机填入生成倾向','success');
}

async function importPersona() {
  const description=(document.querySelector('#upw-output')?.value || settings.generated || '').trim();
  if(!description) return toast('请先生成或填写人设','warning');
  const name=(document.querySelector('#upw-name')?.value || settings.personaName || 'WorldForge Persona').trim();
  try {
    // Prefer the native Persona CRUD slash commands introduced in SillyTavern 1.18.
    // We keep the command path isolated so future syntax changes are easy to patch.
    const exec = ctx.executeSlashCommandsWithOptions || ctx.executeSlashCommands;
    if(typeof exec === 'function') {
      const createCmd=`/persona-create name=${escapeArg(name)} description=${escapeArg(description)}`;
      let result;
      try { result=await exec(createCmd, {handleParserErrors:true}); }
      catch { result=await exec(createCmd); }
      if(result !== undefined) {
        toast('已请求 SillyTavern 创建原生 Persona','success');
        setTimeout(()=>window.dispatchEvent(new Event('resize')),300);
        return;
      }
    }
    // Compatibility fallback: update the native settings object when exposed.
    const p=ctx.powerUser;
    if(p?.personas && p?.persona_descriptions) {
      const avatar=`worldforge-${uid()}.png`;
      p.personas[avatar]=name; p.persona_descriptions[avatar]=description;
      ctx.saveSettingsDebounced?.();
      toast('已写入 SillyTavern Persona 数据；请在 Persona 管理中选择它','success');
      return;
    }
    throw new Error('未找到可用的 Persona 原生写入 API。请升级 SillyTavern 到 1.18+。');
  } catch(e) { console.error(e); toast(`导入失败：${e.message}`,'error'); }
}

function escapeArg(s) { return JSON.stringify(String(s)).replace(/^"|"$/g,'').replace(/ /g,'\\ '); }
function persist(save=true){ ctx.saveSettingsDebounced?.(); if(save) settings.generated=settings.generated||''; }

async function init() {
  try {
    ctx = SillyTavern.getContext();
    ensureSettings();
    const panel = document.createElement('div');
    panel.id='upw-root';
    panel.className='worldforge-extension';
    // Put the UI into the Extensions panel. If the panel DOM changes, retry once.
    const target = document.querySelector('#extensions_settings2') || document.querySelector('#extensions_settings') || document.querySelector('#extensions_settings3');
    if(target) target.appendChild(panel);
    else document.body.appendChild(panel);
    render();
    ctx.eventSource?.on?.(ctx.event_types?.PERSONA_CHANGED || 'PERSONA_CHANGED', ()=>render());
    ctx.eventSource?.on?.(ctx.event_types?.WORLDINFO_UPDATED || 'WORLDINFO_UPDATED', ()=>{worldCache.clear();});
    log('initialized', VERSION);
  } catch(e) { console.error(`[${EXT}] init failed`,e); }
}

window.UserPersonaWorldForge = { version:VERSION, open:()=>document.querySelector('#upw-root')?.scrollIntoView({behavior:'smooth'}), analyze:async(names)=>loadAndAnalyze(names), generate:generatePersona };
