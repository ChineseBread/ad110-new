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

const baseRequest = async (url: string, params?: object) => {
  let fetchUrl = `${BASE_API}${url}`
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

interface RequestOptions {
  defaultResult: unknown // 兜底数据
  format?: boolean // 后端接口数据以下划线为主 此参数表示是否使用格式化
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter?: (data: any) => any // 对象数据的预处理
  params?: object
}

export const request = async (key: apiKey, options: RequestOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { defaultResult, format = true, formatter = (data: any) => data, params } = options
  try {
    const result = await baseRequest(apiMap[key], params)
    if (format) return formatter(convertToCamelCase(result))
    return formatter(result)
  }
  catch (e) {
    return defaultResult
  }
}
