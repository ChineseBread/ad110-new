// 后端接口的两种分页形式的泛型扩展 参数返回很乱不一致
export type PagingDefault<T> = { // 默认分页
  currentPage: number
  from: number
  to: number
  total: number
  data: T
  firstPageUrl: string
  lastPage: number
  lastPageUrl: string
  nextPageUrl: string
  path: string
  perPage: number
  prevPageUrl: string
}

// U 为返回的额外参数
export type PagingSearch<T, U = unknown> = { // 查询分页
  limit: number
  currentPage: number
  hasMore: boolean
  data: T
  totalCount: number
} & U
