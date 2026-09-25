/* User Persona WorldForge - v0.7.0 (Accordion 2-Level Navigation) */
const EXT = 'user-persona-worldforge', VERSION = '0.7.0';

// 一级大类 -> 二级细分项映射
const MENU_TREE = [
  {
    name: '基本信息',
    subs: ['基本设定', '跟班']
  },
  {
    name: '外貌特征',
    subs: ['体型', '发色', '发型', '脸型', '眉毛', '眼睛', '鼻子', '嘴巴', '皮肤', '纹身部位', '穿刺']
  },
  {
    name: '服装与装束',
    subs: ['衣服风格', '配饰']
  },
  {
    name: '社会身份',
    subs: ['技能', '爱好', '座驾']
  },
  {
    name: '性格与心理',
    subs: ['癖好', '弱点', '厌恶']
  },
  {
    name: '生活习性',
    subs: ['饮食偏好']
  },
  {
    name: '结果输出',
    subs: ['人设预览']
  }
];

// 二级项对应具体标签数据池
const TAG_DATABASE = {
  '体型': [
    '娇小玲珑', '高挑纤细', '丰满圆润', '肌肉结实', '骨感美人', '微胖肉感', '沙漏型S', '梨形身材', 
    '倒三角', '平板身材', 'H型超模', '柔软无骨', '健美修长', '矮胖可爱', '五短身材', '九头身', 
    '宽肩窄腰', '蝴蝶背', '直角肩', '漫画腿', '马甲线', '蜜桃臀', '天鹅颈', '性感腰窝'
  ],
  '发色': [
    '乌黑亮丽', '铂金白', '樱花粉', '亚麻灰', '酒红色', '雾霾蓝', '薄藤紫', '蜂蜜茶', 
    '脏橘色', '薄荷绿', '彩虹挑染', '渐变紫灰', '白金挑染', '深棕栗色', '奶奶灰', '海王红', 
    '蓝黑渐变', '玫瑰金', '银白色', '荧光绿'
  ],
  '发型': [
    '黑长直', '大波浪', '法式羊毛卷', '齐耳短发', '日系鲻鱼头', '高马尾', '双马尾', '丸子头', 
    '公主切', '空气刘海', '中分长发', '侧分大卷', '脏辫', '超短寸头', '半扎发', '拳击辫', 
    '哪吒头', '低盘发', '狼尾', '锁骨发', '微分碎盖发'
  ],
  '脸型': [
    '鹅蛋脸', '瓜子脸', '圆脸娃娃脸', '方圆脸', '菱形脸', '心形脸', '长脸御姐', '高颧骨', 
    '小V脸', '肉肉脸', '厌世脸', '初恋脸', '浓颜系', '淡颜系', '猫系颜', '犬系颜', 
    '狐系颜', '兔系颜', '蛇系颜', '狼系颜'
  ],
  '眉毛': [
    '野生眉', '柳叶眉', '一字眉', '欧式挑眉', '断眉', '剑眉', '弯月眉', '流星眉', 
    '八字眉', '短眉', '浓眉', '淡眉', '细长眉', '上扬眉', '下垂眉', '落尾眉', 
    '雾眉', '连心眉', '染眉', '无眉星人', '豆豆眉', '远山眉', '黛眉', '卧蚕眉', 
    '悬胆眉', '扫帚眉', '罗汉眉'
  ],
  '眼睛': [
    '桃花眼', '瑞凤眼', '杏眼', '丹凤眼', '狐狸眼', '下垂眼', '狗狗眼', '圆眼', 
    '细长眼', '异色瞳', '深邃眼窝', '卧蚕明显', '单眼皮', '内双', '欧式大双', '星星眼', 
    '死鱼眼', '三白眼', '含情脉脉', '眼神凶狠'
  ],
  '鼻子': [
    '水滴鼻', '小翘鼻', '驼峰鼻', '希腊鼻', '鹰钩鼻', '蒜头鼻', '朝天鼻', '罗马鼻', 
    '直鼻', '盒型鼻', '宽鼻翼', '窄鼻梁', '高山根', '塌鼻梁', '精致鼻头', '圆鼻头', 
    '海鸥线', '鼻头痣', '鼻钉', '鼻影重'
  ],
  '嘴巴': [
    'M唇', '樱桃小嘴', '厚唇', '微笑唇', '覆舟嘴', '薄唇', '嘟嘟唇', '嘴角上扬', 
    '嘴角下垂', '唇珠明显', '烈焰红唇', '苍白唇色', '咬唇妆', '唇钉', '兔牙', '小虎牙', 
    '整齐皓齿', '牙套', '酒窝', '梨涡'
  ],
  '皮肤': [
    '冷白皮', '暖黄皮', '小麦色', '古铜色', '巧克力色', '苍白病态', '粉嫩透红', '雀斑妆', 
    '晒伤妆', '油性肌', '干性肌', '水光肌', '哑光肌', '敏感肌', '高原红', '红血丝', 
    '肤色不均', '纹身覆盖', '有伤疤', '肤如凝脂'
  ],
  '纹身部位': [
    '锁骨纹身', '后颈纹身', '大臂花臂', '手腕小图', '手指微刺', '胸口纹身', '脊柱纹身', '腰窝纹身', 
    '小腹纹身', '大腿环纹', '脚踝纹身', '耳后纹身', '肋骨纹身', '肩胛骨', '臀部纹身', '全背满背', 
    '眼角泪痣', '无纹身'
  ],
  '穿刺': [
    '耳垂钉', '耳骨钉', '耳蜗钉', '工业长杆', '眉钉', '鼻钉', '鼻中隔环', '唇钉', 
    '舌钉', '笑脸钉', '酒窝钉', '肚脐钉', '后颈埋钉', '锁骨埋钉', '手指穿刺', '眼角穿刺', 
    '扩耳', '无穿刺'
  ],
  '配饰': [
    '黑框眼镜', '金丝眼镜', '墨镜', 'choker', '项圈', '珍珠项链', '十字架', '佛珠', 
    '戒指', '手镯手镯', '脚链', '腿环', '发带', '贝雷帽', '棒球帽', '渔夫帽', 
    '口罩', '眼罩', '耳机', '怀表', '机械表', '领带夹', '袖扣', '抑制颈环', '止咬器'
  ],
  '衣服风格': [
    'JK制服', '洛丽塔', '汉服', '旗袍', '女仆装', 'OL职业装', '运动风', '街头潮牌', 
    '赛博朋克', '哥特暗黑', '森系', '纯欲风', '辣妹风', '极简风', '复古风', '波西米亚', 
    '睡衣风', 'oversize', '机能风', '比基尼', '西装'
  ],
  '癖好': [
    '洁癖', '收集癖', '肌肤饥渴', '轻微施虐', '轻微受虐', '声控', '手控', '掌控欲', 
    '依恋障碍', '窥探欲', '护短偏执', '喜欢顺毛', '咬人', '收藏旧物', '轻微自恋'
  ],
  '跟班': [
    '无跟班', '死士影卫', '贴身女仆', '忠犬保镖', '灵宠/神兽', '机械智脑', '书童/小跟班', 
    '管家', '闺蜜/死党', '保姆兼保镖', '专属司机'
  ],
  '技能': [
    '过目不忘', '黑客技术', '开锁', '格斗', '射击', '飙车', '医术', '毒术', 
    '催眠', '占卜', '乐器精通', '多国语言', '社交牛逼', '撒娇', '演戏', '化妆', 
    '修图', '家务全能', '赚钱', '花钱', '机械维修', '荒野求生', '拆弹', '谈判', 
    '心理侧写', '调教', '跑酷'
  ],
  '爱好': [
    '打游戏', '看动漫', '追剧', '撸猫', '撸狗', '睡觉', '旅行', '摄影', 
    '绘画', '写作', '唱歌', '跳舞', '烹饪', '烘焙', '调酒', '园艺', 
    '占星', '剧本杀', '密室', '逛街', '极限跑酷', '收集古董', '赌博', '钓鱼', 
    '露营', '飙车', '射箭', '攀岩', '撸铁', '冥想'
  ],
  '座驾': [
    '重机车', '超跑', '敞篷跑车', '越野车', '房车', '复古老爷车', '直升机', '私人游艇', 
    '滑板', '轮滑', '自行车', '电动车', '地铁', '公交', '步行', '御剑飞行', 
    '扫帚', '独角兽', '龙', 'UFO'
  ],
  '厌恶': [
    '讨厌昆虫', '讨厌香菜', '讨厌早起', '讨厌加班', '讨厌虚伪', '讨厌背叛', '讨厌等待', '讨厌噪音', 
    '讨厌烟味', '讨厌榴莲', '讨厌数学', '讨厌运动', '讨厌社交', '讨厌被命令', '讨厌下雨天', '讨厌拥挤', 
    '讨厌排队', '讨厌熊孩子', '讨厌绿茶'
  ],
  '弱点': [
    '怕黑', '怕鬼', '恐高', '深海恐惧', '密集恐惧', '怕痛', '怕痒', '路痴', 
    '脸盲', '音痴', '过敏', '怕冷', '怕热', '容易害羞', '泪失禁', '耳根软', 
    '怕孤独', '恋爱脑', '没钱'
  ],
  '饮食偏好': [
    '无肉不欢', '素食', '重口味', '清淡', '甜食控', '咖啡因中毒', '海鲜爱好者', '面食党', 
    '米饭党', '垃圾食品', '养生', '挑食', '大胃王', '小鸟胃', '只喝水', '爱吃辣', 
    '爱吃酸', '爱吃苦', '黑暗料理', '零食当饭'
  ]
};

