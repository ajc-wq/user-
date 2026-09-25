/* User Persona WorldForge for SillyTavern - v0.5.0 */
const EXT = 'user-persona-worldforge', VERSION = '0.5.0';

const DEFAULTS = {
  mode: 'standard',
  theme: 'blue', // blue (静谧蓝白), green (鼠尾草绿), purple (暮山灰紫), warm (暖杏米白)
  zoom: 100,     // 界面百分比缩放: 80, 90, 100, 110, 120
  worldName: '',
  autoWorld: true,
  personaName: '',
  identity: '',
  customRequirements: '',
  selectedSections: [],
  selectedEntries: [],
  worldModuleSelection: [],
  lockedWorldModules: [],
  selectedTags: {}, 
  generated: '',
  analysis: null,
  activeSection: 'basic_info'
};

const THEMES = [
  { id: 'blue', name: '🌿 静谧蓝白 (默认)' },
  { id: 'green', name: '🍵 鼠尾草绿' },
  { id: 'purple', name: '🌸 暮山灰紫' },
  { id: 'warm', name: '🍂 暖杏米白' }
];

const SCHEMA = {
  basic_info: ['gender', 'age', 'species', 'identity', 'occupation', 'era', 'location', 'entourage'],
  appearance: ['physique', 'skin', 'hair_color', 'hair_style', 'face_shape', 'eyebrows', 'eyes', 'nose', 'mouth', 'tattoos', 'piercings', 'voice', 'scent', 'overall_impression'],
  attire: ['daily', 'formal', 'style', 'accessories', 'belongings'],
  social_persona: ['profession', 'social_status', 'public_persona', 'reputation', 'social_habits', 'skills', 'hobbies_and_interests', 'vehicle'],
  personality: ['core_traits', 'strengths', 'weaknesses', 'hidden_personality', 'kinks_and_quirks', 'self_perception'],
  emotional_spectrum: ['default_state', 'positive_emotions', 'negative_emotions', 'anger_response', 'sadness_response', 'fear_response', 'stress_response', 'loss_of_control'],
  core_psychology: ['worldview', 'moral_compass', 'core_desire', 'core_fear', 'core_weakness', 'obsession', 'inner_secret', 'emotional_need'],
  psyche_dynamics: ['cognitive_dissonance', 'internal_conflicts', 'defense_mechanisms', 'hidden_motivations'],
  behavioral_patterns: ['decision_making', 'modus_operandi', 'habits', 'unconscious_behaviors', 'conflict_response', 'failure_response', 'betrayal_response'],
  triggers_and_boundaries: ['dislikes', 'triggers', 'trigger_response', 'absolute_boundaries', 'forbidden_topics'],
  relationship_dynamics: ['family', 'friends', 'enemies', 'attitude_toward_user', 'first_impression_of_user', 'hidden_feelings_toward_user', 'relationship_development', 'intimacy_patterns'],
  backstory: ['origin', 'childhood', 'important_events', 'traumatic_experiences', 'turning_points', 'current_situation', 'unfinished_goals'],
  values_and_worldview: ['view_of_self', 'view_of_humanity', 'view_of_love', 'view_of_friendship', 'view_of_power', 'view_of_money', 'view_of_morality', 'view_of_the_world'],
  speech_patterns: ['tone', 'vocabulary', 'sentence_style', 'forms_of_address', 'emotional_speech', 'catchphrases'],
  special_settings: ['dietary_preference', 'abilities', 'special_habits', 'special_weaknesses', 'secrets', 'hidden_settings'],
  roleplay_guidelines: ['behavior_rules', 'emotional_rules', 'relationship_rules', 'consistency_rules']
};

const LABELS = {
  basic_info: '基本信息', appearance: '外貌特征', attire: '服装与装束', social_persona: '社会身份',
  personality: '性格与癖好', emotional_spectrum: '情绪谱系', core_psychology: '核心心理', psyche_dynamics: '心理动态',
  behavioral_patterns: '行为模式', triggers_and_boundaries: '触发点与边界', relationship_dynamics: '关系动态',
  backstory: '背景经历', values_and_worldview: '价值观与世界观', speech_patterns: '语言与说话方式',
  special_settings: '特殊设定', roleplay_guidelines: '角色扮演规则'
};

const WORLD_LABELS = {
  factions: '势力 / 宗门', characters: '人物', locations: '地点 / 地域',
  cultivation_system: '修炼 / 能力体系', items: '物品 / 法宝', rules: '规则 / 制度 / 禁忌',
  history: '历史 / 传说 / 事件', other: '其他'
};

