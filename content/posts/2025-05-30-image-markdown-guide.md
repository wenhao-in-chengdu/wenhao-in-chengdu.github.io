---
title: "图片和Markdown使用指南"
date: 2025-05-30T11:20:00+08:00
categories: ["网站维护"]
tags: ["Markdown", "图片管理", "教程"]
year: "2025"
slug: "image-markdown-guide"
---

## 博客图片和Markdown使用指南

本文档详细说明如何在博客中添加图片和使用Markdown格式。

### 图片管理

#### 存储位置

所有图片文件应存放在`static/images`目录下，按以下结构组织：

```
static/images/
├── 2024/         # 2024年相关文章图片
├── 2025/         # 2025年相关文章图片  
├── profile/      # 个人资料相关图片
└── topics/       # 按主题归类的图片
    ├── network/  # 网络相关
    ├── security/ # 安全相关
    └── cloud/    # 云计算相关
```

#### 图片命名规范

- 使用有意义的文件名，反映图片内容
- 使用小写字母、数字和连字符
- 避免使用空格和特殊字符
- 示例: `network-diagram-2025.png`

#### 图片引用方式

在Markdown中引用图片的方式：

1. 基本语法：
```markdown
![图片描述](/images/2025/network-diagram.png)
```

2. 带HTML属性的引用：
```markdown
<img src="/images/2025/network-diagram.png" alt="网络拓扑图" width="600" />
```

3. 使用图片短代码：
```markdown
{{</* figure src="/images/2025/network-diagram.png" caption="网络拓扑图" */>}}
```

### Markdown格式指南

#### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
```

#### 列表

无序列表：
```markdown
- 项目1
- 项目2
  - 子项目
```

有序列表：
```markdown
1. 第一步
2. 第二步
   1. 子步骤
```

#### 代码块

```markdown
​```bash
#!/bin/bash
# 网络扫描脚本
nmap -sV 192.168.1.0/24
​```
```

#### 表格

```markdown
| 设备 | IP地址 | 状态 |
|------|-------|------|
| 路由器 | 192.168.1.1 | 在线 |
| 交换机 | 192.168.1.2 | 在线 |
```

#### 引用

```markdown
> 这是一段引用的文字。
> 可以有多行。
```

### 发布流程

1. 准备好要使用的图片
2. 将图片放入适当的目录(`static/images/xxxx`)
3. 在Markdown中引用图片
4. 提交并推送到GitHub
5. GitHub Actions将自动构建并发布网站 