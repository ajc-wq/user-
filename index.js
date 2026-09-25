/* User Persona WorldForge - v1.7.2 (Fix reasoning_effort Validation Error) */
const EXT = 'user-persona-worldforge', VERSION = '1.7.2';

const MENU_TREE = [
  {
    name: '世界观',
    subs: ['世界体系选择']
  },
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
    subs: ['时代风格', '季节场景', '服装部件', '配饰', '我的专属衣柜']
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
  },
  {
    name: '设定补充',
    subs: ['自由设定']
  }
];

const WORLDVIEW_HIDDEN_RULES = {
  '现代世界观': '时代背景为现代都市。遵守现实科技、法律框架、社会阶级与常理，人设应具有现代生活质感与合理职业逻辑。',
  '古代世界观': '时代背景为古代封建社会。遵守礼法规矩、嫡庶尊卑、江湖与朝堂架构，语言与生活细节需符合古风历史底蕴。',
  '修仙世界观': '背景为东方修真玄幻。包含灵根资质、境界划分（练气/筑基/金丹/元婴等）、宗门世家、功法法宝、弱肉强食与因果天道法则。',
  '末世废土': '背景为末日灾变后的废土世界。资源极度匮乏、辐射或异变横行、秩序崩塌，充满生存博弈、聚落营地、雇佣军与遗迹掠夺规则。',
  'ABO世界观': '包含Alpha/Beta/Omega第二性别生理与社会设定。严格遵守信息素诱导、发情期与易感期、标记法则、抑制剂、腺体以及阶级权力结构。',
  '哨兵向导': '包含哨兵（五感强化、高战力、精神图景易过载狂暴）与向导（精神疏导、情绪抚慰、共感建立）设定，严格遵守精神体伴生、向导素与结合热匹配机制。',
  '虫族世界观': '包含虫族社会架构（雄少雌多、等级严苛）。严格遵循精神力安抚、骨翼、虫纹、精神海暴动以及雄保会/军雌支配与依附关系。'
};

