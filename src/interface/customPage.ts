export interface ICustomPage {
  pageId: number
  pageTitle: string
  urlAlias: string
}

export type ICustomPageInfo = {
  pageContent: string
  pageBannerImage: string
} & ICustomPage
