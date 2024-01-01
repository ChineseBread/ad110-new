import { IBlog, IUrl } from '@/interface'
import { request } from '@/utils'

interface ISearchRes {
  blogs: IBlog[]
  urls: IUrl[]
  total: number
}

export const search = (keyword: string, page = 1): Promise<ISearchRes> => {
  return request('SEARCH', { params: { keyword, page }, formatter: (data) => {
    const { data: { blog, urls } } = data
    return { blogs: blog.data, urls: urls.data, total: blog.total + urls.total }
  }, defaultResult: { blogs: [], urls: [], total: 0 } })
}
