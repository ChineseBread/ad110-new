// 博客文章 Item
export interface IBlog {
  logId: number
  logCateId: number
  cateName: string
  logTitle: string
  logAllusion: string // 典故 | 分类
  logIntroContent: string // 文章开头介绍
  logCoverImage: string // 封面
  logPosterImage: string // 还是封面?
  logAuthor: string
  logModify: string
  logQuote: string
  logFrom: string
  logContent: string // 具体的博客文章内容
  logPosttime: string
  logCommNums: number // 评论数
  logViewNums: number // 浏览数
  logLikeNums: number // 点赞
  logDiscommentSwitch: 0 | 1 // 该文章是否有评论
  archived: boolean // 待定
  hasPic: boolean
  hasPoster: boolean
  logCoverId: string // 待定  接口返回false 实际是个string
}

// 博文分类
export interface ICategory {
  cateId: number
  cateName: string
  weigh: number // 权重 ?
  cateImage: string
  cateNums: string
  updatedAt: string
}