const THEMES = [
  { id: 'blue', name: '🌿 静谧蓝白' },
  { id: 'green', name: '🍵 鼠尾草绿' },
  { id: 'purple', name: '🌸 暮山灰紫' },
  { id: 'warm', name: '🍂 暖杏米白' }
];

let ctx, settings, isOpen = false;

function log(...a) { console.debug(`[${EXT}]`, ...a); }
function toast(m, t = 'info') { try { (ctx?.toastr || window.toastr)?.[t]?.(m); } catch {} }
function esc(s = '') { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function ensureSettings() {
  const root = ctx.extensionSettings || (ctx.extensionSettings = {});
  settings = {
    theme: 'blue',
    zoom: 100,
    openCategory: '外貌特征', // 默认展开的一级类目
    activeSubTab: '体型',    // 默认高亮的二级细分项
    selectedTags: {},       // { '体型': ['娇小玲珑'] }
    worldName: '',
    personaName: '',
    identity: '',
    customReq: '',
    generated: '',
    ...(root[EXT] || {})
  };
  root[EXT] = settings;
  ctx.saveSettingsDebounced?.();
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

async function listWorlds() {
  try {
    if (typeof ctx.getWorldInfoNames === 'function') {
      const n = await ctx.getWorldInfoNames();
      if (Array.isArray(n)) return n.map(x => typeof x === 'string' ? x : x?.name).filter(Boolean);
    }
  } catch {}
  return [];
}

function render() {
  const modal = document.querySelector('#upw-modal-wrapper');
  if (!modal) return;

  modal.className = `upw-modal-wrapper theme-${settings.theme} ${isOpen ? 'visible' : ''}`;
  const win = modal.querySelector('.upw-window');
  if (win) {
    win.style.transform = `scale(${(settings.zoom || 100) / 100})`;
  }

  const curSub = settings.activeSubTab || '体型';

  // 计算右侧核心内容区
  let rightContentHtml = '';
  if (TAG_DATABASE[curSub]) {
    const list = TAG_DATABASE[curSub];
    const curSelected = settings.selectedTags[curSub] || [];
    rightContentHtml = `
      <div class="upw-tab-header">
        <div class="upw-tab-title">✨ ${esc(curSub)}</div>
        <div class="upw-tab-hint">点击选中标签（可多选，再次点击取消）</div>
      </div>
      <div class="upw-grid-chips">
        ${list.map(tag => {
          const isAct = curSelected.includes(tag);
          return `<button class="upw-chip-btn ${isAct ? 'active' : ''}" data-cat="${esc(curSub)}" data-tag="${esc(tag)}">${esc(tag)}</button>`;
        }).join('')}
      </div>
    `;
  } else if (curSub === '基本设定') {
    rightContentHtml = `
      <div class="upw-tab-header">
        <div class="upw-tab-title">✨ 基本设定与世界约束</div>
      </div>
      <div class="upw-form-grid">
        <label class="upw-form-item">
          <span>角色绑定的世界书：</span>
          <select id="upw-world-select" class="upw-input-field"><option value="">自动检测或不指定</option></select>
        </label>
        <label class="upw-form-item">
          <span>人设名称：</span>
          <input id="upw-name" class="upw-input-field" value="${esc(settings.personaName)}" placeholder="例如：云岚">
        </label>
        <label class="upw-form-item">
          <span>世界内身份：</span>
          <input id="upw-identity" class="upw-input-field" value="${esc(settings.identity)}" placeholder="例如：外门弟子 / 财阀千金">
        </label>
        <label class="upw-form-item">
          <span>补充描述或约束要求：</span>
          <textarea id="upw-custom-req" class="upw-input-field" rows="4" placeholder="例如：性格偏清冷，不主动与人交际，保留凡人成长空间...">${esc(settings.customReq)}</textarea>
        </label>
      </div>
    `;
  } else if (curSub === '人设预览') {
    rightContentHtml = `
      <div class="upw-tab-header">
        <div class="upw-tab-title">✨ 生成的人设结果</div>
      </div>
      <div class="upw-form-grid">
        <textarea id="upw-output" class="upw-output-box" spellcheck="false" placeholder="点击下方“✨ 生成 USER 人设”后，生成结果将在此完整展示...">${esc(settings.generated)}</textarea>
      </div>
    `;
  }

  // 统计已选总数
  let totalChosen = 0;
  for (const k in settings.selectedTags) totalChosen += settings.selectedTags[k].length;

  win.innerHTML = `
    <!-- 顶栏 -->
    <div class="upw-header">
      <div class="upw-header-info">
        <div class="upw-title">人设生成 · 助手</div>
        <div class="upw-badge-tag">已选: ${totalChosen}</div>
      </div>
      <div class="upw-header-actions">
        <select id="upw-theme" class="upw-compact-select">
          ${THEMES.map(th => `<option value="${th.id}" ${th.id === settings.theme ? 'selected' : ''}>${th.name}</option>`).join('')}
        </select>
        <select id="upw-zoom" class="upw-compact-select">
          ${[80, 90, 100, 110].map(z => `<option value="${z}" ${z === settings.zoom ? 'selected' : ''}>${z}%</option>`).join('')}
        </select>
        <button id="upw-close" class="upw-close-icon">✕</button>
      </div>
    </div>

    <!-- 主体：左侧二级手风琴 + 右侧完整选项铺开 -->
    <div class="upw-body-split">
      <!-- 左侧手风琴侧边栏 -->
      <aside class="upw-sidebar-accordion">
        ${MENU_TREE.map(group => {
          const isOpen = settings.openCategory === group.name;
          // 计算该大类下共选了几个小标签
          let groupTagCount = 0;
          group.subs.forEach(s => {
            groupTagCount += (settings.selectedTags[s] || []).length;
          });

          return `
            <div class="upw-acc-group ${isOpen ? 'open' : ''}">
              <div class="upw-acc-header" data-group="${esc(group.name)}">
                <span>${esc(group.name)}</span>
                <div class="upw-acc-meta">
                  ${groupTagCount > 0 ? `<span class="upw-count-badge">${groupTagCount}</span>` : ''}
                  <i class="upw-acc-arrow">${isOpen ? '▾' : '▸'}</i>
                </div>
              </div>
              <div class="upw-acc-body ${isOpen ? 'show' : ''}">
                ${group.subs.map(sub => {
                  const subCount = (settings.selectedTags[sub] || []).length;
                  const isAct = settings.activeSubTab === sub;
                  return `
                    <button class="upw-sub-btn ${isAct ? 'active' : ''}" data-sub="${esc(sub)}">
                      <span>${esc(sub)}</span>
                      ${subCount > 0 ? `<small>${subCount}</small>` : ''}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </aside>

      <!-- 右侧宽敞的标签选项面板 -->
      <main class="upw-content-view">
        ${rightContentHtml}
      </main>
    </div>

    <!-- 底部操作底栏 -->
    <div class="upw-footer">
      <button id="upw-btn-clear" class="upw-sub-action">清空</button>
      <button id="upw-btn-random" class="upw-sub-action">🎲 随机</button>
      <button id="upw-btn-gen" class="upw-main-action">✨ 生成 USER 人设</button>
      <button id="upw-btn-copy" class="upw-sub-action">复制</button>
      <button id="upw-btn-import" class="upw-import-action">📥 导入Persona</button>
    </div>
  `;

  bindEvents();
}

function bindEvents() {
  const win = document.querySelector('.upw-window');
  if (!win) return;

  win.querySelector('#upw-close')?.addEventListener('click', () => toggleModal(false));
  
  win.querySelector('#upw-theme')?.addEventListener('change', e => {
    settings.theme = e.target.value;
    persist();
    render();
  });

  win.querySelector('#upw-zoom')?.addEventListener('change', e => {
    settings.zoom = Number(e.target.value);
    persist();
    render();
  });

  // 1. 点击一级大类（折叠/展开手风琴）
  win.querySelectorAll('.upw-acc-header').forEach(header => {
    header.addEventListener('click', () => {
      const g = header.dataset.group;
      settings.openCategory = settings.openCategory === g ? '' : g;
      persist();
      render();
    });
  });

  // 2. 点击二级子选项（切换右侧大版面）
  win.querySelectorAll('.upw-sub-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      settings.activeSubTab = btn.dataset.sub;
      persist();
      render();
    });
  });

  // 3. 点击右侧白底矩形标签（多选）
  win.querySelectorAll('.upw-chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      const cat = chip.dataset.cat;
      const tag = chip.dataset.tag;
      if (!settings.selectedTags[cat]) settings.selectedTags[cat] = [];

      if (settings.selectedTags[cat].includes(tag)) {
        settings.selectedTags[cat] = settings.selectedTags[cat].filter(t => t !== tag);
        if (settings.selectedTags[cat].length === 0) delete settings.selectedTags[cat];
      } else {
        settings.selectedTags[cat].push(tag);
      }
      persist();
      render();
    });
  });

  // 输入监听
  ['#upw-name', '#upw-identity', '#upw-custom-req', '#upw-output'].forEach(selector => {
    win.querySelector(selector)?.addEventListener('input', e => {
      if (selector === '#upw-name') settings.personaName = e.target.value;
      if (selector === '#upw-identity') settings.identity = e.target.value;
      if (selector === '#upw-custom-req') settings.customReq = e.target.value;
      if (selector === '#upw-output') settings.generated = e.target.value;
      persist();
    });
  });

  // 加载世界书下拉
  const worldSel = win.querySelector('#upw-world-select');
  if (worldSel) {
    listWorlds().then(worlds => {
      worldSel.innerHTML = '<option value="">自动检测或不指定</option>' + worlds.map(w => `<option value="${esc(w)}" ${w === settings.worldName ? 'selected' : ''}>${esc(w)}</option>`).join('');
      worldSel.addEventListener('change', e => {
        settings.worldName = e.target.value;
        persist();
      });
    });
  }

  // 底栏操作
  win.querySelector('#upw-btn-clear')?.addEventListener('click', () => {
    settings.selectedTags = {};
    persist();
    render();
    toast('已清空所选标签', 'info');
  });

  win.querySelector('#upw-btn-random')?.addEventListener('click', () => {
    const pool = ['体型', '发型', '发色', '脸型', '眼睛', '衣服风格', '技能', '爱好'];
    pool.forEach(cat => {
      const arr = TAG_DATABASE[cat];
      if (arr) settings.selectedTags[cat] = [arr[Math.floor(Math.random() * arr.length)]];
    });
    persist();
    render();
    toast('已随机抽选一套人设标签', 'success');
  });

  win.querySelector('#upw-btn-copy')?.addEventListener('click', async () => {
    await navigator.clipboard?.writeText(settings.generated || '');
    toast('已复制到剪贴板', 'success');
  });

  win.querySelector('#upw-btn-gen')?.addEventListener('click', generatePersona);
  win.querySelector('#upw-btn-import')?.addEventListener('click', importPersona);
}

