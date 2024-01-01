import { IBanner } from '@/interface'
import { request } from '@/utils'

type location = 'HOME' | 'HOT' | 'RECOMMEND' | 'NEWLY_IMPORTED'

const bannerMap = {
  HOME: 'home_footer_banner',
  HOT: 'hot_hits_banner',
  RECOMMEND: 'url_recommend_banner',
  NEWLY_IMPORTED: 'url_newly_index_banner',
}

export const getBannerSrc = (location: location): Promise<IBanner> => {
  return request('GET_BANNER_URL', { routeParams: { location: bannerMap[location] }, defaultResult: {} })
}
