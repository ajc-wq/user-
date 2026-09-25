/* User Persona WorldForge - v1.0.0 (API & Preset Selector) */
const EXT = 'user-persona-worldforge', VERSION = '1.0.0';

const MENU_TREE = [
  {
    name: '基本信息',
    subs: ['基本设定', '性别', '种族', '年龄', '身高', '体型', '血型', '国籍地域', '学历', '婚姻状况', '跟班']
  },
  {
    name: '外貌特征',
    subs: ['发色', '发型', '脸型', '眉毛', '眼睛', '鼻子', '嘴巴', '皮肤', '纹身部位', '穿刺']
  },
  {
    name: '服装与装束',
    subs: ['衣服风格', '配饰']
  },
  {
    name: '社会身份',
    subs: ['职业身份', '社会地位', '职业技能', '经济状况', '居住状态', '秘密身份', '身份关键词', '座驾']
  },
  {
    name: '性格与心理',
    subs: ['性格特质', '情绪倾向', '社交方式', '思维与行为', '星座星象', '癖好', '弱点', '性格关键词']
  },
  {
    name: '生活习性',
    subs: ['饮食偏好', '厌恶']
  },
  {
    name: '结果输出',
    subs: ['人设预览']
  }
];

const TAG_DATABASE = {
  // ===== 基本信息 =====
  '性别': ['女', '男', '双性', '中性', '无性别', '跨性别', '泛性别', '自定义'],
  '种族': ['人类', '血族', '狼人', '精灵', '半妖', '魔女', '道士', '机关师', '改造人', '异能者'],
  '年龄': ['12-18岁', '19-25岁', '26-32岁', '33-40岁', '41-50岁', '百年以上', '千年以上', '外观年龄≠真实年龄'],
  '身高': ['150-158cm', '159-166cm', '167-175cm', '176-185cm', '186-195cm', '娇小', '高挑', '不定'],
  '体型': [
    '纤细', '匀称', '修长', '丰满', '结实', '精瘦', '宽肩', '窄腰', '娇小玲珑', '高挑清瘦',
    '骨感美人', '微胖肉感', '沙漏型S', '梨形身材', '倒三角', '平板身材', 'H型超模', '柔软无骨',
    '健美修长', '矮胖可爱', '九头身', '蝴蝶背', '直角肩', '漫画腿', '马甲线', '蜜桃臀', '天鹅颈', '性感腰窝'
  ],
  '血型': ['A型', 'B型', 'O型', 'AB型', 'Rh阴性', '稀有血型', '未知', '古代血型设定'],
  '国籍地域': ['中国', '日本', '韩国', '英国', '法国', '德国', '美国', '俄罗斯', '北欧', '架空古国'],
  '学历': ['高中', '专科', '本科', '硕士', '博士', '留学背景', '江湖学艺', '宗门修炼', '自学成才'],
  '婚姻状况': ['未婚', '已婚', '离异', '丧偶', '有恋人', '有婚约', '单身', '关系复杂'],
  '跟班': ['无跟班', '死士影卫', '贴身女仆', '忠犬保镖', '灵宠/神兽', '机械智脑', '小跟班/书童', '管家', '闺蜜/死党', '保姆兼保镖'],

  // ===== 外貌特征 =====
  '发色': [
    '乌黑亮丽', '铂金白', '樱花粉', '亚麻灰', '酒红色', '雾霾蓝', '薄藤紫', '蜂蜜茶',
    '脏橘色', '薄荷绿', '彩虹挑染', '渐变紫灰', '白金挑染', '深棕栗色', '奶奶灰', '海王红',
    '蓝黑渐变', '玫瑰金', '银白色', '荧光绿'
  ],
  '发型': [
    '利落短发', '蓬松短发', '层次短发', '日系短发', '港风短发', '精灵短发', '锁骨发', '及肩发',
    '法式卷', '空气刘海', '黑长直', '大波浪', '长卷发', '公主切', '双马尾', '半扎发',
    '高马尾', '低马尾', '狼尾', '鲻鱼头', '脏辫', '微分碎盖发', '束发短发', '随性短发',
    '披肩发', '发冠半束', '长发垂腰', '高髻', '双丫髻', '坠马髻', '飞仙髻', '银发高马尾', '散发披肩'
  ],
  '脸型': [
    '鹅蛋脸', '瓜子脸', '圆脸娃娃脸', '方圆脸', '菱形脸', '心形脸', '长脸御姐', '高颧骨',
    '小V脸', '肉肉脸', '厌世脸', '初恋脸', '浓颜系', '淡颜系', '猫系颜', '犬系颜', '狐系颜', '兔系颜', '蛇系颜', '狼系颜'
  ],
  '眉毛': [
    '野生眉', '柳叶眉', '一字眉', '欧式挑眉', '断眉', '剑眉', '弯月眉', '流星眉',
    '八字眉', '短眉', '浓眉', '淡眉', '细长眉', '上扬眉', '下垂眉', '落尾眉',
    '雾眉', '连心眉', '染眉', '无眉星人', '远山眉', '黛眉', '卧蚕眉', '悬胆眉', '扫帚眉'
  ],
  '眼睛': [
    '桃花眼', '瑞凤眼', '杏眼', '丹凤眼', '狐狸眼', '下垂眼', '狗狗眼', '圆眼',
    '细长眼', '异色瞳', '深邃眼窝', '卧蚕明显', '单眼皮', '内双', '欧式大双', '星星眼',
    '死鱼眼', '三白眼', '含情脉脉', '眼神凶狠'
  ],
  '鼻子': [
    '水滴鼻', '小翘鼻', '驼峰鼻', '希腊鼻', '鹰钩鼻', '蒜头鼻', '朝天鼻', '罗马鼻',
    '直鼻', '盒型鼻', '宽鼻翼', '窄鼻梁', '高山根', '塌鼻梁', '精致鼻头', '海鸥线', '鼻头痣', '鼻钉'
  ],
  '嘴巴': [
    'M唇', '樱桃小嘴', '厚唇', '微笑唇', '覆舟嘴', '薄唇', '嘟嘟唇', '嘴角上扬',
    '嘴角下垂', '唇珠明显', '烈焰红唇', '苍白唇色', '咬唇妆', '唇钉', '兔牙', '小虎牙', '酒窝', '梨涡'
  ],
  '皮肤': [
    '冷白皮', '暖黄皮', '小麦色', '古铜色', '巧克力色', '苍白病态', '粉嫩透红', '雀斑妆',
    '晒伤妆', '油性肌', '干性肌', '水光肌', '哑光肌', '敏感肌', '高原红', '肤色不均', '有伤疤', '肤如凝脂'
  ],
  '纹身部位': [
    '锁骨纹身', '后颈纹身', '大臂花臂', '手腕小图', '手指微刺', '胸口纹身', '脊柱纹身', '腰窝纹身',
    '小腹纹身', '大腿环纹', '脚踝纹身', '耳后纹身', '肋骨纹身', '肩胛骨', '臀部纹身', '全背满背', '眼角泪痣', '无纹身'
  ],
  '穿刺': [
    '耳垂钉', '耳骨钉', '耳蜗钉', '工业长杆', '眉钉', '鼻钉', '鼻中隔环', '唇钉',
    '舌钉', '笑脸钉', '酒窝钉', '肚脐钉', '后颈埋钉', '锁骨埋钉', '手指穿刺', '眼角穿刺', '扩耳', '无穿刺'
  ],

  // ===== 服装与装束 =====
  '衣服风格': [
    '宽松卫衣', '直筒牛仔裤', '白衬衫', '针织开衫', '工装裤', '帆布鞋', '格纹裙', '百褶裙',
    '西装套装', '真丝衬衫', '高腰西裤', '尖头高跟鞋', '极简通勤装', '连帽卫衣', '棒球服', '厚底鞋',
    '街头混搭', '皮革外套', '烟熏妆感', '尖头靴', '短上衣', '工装裙', '马丁靴', '礼服裙',
    'JK制服', '洛丽塔', '纯欲风', '辣妹风', '运动风', '复古西装', '长风衣', '白大褂', '制服',
    '长衫', '儒裙', '书生袍', '素色衣料', '广袖长袍', '轻纱长裙', '白色披风', '素裙', '月白长袍',
    '劲装', '短打', '夜行衣', '护腕', '佩剑', '锦袍', '华服', '霞帔', '凤冠', '宫装',
    '暗纹长袍', '血色披风', '狐裘', '黑纱', '魔纹衣袍'
  ],
  '配饰': [
    '黑框眼镜', '金丝眼镜', '墨镜', 'choker', '项圈', '珍珠项链', '十字架', '佛珠',
    '戒指', '手镯', '脚链', '腿环', '机械表', '领带夹', '袖扣', '抑制颈环', '止咬器',
    '发夹', '发带', '贝雷帽', '棒球帽', '丝巾', '玉冠', '金冠', '玉簪', '步摇', '流苏簪', '折扇', '玉佩', '香囊'
  ],

  // ===== 社会身份 =====
  '职业身份': [
    '大学生', '研究生', '公司职员', '医生', '护士', '警察', '侦探', '黑客', '网红', '模特',
    '调酒师', '古董商', '教师', '律师', '艺人', '公子', '小姐', '少侠', '女侠', '军师',
    '刺客', '谋士', '武将', '医女', '琴师', '修仙者', '魔法师', '吸血鬼', '狼人', '妖族', '天师'
  ],
  '社会地位': ['名门正派', '世家子弟', '皇室后裔', '江湖散人', '隐世高人', '街头混混', '商界新贵', '落魄贵族', '宗门首席', '魔道至尊'],
  '职业技能': [
    '过目不忘', '黑客技术', '开锁', '格斗', '射击', '飙车', '医术', '毒术', '催眠', '占卜',
    '乐器精通', '多国语言', '社交牛逼', '撒娇', '演戏', '化妆', '家务全能', '机械维修', '荒野求生', '拆弹', '谈判', '心理侧写', '剑术', '易容'
  ],
  '经济状况': ['富裕', '中产', '普通', '拮据', '欠债', '神秘资金来源', '家族资助', '自己打拼'],
  '居住状态': ['独居', '合租', '住校', '住宫殿', '住客栈', '住别墅', '住贫民窟', '住移动居所'],
  '秘密身份': ['卧底', '间谍', '杀手', '线人', '私生子', '转世者', '改造人', '神秘组织成员', '隐姓埋名', '通缉犯'],
  '身份关键词': ['反差', '隐藏', '伪装', '神秘', '高贵', '落魄', '传奇', '危险', '迷人', '孤独', '野心', '克制'],
  '座驾': [
    '重机车', '超跑', '敞篷跑车', '越野车', '房车', '复古老爷车', '直升机', '私人游艇',
    '滑板', '轮滑', '自行车', '电动车', '地铁', '公交', '步行', '御剑飞行', '扫帚', '独角兽', '龙', '神兽座驾'
  ],

  // ===== 性格与心理 =====
  '性格特质': [
    '理性', '毒舌', '傲娇', '粘人', '外向', '内向', '温柔', '暴躁', '固执', '机灵',
    '嘴硬心软', '孤傲', '清冷', '洒脱', '隐忍', '狠辣', '忠诚', '多疑', '善良', '从容',
    '温润如玉', '淡漠', '疯狂', '魅惑', '高冷', '腹黑', '热血', '孤僻', '霸道', '邪魅猖狂'
  ],
  '情绪倾向': ['情绪稳定', '易怒', '易哭', '易笑', '情绪多变', '情感压抑', '情感外放', '冷静克制'],
  '社交方式': ['主动', '被动', '慢热', '自来熟', '回避', '讨好', '强势', '疏离', '圆滑', '耿直'],
  '思维与行为': ['逻辑怪', '感性直觉', '理想主义', '现实主义', '自律', '散漫', '冲动', '谨慎', '强迫症', '拖延症', '控制型'],
  '星座星象': [
    '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座',
    '紫微星', '天机星', '太阳星', '太阴星', '贪狼星', '破军星', '七杀星', '天煞孤星', '福星高照', '灾星转世', '圣灵星', '魔星'
  ],
  '癖好': [
    '收集口红', '收集球鞋', '收集手办', '收集唱片', '收集打火机', '收集玉佩', '收集折扇', '收集香料',
    '收集古籍', '收集兵器', '收集灵骨', '收集魔晶', '收集妖丹', '咬笔', '转笔', '摸下巴',
    '扶眼镜', '撩头发', '摩挲戒指', '喜欢雨声', '喜欢琴声', '喜欢寂静', '喜欢丝绸', '喜欢皮革',
    '喜欢金属', '喜欢微凉', '喜欢柔软', '喜欢红色', '喜欢黑色', '喜欢血色', '喜欢苦味', '喜欢酒香',
    '洁癖', '收集癖', '肌肤饥渴', '声控', '手控', '掌控欲', '依恋障碍', '窥探欲', '护短偏执', '喜欢顺毛', '咬人'
  ],
  '弱点': [
    '偏执', '嫉妒', '傲慢', '自卑', '控制欲', '逃避欲', '占有欲', '敏感', '多疑', '脆弱',
    '怕黑', '怕鬼', '恐高', '深海恐惧', '密集恐惧', '怕痛', '怕痒', '路痴', '脸盲', '音痴', '过敏', '容易害羞', '泪失禁', '恋爱脑', '没钱'
  ],
  '性格关键词': ['反差萌', '外冷内热', '嘴硬心软', '疯批美人', '温柔一刀', '清冷孤傲', '阳光阴郁', '毒舌善良', '禁欲克制', '病娇偏执'],

  // ===== 生活习性 =====
  '饮食偏好': [
    '无肉不欢', '素食', '重口味', '清淡', '甜食控', '咖啡因中毒', '海鲜爱好者', '面食党',
    '米饭党', '垃圾食品', '养生', '挑食', '大胃王', '小鸟胃', '只喝水', '爱吃辣', '爱吃酸', '爱吃苦', '黑暗料理', '零食当饭'
  ],
  '厌恶': [
    '讨厌昆虫', '讨厌香菜', '讨厌早起', '讨厌加班', '讨厌虚伪', '讨厌背叛', '讨厌等待', '讨厌噪音',
    '讨厌烟味', '讨厌榴莲', '讨厌数学', '讨厌运动', '讨厌社交', '讨厌被命令', '讨厌下雨天', '讨厌拥挤', '讨厌排队', '讨厌熊孩子', '讨厌绿茶'
  ]
};