function buildPrompt() {
  const chosenList = [];
  for (const cat in settings.selectedTags) {
    if (settings.selectedTags[cat]?.length) {
      chosenList.push(`${cat}: ${settings.selectedTags[cat].join('、')}`);
    }
  }

  return `You are a SillyTavern USER Persona architect.
Create one high quality player USER persona matching the chosen options below.

Rules:
1. All persona schema keys MUST remain in English. The descriptive values must be natural Chinese.
2. Incorporate ALL Chosen Features into the persona seamlessly.

Chosen Features:
${chosenList.length ? chosenList.join('\n') : '由AI自由发挥'}

Persona Name: ${settings.personaName || '按设定生成合适姓名'}
World Identity: ${settings.identity || '按设定合理安排身份'}
Extra Constraints: ${settings.customReq || '无'}

Output Schema:
<user_persona>
name: "..."
basic_info:
  gender: ...
  age: ...
  species: ...
  identity: ...
  occupation: ...
appearance:
  physique: ...
  hair: ...
  face: ...
  eyes: ...
  skin: ...
  tattoos_and_piercings: ...
attire:
  style: ...
  accessories: ...
social_persona:
  skills: ...
  hobbies: ...
  vehicle: ...
personality:
  core_traits: ...
  kinks: ...
  weaknesses: ...
  dislikes: ...
dietary:
  preference: ...
backstory:
  summary: ...
</user_persona>`;
}

