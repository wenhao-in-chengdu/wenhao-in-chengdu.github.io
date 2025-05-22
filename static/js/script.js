document.addEventListener('DOMContentLoaded', function() {
  // 检测当前页面URL，如果是404但格式正确，进行重定向
  const path = window.location.pathname;
  
  // 处理旧的文章URL格式 (如 /2025/网络运维/test-image/)
  const oldArticlePattern = /^\/(\d{4})\/([^\/]+)\/([^\/]+)\/?$/;
  if (oldArticlePattern.test(path)) {
    const matches = path.match(oldArticlePattern);
    const year = matches[1];
    const slug = matches[3];
    window.location.replace(`/posts/${year}/${slug}/`);
    return;
  }
  
  // 处理分类页面
  if (path.startsWith('/categories/')) {
    // 保持当前URL，页面内容会通过JS动态加载
    loadCategoriesContent();
    return;
  }
  
  // 处理年份页面
  if (path.startsWith('/year/')) {
    // 保持当前URL，页面内容会通过JS动态加载
    loadYearContent();
    return;
  }
});

// 动态加载分类页面内容
function loadCategoriesContent() {
  const categoryName = window.location.pathname.split('/')[2];
  const mainContent = document.querySelector('main');
  
  if (!mainContent) return;
  
  mainContent.innerHTML = `<div class="container">
    <h1>分类: ${decodeURIComponent(categoryName)}</h1>
    <div class="post-list">
      <p>正在加载分类内容...</p>
      <p><a href="/">返回首页</a></p>
    </div>
  </div>`;
}

// 动态加载年份页面内容
function loadYearContent() {
  const year = window.location.pathname.split('/')[2];
  const mainContent = document.querySelector('main');
  
  if (!mainContent) return;
  
  mainContent.innerHTML = `<div class="container">
    <h1>${year}年的文章</h1>
    <div class="post-list">
      <p>正在加载${year}年的文章...</p>
      <p><a href="/">返回首页</a></p>
    </div>
  </div>`;
} 