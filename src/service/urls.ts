import { apiKey } from '@/config'
import { IUrl, type PagingSearch, type PagingDefault } from '@/interface'
import { request } from '@/utils'

// 新导(录)入
export const getNewlyImportedLinks = (limit = 10): Promise<IUrl[]> => {
  return request('GET_NEWLY_IMPORTED_URLS', { params: { limit }, defaultResult: [] })
}

// 热门点击链接
export const getPopularClinkLinks = (limit = 100): Promise<IUrl[]> => {
  return request('GET_POPULAR_CLICK_URLS', { params: { limit }, defaultResult: [] })
}

// 根据分类获取链接

// interface IUrlsByLinkId {
//   limit: number
//   currentPage: number
//   hasMore: boolean
//   cateName: string
//   data: IUrl[]
//   totalCount: number
// }

// 获取分类下链接
export const getUrlsByLinkId = (kindid: string, page = 1, limit = 100): Promise<PagingSearch<IUrl[], { cateName: string }>> => {
  return request('GET_URLS_BY_LINK_ID', { params: { kindid, limit, page }, formatter: (result: PagingSearch<IUrl[], { ok: boolean, cateName: string }>) => {
    if (result.ok) {
      const { ok: _, ...rest } = result
      return rest
    }
    throw new Error()
  }, defaultResult: { limit: 0, totalCount: 0, data: [], currentPage: 1, cateName: '' } })
}

// 热门100条链接
export const getTopHotUrls = (): Promise<PagingDefault<IUrl[]>> => {
  return request('GET_TOP_HOT_URLS', { formatter: (result: PagingDefault<IUrl[]>) => result.data, defaultResult: [] })
}

// 资库：新录入条目
export const getLiBraryNewlyImportedUrls = (): Promise<PagingDefault<IUrl[]>> => {
  return request('GET_LIBRARY_NEWLY_IMPORTED_URLS', { formatter: (result: PagingDefault<IUrl[]>) => result.data, defaultResult: [] })
}

// 编辑推荐
export const getAuthorRecommendUrls = (): Promise<IUrl[]> => {
  return request('GET_AUTHOR_RECOMMEND_URLS', { defaultResult: [] })
}

export type QueryMode = 'RANDOM' | 'HOT' | 'RECOMMEND'

const QueryModeApi = {
  RANDOM: 'GET_SORTED_URLS_BY_RANDOM',
  HOT: 'GET_SORTED_URLS_BY_HOT',
  RECOMMEND: 'GET_SORTED_URLS_BY_RECOMMEND',
}

/** 两种方法一样 调用方式不同 */
export const getSortedUrls = (mode: QueryMode, kindid: string, limit = 1, page = 20): Promise<PagingSearch<IUrl[], { cateName: string }>> => {
  return request(QueryModeApi[mode] as apiKey, { params: { kindid, limit, page }, formatter: (result: PagingSearch<IUrl[], { ok: boolean, cateName: string }>) => {
    if (result.ok) {
      const { ok: _, ...rest } = result
      return rest
    }
    throw new Error()
  }, defaultResult: { limit: 0, totalCount: 0, currentPage: 0, data: [] } })
}

export const getSortedUrlsByMode = (mode: QueryMode, kindid: string, limit = 1, page = 20): Promise<PagingSearch<IUrl[], { cateName: string }>> => {
  return request('GET_SORTED_URLS', { params: { kindid, limit, page }, formatter: (result: PagingSearch<IUrl[], { ok: boolean, cateName: string }>) => {
    if (result.ok) {
      const { ok: _, ...rest } = result
      return rest
    }
    throw new Error()
  },
  defaultResult: { limit: 0, totalCount: 0, currentPage: 0, data: [] },
  routeParams: { mode },
  })
}

// 点赞链接
export const likeUrls = (urlid: string): Promise<{ ok: boolean }> => {
  return request('LIKE_URL', { params: { urlid }, defaultResult: { ok: false } })
}

// trackUrlClick
export const clickUrl = (urlid: string): Promise<void> => {
  return request('CLICK_URL', { params: { urlid }, defaultResult: undefined })
}

export const uploadUrl = (name: string, url: string, info: string): Promise<{ ok: boolean }> => {
  return request('UPLOAD_URL', { params: { name, url, info }, defaultResult: { ok: false } })
}