const TAG_PRESETS = {
  basic_info: {
    '跟班': ['无跟班', '死士影卫', '贴身女仆', '忠犬保镖', '灵宠/神兽', '机械助手/智脑', '小跟班/书童', '管家', '闺蜜/死党', '保姆兼保镖']
  },
  appearance: {
    '体型': ['娇小玲珑', '高挑纤细', '丰满圆润', '肌肉结实', '骨感美人', '微胖肉感', '沙漏型S', '梨形身材', '倒三角', '平板身材', 'H型超模', '柔软无骨', '健美修长', '矮胖可爱', '五短身材', '九头身', '宽肩窄腰', '蝴蝶背', '直角肩', '漫画腿', '马甲线', '蜜桃臀', '天鹅颈', '性感腰窝'],
    '发色': ['乌黑亮丽', '铂金白', '樱花粉', '亚麻灰', '酒红色', '雾霾蓝', '薄藤紫', '蜂蜜茶', '脏橘色', '薄荷绿', '彩虹挑染', '渐变紫灰', '白金挑染', '深棕栗色', '奶奶灰', '海王红', '蓝黑渐变', '玫瑰金', '银白色', '荧光绿'],
    '发型': ['黑长直', '大波浪', '法式羊毛卷', '齐耳短发', '日系鲻鱼头', '高马尾', '双马尾', '丸子头', '公主切', '空气刘海', '中分长发', '侧分大卷', '脏辫', '超短寸头', '半扎发', '拳击辫', '哪吒头', '低盘发', '狼尾', '锁骨发', '微分碎盖发'],
    '脸型': ['鹅蛋脸', '瓜子脸', '圆脸娃娃脸', '方圆脸', '菱形脸', '心形脸', '长脸御姐', '高颧骨', '小V脸', '肉肉脸', '厌世脸', '初恋脸', '浓颜系', '淡颜系', '猫系颜', '犬系颜', '狐系颜', '兔系颜', '蛇系颜', '狼系颜'],
    '眉毛': ['野生眉', '柳叶眉', '一字眉', '欧式挑眉', '断眉', '剑眉', '弯月眉', '流星眉', '八字眉', '短眉', '浓眉', '淡眉', '细长眉', '上扬眉', '下垂眉', '落尾眉', '雾眉', '连心眉', '染眉', '无眉星人', '豆豆眉', '远山眉', '黛眉', '卧蚕眉', '悬胆眉', '扫帚眉', '罗汉眉'],
    '眼睛': ['桃花眼', '瑞凤眼', '杏眼', '丹凤眼', '狐狸眼', '下垂眼', '狗狗眼', '圆眼', '细长眼', '异色瞳', '深邃眼窝', '卧蚕明显', '单眼皮', '内双', '欧式大双', '星星眼', '死鱼眼', '三白眼', '含情脉脉', '眼神凶狠'],
    '鼻子': ['水滴鼻', '小翘鼻', '驼峰鼻', '希腊鼻', '鹰钩鼻', '蒜头鼻', '朝天鼻', '罗马鼻', '直鼻', '盒型鼻', '宽鼻翼', '窄鼻梁', '高山根', '塌鼻梁', '精致鼻头', '圆鼻头', '海鸥线', '鼻头痣', '鼻钉', '鼻影重'],
    '嘴巴': ['M唇', '樱桃小嘴', '厚唇', '微笑唇', '覆舟嘴', '薄唇', '嘟嘟唇', '嘴角上扬', '嘴角下垂', '唇珠明显', '烈焰红唇', '苍白唇色', '咬唇妆', '唇钉', '兔牙', '小虎牙', '整齐皓齿', '牙套', '酒窝', '梨涡'],
    '皮肤': ['冷白皮', '暖黄皮', '小麦色', '古铜色', '巧克力色', '苍白病态', '粉嫩透红', '雀斑妆', '晒伤妆', '油性肌', '干性肌', '水光肌', '哑光肌', '敏感肌', '高原红', '红血丝', '肤色不均', '纹身覆盖', '有伤疤', '肤如凝脂'],
    '纹身部位': ['锁骨纹身', '后颈纹身', '大臂花臂', '手腕小图', '手指微刺', '胸口纹身', '脊柱纹身', '腰窝纹身', '小腹纹身', '大腿环纹', '脚踝纹身', '耳后纹身', '肋骨纹身', '肩胛骨', '臀部纹身', '全背满背', '眼角泪痣', '无纹身'],
    '穿刺': ['耳垂钉', '耳骨钉', '耳蜗钉', '工业长杆', '眉钉', '鼻钉', '鼻中隔环', '唇钉', '舌钉', '笑脸钉', '酒窝钉', '肚脐钉', '后颈埋钉', '锁骨埋钉', '手指穿刺', '眼角穿刺', '扩耳', '无穿刺']
  },
  attire: {
    '配饰': ['黑框眼镜', '金丝眼镜', '墨镜', 'choker', '项圈', '珍珠项链', '十字架', '佛珠', '戒指', '手镯手镯', '脚链', '腿环', '发带', '贝雷帽', '棒球帽', '渔夫帽', '口罩', '眼罩', '耳机', '怀表', '机械表', '领带夹', '袖扣', '抑制颈环', '止咬器'],
    '衣服风格': ['JK制服', '洛丽塔', '汉服', '旗袍', '女仆装', 'OL职业装', '运动风', '街头潮牌', '赛博朋克', '哥特暗黑', '森系', '纯欲风', '辣妹风', '极简风', '复古风', '波西米亚', '睡衣风', 'oversize', '机能风', '比基尼', '西装']
  },
  social_persona: {
    '技能': ['过目不忘', '黑客技术', '开锁', '格斗', '射击', '飙车', '医术', '毒术', '催眠', '占卜', '乐器精通', '多国语言', '社交牛逼', '撒娇', '演戏', '化妆', '修图', '家务全能', '赚钱', '花钱', '机械维修', '荒野求生', '拆弹', '谈判', '心理侧写', '调教', '跑酷'],
    '爱好': ['打游戏', '看动漫', '追剧', '撸猫', '撸狗', '睡觉', '旅行', '摄影', '绘画', '写作', '唱歌', '跳舞', '烹饪', '烘焙', '调酒', '园艺', '占星', '剧本杀', '密室', '逛街', '极限跑酷', '收集古董', '赌博', '钓鱼', '露营', '飙车', '射箭', '攀岩', '撸铁', '冥想'],
    '座驾': ['重机车', '超跑', '敞篷跑车', '越野车', '房车', '复古老爷车', '直升机', '私人游艇', '滑板', '轮滑', '自行车', '电动车', '地铁', '公交', '步行', '御剑飞行', '扫帚', '独角兽', '龙', 'UFO']
  },
  personality: {
    '癖好': ['洁癖', '收集癖', '肌肤饥渴', '轻微施虐', '轻微受虐', '声控', '手控', '掌控欲', '依恋障碍', '窥探欲', '护短偏执', '喜欢顺毛', '咬人', '收藏旧物']
  },
  triggers_and_boundaries: {
    '厌恶': ['讨厌昆虫', '讨厌香菜', '讨厌早起', '讨厌加班', '讨厌虚伪', '讨厌背叛', '讨厌等待', '讨厌噪音', '讨厌烟味', '讨厌榴莲', '讨厌数学', '讨厌运动', '讨厌社交', '讨厌被命令', '讨厌下雨天', '讨厌拥挤', '讨厌排队', '讨厌熊孩子', '讨厌绿茶']
  },
  core_psychology: {
    '弱点': ['怕黑', '怕鬼', '恐高', '深海恐惧', '密集恐惧', '怕痛', '怕痒', '路痴', '脸盲', '音痴', '过敏', '怕冷', '怕热', '容易害羞', '泪失禁', '耳根软', '怕孤独', '恋爱脑', '没钱']
  },
  special_settings: {
    '饮食偏好': ['无肉不欢', '素食', '重口味', '清淡', '甜食控', '咖啡因中毒', '海鲜爱好者', '面食党', '米饭党', '垃圾食品', '养生', '挑食', '大胃王', '小鸟胃', '只喝水', '爱吃辣', '爱吃酸', '爱吃苦', '黑暗料理', '零食当饭']
  }
};

