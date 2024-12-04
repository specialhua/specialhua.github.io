---
share: true
categories:
  - 乐趣
tags:
  - blog
  - hexo
  - Fluid
  - web
index_img: https://cdn.specialhua.top/hexo_img/wallhaven-gpx88d.jpg-pic
banner_img: https://cdn.specialhua.top/hexo_img/wallhaven-gpx88d.jpg-pic
comment: true
title: 给Hexo博客添加贪吃蛇热力图
date: 2024-12-04 07:12:33
updated: 2024-12-04 07:12:58
---

最近在瞎逛的时候，偶然看到老何的[博客](https://www.mrhe.net/about)有一个贪吃蛇的热力图，展示了其posts文章在时间上的分布，并且以一个贪吃蛇的小动画来吃掉一个一个小点，感觉很有趣，看着自己的提交空白一片，仅有的几个还被“小蛇”吃了也蛮有意思，于是想着也在自己的博客上实现一个，因为博客部署在github page上，自己发布的文章在github仓库里本来就是有热力数据的，很契合。

### 基础知识
#### 依赖
依赖于github项目[Platane/snk](https://github.com/Platane/snk)，感谢开源的代码
#### 热力图 - Heatmap
热力图，是一种通过对色块着色来显示数据的统计图表。绘图时，需指定颜色映射的规则。例如，较大的值由较深的颜色表示，较小的值由较浅的颜色表示；较大的值由偏暖的颜色表示，较小的值由较冷的颜色表示，等等。

从数据结构来划分，热力图一般分为两种。第一，表格型热力图，也称色块图。它需要2个分类字段+1个数值字段，分类字段确定x、y轴，将图表划分为规整的矩形块。数值字段决定了矩形块的颜色。第二，非表格型热力图，或曰平滑的热力图，它需要3个数值字段，可绘制在平行坐标系中（2个数值字段分别确定x、y轴，1个数值字段确定着色）。

我们要生成的就是横轴为月份，纵轴为星期的表格型热力图（浅色下，颜色越深代表的当天contribution越多，反过来，深色主题下颜色越亮代表contribution越多）及对应的随时间的进度条
![热力图案例](https://cdn.specialhua.top/hexo_img/Screenshot_04-12月_08-19-59_2757.png-pic)

#### Markdown 内嵌 HTML 标签
戳[Markdown官方教程](https://markdown.com.cn/basic-syntax/htmls.html)这里有一些说明，关于markdown内嵌标签的一些示例，总之
>对于 Markdown 涵盖范围之外的标签，都可以直接在文件里面用 HTML 本身。如需使用 HTML，不需要额外标注这是 HTML 或是 Markdown，只需 HTML 标签添加到 Markdown 文本中即可。

#### Fluid支持自定义CSS
使用Fluid主题是支持自定义css、js等的，贪吃蛇热力图不过就是两张透明svg图片，我们用Markdown内嵌html标签，插入日间、夜间主题对应的两张图片，然后通过[自定义CSS](https://hexo.fluid-dev.com/docs/guide/#%E8%87%AA%E5%AE%9A%E4%B9%89-js-css-html)来控制切换日夜主题时显示的svg即可
如果你使用的是其他Hexo主题，大部分应当都支持一些自定义的方式，请查阅主题配置相关文档

>`指定自定义 css 文件路径，路径是相对 source 目录`
>`custom_css: /css/custom.css`

### 实现
#### github to do
##### 新建一个仓库
![新建仓库](https://cdn.specialhua.top/hexo_img/Screenshot_05-12月_00-29-17_12461.png-pic)

![仓库命名](https://cdn.specialhua.top/hexo_img/Screenshot_05-12月_00-31-01_2721.png-pic)

##### 新建一个Action
在github上，`New repository`，然后如图，Repository名称随意

![Screenshot_05-12月_00-34-54_31638.png](https://cdn.specialhua.top/hexo_img/Screenshot_05-12月_00-34-54_31638.png-pic)

点击`Actions` ，再点击"set up a workfllow yourself"，填入以下内容，然后`Commit Changes`：
{% note info %}
记得替换`$ github.repository_owner `为你的github用户名
形如：
```
with:
  github_user_name: specialhua
```
{% endnote %}

```yml
name: generate animation

on:
  # run automatically every 6 hours
  schedule:
    - cron: "0 */6 * * *"  # 每6小时运行一次 
  
  # allows to manually run the job at any time
  workflow_dispatch:
  
  # run on every push on the master branch
  push:
    branches:
    - master
    
  

jobs:
  generate:
    permissions: 
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5
    
    steps:
      # generates a snake game from a github user (<github_user_name>) contributions graph, output a svg animation at <svg_out_path>
      - name: generate github-contribution-grid-snake.svg
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
          
          
      # push the content of <build_dir> to a branch
      # the content will be available at https://raw.githubusercontent.com/<github_user>/<repository>/<target_branch>/<file> , or as github page
      - name: push github-contribution-grid-snake.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

##### 运行workflow

![Screenshot_05-12月_00-51-08_19703.png](https://cdn.specialhua.top/hexo_img/Screenshot_05-12月_00-51-08_19703.png-pic)

##### 获得两张svg图片
等待生成完毕，到`code`下，切换分支到`output`下，即可看到light和dark两张svg图片，保存两张图片的地址如：
>https://github.com/specialhua/snk/blob/output/github-contribution-grid-snake-dark.svg
>https://github.com/specialhua/snk/blob/output/github-contribution-grid-snake.svg

#### blog to do
##### 插入图片
在你想插入的页面，例如我是在关于页面，那就在关于页面的`index.md`下插入内容：
{% note info %}
注意替换链接。这里为了让国内也访问，直接走的jsdelivr的Gcore 节点，仿照我的格式去替换就行，当然，直接用上面github的地址也一样
{% endnote %}
```html
<div id="snake-pic">
  <img class="snake-light" src="https://gcore.jsdelivr.net/gh/specialhua/snk@output/github-contribution-grid-snake.svg" alt="GitHub Snake Light" />
  <img class="snake-dark" src="https://gcore.jsdelivr.net/gh/specialhua/snk@output/github-contribution-grid-snake-dark.svg" alt="GitHub Snake Dark" />
</div>
```

##### 添加自定义css
在`source/css/custom.css`（如无，自行添加，并在`_config.fluid.yml`中定义开启）中添加如下：
{% note info %}
这里不用自定义CSS的话，夜间主题下图片总是不透明，因此做了一个强制透明
{% endnote %}
```css
/* Snake */
.snake-dark {
    display: none;
}
.snake-light {
    display: block;
}

/* 夜间模式：确保背景透明，显示 dark 图像 */
[data-user-color-scheme='dark'] #snake-pic {
    background-color: transparent; /* 确保背景透明 */
}

[data-user-color-scheme='dark'] .snake-light {
    display: none; /* 隐藏 light 版本 */
}

[data-user-color-scheme='dark'] .snake-dark {
    display: block; /* 显示 dark 版本 */
}

/* 确保图片本身背景透明 */
#snake-pic img {
background-color: transparent;
}
```


##### hexo clean && hexo d
也可clean以后hexo s本地看看有没有问题