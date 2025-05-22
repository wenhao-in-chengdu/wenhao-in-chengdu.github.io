# 文浩的技术博客

这是我的个人技术博客仓库，网站地址：[https://wenhao-in-chengdu.github.io](https://wenhao-in-chengdu.github.io)

## 博客内容

- 技术学习笔记
- 项目开发经验
- 编程心得体会
- 技术书籍阅读笔记

## 技术栈

本博客使用GitHub Pages + Hugo搭建，主要技术包括：

- Hugo静态网站生成器
- Markdown文档编写
- Go模板语言
- CSS样式

## 本地开发

1. 安装Hugo环境
2. 克隆仓库：`git clone https://github.com/wenhao-in-chengdu/wenhao-in-chengdu.github.io.git`
3. 本地运行：`hugo server -D`
4. 浏览器访问：`http://localhost:1313`

## 文章归档

所有博客文章按年份和技术类型归档，URL格式为`/:year/:categories/:title/`。

## 文章编写

所有博客文章放在`content/posts`目录下，文件名格式为`YYYY-MM-DD-title.md`。

文章头部需要包含以下YAML头信息：

```yaml
---
title: "文章标题"
date: YYYY-MM-DDT00:00:00+08:00
categories: ["技术类型"]
tags: ["标签1", "标签2"]
---
```
