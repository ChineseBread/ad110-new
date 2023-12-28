export type apiKey = keyof typeof apiMap

// 接口map地址 键值对访问
export const apiMap = {
  TEST: '/test',
  TEST_ANOTHER: '/test/another',
  GET_LATEST_BLOGS: '/api/blog_content/list_by_time', // 获取最新博文
  GET_BLOGS_BY_CATE_ID: '/api/blog_category/list_by_cateid', // 根据分类id列出文章
  GET_BLOG_CATEGORIES_LIST: '/api/blog_category/list_all', // 列出素有博文分类
  GET_BLOGS_BY_YEAR: '/api/blog_content/list_by_year', // 获取某年文章 ** 经典页面逻辑
  GET_CLASSIC_OVERVIEW: '/api/blog_content/classic_overview', // 获取经典页面的按年文章
  GET_BLOG_BY_ID: '/api/blog_content/get_info_by_id', // 根据博客id获取文章
  GET_HOME_PAGE_BLOGS: '/api/blog_content/blog_overview', // 首页的博文预览 banner
  GET_COMMENTS: '/api/blog_comment/list_by_logid', // 获取文章评论
  SEND_COMMENT: '/api/blog_comment/write_comment', // 写评论
  LIKE_BLOG: '/api/blog_content/like_blog', // 点赞博客
}
