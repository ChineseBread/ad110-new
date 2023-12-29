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
  GET_HOT_LINK: '/api/web_kind/list_hot', // 获取热门分类
  GET_NEWLY_IMPORTED_URLS: '/api/web_urls/newly_index_urls', // 获取新导入链接 (资库下单独分类)
  GET_POPULAR_CLICK_URLS: '/api/web_urls/list_hot_hits', // 获取热门点击链接
  GET_URLS_BY_LINK_ID: '/api/web_kind_urls/list_by_time', // 根据链接id 获取分类下的url
  GET_TOP_HOT_URLS: '/api/web_urls/page_top_100', // top100链接
  GET_LIBRARY_NEWLY_IMPORTED_URLS: '/api/web_urls/page_newly_index', // 新录入链接
  GET_AUTHOR_RECOMMEND_URLS: '/api/web_urls/author_recommend', // 编辑推荐
  GET_SORTED_URLS_BY_RECOMMEND: '/web_kind_urls/list_by_recommend', // 三种排序方式
  GET_SORTED_URLS_BY_RANDOM: '/web_kind_urls/list_by_random',
  GET_SORTED_URLS_BY_HOT: '/web_kind_urls/list_by_hot',
}