const THEMES = [
  { id: 'blue', name: '🌿 静谧蓝白' },
  { id: 'green', name: '🍵 鼠尾草绿' },
  { id: 'purple', name: '🌸 暮山灰紫' },
  { id: 'warm', name: '🍂 暖杏米白' }
];

let ctx, settings, isOpen = false, isApiModalOpen = false;

function log(...a) { console.debug(`[${EXT}]`, ...a); }
function toast(m, t = 'info') { try { (ctx?.toastr || window.toastr)?.[t]?.(m); } catch {} }
function esc(s = '') { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function ensureSettings() {
  const root = ctx.extensionSettings || (ctx.extensionSettings = {});
  settings = {
    theme: 'blue',
    zoom: 100,
    openCategory: '基本信息',
    activeSubTab: '基本设定',
    selectedTags: {},
    worldName: '',
    personaName: '',
    identity: '',
    customReq: '',
    generated: '',
    // API & 预设相关
    apiMode: 'st', // 'st' (酒馆原生) 或 'custom' (副API)
    customApiUrl: 'https://api.openai.com/v1/chat/completions',
    customApiKey: '',
    customModel: 'gpt-4o-mini',
    selectedPreset: '',
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
    toggleApiModal(false);
  }
}

function toggleApiModal(show) {
  const apiModal = document.querySelector('#upw-api-submodal');
  if (!apiModal) return;
  isApiModalOpen = typeof show === 'boolean' ? show : !isApiModalOpen;
  apiModal.style.display = isApiModalOpen ? 'flex' : 'none';
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

// 获取酒馆自带的全部预设列表
async function listPresets() {
  const presets = [];
  try {
    // 兼容酒馆原生预设获取机制
    if (ctx.getContextPresets) {
      const p = await ctx.getContextPresets();
      if (Array.isArray(p)) presets.push(...p);
    }
    if (ctx.powerUser?.context_presets) {
      presets.push(...Object.keys(ctx.powerUser.context_presets));
    }
    const r = await fetch('/api/presets/list', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data)) presets.push(...data);
    }
  } catch {}
  return [...new Set(presets.filter(Boolean))];
}

