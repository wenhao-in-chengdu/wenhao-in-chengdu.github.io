document.addEventListener('DOMContentLoaded', function() {
  // 检测URL中的中文字符问题
  function checkChineseUrl() {
    const path = window.location.pathname;
    
    // 如果是分类页面，检查中文编码问题
    if (path.includes('/categories/')) {
      const rawCategory = path.split('/categories/')[1].split('/')[0];
      
      // 检查URL编码是否正确（如%E7%BD%91%E7%BB%9C%E8%BF%90%E7%BB%B4）
      try {
        // 尝试解码
        const decodedCategory = decodeURIComponent(rawCategory);
        // 再次编码看是否一致
        const reEncodedCategory = encodeURIComponent(decodedCategory);
        
        // 如果编码不一致，说明URL可能存在问题
        if (reEncodedCategory !== rawCategory) {
          // 重定向到特殊处理页面
          window.location.href = '/categories-redirect/?category=' + decodedCategory;
          return true;
        }
      } catch (e) {
        // 如果解码失败，也重定向到分类页面
        window.location.href = '/categories/';
        return true;
      }
    }
    
    return false;
  }
  
  // 先检查中文URL问题
  if (checkChineseUrl()) {
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
      
      // 检查是否包含中文分类名称
      if (href.includes('/categories/')) {
        const parts = href.split('/categories/');
        if (parts.length > 1) {
          const categoryPath = parts[1].split('/')[0];
          // 尝试解码检查是否包含中文
          try {
            const decodedCategory = decodeURIComponent(categoryPath);
            // 如果解码后与原字符串不同，且包含中文字符
            if (decodedCategory !== categoryPath && /[\u4e00-\u9fa5]/.test(decodedCategory)) {
              e.preventDefault();
              window.location.href = '/categories-redirect/?category=' + decodedCategory;
              return;
            }
          } catch (e) {
            // 解码失败，继续默认处理
          }
        }
      }
      
      // 对应表，将静态页面映射到正确位置
      const staticPages = {
        '/archives/': '/archives/index.html',
        '/categories/': '/categories/index.html',
        '/year/': '/year/index.html',
        '/about/': '/about/index.html',
        '/year/2024/': '/year/2024/index.html',
        '/year/2025/': '/year/2025/index.html',
        '/categories/网络运维/': '/categories/网络运维/index.html',
        '/categories/网络架构/': '/categories/网络架构/index.html',
        '/categories/网站维护/': '/categories/网站维护/index.html',
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