let ctx, settings, worldCache = new Map(), isOpen = false;

function log(...a) { console.debug(`[${EXT}]`, ...a); }
function toast(m, t = 'info') { try { (ctx?.toastr || window.toastr)?.[t]?.(m); } catch {} }
function esc(s = '') { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function uid() { return Math.random().toString(36).slice(2, 10); }

function ensureSettings() {
  const root = ctx.extensionSettings || (ctx.extensionSettings = {});
  settings = { ...structuredClone(DEFAULTS), ...(root[EXT] || {}) };
  if (!settings.selectedTags) settings.selectedTags = {};
  root[EXT] = settings;
  ctx.saveSettingsDebounced?.();
}

async function api(path, body) {
  const r = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
  if (!r.ok) throw Error(`${path}: HTTP ${r.status}`);
  return r.json();
}

async function listWorlds() {
  try {
    if (typeof ctx.getWorldInfoNames === 'function') {
      const n = await ctx.getWorldInfoNames();
      if (Array.isArray(n)) return n.map(x => typeof x === 'string' ? x : x?.name).filter(Boolean);
    }
  } catch {}
  try {
    const d = await api('/api/worldinfo/list');
    return (Array.isArray(d) ? d : d?.worlds || []).map(x => x.name || x.file_id).filter(Boolean);
  } catch { return []; }
}

async function getWorld(name) {
  if (!name) return null;
  if (worldCache.has(name)) return worldCache.get(name);
  const d = await api('/api/worldinfo/get', { name });
  worldCache.set(name, d);
  return d;
}

function currentCharacterWorlds() {
  const out = [], c = ctx?.characters?.[ctx?.characterId], ext = c?.data?.extensions || c?.extensions || {};
  if (ext.world) out.push(ext.world);
  if (Array.isArray(ext.worlds)) out.push(...ext.worlds);
  if (Array.isArray(ctx?.world_info?.charLore)) {
    const row = ctx.world_info.charLore.find(x => x?.name === c?.avatar || x?.name === c?.name);
    if (row) out.push(row.name, ...(row.extraBooks || []));
  }
  if (ctx?.chatMetadata?.world_info) out.push(ctx.chatMetadata.world_info);
  return [...new Set(out.filter(Boolean))];
}

function normalizeEntries(world, wn) {
  const es = world?.entries || {};
  return Object.entries(es).map(([id, e]) => ({
    id,
    uid: e.uid ?? id,
    world: wn,
    name: e.comment || e.name || (Array.isArray(e.key) ? e.key.join(', ') : String(e.key || id)),
    keys: Array.isArray(e.key) ? e.key : [],
    content: e.content || '',
    enabled: e.disable !== true
  }));
}

function classifyEntry(e) {
  const t = `${e.name} ${e.keys.join(' ')} ${e.content}`.toLowerCase();
  const r = [
    ['factions', /宗门|门派|势力|帮派|教派|家族|世家|皇朝|王朝|帝国|公会|学院|sect|faction|clan|dynasty|empire|guild|school/],
    ['characters', /人物|角色|掌门|长老|弟子|皇帝|宗主|character|master|elder|disciple|emperor/],
    ['locations', /地点|城市|城|山|秘境|大陆|州|国|宫|殿|location|city|mountain|realm|region|palace/],
    ['cultivation_system', /修炼|境界|灵根|功法|灵力|真气|金丹|元婴|筑基|飞升|cultivat|realm|spiritual root|qi|mana|magic system/],
    ['items', /法宝|武器|丹药|神器|灵石|宝物|weapon|artifact|potion|relic|item|treasure/],
    ['rules', /规则|禁忌|制度|法律|天道|契约|rule|law|taboo|system/],
    ['history', /历史|战争|起源|传说|事件|history|war|origin|legend|event/]
  ];
  return r.find(([, x]) => x.test(t))?.[0] || 'other';
}

function analyzeWorlds(names, worlds) {
  const modules = Object.fromEntries(Object.keys(WORLD_LABELS).map(k => [k, []]));
  for (const [wn, w] of Object.entries(worlds)) {
    for (const e of normalizeEntries(w, wn)) {
      modules[classifyEntry(e)].push(e);
    }
  }
  return {
    source_worlds: names,
    modules,
    stats: Object.fromEntries(Object.entries(modules).map(([k, v]) => [k, v.length])),
    generated_at: new Date().toISOString()
  };
}

function persist() { ctx.saveSettingsDebounced?.(); }

function toggleModal(show) {
  const modal = document.querySelector('#upw-modal-wrapper');
  if (!modal) return;
  isOpen = typeof show === 'boolean' ? show : !isOpen;
  if (isOpen) {
    modal.classList.add('visible');
    render();
  } else {
    modal.classList.remove('visible');
  }
}

function renderWorldModules() {
  const m = settings.analysis?.modules || {};
  const cats = Object.keys(WORLD_LABELS).filter(k => m[k]?.length);
  if (!cats.length) return '<div class="upw-empty">未读取世界书，请选择上方世界书并解析。</div>';
  return cats.map(cat => {
    const used = settings.worldModuleSelection.includes(cat);
    const locked = settings.lockedWorldModules.includes(cat);
    return `<div class="upw-world-module ${locked ? 'locked' : ''}">
      <div class="upw-module-head">
        <div><b>${WORLD_LABELS[cat]}</b><span class="upw-count">${m[cat].length}</span></div>
        <div class="upw-module-buttons">
          <button class="upw-small ${used ? 'on' : ''}" data-use-module="${cat}">${used ? '✓ 使用中' : '使用'}</button>
          <button class="upw-small ${locked ? 'lock' : ''}" data-lock-module="${cat}">${locked ? '🔒 已锁定' : '🔓 锁定'}</button>
        </div>
      </div>
      <div class="upw-module-items">
        ${m[cat].map(e => {
          const id = e.world + '::' + e.id;
          return `<label><input type="checkbox" class="upw-entry" data-entry="${esc(id)}" ${settings.selectedEntries.includes(id) ? 'checked' : ''}><span>${esc(e.name)}</span></label>`;
        }).join('')}
      </div>
    </div>`;
  }).join('');
}

function renderFieldsPanel() {
  const k = settings.activeSection || 'basic_info';
  const fs = SCHEMA[k] || [];
  const tagGroups = TAG_PRESETS[k] || null;

  let tagsHtml = '';
  if (tagGroups) {
    tagsHtml = `<div class="upw-preset-wrapper">
      <div class="upw-preset-head">
        <span>✨ 快捷特征标签库（点选融入设定）</span>
      </div>
      ${Object.entries(tagGroups).map(([groupTitle, list]) => `
        <div class="upw-preset-group">
          <div class="upw-preset-title">${esc(groupTitle)}</div>
          <div class="upw-chip-container">
            ${list.map(tag => {
              const active = (settings.selectedTags[groupTitle] || []).includes(tag);
              return `<button class="upw-chip ${active ? 'active' : ''}" data-group="${esc(groupTitle)}" data-tag="${esc(tag)}">${esc(tag)}</button>`;
            }).join('')}
          </div>
        </div>
      `).join('')}
    </div>`;
  }

  return `
    <div class="upw-fields-title">${LABELS[k]} <span>（标准字段由 AI 按世界观转化）</span></div>
    ${tagsHtml}
    <div class="upw-field-list">
      ${fs.map(f => `<div class="upw-field-row"><code>${f}</code><span>${fieldHint(f)}</span></div>`).join('')}
    </div>
  `;
}

function fieldHint(f) {
  const map = {
    gender: '性别', age: '年龄', species: '种族', identity: '身份', occupation: '职业', era: '时代', location: '所在地点', entourage: '跟班/随从',
    height: '身高', weight: '体重', physique: '体型', skin: '肤色', hair_color: '发色', hair_style: '发型', face_shape: '脸型',
    eyebrows: '眉毛', eyes: '眼睛', nose: '鼻子', mouth: '嘴巴', tattoos: '纹身部位', piercings: '穿刺', voice: '声音', scent: '气味', overall_impression: '整体印象',
    daily: '日常穿着', formal: '正式穿着', style: '服装风格', accessories: '配饰', belongings: '随身物品',
    profession: '职业', social_status: '社会地位', public_persona: '公开形象', reputation: '名声', social_habits: '社交习惯', skills: '技能', hobbies_and_interests: '兴趣爱好', vehicle: '座驾',
    kinks_and_quirks: '特殊癖好', dietary_preference: '饮食偏好'
  };
  return map[f] || '该字段将由 AI 自动生成并输出标准格式';
}

function renderSelectedTagsBar() {
  const all = [];
  for (const [group, arr] of Object.entries(settings.selectedTags || {})) {
    for (const t of arr) all.push({ group, tag: t });
  }
  if (!all.length) return '';
  return `
    <div class="upw-selected-bar">
      <div class="upw-selected-bar-title">
        <span>已选特征（${all.length} 个）：</span>
        <button id="upw-clear-tags" class="upw-text-btn">清空已选</button>
      </div>
      <div class="upw-chip-container">
        ${all.map(item => `
          <span class="upw-chip active mini" data-group="${esc(item.group)}" data-tag="${esc(item.tag)}">
            ${esc(item.group)}:${esc(item.tag)} ✕
          </span>
        `).join('')}
      </div>
    </div>
  `;
}

function render() {
  const modal = document.querySelector('#upw-modal-wrapper');
  if (!modal) return;

  // 挂载莫兰迪主题 class 与缩放 scale
  modal.className = `upw-modal-wrapper theme-${settings.theme || 'blue'} ${isOpen ? 'visible' : ''}`;
  const container = modal.querySelector('.upw-window');
  if (container) {
    const scale = (settings.zoom || 100) / 100;
    container.style.transform = `scale(${scale})`;
    container.style.transformOrigin = 'center center';
  }

  const root = modal.querySelector('#upw-root');
  if (!root) return;

  root.innerHTML = `
    <!-- 顶部状态与控制栏 -->
    <div class="upw-header">
      <div class="upw-header-left">
        <div class="upw-title">✦ USER 人设世界锻造助手</div>
        <div class="upw-subtitle">Morandi UI · 世界拆解 · 特征矩阵 · 原生 Persona 导出</div>
      </div>
      <div class="upw-header-right">
        <!-- 莫兰迪配色切换器 -->
        <select id="upw-theme-select" class="upw-select-compact" title="切换莫兰迪主题">
          ${THEMES.map(th => `<option value="${th.id}" ${th.id === settings.theme ? 'selected' : ''}>${th.name}</option>`).join('')}
        </select>
        <!-- 界面缩放比例调节 -->
        <select id="upw-zoom-select" class="upw-select-compact" title="缩放比例">
          ${[80, 90, 100, 110, 120].map(z => `<option value="${z}" ${z === settings.zoom ? 'selected' : ''}>${z}%</option>`).join('')}
        </select>
        <!-- 关闭按钮 -->
        <button id="upw-close-btn" class="upw-close-btn" title="关闭">✕</button>
      </div>
    </div>

    <div class="upw-layout">
      <!-- 左侧分类侧边栏 -->
      <aside class="upw-sidebar">
        <div class="upw-side-title">人设属性分类</div>
        ${Object.entries(LABELS).map(([k, v]) => `
          <button class="upw-cat ${settings.activeSection === k ? 'active' : ''}" data-cat="${k}">
            ${v}<small>${(TAG_PRESETS[k] ? '✦' : '')}</small>
          </button>
        `).join('')}
      </aside>

      <!-- 右侧主内容区 -->
      <main class="upw-main">
        <section class="upw-card">
          <div class="upw-card-title">① 世界书绑定</div>
          <div class="upw-row">
            <select id="upw-world" class="text_pole"><option value="">选择世界书</option></select>
            <button id="upw-load" class="menu_button">读取并解析</button>
          </div>
          <div id="upw-world-tags" class="upw-tags">
            ${currentCharacterWorlds().map(x => `<button class="upw-tag" data-worldtag="${esc(x)}">${esc(x)}</button>`).join('')}
          </div>
        </section>

        <section class="upw-card">
          <div class="upw-card-title">② 世界观条目约束</div>
          <div class="upw-controls">
            <label><input id="upw-auto" type="checkbox" ${settings.autoWorld ? 'checked' : ''}> 自动同步角色世界书</label>
            <button id="upw-analyze" class="menu_button">重新分析</button>
          </div>
          <div id="upw-analysis" class="upw-world-analysis">${renderWorldModules()}</div>
          <div class="upw-selected">已勾选：${settings.selectedEntries.length} 条 · 锁定模块：${settings.lockedWorldModules.length} 个</div>
        </section>

        <section class="upw-card">
          <div class="upw-card-title">③ 身份与要求</div>
          <div class="upw-grid">
            <label>人设名称<input id="upw-name" class="text_pole" value="${esc(settings.personaName)}" placeholder="例如：云岚"></label>
            <label>世界内身份<input id="upw-identity" class="text_pole" value="${esc(settings.identity)}" placeholder="例如：内门暗卫 / 财阀千金"></label>
          </div>
          <label class="upw-wide-label">自定义约束要求
            <textarea id="upw-req" class="text_pole" rows="2" placeholder="输入额外生成要求（如：性格淡漠、体弱多病、与某角色存在羁绊等）">${esc(settings.customRequirements)}</textarea>
          </label>
          <div class="upw-modes">
            <span>生成深度：</span>
            <button data-mode="quick" class="upw-mode ${settings.mode === 'quick' ? 'active' : ''}">快速</button>
            <button data-mode="standard" class="upw-mode ${settings.mode === 'standard' ? 'active' : ''}">标准</button>
            <button data-mode="deep" class="upw-mode ${settings.mode === 'deep' ? 'active' : ''}">深度</button>
          </div>
        </section>

        <section class="upw-card">
          <div class="upw-card-title">④ 人设选项标签与字段设置</div>
          ${renderSelectedTagsBar()}
          <div class="upw-field-panel">${renderFieldsPanel()}</div>
        </section>

        <section class="upw-card">
          <div class="upw-card-title">⑤ 生成与预览</div>
          <textarea id="upw-output" class="upw-output" spellcheck="false" placeholder="点击下方“生成 USER 人设”后显示结果…">${esc(settings.generated)}</textarea>
        </section>
      </main>
    </div>

    <!-- 底部操作底栏 -->
    <div class="upw-actions">
      <button id="upw-random" class="menu_button">🎲 随机灵感</button>
      <button id="upw-generate" class="upw-generate">✨ 生成 USER 人设</button>
      <button id="upw-copy" class="menu_button">📋 复制</button>
      <button id="upw-import" class="upw-import">📥 导入原生 Persona</button>
    </div>
  `;

  populateWorldSelect();
  bind();
}

async function populateWorldSelect() {
  const s = document.querySelector('#upw-world');
  if (!s) return;
  const names = await listWorlds();
  const ordered = [...new Set([...currentCharacterWorlds(), ...names])];
  s.innerHTML = '<option value="">选择世界书</option>' + ordered.map(n => `<option value="${esc(n)}" ${n === settings.worldName ? 'selected' : ''}>${esc(n)}</option>`).join('');
}

function bind() {
  // 顶栏关闭与控制
  document.querySelector('#upw-close-btn')?.addEventListener('click', () => toggleModal(false));

  document.querySelector('#upw-theme-select')?.addEventListener('change', e => {
    settings.theme = e.target.value;
    persist();
    render();
  });

  document.querySelector('#upw-zoom-select')?.addEventListener('change', e => {
    settings.zoom = Number(e.target.value);
    persist();
    render();
  });

  document.querySelector('#upw-load')?.addEventListener('click', async () => {
    const n = document.querySelector('#upw-world')?.value;
    if (!n) return toast('请先选择一本世界书', 'warning');
    await loadAndAnalyze([n]);
  });

  document.querySelector('#upw-analyze')?.addEventListener('click', async () => {
    const ns = settings.autoWorld ? currentCharacterWorlds() : [document.querySelector('#upw-world')?.value].filter(Boolean);
    if (!ns.length) return toast('未检测到关联世界书', 'warning');
    await loadAndAnalyze(ns);
  });

  document.querySelector('#upw-auto')?.addEventListener('change', e => { settings.autoWorld = e.target.checked; persist(); });
  document.querySelector('#upw-world')?.addEventListener('change', e => { settings.worldName = e.target.value; persist(); });

  document.querySelectorAll('.upw-tag').forEach(b => b.addEventListener('click', () => {
    settings.worldName = b.dataset.worldtag;
    persist();
    const s = document.querySelector('#upw-world');
    if (s) s.value = b.dataset.worldtag;
  }));

  document.querySelectorAll('.upw-cat').forEach(b => b.addEventListener('click', () => {
    settings.activeSection = b.dataset.cat;
    persist();
    render();
  }));

  document.querySelectorAll('.upw-chip').forEach(chip => chip.addEventListener('click', () => {
    const group = chip.dataset.group;
    const tag = chip.dataset.tag;
    if (!settings.selectedTags[group]) settings.selectedTags[group] = [];

    if (settings.selectedTags[group].includes(tag)) {
      settings.selectedTags[group] = settings.selectedTags[group].filter(t => t !== tag);
      if (settings.selectedTags[group].length === 0) delete settings.selectedTags[group];
    } else {
      settings.selectedTags[group].push(tag);
    }
    persist();
    render();
  }));

  document.querySelector('#upw-clear-tags')?.addEventListener('click', () => {
    settings.selectedTags = {};
    persist();
    render();
    toast('已清空所有标签', 'info');
  });

  document.querySelectorAll('[data-use-module]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.useModule;
    settings.worldModuleSelection = settings.worldModuleSelection.includes(k) ? settings.worldModuleSelection.filter(x => x !== k) : [...settings.worldModuleSelection, k];
    persist();
    render();
  }));

  document.querySelectorAll('[data-lock-module]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.lockModule;
    settings.lockedWorldModules = settings.lockedWorldModules.includes(k) ? settings.lockedWorldModules.filter(x => x !== k) : [...settings.lockedWorldModules, k];
    if (!settings.worldModuleSelection.includes(k)) settings.worldModuleSelection.push(k);
    persist();
    render();
  }));

  document.querySelectorAll('.upw-entry').forEach(c => c.addEventListener('change', e => {
    const id = e.target.dataset.entry;
    if (e.target.checked) settings.selectedEntries = [...new Set([...settings.selectedEntries, id])];
    else settings.selectedEntries = settings.selectedEntries.filter(x => x !== id);
    persist();
    const el = document.querySelector('.upw-selected');
    if (el) el.textContent = `已勾选：${settings.selectedEntries.length} 条 · 锁定模块：${settings.lockedWorldModules.length} 个`;
  }));

  document.querySelectorAll('.upw-mode').forEach(b => b.addEventListener('click', () => {
    settings.mode = b.dataset.mode;
    persist();
    render();
  }));

  ['#upw-name', '#upw-identity', '#upw-req'].forEach(sel => document.querySelector(sel)?.addEventListener('input', e => {
    if (sel === '#upw-name') settings.personaName = e.target.value;
    if (sel === '#upw-identity') settings.identity = e.target.value;
    if (sel === '#upw-req') settings.customRequirements = e.target.value;
    persist();
  }));

  document.querySelector('#upw-output')?.addEventListener('input', e => {
    settings.generated = e.target.value;
    persist();
  });

  document.querySelector('#upw-generate')?.addEventListener('click', generatePersona);
  document.querySelector('#upw-random')?.addEventListener('click', randomize);
  document.querySelector('#upw-copy')?.addEventListener('click', async () => {
    await navigator.clipboard?.writeText(settings.generated || '');
    toast('已复制到剪贴板', 'success');
  });
  document.querySelector('#upw-import')?.addEventListener('click', importPersona);
}

