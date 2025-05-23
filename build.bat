@echo off
echo 开始构建站点...

REM 显示Hugo版本
hugo version

REM 清理旧的构建
if exist docs rmdir /s /q docs

REM 生成网站内容
hugo --minify

REM 确保404页面存在并包含客户端路由代码
copy static\404.html docs\404.html

REM 创建必要的目录结构以支持客户端路由
REM 确保分类目录存在
for %%c in (网络架构 网络运维 网站维护 网络开发) do (
  if not exist "docs\categories\%%c" mkdir "docs\categories\%%c"
  if exist "docs\categories\%%c\index.html" (
    echo 分类目录 %%c 已有index.html文件
  ) else (
    echo 为分类 %%c 创建空的index.html文件
    echo ^<html^>^<head^>^<meta http-equiv="refresh" content="0;url=/#/categories/%%c"^>^</head^>^</html^> > "docs\categories\%%c\index.html"
  )
)

REM 确保年份目录存在
for %%y in (2024 2025) do (
  if not exist "docs\year\%%y" mkdir "docs\year\%%y"
  if exist "docs\year\%%y\index.html" (
    echo 年份目录 %%y 已有index.html文件
  ) else (
    echo 为年份 %%y 创建空的index.html文件
    echo ^<html^>^<head^>^<meta http-equiv="refresh" content="0;url=/#/year/%%y"^>^</head^>^</html^> > "docs\year\%%y\index.html"
  )
)

REM 创建.nojekyll文件防止GitHub Pages忽略下划线开头的文件
echo. > docs\.nojekyll

echo 构建完成！请使用git add、commit和push将更改推送到GitHub。
echo.
echo 请按任意键退出...
pause > nul 