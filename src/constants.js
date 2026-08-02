// 广东全省医疗设备招标信息汇总平台 — 命名常量与分类法（单一事实来源）
//
// 这里集中所有「魔法数字 / 魔法字符串」，导航渲染与数据校验都从这里取，
// 避免散落的字符串相等判断导致「导航写 '彩超/超声设备'、数据写 '彩超·超声设备'」式的不一致。

// ===== 运行时参数（消灭魔法数字）=====
export const PAGE_SIZE = 10;
export const SEARCH_DEBOUNCE_MS = 200;
export const AUTO_REFRESH_MS = 5 * 60 * 1000;

// ===== 全省 21 个地级市（数据合法值 / 校验白名单）=====
export const REGIONS = [
  '广州市', '深圳市', '珠海市', '汕头市', '佛山市', '韶关市', '湛江市', '肇庆市',
  '江门市', '茂名市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市',
  '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'
];

// ===== 四大片区（按地区「分项」分组，与省政府经济区域划分一致）=====
export const MACRO_REGIONS = [
  { key: '珠三角', label: '珠三角', cities: ['广州市', '深圳市', '珠海市', '佛山市', '惠州市', '东莞市', '中山市', '江门市', '肇庆市'] },
  { key: '粤东',   label: '粤东',   cities: ['汕头市', '潮州市', '揭阳市', '汕尾市'] },
  { key: '粤西',   label: '粤西',   cities: ['湛江市', '茂名市', '阳江市', '云浮市'] },
  { key: '粤北',   label: '粤北',   cities: ['韶关市', '清远市', '河源市', '梅州市'] }
];

// 城市 → 所属片区（快速查表，渲染徽章配色与片区筛选共用）
export const CITY_TO_MACRO = (() => {
  const m = {};
  MACRO_REGIONS.forEach(function (r) {
    r.cities.forEach(function (c) { m[c] = r.key; });
  });
  return m;
})();

// ===== 公告类型（数据合法值）=====
export const TYPES = ['招标公告', '中标结果公告', '调研·论证公告'];

// ===== 设备类别（导航 + 数据合法值）=====
export const DEVICE_CATEGORIES = ['内窥镜类', '彩超·超声设备', '其他设备'];

// ===== 左侧导航结构（数据驱动，分组渲染）=====
// group：分组标题；items：可点击过滤项；kind：维度（city/category/type）；value：过滤值
export const NAV_GROUPS = [
  {
    group: '地区（按城市 / 片区）',
    items: [
      { key: 'city:全部', label: '全省（全部 21 市）', kind: 'city', value: '全部' },
      ...MACRO_REGIONS.map(function (r) {
        return { key: 'city:' + r.key, label: r.label + '（片区）', kind: 'city', value: r.key };
      }),
      ...MACRO_REGIONS.flatMap(function (r) {
        return r.cities.map(function (c) {
          return { key: 'city:' + c, label: c, kind: 'city', value: c };
        });
      })
    ]
  },
  {
    group: '设备类别',
    items: [
      { key: 'cat:全部设备', label: '全部设备', kind: 'category', value: '全部设备' },
      ...DEVICE_CATEGORIES.map(function (c) {
        return { key: 'cat:' + c, label: c, kind: 'category', value: c };
      })
    ]
  },
  {
    group: '公告类型',
    items: [
      { key: 'type:全部类型', label: '全部类型', kind: 'type', value: '全部类型' },
      ...TYPES.map(function (t) {
        return { key: 'type:' + t, label: t, kind: 'type', value: t };
      })
    ]
  }
];

// 判定一条公告是否命中当前三维筛选（city + category + type，三者取「与」）。
// city 维度：'全部' → 命中；片区 key（如 '粤东'）→ 命中该片区任意城市；具体城市名 → 精确匹配。
export function matchFilters(a, filters) {
  if (filters.city && filters.city !== '全部') {
    const isMacro = MACRO_REGIONS.some(function (r) { return r.key === filters.city; });
    if (isMacro) {
      if (CITY_TO_MACRO[a.region] !== filters.city) return false;
    } else if (a.region !== filters.city) {
      return false;
    }
  }
  if (filters.category && filters.category !== '全部设备' && a.category !== filters.category) return false;
  if (filters.type && filters.type !== '全部类型' && a.type !== filters.type) return false;
  return true;
}
