export type apiKey = keyof typeof apiMap

// 接口map地址 键值对访问
export const apiMap = {
  TEST: '/test',
  TEST_ANOTHER: '/test/another',
}