async function loadAndAnalyze(names) {
  try {
    toast('正在解析世界书…');
    const worlds = {};
    for (const n of names) worlds[n] = await getWorld(n);
    settings.worldName = names[0] || '';
    settings.analysis = analyzeWorlds(names, worlds);
    settings.selectedEntries = [];
    settings.worldModuleSelection = [];
    settings.lockedWorldModules = [];
    persist();
    render();
    const count = Object.values(settings.analysis.stats).reduce((a, b) => a + b, 0);
    toast(`已解析 ${count} 个条目`, 'success');
  } catch (e) {
    console.error(e);
    toast(`解析失败：${e.message}`, 'error');
  }
}

function selectedWorldEntries() {
  const all = [], a = settings.analysis?.modules || {};
  for (const [k, arr] of Object.entries(a)) {
    for (const e of arr) {
      if (settings.selectedEntries.includes(e.world + '::' + e.id)) all.push({ ...e, module: k });
    }
  }
  return all;
}

function buildPrompt() {
  const modes = {
    quick: ['basic_info', 'appearance', 'personality', 'social_persona'],
    standard: ['basic_info', 'appearance', 'attire', 'social_persona', 'personality', 'emotional_spectrum', 'core_psychology', 'behavioral_patterns', 'backstory', 'speech_patterns'],
    deep: Object.keys(SCHEMA)
  };
  const allowed = modes[settings.mode] || modes.standard;
  const fields = allowed.map(k => `${k}: ${SCHEMA[k].join(', ')}`).join('\n');
  const entries = selectedWorldEntries().map(e => ({ module: e.module, name: e.name, keys: e.keys, content: e.content, world: e.world }));
  const locked = settings.lockedWorldModules.map(k => WORLD_LABELS[k] || k);

  const tagLines = Object.entries(settings.selectedTags || {})
    .filter(([, tags]) => tags && tags.length > 0)
    .map(([cat, tags]) => `- ${cat}: ${tags.join(', ')}`)
    .join('\n');

  return `You are a SillyTavern USER Persona architect.

Create one player USER persona that naturally exists inside the supplied world.

Rules:
1. Preserve the supplied World Info as hard canon. Never contradict locked modules.
2. The OUTPUT schema keys MUST remain exactly in English because SillyTavern/AI parsing relies on them. The actual field VALUES should be natural Chinese.
3. Incorporate ALL Selected Feature Tags into the persona fields accurately.
4. Avoid explicit sexual content.

Generation mode: ${settings.mode}
Persona name: ${settings.personaName || '请根据世界观生成合适姓名'}
Requested identity: ${settings.identity || '请根据世界观安排合理身份'}
Custom requirements: ${settings.customRequirements || '无'}

Explicitly Chosen Feature Tags (Must Reflect in Persona):
${tagLines || '无额外选择标签'}

Selected world modules: ${(settings.worldModuleSelection || []).map(k => WORLD_LABELS[k] || k).join('、') || '由AI自行选择相关模块'}
Locked world modules: ${locked.join('、') || '无'}

Fields to generate:
${fields}

Selected World Info entries:
${JSON.stringify(entries, null, 2)}

Return ONLY:
<user_persona>
name: "..."
${allowed.map(k => `${k}:\n${SCHEMA[k].map(f => `  ${f}: ...`).join('\n')}`).join('\n')}
</user_persona>`;
}