function render() {
  const modal = document.querySelector('#upw-modal-wrapper');
  if (!modal) return;

  modal.className = `upw-modal-wrapper theme-${settings.theme} ${isOpen ? 'visible' : ''}`;
  const win = modal.querySelector('.upw-window');
  if (win) {
    win.style.transform = `scale(${(settings.zoom || 100) / 100})`;
  }

  const curSub = settings.activeSubTab || '基本设定';

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
        <!-- ⚙️ API与预设 配置小按钮 -->
        <button id="upw-open-api-btn" class="upw-btn-compact-api" title="设置 API 与预设">⚙️ API与预设</button>
        <select id="upw-theme" class="upw-compact-select">
          ${THEMES.map(th => `<option value="${th.id}" ${th.id === settings.theme ? 'selected' : ''}>${th.name}</option>`).join('')}
        </select>
        <select id="upw-zoom" class="upw-compact-select">
          ${[80, 90, 100, 110].map(z => `<option value="${z}" ${z === settings.zoom ? 'selected' : ''}>${z}%</option>`).join('')}
        </select>
        <button id="upw-close" class="upw-close-icon">✕</button>
      </div>
    </div>

    <!-- 主体双栏 -->
    <div class="upw-body-split">
      <aside class="upw-sidebar-accordion">
        ${MENU_TREE.map(group => {
          const isOpen = settings.openCategory === group.name;
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

    <!-- API与预设 独立弹层 -->
    <div id="upw-api-submodal" class="upw-submodal-mask" style="display: none;">
      <div class="upw-submodal-card">
        <div class="upw-submodal-head">
          <span>⚙️ API 来源与酒馆预设配置</span>
          <button id="upw-submodal-close" class="upw-close-icon">✕</button>
        </div>
        <div class="upw-submodal-body">
          <div class="upw-form-item">
            <span>API 模式选择：</span>
            <div class="upw-radio-group">
              <label><input type="radio" name="upw_api_mode" value="st" ${settings.apiMode === 'st' ? 'checked' : ''}> 跟随酒馆当前主 API</label>
              <label><input type="radio" name="upw_api_mode" value="custom" ${settings.apiMode === 'custom' ? 'checked' : ''}> 自定义独立副 API</label>
            </div>
          </div>

          <div id="upw-custom-api-box" style="display: ${settings.apiMode === 'custom' ? 'block' : 'none'};">
            <label class="upw-form-item">
              <span>自定义 API URL (兼容 OpenAI 规范)：</span>
              <input id="upw-api-url" class="upw-input-field" value="${esc(settings.customApiUrl)}" placeholder="https://api.openai.com/v1/chat/completions">
            </label>
            <label class="upw-form-item">
              <span>API Key：</span>
              <input id="upw-api-key" type="password" class="upw-input-field" value="${esc(settings.customApiKey)}" placeholder="sk-...">
            </label>
            <label class="upw-form-item">
              <span>Model 模型代号：</span>
              <input id="upw-api-model" class="upw-input-field" value="${esc(settings.customModel)}" placeholder="例如：gpt-4o, claude-3-5-sonnet">
            </label>
          </div>

          <label class="upw-form-item">
            <span>应用酒馆预设 (Presets)：</span>
            <select id="upw-preset-select" class="upw-input-field">
              <option value="">跟随当前角色默认预设</option>
            </select>
          </label>
        </div>
        <div class="upw-submodal-foot">
          <button id="upw-api-save" class="upw-main-action">保存配置</button>
        </div>
      </div>
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

  // API 弹窗控制
  win.querySelector('#upw-open-api-btn')?.addEventListener('click', () => toggleApiModal(true));
  win.querySelector('#upw-submodal-close')?.addEventListener('click', () => toggleApiModal(false));

  win.querySelectorAll('input[name="upw_api_mode"]').forEach(radio => {
    radio.addEventListener('change', e => {
      settings.apiMode = e.target.value;
      const customBox = win.querySelector('#upw-custom-api-box');
      if (customBox) customBox.style.display = settings.apiMode === 'custom' ? 'block' : 'none';
    });
  });

  win.querySelector('#upw-api-save')?.addEventListener('click', () => {
    settings.customApiUrl = win.querySelector('#upw-api-url')?.value?.trim() || '';
    settings.customApiKey = win.querySelector('#upw-api-key')?.value?.trim() || '';
    settings.customModel = win.querySelector('#upw-api-model')?.value?.trim() || '';
    settings.selectedPreset = win.querySelector('#upw-preset-select')?.value || '';
    persist();
    toggleApiModal(false);
    toast('API 与预设配置已保存', 'success');
  });

  // 加载酒馆预设列表
  const presetSel = win.querySelector('#upw-preset-select');
  if (presetSel) {
    listPresets().then(list => {
      presetSel.innerHTML = '<option value="">跟随当前角色默认预设</option>' + list.map(p => `<option value="${esc(p)}" ${p === settings.selectedPreset ? 'selected' : ''}>${esc(p)}</option>`).join('');
    });
  }

  // 大类与子项点击
  win.querySelectorAll('.upw-acc-header').forEach(header => {
    header.addEventListener('click', () => {
      const g = header.dataset.group;
      settings.openCategory = settings.openCategory === g ? '' : g;
      persist();
      render();
    });
  });

  win.querySelectorAll('.upw-sub-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      settings.activeSubTab = btn.dataset.sub;
      persist();
      render();
    });
  });

  // 选项方块勾选
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

  ['#upw-name', '#upw-identity', '#upw-custom-req', '#upw-output'].forEach(selector => {
    win.querySelector(selector)?.addEventListener('input', e => {
      if (selector === '#upw-name') settings.personaName = e.target.value;
      if (selector === '#upw-identity') settings.identity = e.target.value;
      if (selector === '#upw-custom-req') settings.customReq = e.target.value;
      if (selector === '#upw-output') settings.generated = e.target.value;
      persist();
    });
  });

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

  win.querySelector('#upw-btn-clear')?.addEventListener('click', () => {
    settings.selectedTags = {};
    persist();
    render();
    toast('已清空所选标签', 'info');
  });

  win.querySelector('#upw-btn-random')?.addEventListener('click', () => {
    const randomPicks = ['性别', '种族', '体型', '发色', '发型', '脸型', '眼睛', '职业身份', '性格特质', '衣服风格'];
    randomPicks.forEach(cat => {
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
Create one player USER persona matching the chosen options below.

Rules:
1. All persona schema keys MUST remain in English. The descriptive values must be natural Chinese.
2. Seamlessly integrate the Chosen Features into the persona.

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

// 独立副 API 发生请求
async function requestCustomApi(prompt) {
  if (!settings.customApiUrl) throw Error('请在⚙️设置中填写自定义 API URL');
  
  const headers = { 'Content-Type': 'application/json' };
  if (settings.customApiKey) headers['Authorization'] = `Bearer ${settings.customApiKey}`;

  const res = await fetch(settings.customApiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: settings.customModel || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert character architect.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8
    })
  });

  if (!res.ok) throw Error(`副 API 请求失败: HTTP ${res.status}`);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}

async function generatePersona() {
  const btn = document.querySelector('#upw-btn-gen');
  if (btn) btn.disabled = true;
  try {
    const prompt = buildPrompt();
    let out = '';

    if (settings.apiMode === 'custom') {
      toast('正在通过自定义副 API 生成人设…');
      out = await requestCustomApi(prompt);
    } else {
      const gen = ctx.generateQuietPrompt || ctx.generateRaw;
      if (typeof gen !== 'function') throw Error('未找到酒馆可用的 AI 生成接口');
      toast('正在通过酒馆主 API 生成人设…');

      const options = { quietPrompt: prompt, quietToLoud: false, skipWIAN: true };
      // 若选择了预设，传递给生成参数
      if (settings.selectedPreset) options.preset = settings.selectedPreset;

      if (ctx.generateQuietPrompt) out = await ctx.generateQuietPrompt(options);
      else out = await ctx.generateRaw({ prompt, quietToLoud: false, trimNames: true });
    }

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
