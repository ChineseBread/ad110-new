import { request } from '@/utils'
import { type PagingSearch, INews } from '@/interface'

export const getLatestNews = (limit = 20, page = 1): Promise<PagingSearch<INews>> => {
  return request('GET_LATEST_NEWS', { params: { limit, page }, defaultResult: { limit: 0, currentPage: 1, hasMore: false, data: [], totalCount: 0 } })
}

export const getNewsContentByid = (id: string): Promise<INews> => {
  return request('GET_NEWS_BY_ID', { params: { id }, defaultResult: { } })
}