async function generatePersona() {
  const b = document.querySelector('#upw-generate');
  if (b) b.disabled = true;
  try {
    if (settings.autoWorld && !settings.analysis) {
      const ns = currentCharacterWorlds();
      if (ns.length) await loadAndAnalyze(ns);
    }
    const gen = ctx.generateQuietPrompt || ctx.generateRaw;
    if (typeof gen !== 'function') throw Error('当前酒馆未提供可用生成接口');
    toast('正在生成用户人设…');
    let out;
    if (ctx.generateQuietPrompt) out = await ctx.generateQuietPrompt({ quietPrompt: buildPrompt(), quietToLoud: false, skipWIAN: true });
    else out = await ctx.generateRaw({ prompt: buildPrompt(), quietToLoud: false, trimNames: true });

    settings.generated = String(out || '').trim();
    persist();
    const ta = document.querySelector('#upw-output');
    if (ta) ta.value = settings.generated;
    toast('人设生成完成', 'success');
  } catch (e) {
    console.error(e);
    toast(`生成失败：${e.message}`, 'error');
  } finally {
    if (b) b.disabled = false;
  }
}

function randomize() {
  const a = ['冷静敏锐', '温和克制', '好奇机敏', '自律务实', '理想主义但谨慎', '低调野心勃勃'];
  const b = ['旅行者', '外门弟子', '商会学徒', '学者', '散修', '小贵族'];
  settings.customRequirements = `随机灵感：性格“${a[Math.floor(Math.random() * a.length)]}”；身份倾向“${b[Math.floor(Math.random() * b.length)]}”。服从世界观。`;
  persist();
  const t = document.querySelector('#upw-req');
  if (t) t.value = settings.customRequirements;
  toast('已填入随机灵感', 'success');
}

