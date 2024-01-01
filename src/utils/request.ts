import { apiKey, revalidate, apiMap } from '@/config'

/**
 * 网站地址都是 get 不考虑 post 处理
 */

const BASE_API = process.env.NEXT_PUBLIC_API_KEY as string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertToCamelCase)
  }
  else if (typeof obj === 'object' && obj !== null) {
    const result: { [key: string]: unknown } = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        let camelCaseKey = key.replace(/_(.)/g, (_, char) => char.toUpperCase())
        const firstChar = camelCaseKey.charAt(0)
        if (key.charAt(0) === key.charAt(0).toUpperCase()) {
          camelCaseKey = firstChar.toLowerCase() + camelCaseKey.slice(1)
        }
        result[camelCaseKey] = convertToCamelCase(obj[key])
      }
    }
    return result
  }
  return obj
}

const replaceRouteParams = (url: string, params: object) => {
  let replacedURL = url
  for (const [key, value] of Object.entries(params)) {
    const regex = new RegExp(`:${key}\\b`, 'g')
    replacedURL = replacedURL.replace(regex, value)
  }
  return replacedURL
}

/** 需要考虑 routeParams参数形式 待定 */
const baseRequest = async (url: string, params?: object, routeParams?: object) => {
  let fetchUrl = `${BASE_API}${url}`
  if (routeParams !== undefined) fetchUrl = replaceRouteParams(fetchUrl, replaceRouteParams)
  if (params !== undefined) {
    // @ts-expect-error mdn官网表示可传入object参数而并非ts约定的string
    const queryParams = new URLSearchParams(params)
    fetchUrl += `?${queryParams.toString()}`
  }
  // debugger logger
  console.log('fetching =>', fetchUrl)
  const result = await fetch(fetchUrl, { next: { revalidate } })
  return result.status === 200 ? result.json() : Promise.reject()
}

interface IDataOptions {
  defaultResult: unknown // 兜底数据
  format?: boolean // 后端接口数据以下划线为主 此参数表示是否使用格式化
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter?: (data: any) => any // 对象数据的预处理
}
interface IRequestOptions {
  routeParams?: object // 路由参数 /fetch/:mode
  params?: object
}

export const request = async (key: apiKey, options: IDataOptions & IRequestOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { defaultResult, format = true, formatter = (data: any) => data, params, routeParams } = options
  try {
    const result = await baseRequest(apiMap[key], params, routeParams)
    return format ? formatter(convertToCamelCase(result)) : formatter(result)
  }
  catch (e) {
    return defaultResult
  }
}
