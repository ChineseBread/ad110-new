// 博客链接

import { IHotLink } from '@/interface'
import { request } from '@/utils'

// 热门分类
export const getHotLinks = (): Promise<IHotLink[]> => {
  return request('GET_HOT_LINK', { defaultResult: [] })
}