async function importPersona() {
  const description = (document.querySelector('#upw-output')?.value || settings.generated || '').trim();
  if (!description) return toast('请先生成人设', 'warning');
  const name = (document.querySelector('#upw-name')?.value || settings.personaName || 'WorldForge Persona').trim();
  try {
    const exec = ctx.executeSlashCommandsWithOptions || ctx.executeSlashCommands;
    if (typeof exec === 'function') {
      const cmd = `/persona-create name=${escapeArg(name)} description=${escapeArg(description)}`;
      try { await exec(cmd, { handleParserErrors: true }); } catch { await exec(cmd); }
      toast('已创建原生 Persona', 'success');
      return;
    }
    const p = ctx.powerUser;
    if (p?.personas && p?.persona_descriptions) {
      const avatar = `worldforge-${uid()}.png`;
      p.personas[avatar] = name;
      p.persona_descriptions[avatar] = description;
      persist();
      toast('已写入原生 Persona 数据', 'success');
      return;
    }
    throw Error('未找到当前版本可用的 Persona 写入接口');
  } catch (e) {
    console.error(e);
    toast(`导入失败：${e.message}`, 'error');
  }
}

function escapeArg(s) { return JSON.stringify(String(s)).replace(/^"|"$/g, '').replace(/ /g, '\\ '); }

