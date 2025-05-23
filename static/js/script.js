document.addEventListener('DOMContentLoaded', function() {
  // 检测URL中的特殊路径并重定向
  function checkSpecialUrls() {
    const path = window.location.pathname;
    
    // 如果是旧的分类页面，重定向到新的分类页面
    if (path.includes('/categories/')) {
      try {
        const categoryPart = path.split('/categories/')[1];
        if (categoryPart) {
          const categoryName = categoryPart.split('/')[0];
          // 重定向到新的分类页面
          window.location.href = '/categories/' + categoryName + '/';
          return true;
        }
      } catch (e) {
        window.location.href = '/categories/';
        return true;
      }
    }
    
    // 处理旧的文章URL格式 (如 /2025/网络运维/test-image/)
    const oldArticlePattern = /^\/(\d{4})\/([^\/]+)\/([^\/]+)\/?$/;
    if (oldArticlePattern.test(path)) {
      const matches = path.match(oldArticlePattern);
      const year = matches[1];
      const slug = matches[3];
      
      // 重定向到新的文章页面
      if (slug && year) {
        window.location.replace(`/posts/${year}/${slug}/`);
        return true;
      }
    }
    
    return false;
  }
  
  // 先检查特殊URL
  if (checkSpecialUrls()) {
    return;
  }
  
  // 监听所有页面链接点击，防止404错误
  document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      
      // 如果是外部链接或锚点链接，不处理
      if (!href || href.startsWith('http') || href.startsWith('#')) {
        return;
      }
      
      // 对应表，将静态页面映射到正确位置
      const staticPages = {
        '/archives/': '/archives/index.html',
        '/categories/': '/categories/index.html',
        '/about/': '/about/index.html',
        '/posts/2025/test-image/': '/posts/2025/test-image/index.html',
        '/posts/2025/gallery-example/': '/posts/2025/gallery-example/index.html',
        '/posts/2025/image-markdown-guide/': '/posts/2025/image-markdown-guide/index.html'
      };
      
      // 如果有对应的静态页面，修改链接
      if (staticPages[href]) {
        e.preventDefault();
        window.location.href = staticPages[href];
      }
    });
  });
});

// 动态加载分类页面内容
function loadCategoriesContent() {
  const categoryName = window.location.pathname.split('/')[2];
  const mainContent = document.querySelector('main');
  
  if (!mainContent) return;
  
  mainContent.innerHTML = `<div class="container">
    <h1>分类: ${decodeURIComponent(categoryName || '')}</h1>
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
    <h1>${year || '按年份浏览'}年的文章</h1>
    <div class="post-list">
      <p>正在加载${year || '所有'}年的文章...</p>
      <p><a href="/">返回首页</a></p>
    </div>
  </div>`;
} 