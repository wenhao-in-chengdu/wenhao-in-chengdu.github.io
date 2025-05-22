---
title: "图片画廊示例"
date: 2025-06-02T10:00:00+08:00
categories: ["网络架构"]
tags: ["图片", "画廊", "教程"]
---

## 图片画廊功能演示

在博客中，有时需要展示多张相关图片。使用图片画廊功能可以整齐地排列多张图片。

### 基本用法

下面是一个网络设备图片画廊的示例：

{{< gallery >}}
{{< figure src="/images/2025/router1.jpg" caption="核心路由器" >}}
{{< figure src="/images/2025/switch1.jpg" caption="接入层交换机" >}}
{{< figure src="/images/2025/firewall.jpg" caption="边界防火墙" >}}
{{< figure src="/images/2025/server.jpg" caption="应用服务器" >}}
{{< gallery >}}

### 实现方式

图片画廊功能使用Hugo的shortcodes实现，在Markdown中使用以下语法：

```
{{</* gallery */>}}
{{</* figure src="/images/2025/image1.jpg" caption="图片1描述" */>}}
{{</* figure src="/images/2025/image2.jpg" caption="图片2描述" */>}}
{{</* gallery */>}}
```

### 最佳实践

1. 确保所有图片尺寸接近，以保持画廊美观
2. 添加有意义的描述(caption)以提高可访问性
3. 图片存放在合适的年份或主题文件夹下
4. 使用优化过的图片，建议宽度不超过1200px 