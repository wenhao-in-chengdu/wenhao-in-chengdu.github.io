document.addEventListener('DOMContentLoaded', function() {
  // 检测是否有保存的重定向路径
  function checkRedirect() {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      // 清除存储的路径
      sessionStorage.removeItem('redirectPath');
      
      // 根据路径类型处理
      if (redirectPath.includes('/year/')) {
        const yearPart = redirectPath.split('/year/')[1];
        if (yearPart) {
          const year = yearPart.split('/')[0];
          // 如果是有效年份，跳转到对应的年份页面
          if (year && /^\d{4}$/.test(year)) {
            // 修改页面内容或重定向到正确的年份页面
            document.querySelector('main').innerHTML = '<p>正在加载年份 ' + year + ' 的内容...</p>';
            document.title = year + ' 年的文章 - 文浩的技术博客';
            
            // 加载年份页面内容
            fetch('/year/' + year + '/index.html')
              .then(response => {
                if (!response.ok) {
                  throw new Error('无法加载年份内容');
                }
                return response.text();
              })
              .then(html => {
                // 提取内容并注入
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('main') || doc.body;
                document.querySelector('main').innerHTML = content.innerHTML;
                
                // 更新URL但不重新加载页面
                history.pushState({}, document.title, redirectPath);
              })
              .catch(error => {
                console.error('加载年份内容失败:', error);
                document.querySelector('main').innerHTML = '<p>抱歉，无法加载 ' + year + ' 年的内容。</p>';
              });
            
            return true;
          }
        }
      }
    }
    return false;
  }

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
  
  // 先检查重定向
  if (checkRedirect()) {
    return;
  }
  
  // 再检查特殊URL
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
      
      // 处理年份链接
      if (href.includes('/year/')) {
        const yearMatch = href.match(/\/year\/(\d{4})/);
        if (yearMatch && yearMatch[1]) {
          e.preventDefault();
          // 使用hash路由方式，避免404
          window.location.href = '/#/year/' + yearMatch[1];
        }
      }
    });
  });
}); 