# 文浩的技术博客

这是我的个人技术博客仓库，网站地址：[https://wenhao-in-chengdu.github.io](https://wenhao-in-chengdu.github.io)

## 博客内容

- 技术学习笔记
- 项目开发经验
- 编程心得体会
- 技术书籍阅读笔记

## 技术栈

本博客使用GitHub Pages + Jekyll搭建，主要技术包括：

- Jekyll静态网站生成器
- Markdown文档编写
- Liquid模板语言
- SCSS样式

## 本地开发

1. 安装Ruby环境
2. 克隆仓库：`git clone https://github.com/wenhao-in-chengdu/wenhao-in-chengdu.github.io.git`
3. 安装依赖：`bundle install`
4. 本地运行：`bundle exec jekyll serve`
5. 浏览器访问：`http://localhost:4000`

## 文章编写

所有博客文章放在`_posts`目录下，文件名格式为`YYYY-MM-DD-title.md`。

文章头部需要包含以下YAML头信息：

```yaml
---
layout: post
title: "文章标题"
date: YYYY-MM-DD HH:MM:SS +0800
categories: [分类1, 分类2]
tags: [标签1, 标签2]
---
```
