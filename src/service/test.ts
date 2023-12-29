import { request } from '@/utils'
// 示例测试代码 无实际用途
interface TestResult {
  name: string
  password: string
  token: string
}
export const testApi = (): Promise<TestResult> => {
  return request('TEST', { defaultResult: { } })
}

export const testAnother = (): Promise<TestResult> => {
  return request('TEST_ANOTHER', { defaultResult: '123' })
}
