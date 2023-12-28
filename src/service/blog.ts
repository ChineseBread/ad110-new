import { IBlog, ICategory, IComment } from '@/interface'
import { request } from '@/utils'
// 博文接口

// 获取最新博文
interface ILatestBlogs {
  limit: number
  currentPage: number
  hasMore: boolean
  data: IBlog[]
  totalCount: number
}

export const getLatestBlogs = (limit = 40, page = 1): Promise<ILatestBlogs> => {
  return request('GET_LATEST_BLOGS', { params: { limit, page }, defaultResult: { limit: 0, currentPage: 1, hasMore: false, data: [], totalCount: 0 } })
}

interface IBlogsByCategoryId {
  limit: number
  currentPage: 1
  cateName: string
  hasMore: boolean
  data: IBlog[]
  totalCount: number
}

// 根据分类id 获取文章
export const getBlogsByCategoryId = (cateid: string, limit = 40, page = 1): Promise<IBlogsByCategoryId> => {
  return request('GET_BLOGS_BY_CATE_ID', { params: { cateid, limit, page }, defaultResult: { limit: 0, currentPage: 1, hasMore: false, data: [], totalCount: 0 } })
}

// 获取分类id
export const getBlogCategories = (): Promise<ICategory[]> => {
  return request('GET_BLOG_CATEGORIES_LIST', { defaultResult: [] })
}

interface IBlogsByYear {
  year: number
  currentPage: number
  limit: number
  totalCount: number
  hasMore: boolean
  start: string
  end: string
  data: IBlog[]
}
// 根据年份获取文章
export const getBlogsByYear = (year: string, limit = 4, page = 1): Promise<IBlogsByYear> => {
  return request('GET_BLOGS_BY_YEAR', { params: { year, limit, page }, defaultResult: { year, currentPage: 1, limit: 0, totalCount: 0, hasMore: Boolean, data: [] } })
}

interface IClassicOverview {
  strart: number // start god damn 这什么编程语言
  end: number
  data: { year: number, data: IBlog[] }[]
}
// 获取经典页面的文章列表 每年8个
export const getClassicOverview = (): Promise<IClassicOverview> => {
  return request('GET_CLASSIC_OVERVIEW', { defaultResult: { data: [] } })
}

// 根据文章id获取
export const getBlogById = (logid: string): Promise<{
  data: IBlog
  recommend: IBlog[]
}> => {
  return request('GET_BLOG_BY_ID', { params: { logid }, formatter: (result) => {
    if (result?.Ok) return { data: result.data, recommend: result.recommend }
    else throw new Error() // 返回兜底数据
  }, defaultResult: { data: {}, recommend: [] } })
}

interface IHomePageBlogs {
  top: IBlog
  hot: IBlog[]
  articles: IBlog[]
  news: IBlog[]
}

export const getHomePageBlogs = (): Promise<IHomePageBlogs> => {
  return request('GET_HOME_PAGE_BLOGS', { defaultResult: { top: {}, hot: [], articles: [], news: [] } })
}

interface IBlogComments {
  currentPage: number
  data: IComment[]
  firstPageUrl: string
  from: number
  to: number
  lastPage: number
  lastPageUrl: string
  nextPageUrl?: string
  path: string // 目前看是这个接口地址 这个存在的理由是什么
  perPage: number
  prevPageUrl?: string
  total: number
}

export const getBlogComments = (logid: string, limit = 5, page = 1): Promise<Pick<IBlogComments, 'data' | 'total'>> => {
  return request('GET_COMMENTS', { params: { logid, limit, page }, formatter: (result: IBlogComments) => {
    const { data, total } = result
    return { data, total }
  }, defaultResult: { data: [], total: 0 } })
}

// 发评论
interface ICommentPayload {
  logid: string
  nickname: string
  comment: string
  email?: string
}

// Ok 判断
export const sendComment = (payload: ICommentPayload) => {
  return request('SEND_COMMENT', { params: payload, defaultResult: { Ok: false } })
}

export const likeBlog = (logid: string) => {
  return request('LIKE_BLOG', { params: { logid }, defaultResult: { Ok: false } })
}
