#!/bin/bash

# 显示Hugo版本
hugo version

# 清理旧的构建
rm -rf docs

# 生成网站内容
hugo --minify

# 确保404页面存在并包含客户端路由代码
cp static/404.html docs/404.html

# 创建必要的目录结构以支持客户端路由
# 确保分类目录存在
for category in 网络架构 网络运维 网站维护 网络开发; do
  mkdir -p "docs/categories/${category}"
  # 为每个分类复制index.html以支持客户端路由
  if [ -f "docs/categories/${category}/index.html" ]; then
    echo "分类目录 ${category} 已有index.html文件"
  else
    echo "为分类 ${category} 创建空的index.html文件"
    echo "<html><head><meta http-equiv=\"refresh\" content=\"0;url=/#/categories/${category}\"></head></html>" > "docs/categories/${category}/index.html"
  fi
done

# 确保年份目录存在
for year in 2024 2025; do
  mkdir -p "docs/year/${year}"
  # 为每个年份复制index.html以支持客户端路由
  if [ -f "docs/year/${year}/index.html" ]; then
    echo "年份目录 ${year} 已有index.html文件"
  else
    echo "为年份 ${year} 创建空的index.html文件"
    echo "<html><head><meta http-equiv=\"refresh\" content=\"0;url=/#/year/${year}\"></head></html>" > "docs/year/${year}/index.html"
  fi
done

# 添加对/y/路径的支持
mkdir -p "docs/y"
cat > "docs/y/index.html" << EOF
<html>
<head>
<script>
const urlParams = new URLSearchParams(window.location.search);
const year = urlParams.get('year');
if (year) {
  window.location.href = '/#/year/' + year;
} else {
  window.location.href = '/';
}
</script>
</head>
<body>
<p>正在重定向...</p>
</body>
</html>
EOF

# 添加对/cat/路径的支持
mkdir -p "docs/cat"
cat > "docs/cat/index.html" << EOF
<html>
<head>
<script>
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('name');
if (category) {
  window.location.href = '/#/categories/' + category;
} else {
  window.location.href = '/';
}
</script>
</head>
<body>
<p>正在重定向...</p>
</body>
</html>
EOF

# 创建.nojekyll文件防止GitHub Pages忽略下划线开头的文件
touch docs/.nojekyll

# 列出生成的文件结构
echo "生成的网站目录结构:"
find docs -type d -not -path "*/\.*" | sort

echo "生成的HTML文件:"
find docs -name "*.html" | sort

echo "构建完成！请使用git add、commit和push将更改推送到GitHub。" 