// 热门链接
export interface IHotLink {
  id: number
  name: string
  hotSwitch: 1 | 0
  hits: number
}

// 博文链接
export interface IBlogLink {
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
