---
share: true
categories:
  - 技术
tags:
  - web
  - blog
index_img: https://cdn.specialhua.top/hexo_img/wallhaven-v9mjy5.webp
banner_img: https://cdn.specialhua.top/hexo_img/wallhaven-v9mjy5.webp
comment: true
title: 修改fluid主题网站标题为图片
date: 2024-11-20 01:11:12
updated: 2024-11-20 01:11:39
---
### 效果
正如我的博客这样，左上角的网站标题被修改成了logo，你应当准备一张透明的图片，并且细心的你会发现fluid主题在日间或夜间导航栏都为深色，所以你可以像我这样偷个懒，只需要准备一张透明底色、logo内容为浅色的图片就行。

### 能从主题配置中修改吗？
hexo博客fluid主题的`_config.fluid.yml`主题配置文件能够很方便的修改网站标题，但是[fluid配置指南——博客标题](https://hexo.fluid-dev.com/docs/guide/#%E9%A1%B5%E9%9D%A2%E9%A1%B6%E9%83%A8%E5%A4%A7%E5%9B%BE)中也说明如下：

>博客标题
>
>页面左上角的博客标题，默认使用**站点配置**中的 `title`，这个配置同时控制着网页在浏览器标签中的标题。
>如需单独区别设置，可在**主题配置**中设置：
>
>
navbar:
  blog_title: 博客标题
>

我想尝试着在blog_title后直接引如本地资源如 /img/logo.png，或使用图床、网络链接直接引入，但`hexo d` 之后，博客的标题原引了网址链接。因此在config.yml中修改是不行的

### 修改主题源码
因为改动的地方不大，在GPT的帮助下， 其实很快就能找到修改的方式：
修改主题的`~/node_modules/hexo-theme-fluid/layout/_partials/header/`下的`navigation.ejs`文件即可。
```html
<a class="navbar-brand" href="<%= url_for() %>">
  <img src="/img/YOUR_LOGO_NAME.png" alt="<%= config.title %>" class="navbar-logo">
</a>
```

如图：
![要修改的地方](https://cdn.specialhua.top/hexo_img/Screenshot_20-11月_02-10-33_2098.webp)


这里css样式我也贴在这里，主要是对logo做了一些控制，及一些动画，你可以复制下来放到`你的博客目录/source/css/`下，并把文件名称命名为`custom.css`，同时在fluid主题的`_config.fluid.yml`配置文件下，启用custom css设置。
```CSS
* 导航栏 logo 样式 */
.navbar {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    height: auto;  /* 允许导航栏高度自适应 */
}

/* Logo 容器 */
.navbar-brand {
    display: flex;
    align-items: center;
    padding: 0;
    margin-right: 2rem;  /* 与右侧菜单保持一定距离 */
    min-height: 45px; /* 预留logo高度，防止抖动 */
}

/* Logo 图片 */
.navbar-brand .navbar-logo {
    height: 45px;  /* 增加高度 */
    width: auto;   /* 保持宽高比 */
    vertical-align: middle;
    transition: transform 0.3s ease;
    object-fit: contain;  /* 确保图片不变形 */
    max-width: 200px;    /* 限制最大宽度 */
    backface-visibility: hidden; /* 防止闪烁 */
    transform: translateZ(0); /* 开启硬件加速 */
    -webkit-transform: translateZ(0);
    will-change: transform; /* 提示浏览器这个元素会变化 */
    /* 添加缓存控制 */
    cache-control: max-age=31536000; /* 让浏览器缓存这个图片 */
}

/* 添加logo加载动画 */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.navbar-brand .navbar-logo:hover {
    transform: scale(1.05);
}

/* 响应式设计 */
@media (max-width: 991.98px) {
    .navbar-brand .navbar-logo {
        height: 40px;  /* 中等屏幕稍微小一点 */
    }
}

@media (max-width: 767.98px) {
    .navbar-brand .navbar-logo {
        height: 35px;  /* 小屏幕再小一点 */
        max-width: 150px;  /* 限制小屏幕下的最大宽度 */
    }

    .navbar {
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
    }
}

/* 优化导航栏其他元素的位置 */
.navbar .navbar-nav {
    align-items: center;  /* 垂直居中对齐 */
}

.navbar-logo {
    animation: fadeIn 0.2s ease-in;
    /* 缓存图片到内存 */
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
```


{% note info %}
请注意文件路径，我采用npm安装fluid主题，如果你是采用安装指南中方式二安装的主题：
那么你的ejs文件应当在themes/fluid文件夹下
![安装方式](https://cdn.specialhua.top/hexo_img/Screenshot_20-11月_02-04-13_23218.webp)
{% endnote %}


完成以后，`hexo clean && hexo g` 以后就可以预览试试了

