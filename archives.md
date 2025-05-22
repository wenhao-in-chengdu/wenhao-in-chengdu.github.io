---
layout: page
title: 文章归档
permalink: /archives/
---

## 按年份归档

{% assign posts_by_year = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in posts_by_year %}
  <h3>{{ year.name }}</h3>
  <ul>
    {% assign posts_by_category = year.items | group_by: "categories" %}
    {% for category_group in posts_by_category %}
      <li>
        <h4>{{ category_group.name | join: ", " | capitalize }}</h4>
        <ul>
          {% for post in category_group.items %}
            <li>
              <span class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</span>
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </li>
          {% endfor %}
        </ul>
      </li>
    {% endfor %}
  </ul>
{% endfor %} 