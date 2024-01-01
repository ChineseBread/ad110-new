import { clickUrl } from '@/service'

const trackUrlClick = (urlid: string) => {
  clickUrl(urlid)
}

export const useTracker = () => ({
  trackUrlClick,
})
