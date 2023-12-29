/**
 * link 和 url的区别 link 是艺术分类 每个艺术分类下有多个url网站
 */
// 热门分类
export interface IHotLink {
  id: number // id => kindid
  name: string
  hotSwitch: 1 | 0
  hits: number
}

// 网站链接
export interface IUrl {
  urlId: number
  categoryId: number
  urlName: string
  urlValue: string
  logoImage: string
  urlLikes: number
  urlHits: number
  urlTime: string
  iscoolSwitch: 1 | 0 // 推荐类型 加⭐号 看新设计图咋改
  urlHideSwitch: 1 | 0
  yearInfoSwitch: 1 | 0
  urlInfo: string
  updatedAt: string
}