async function generatePersona() {
  const btn = document.querySelector('#upw-btn-gen');
  if (btn) btn.disabled = true;
  try {
    const gen = ctx.generateQuietPrompt || ctx.generateRaw;
    if (typeof gen !== 'function') throw Error('未找到酒馆可用的 AI 生成接口');
    toast('正在根据勾选项生成人设…');

    let out;
    if (ctx.generateQuietPrompt) out = await ctx.generateQuietPrompt({ quietPrompt: buildPrompt(), quietToLoud: false, skipWIAN: true });
    else out = await ctx.generateRaw({ prompt: buildPrompt(), quietToLoud: false, trimNames: true });

    settings.generated = String(out || '').trim();
    settings.openCategory = '结果输出';
    settings.activeSubTab = '人设预览';
    persist();
    render();
    toast('人设生成完成！已切换至预览', 'success');
  } catch (e) {
    console.error(e);
    toast(`生成失败：${e.message}`, 'error');
  } finally {
    if (btn) btn.disabled = false;
  }
}

async function importPersona() {
  const desc = (settings.generated || '').trim();
  if (!desc) return toast('请先生成或输入人设内容', 'warning');
  const name = (settings.personaName || 'WorldForge Persona').trim();
  try {
    const exec = ctx.executeSlashCommandsWithOptions || ctx.executeSlashCommands;
    if (typeof exec === 'function') {
      const arg = s => JSON.stringify(String(s)).replace(/^"|"$/g, '').replace(/ /g, '\\ ');
      await exec(`/persona-create name=${arg(name)} description=${arg(desc)}`);
      toast('已成功导入为原生 Persona！', 'success');
      return;
    }
    throw Error('未能调用酒馆 /persona-create 命令');
  } catch (e) {
    console.error(e);
    toast(`导入失败：${e.message}`, 'error');
  }
}