// 注入魔法棒下拉菜单项
function setupWandMenu() {
  const wandCandidates = [
    '#expression-wrapper',
    '#magic_menu',
    '#form_sheld .magic-button',
    '#quick_expressions'
  ];

  // 通用菜单点击侦听：当酒馆弹出扩展/快捷指令菜单时，向里面挂载入口
  const injectMenuItem = () => {
    // 兼容酒馆新旧版的浮层菜单容器
    const menus = document.querySelectorAll('.popup, #dialogue_popup, .list-group, .expression-list, .extension-menu');
    menus.forEach(menu => {
      if (menu.querySelector('#upw-wand-trigger')) return;
      // 匹配是否为魔法棒相关的浮动面板
      if (menu.id?.includes('magic') || menu.className?.includes('magic') || menu.querySelector('[data-action]') || menu.classList.contains('list-group')) {
        const item = document.createElement('div');
        item.id = 'upw-wand-trigger';
        item.className = 'list-group-item list-group-item-action interactable upw-wand-item';
        item.innerHTML = '<span>🪄 User 人设世界锻造助手</span>';
        item.addEventListener('click', () => {
          menu.style.display = 'none';
          toggleModal(true);
        });
        menu.prepend(item);
      }
    });
  };

  // 监听 DOM 树变化以捕捉魔法棒展开
  const obs = new MutationObserver(injectMenuItem);
  obs.observe(document.body, { childList: true, subtree: true });

  // 如果酒馆有原生魔法棒按钮，绑定辅助监听
  const wandBtn = document.querySelector('#magic') || document.querySelector('#magic-button');
  if (wandBtn) {
    wandBtn.addEventListener('click', () => setTimeout(injectMenuItem, 50));
  }
}