const TAG_DATABASE = {
  '世界体系选择': [
    '现代世界观', '古代世界观', '修仙世界观', '末世废土', 'ABO世界观', '哨兵向导', '虫族世界观', '读取当前角色卡世界观'
  ],

  '性别': ['女', '男', '双性', '中性', '无性别', '跨性别', '泛性别'],
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

  '时代风格': [
    '现代·极简风', '现代·千金名媛风', '现代·老钱风', '现代·街头潮牌', '现代·纯欲风', '现代·辣妹工装', '现代·商务通勤', '现代·学院制服',
    '民国·旗袍风情', '民国·洋装名媛', '民国·长衫文人', '民国·军阀正装', '民国·短袄百褶裙',
    '古代·文雅儒衫', '古代·华贵锦袍', '古代·江湖轻劲装', '古代·仙侠飘逸纱', '古代·魔道暗纹袍', '古代·素色麻裙',
    '未来·机能机甲', '未来·赛博霓虹', '未来·废土流浪', '未来·星际舰队服', '哥特暗黑', '洛丽塔', '波西米亚'
  ],
  '季节场景': [
    '春季轻薄风衣', '夏季清凉吊带', '秋季慵懒针织', '冬季加厚羊绒大衣', '冬日毛领羽绒',
    '丝绸睡衣', '蕾丝家居服', '度假比基尼', '保守连体泳衣',
    '高定晚礼服', '典雅鱼尾裙', '正式宴会西装', '燕尾服', '休闲运动服', '瑜伽服'
  ],
  '服装部件': [
    '白衬衫', '宽松卫衣', '真丝吊带', '短款针织衫', '西装外套', '长款皮衣',
    '高腰阔腿裤', '直筒牛仔裤', '工装束脚裤', '百褶短裙', '开叉长裙', '包臀裙',
    '马丁靴', '尖头细高跟', '帆布鞋', '复古乐福鞋', '长筒皮靴', '绣花布鞋', '云靴'
  ],
  '配饰': [
    '黑框眼镜', '金丝眼镜', '墨镜', 'choker', '项圈', '珍珠项链', '十字架', '佛珠',
    '戒指', '手镯', '脚链', '腿环', '机械表', '领带夹', '袖扣', '抑制颈环', '止咬器',
    '发夹', '发带', '贝雷帽', '棒球帽', '丝巾', '玉冠', '金冠', '玉簪', '步摇', '流苏簪', '折扇', '玉佩', '香囊'
  ],

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

let ctx, settings, isOpen = false, isSettingsOpen = false;

function log(...a) { console.debug(`[${EXT}]`, ...a); }
function toast(m, t = 'info') { try { (ctx?.toastr || window.toastr)?.[t]?.(m); } catch {} }
function esc(s = '') { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function uid() { return Math.random().toString(36).slice(2, 9); }

function ensureSettings() {
  const root = ctx.extensionSettings || (ctx.extensionSettings = {});
  settings = {
    theme: 'blue',
    zoom: 100,
    openCategory: '世界观',
    activeSubTab: '世界体系选择',
    selectedTags: {},
    customTagsPool: {},
    worldName: '',
    personaName: '',
    identity: '',
    customReq: '',
    existingPersona: '',
    customExtraNotes: '',
    generated: '',
    currentOutfitPreview: '',
    wardrobeList: [],
    apiMode: 'st',
    customApiUrl: 'https://api.openai.com/v1/chat/completions',
    customApiKey: '',
    customModel: 'gpt-4o-mini',
    selectedPreset: '',
    ...(root[EXT] || {})
  };
  if (!Array.isArray(settings.wardrobeList)) settings.wardrobeList = [];
  if (!settings.customTagsPool) settings.customTagsPool = {};
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
    toggleSettingsPanel(false);
  }
}

function toggleSettingsPanel(show) {
  const panel = document.querySelector('#upw-settings-modal');
  if (!panel) return;
  isSettingsOpen = typeof show === 'boolean' ? show : !isSettingsOpen;
  panel.style.display = isSettingsOpen ? 'flex' : 'none';
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

async function listPresets() {
  const presets = [];
  try {
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

async function extractCurrentCharWorldLore() {
  try {
    const c = ctx?.characters?.[ctx?.characterId];
    if (!c) return '';
    const ext = c?.data?.extensions || c?.extensions || {};
    const worldNames = [];
    if (ext.world) worldNames.push(ext.world);
    if (Array.isArray(ext.worlds)) worldNames.push(...ext.worlds);
    if (ctx?.chatMetadata?.world_info) worldNames.push(ctx.chatMetadata.world_info);
    
    const unique = [...new Set(worldNames.filter(Boolean))];
    if (!unique.length) return '';

    let combined = '';
    for (const wn of unique) {
      const r = await fetch('/api/worldinfo/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: wn })
      });
      if (r.ok) {
        const d = await r.json();
        const entries = Object.values(d?.entries || {});
        for (const e of entries) {
          if (e.disable !== true && e.content) {
            combined += `\n[${e.comment || e.name || 'Lore'}]: ${e.content}`;
          }
        }
      }
    }
    return combined.trim();
  } catch {
    return '';
  }
}

function renderChipGridWithCustom(curSub) {
  const baseList = TAG_DATABASE[curSub] || [];
  const customList = settings.customTagsPool[curSub] || [];
  const fullList = [...baseList, ...customList];
  const curSelected = settings.selectedTags[curSub] || [];

  return `
    <div class="upw-grid-chips">
      ${fullList.map(tag => {
        const isAct = curSelected.includes(tag);
        const isCustom = customList.includes(tag);
        return `
          <button class="upw-chip-btn ${isAct ? 'active' : ''} ${isCustom ? 'is-custom' : ''}" data-cat="${esc(curSub)}" data-tag="${esc(tag)}">
            ${esc(tag)}${isCustom ? '<small class="upw-tag-mark">(自)</small>' : ''}
          </button>
        `;
      }).join('')}

      <button class="upw-chip-btn upw-chip-add-btn" data-trigger-add="${esc(curSub)}">➕ 自定义</button>
    </div>

    <div id="upw-add-box-${esc(curSub)}" class="upw-custom-input-bar" style="display: none;">
      <input type="text" id="upw-custom-text-${esc(curSub)}" class="upw-input-field" placeholder="输入自定义${esc(curSub)}设定，如：机械改造手臂、禁欲系领主...">
      <button class="upw-mini-btn primary" data-confirm-add="${esc(curSub)}">确定添加</button>
      <button class="upw-mini-btn" data-cancel-add="${esc(curSub)}">取消</button>
    </div>
  `;
}

function render() {
  const modal = document.querySelector('#upw-modal-wrapper');
  if (!modal) return;

  modal.className = `upw-modal-wrapper theme-${settings.theme} ${isOpen ? 'visible' : ''}`;
  const win = modal.querySelector('.upw-window');
  if (win) {
    win.style.transform = `scale(${(settings.zoom || 100) / 100})`;
  }

  const curSub = settings.activeSubTab || '世界体系选择';

  let rightContentHtml = '';

  if (curSub === '人设预览') {
    rightContentHtml = `
      <div class="upw-tab-header">
        <div class="upw-tab-title">✨ 人设生成预览与编辑工坊</div>
        <div class="upw-tab-hint">可在下方自由编辑润色人设文本，支持一键复制，或直接导入酒馆新建为独立 Persona！</div>
      </div>
      <div class="upw-form-grid">
        <div class="upw-preview-tools">
          <label class="upw-preview-name-label">
            <span>人设名字：</span>
            <input id="upw-preview-name" class="upw-input-field" value="${esc(settings.personaName || 'WorldForge Persona')}" placeholder="输入 Persona 名字">
          </label>
          <div class="upw-preview-btns">
            <button id="upw-preview-copy" class="upw-mini-btn" title="复制人设文本">📋 复制人设</button>
            <button id="upw-preview-import" class="upw-mini-btn apply" title="直接导入酒馆新建Persona">📥 导入为酒馆新人设</button>
            <button id="upw-preview-clear" class="upw-mini-btn del" title="清空文本框">清空</button>
          </div>
        </div>
        <textarea id="upw-output" class="upw-output-box" spellcheck="false" placeholder="点击下方“✨ 生成 USER 人设”后，人设将呈现在这里。你也可以直接在此粘贴或自由修改人设内容…">${esc(settings.generated)}</textarea>
      </div>
    `;
  } else if (curSub === '自由设定') {
    rightContentHtml = `
      <div class="upw-tab-header">
        <div class="upw-tab-title">📝 设定补充（自由长文本输入）</div>
        <div class="upw-tab-hint">在这里可以自由输入任何额外的背景设定、隐藏暗线、专属梗或者复杂约束，AI 生成时会作为重点依据融入。</div>
      </div>
      <div class="upw-form-grid">
        <textarea id="upw-extra-notes" class="upw-extra-notes-box" placeholder="在这里输入你的长篇补充设定（例如独家身世、专属神力法则、情感羁绊、说话口癖暗号等）…">${esc(settings.customExtraNotes)}</textarea>
      </div>
    `;
  } else if (['时代风格', '季节场景', '服装部件', '配饰'].includes(curSub)) {
    rightContentHtml = `
      <div class="upw-tab-header">
        <div class="upw-tab-title">✨ ${esc(curSub)}</div>
      </div>
      ${renderChipGridWithCustom(curSub)}

      <div class="upw-outfit-panel">
        <div class="upw-outfit-panel-head">
          <div class="upw-outfit-panel-title">👗 服装生成工坊（可脱离人设单独生成整套）</div>
          <div class="upw-outfit-panel-actions">
            <button id="upw-btn-gen-outfit" class="upw-mini-btn primary">✨ 单独生成这套服装</button>
            ${settings.currentOutfitPreview ? `<button id="upw-btn-save-wardrobe" class="upw-mini-btn love">❤️ 收藏进衣柜</button>` : ''}
          </div>
        </div>
        <textarea id="upw-outfit-preview" class="upw-outfit-textarea" placeholder="选中你喜欢的时代风格、季节场景或部件后，点击上方“单独生成这套服装”，整套穿搭设计将在这里实时呈现…">${esc(settings.currentOutfitPreview)}</textarea>
      </div>
    `;
  } else if (curSub === '我的专属衣柜') {
    const items = settings.wardrobeList || [];
    rightContentHtml = `
      <div class="upw-tab-header">
        <div class="upw-tab-title">🚪 我的专属衣柜（共 ${items.length} 套收藏）</div>
        <div class="upw-tab-hint">不管人设如何重置或清空，衣柜收藏均永久留存，随时可一键套用！</div>
      </div>
      <div class="upw-wardrobe-grid">
        ${items.length === 0 ? `
          <div class="upw-empty-box">衣柜空空如也~ 在“服装与装束”里生成喜欢的穿搭后，点击“❤️ 收藏进衣柜”即可存放在这里！</div>
        ` : items.map(item => `
          <div class="upw-wardrobe-card">
            <div class="upw-wardrobe-head">
              <span class="upw-wardrobe-name">${esc(item.name)}</span>
              <span class="upw-wardrobe-time">${esc(item.time)}</span>
            </div>
            ${item.tags?.length ? `<div class="upw-wardrobe-tags">${item.tags.map(t => `<span class="upw-mini-tag">${esc(t)}</span>`).join('')}</div>` : ''}
            <div class="upw-wardrobe-body">${esc(item.content)}</div>
            <div class="upw-wardrobe-foot">
              <button class="upw-mini-btn apply" data-apply-wardrobe="${esc(item.id)}">🪄 套用至当前人设</button>
              <button class="upw-mini-btn del" data-del-wardrobe="${esc(item.id)}">删除</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (TAG_DATABASE[curSub]) {
    rightContentHtml = `
      <div class="upw-tab-header">
        <div class="upw-tab-title">✨ ${esc(curSub)}</div>
      </div>
      ${renderChipGridWithCustom(curSub)}
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
        <div class="upw-form-row">
          <label class="upw-form-item" style="flex: 1;">
            <span>人设名称：</span>
            <input id="upw-name" class="upw-input-field" value="${esc(settings.personaName)}" placeholder="例如：云岚">
          </label>
          <label class="upw-form-item" style="flex: 1;">
            <span>世界内身份：</span>
            <input id="upw-identity" class="upw-input-field" value="${esc(settings.identity)}" placeholder="例如：外门弟子 / 财阀千金">
          </label>
        </div>
        <label class="upw-form-item">
          <span>💡 继写/已有的人设参考（选填，用于在此基础上扩写优化）：</span>
          <textarea id="upw-existing" class="upw-input-field" rows="3" placeholder="如果已有写好的旧人设、半成品草稿，粘贴到这里，生成时AI将以此为基底进行继承与扩充！">${esc(settings.existingPersona)}</textarea>
        </label>
        <label class="upw-form-item">
          <span>补充描述或约束要求：</span>
          <textarea id="upw-custom-req" class="upw-input-field" rows="3" placeholder="例如：性格偏清冷，不主动与人交际，保留凡人成长空间...">${esc(settings.customReq)}</textarea>
        </label>
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
        <select id="upw-theme" class="upw-compact-select">
          ${THEMES.map(th => `<option value="${th.id}" ${th.id === settings.theme ? 'selected' : ''}>${th.name}</option>`).join('')}
        </select>
        <button id="upw-open-settings" class="upw-icon-btn" title="设置（缩放/预设/API）">⚙️</button>
        <button id="upw-close" class="upw-close-icon" title="关闭窗口">✕</button>
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
                      ${sub === '我的专属衣柜' ? `<small>${(settings.wardrobeList || []).length}</small>` : (subCount > 0 ? `<small>${subCount}</small>` : '')}
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

    <!-- ⚙️ 统一设置模态弹窗 -->
    <div id="upw-settings-modal" class="upw-submodal-mask" style="display: none;">
      <div class="upw-submodal-card">
        <div class="upw-submodal-head">
          <span>⚙️ 助手设置中心</span>
          <button id="upw-settings-close" class="upw-close-icon">✕</button>
        </div>
        <div class="upw-submodal-body">
          <div class="upw-setting-section">
            <div class="upw-section-title">🔍 界面大小调节</div>
            <div class="upw-zoom-grid">
              ${[80, 90, 100, 110, 120].map(z => `
                <button class="upw-zoom-btn ${settings.zoom === z ? 'active' : ''}" data-zoom="${z}">${z}%</button>
              `).join('')}
            </div>
          </div>

          <div class="upw-setting-section">
            <div class="upw-section-title">📜 文本生成预设 (Preset)</div>
            <select id="upw-preset-select" class="upw-input-field">
              <option value="">跟随当前酒馆默认激活的预设</option>
            </select>
          </div>

          <div class="upw-setting-section">
            <div class="upw-section-title">🌐 AI 接口配置 (API)</div>
            <div class="upw-radio-group">
              <label><input type="radio" name="upw_api_mode" value="st" ${settings.apiMode === 'st' ? 'checked' : ''}> 跟随酒馆原生 API</label>
              <label><input type="radio" name="upw_api_mode" value="custom" ${settings.apiMode === 'custom' ? 'checked' : ''}> 独立副 API</label>
            </div>

            <div id="upw-custom-api-box" class="upw-sub-form" style="display: ${settings.apiMode === 'custom' ? 'block' : 'none'};">
              <label class="upw-form-item">
                <span>API 接口地址 (URL)：</span>
                <input id="upw-api-url" class="upw-input-field" value="${esc(settings.customApiUrl)}" placeholder="https://api.openai.com/v1/chat/completions">
              </label>
              <label class="upw-form-item">
                <span>API 密钥 (Key)：</span>
                <input id="upw-api-key" type="password" class="upw-input-field" value="${esc(settings.customApiKey)}" placeholder="sk-...">
              </label>
              <label class="upw-form-item">
                <span>模型代号 (Model)：</span>
                <input id="upw-api-model" class="upw-input-field" value="${esc(settings.customModel)}" placeholder="例如：gpt-4o, claude-3-5-sonnet">
              </label>
            </div>
          </div>
        </div>
        <div class="upw-submodal-foot">
          <button id="upw-settings-save" class="upw-main-action">保存配置</button>
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

  win.querySelector('#upw-open-settings')?.addEventListener('click', () => toggleSettingsPanel(true));
  win.querySelector('#upw-settings-close')?.addEventListener('click', () => toggleSettingsPanel(false));

  win.querySelectorAll('.upw-zoom-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const z = Number(btn.dataset.zoom);
      settings.zoom = z;
      persist();
      win.style.transform = `scale(${z / 100})`;
      win.querySelectorAll('.upw-zoom-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  win.querySelectorAll('input[name="upw_api_mode"]').forEach(radio => {
    radio.addEventListener('change', e => {
      settings.apiMode = e.target.value;
      const customBox = win.querySelector('#upw-custom-api-box');
      if (customBox) customBox.style.display = settings.apiMode === 'custom' ? 'block' : 'none';
    });
  });

  win.querySelector('#upw-settings-save')?.addEventListener('click', () => {
    settings.customApiUrl = win.querySelector('#upw-api-url')?.value?.trim() || '';
    settings.customApiKey = win.querySelector('#upw-api-key')?.value?.trim() || '';
    settings.customModel = win.querySelector('#upw-api-model')?.value?.trim() || '';
    settings.selectedPreset = win.querySelector('#upw-preset-select')?.value || '';
    persist();
    toggleSettingsPanel(false);
    toast('设置已保存', 'success');
  });

  const presetSel = win.querySelector('#upw-preset-select');
  if (presetSel) {
    listPresets().then(list => {
      presetSel.innerHTML = '<option value="">跟随当前酒馆默认激活的预设</option>' + list.map(p => `<option value="${esc(p)}" ${p === settings.selectedPreset ? 'selected' : ''}>${esc(p)}</option>`).join('');
    });
  }

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

  win.querySelectorAll('.upw-chip-btn:not(.upw-chip-add-btn)').forEach(chip => {
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

  win.querySelectorAll('[data-trigger-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.triggerAdd;
      const box = win.querySelector(`#upw-add-box-${cat}`);
      if (box) {
        box.style.display = 'flex';
        const input = win.querySelector(`#upw-custom-text-${cat}`);
        input?.focus();
      }
    });
  });

  win.querySelectorAll('[data-cancel-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cancelAdd;
      const box = win.querySelector(`#upw-add-box-${cat}`);
      if (box) box.style.display = 'none';
    });
  });

  win.querySelectorAll('[data-confirm-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.confirmAdd;
      const input = win.querySelector(`#upw-custom-text-${cat}`);
      const val = input?.value?.trim();
      if (!val) return toast('请输入自定义标签内容', 'warning');

      if (!settings.customTagsPool[cat]) settings.customTagsPool[cat] = [];
      if (!settings.customTagsPool[cat].includes(val)) {
        settings.customTagsPool[cat].push(val);
      }
      if (!settings.selectedTags[cat]) settings.selectedTags[cat] = [];
      if (!settings.selectedTags[cat].includes(val)) {
        settings.selectedTags[cat].push(val);
      }

      persist();
      render();
      toast(`已添加自定义标签：“${val}”`, 'success');
    });
  });

  win.querySelector('#upw-preview-name')?.addEventListener('input', e => {
    settings.personaName = e.target.value;
    persist();
  });

  win.querySelector('#upw-preview-copy')?.addEventListener('click', async () => {
    const text = (win.querySelector('#upw-output')?.value || settings.generated || '').trim();
    if (!text) return toast('当前还没有生成或编写人设文本', 'warning');
    await navigator.clipboard?.writeText(text);
    toast('人设文本已成功复制到剪贴板！', 'success');
  });

  win.querySelector('#upw-preview-import')?.addEventListener('click', importPersona);

  win.querySelector('#upw-preview-clear')?.addEventListener('click', () => {
    settings.generated = '';
    const out = win.querySelector('#upw-output');
    if (out) out.value = '';
    persist();
    toast('已清空当前人设文本', 'info');
  });

  win.querySelector('#upw-extra-notes')?.addEventListener('input', e => {
    settings.customExtraNotes = e.target.value;
    persist();
  });

  win.querySelector('#upw-outfit-preview')?.addEventListener('input', e => {
    settings.currentOutfitPreview = e.target.value;
    persist();
  });

  win.querySelector('#upw-btn-gen-outfit')?.addEventListener('click', generateSingleOutfit);

  win.querySelector('#upw-btn-save-wardrobe')?.addEventListener('click', () => {
    const content = (settings.currentOutfitPreview || '').trim();
    if (!content) return toast('当前还没有生成或编写服装内容哦', 'warning');

    const styleTags = [
      ...(settings.selectedTags['时代风格'] || []),
      ...(settings.selectedTags['季节场景'] || []),
      ...(settings.selectedTags['服装部件'] || [])
    ];

    const newSuit = {
      id: uid(),
      name: styleTags[0] ? `${styleTags[0]} 穿搭` : `定制穿搭 #${settings.wardrobeList.length + 1}`,
      tags: styleTags.slice(0, 4),
      content: content,
      time: new Date().toLocaleDateString()
    };

    settings.wardrobeList.unshift(newSuit);
    persist();
    render();
    toast('已永久收藏至我的衣柜！', 'success');
  });

  win.querySelectorAll('[data-apply-wardrobe]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.applyWardrobe;
      const suit = (settings.wardrobeList || []).find(x => x.id === id);
      if (!suit) return;
      settings.currentOutfitPreview = suit.content;
      settings.customReq = (settings.customReq ? settings.customReq + '\n' : '') + `【穿搭方案指定】：${suit.content}`;
      persist();
      toast(`已套用“${suit.name}”至人设约束！`, 'success');
    });
  });

  win.querySelectorAll('[data-del-wardrobe]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.delWardrobe;
      settings.wardrobeList = (settings.wardrobeList || []).filter(x => x.id !== id);
      persist();
      render();
      toast('已从衣柜移出该收藏', 'info');
    });
  });

  ['#upw-name', '#upw-identity', '#upw-custom-req', '#upw-existing', '#upw-output'].forEach(selector => {
    win.querySelector(selector)?.addEventListener('input', e => {
      if (selector === '#upw-name') settings.personaName = e.target.value;
      if (selector === '#upw-identity') settings.identity = e.target.value;
      if (selector === '#upw-custom-req') settings.customReq = e.target.value;
      if (selector === '#upw-existing') settings.existingPersona = e.target.value;
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
    settings.currentOutfitPreview = '';
    persist();
    render();
    toast('已清空所选标签（衣柜、自定义项与补充设定依然完好保存）', 'info');
  });

  win.querySelector('#upw-btn-random')?.addEventListener('click', () => {
    const randomPicks = ['性别', '种族', '体型', '发色', '发型', '脸型', '眼睛', '职业身份', '性格特质', '时代风格'];
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

function buildOutfitOnlyPrompt() {
  const outfitPicks = [];
  ['时代风格', '季节场景', '服装部件', '配饰'].forEach(cat => {
    if (settings.selectedTags[cat]?.length) {
      outfitPicks.push(`${cat}: ${settings.selectedTags[cat].join('、')}`);
    }
  });

  const worldviews = settings.selectedTags['世界体系选择'] || [];

  return `You are a high fashion stylist and character costume designer.
Design ONE comprehensive, vivid, aesthetic outfit ensemble based on the chosen keywords.

World Context: ${worldviews.join('、') || '常规现代'}
Costume Keywords:
${outfitPicks.length ? outfitPicks.join('\n') : '由你设计一套极具美感与协调感的完整服装套组'}

Requirements:
1. Output in natural Chinese.
2. Structure the description into:
   - 【整体风格与配色】
   - 【上装与外袍】
   - 【下装与裙身】
   - 【鞋履与细节配件】
   - 【随身配饰与氛围感】
3. Describe material textures, silhouette, tailoring cuts, and aesthetic vibe clearly.

Return ONLY the outfit description directly.`;
}

// 核心自适应生成层：解决 reasoning_effort 强校验与 502 错误
async function executeGeneration(prompt) {
  if (settings.apiMode === 'custom') {
    return await requestCustomApi(prompt);
  }

  // 1. 尝试使用酒馆原生静默生成，传入受控的 reasoning_effort 参数规避校验拦截
  if (typeof ctx.generateQuietPrompt === 'function') {
    try {
      const options = {
        quietPrompt: prompt,
        quietToLoud: false,
        skipWIAN: true,
        // 传递合法白名单参数，防止后端报 'reasoning_effort must be one of...' 错误
        reasoning_effort: 'medium',
        extra_body: {
          reasoning_effort: 'medium'
        }
      };
      if (settings.selectedPreset) options.preset = settings.selectedPreset;
      const res = await ctx.generateQuietPrompt(options);
      if (res) return String(res);
    } catch (err) {
      console.warn(`[${EXT}] generateQuietPrompt failed (${err.message}), trying direct ST proxy fallback...`);
    }
  }

  // 2. 降级兜底：通过酒馆的代理端点直接请求，完全净化冲突参数
  try {
    const rawRes = await fetch('/api/backends/chat-completions/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        stream: false,
        reasoning_effort: 'medium'
      })
    });
    if (rawRes.ok) {
      const data = await rawRes.json();
      const content = data?.choices?.[0]?.message?.content || data?.content || '';
      if (content) return String(content);
    }
  } catch (err2) {
    console.warn(`[${EXT}] ST proxy fallback failed, trying generateRaw...`, err2);
  }

  // 3. 最终兜底：generateRaw
  if (typeof ctx.generateRaw === 'function') {
    return await ctx.generateRaw({
      prompt: prompt,
      quietToLoud: false,
      trimNames: true
    });
  }

  throw Error('模型接口参数校验拦截 (502)，建议前往右上角⚙️开启“独立副API”填入端点直接生成');
}

async function generateSingleOutfit() {
  const btn = document.querySelector('#upw-btn-gen-outfit');
  if (btn) btn.disabled = true;
  try {
    toast('正在单独为你设计全套服装穿搭…');
    const prompt = buildOutfitOnlyPrompt();
    const out = await executeGeneration(prompt);

    settings.currentOutfitPreview = String(out || '').trim();
    persist();
    render();
    toast('整套穿搭方案生成完毕！可点击收藏进衣柜', 'success');
  } catch (e) {
    console.error(e);
    toast(`服装生成失败：${e.message}`, 'error');
  } finally {
    if (btn) btn.disabled = false;
  }
}

async function buildPrompt() {
  const chosenList = [];
  for (const cat in settings.selectedTags) {
    if (cat === '世界体系选择') continue;
    if (settings.selectedTags[cat]?.length) {
      chosenList.push(`${cat}: ${settings.selectedTags[cat].join('、')}`);
    }
  }

  const selectedWorldviews = settings.selectedTags['世界体系选择'] || [];
  let hiddenWorldviewConstraints = [];

  for (const wv of selectedWorldviews) {
    if (WORLDVIEW_HIDDEN_RULES[wv]) {
      hiddenWorldviewConstraints.push(`- 【${wv}绝对法则】：${WORLDVIEW_HIDDEN_RULES[wv]}`);
    }
  }

  if (selectedWorldviews.includes('读取当前角色卡世界观')) {
    const charLore = await extractCurrentCharWorldLore();
    if (charLore) {
      hiddenWorldviewConstraints.push(`- 【当前角色卡世界设定】：\n${charLore.slice(0, 3000)}`);
    }
  }

  const hasExisting = Boolean(settings.existingPersona && settings.existingPersona.trim());
  const hasExtraNotes = Boolean(settings.customExtraNotes && settings.customExtraNotes.trim());

  return `You are a SillyTavern USER Persona architect.
${hasExisting 
  ? 'TASK: EXPAND and REFINE the existing persona below by seamlessly incorporating the newly chosen tags and world laws without breaking prior canon.' 
  : 'TASK: CREATE a fresh player USER persona matching the chosen options and world laws below.'}

Rules:
1. All persona schema keys MUST remain in English. The descriptive values must be natural Chinese.
2. Incorporate the Chosen Features and strictly obey the Underlying Worldview Laws.
${settings.currentOutfitPreview ? `3. Explicit Attire Design to use: ${settings.currentOutfitPreview.slice(0, 400)}` : ''}
${hasExisting ? '4. Hard Constraint: Preserve and expand upon the core personality and background in the Existing Persona text.' : ''}
${hasExtraNotes ? '5. Special Constraint: Strictly obey and naturally integrate the Custom Notes/Settings into the persona.' : ''}

${hiddenWorldviewConstraints.length ? `[Underlying Worldview Constraints & Canon Laws]:\n${hiddenWorldviewConstraints.join('\n')}\n` : ''}
${hasExisting ? `[Existing Persona to Inherit/Expand]:\n${settings.existingPersona.trim()}\n` : ''}
${hasExtraNotes ? `[Custom Extra Notes / 专属设定补充]:\n${settings.customExtraNotes.trim()}\n` : ''}

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
  era_and_style: ...
  seasonal_and_occasional: ...
  pieces: ...
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

async function requestCustomApi(prompt) {
  if (!settings.customApiUrl) throw Error('请在⚙️设置中填写自定义 API URL');
  
  const headers = { 'Content-Type': 'application/json' };
  if (settings.customApiKey) headers['Authorization'] = `Bearer ${settings.customApiKey}`;

  const modelName = (settings.customModel || 'gpt-4o-mini').toLowerCase();
  const isReasoningModel = modelName.includes('o1') || modelName.includes('o3') || modelName.includes('deepseek-r1') || modelName.includes('r1');

  const requestBody = {
    model: settings.customModel || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an expert character architect.' },
      { role: 'user', content: prompt }
    ]
  };

  if (!isReasoningModel) {
    requestBody.temperature = 0.8;
  } else {
    requestBody.reasoning_effort = 'medium';
  }

  const res = await fetch(settings.customApiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw Error(`HTTP ${res.status}: ${errText.slice(0, 150)}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}

async function generatePersona() {
  const btn = document.querySelector('#upw-btn-gen');
  if (btn) btn.disabled = true;
  try {
    toast('正在解析世界观法则与选项标签…');
    const prompt = await buildPrompt();
    const out = await executeGeneration(prompt);

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
  const desc = (document.querySelector('#upw-output')?.value || settings.generated || '').trim();
  if (!desc) return toast('当前没有可导入的人设内容，请先生成或输入', 'warning');
  const name = (document.querySelector('#upw-preview-name')?.value || settings.personaName || 'WorldForge Persona').trim();

  try {
    const exec = ctx.executeSlashCommandsWithOptions || ctx.executeSlashCommands;
    if (typeof exec === 'function') {
      const arg = s => JSON.stringify(String(s)).replace(/^"|"$/g, '').replace(/ /g, '\\ ');
      try {
        await exec(`/persona-create name=${arg(name)} description=${arg(desc)}`, { handleParserErrors: true });
      } catch {
        await exec(`/persona-create name=${arg(name)} description=${arg(desc)}`);
      }
      toast(`已成功在酒馆中新建人设：“${name}”！`, 'success');
      return;
    }

    const p = ctx.powerUser;
    if (p?.personas && p?.persona_descriptions) {
      const avatar = `worldforge-${uid()}.png`;
      p.personas[avatar] = name;
      p.persona_descriptions[avatar] = desc;
      persist();
      toast(`已写入酒馆 Persona：“${name}”，可在人设管理中查看`, 'success');
      return;
    }

    throw Error('未能唤起酒馆的原生 Persona 接口');
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