function setupWandMenu() {
  const addMenuItem = () => {
    const extMenus = document.querySelectorAll('#extensionsMenu, #extensions_menu, .extensionsMenu, #nav-extensions, #extension_menu');
    extMenus.forEach(menu => {
      if (menu.querySelector('#upw-ext-menu-item')) return;
      const item = document.createElement('div');
      item.id = 'upw-ext-menu-item';
      item.className = 'list-group-item list-group-item-action interactable extension_menu_item upw-menu-row';
      item.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles fa-fw upw-menu-icon"></i><span>User 人设助手</span>`;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const p = item.closest('.dropdown-menu, .popup, #extensionsMenu');
        if (p) $(p).hide?.();
        toggleModal(true);
      });
      menu.prepend(item);
    });
  };

  const obs = new MutationObserver(addMenuItem);
  obs.observe(document.body, { childList: true, subtree: true });
  addMenuItem();
}

async function init() {
  try {
    ctx = SillyTavern.getContext();
    ensureSettings();

    let modal = document.querySelector('#upw-modal-wrapper');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'upw-modal-wrapper';
      modal.className = `upw-modal-wrapper theme-${settings.theme}`;
      modal.innerHTML = `
        <div class="upw-backdrop"></div>
        <div class="upw-window"></div>
      `;
      document.body.appendChild(modal);
      modal.querySelector('.upw-backdrop')?.addEventListener('click', () => toggleModal(false));
    }

    setupWandMenu();

    if (ctx.registerSlashCommand) {
      ctx.registerSlashCommand('worldforge', () => toggleModal(true), [], '打开 User 人设助手', true, true);
    }

    log('initialized', VERSION);
  } catch (e) {
    console.error(`[${EXT}] init failed`, e);
  }
}

window.UserPersonaWorldForge = {
  version: VERSION,
  open: () => toggleModal(true),
  close: () => toggleModal(false),
  generate: generatePersona
};

export { init };