async function init() {
  try {
    ctx = SillyTavern.getContext();
    ensureSettings();
    if (!settings.activeSection) settings.activeSection = 'basic_info';

    // 创建全屏模态窗口遮罩
    let modal = document.querySelector('#upw-modal-wrapper');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'upw-modal-wrapper';
      modal.className = `upw-modal-wrapper theme-${settings.theme || 'blue'}`;
      modal.innerHTML = `
        <div class="upw-backdrop"></div>
        <div class="upw-window">
          <div id="upw-root" class="worldforge-extension"></div>
        </div>
      `;
      document.body.appendChild(modal);

      // 点击遮罩关闭
      modal.querySelector('.upw-backdrop')?.addEventListener('click', () => toggleModal(false));
    }

    setupWandMenu();

    // 快捷 Slash Command: /worldforge 打开
    if (ctx.registerSlashCommand) {
      ctx.registerSlashCommand('worldforge', () => toggleModal(true), [], '打开 User 人设助手', true, true);
    }

    ctx.eventSource?.on?.(ctx.event_types?.PERSONA_CHANGED || 'PERSONA_CHANGED', render);
    ctx.eventSource?.on?.(ctx.event_types?.WORLDINFO_UPDATED || 'WORLDINFO_UPDATED', () => worldCache.clear());

    log('initialized', VERSION);
  } catch (e) {
    console.error(`[${EXT}] init failed`, e);
  }
}

window.UserPersonaWorldForge = {
  version: VERSION,
  open: () => toggleModal(true),
  close: () => toggleModal(false),
  analyze: async n => loadAndAnalyze(n),
  generate: generatePersona
};

export { init };
