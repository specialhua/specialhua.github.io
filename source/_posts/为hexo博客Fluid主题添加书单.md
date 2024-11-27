---
share: true
categories:
  - 技术
tags:
  - blog
  - 书单
  - Fluid
index_img: https://cdn.specialhua.top/hexo_img/wallhaven-2k27ox.webp
banner_img: https://cdn.specialhua.top/hexo_img/wallhaven-2k27ox.webp
comment: true
title: 为hexo博客Fluid主题添加书单
date: 2024-11-27 11:11:58
updated: 2024-11-27 11:11:46
---
### 参考
感谢[北 辰の小 栈](https://www.mz-zone.cn/2021/11/12/20211112001/)提供的代码及CSS样式，以及其文末提供的源码作者博客链接（链接已无法访问了）[雨中的博客](https://wenchong.space/)，尽管搜索了作者的名字等，似乎也只找到了博客园有作者相关信息（~~不确定~~）。总之，感谢。

### 改动及思路
因为北辰使用的是Volantis主题，其主要在layout目录下创建`book.ejs`来应用CSS样式，但Fluid主题是很好的支持自定义css的。因此可以将全部CSS放到`/soucre/css/custom.css`中，直接在主题的`_config.fluid.yml`中在自定义CSS处引用即可


### Step1.创建自定义页面
终端中，进入博客目录后
```shell
hexo new page books
```
这会在你博客的`/source`下自动创建一个books文件夹，并在`/source/books`下自动创建`index.md`文件

### Step2.自定义CSS
在你的博客`/soucre/css/custom.css`（如没有，自行创建）中填入以下内容：
```CSS
/* 将以下内容添加到 source/css/custom.css */

/* 书籍列表容器样式 */
#book {
width: 100%;
}

#book .page {
overflow: hidden;
border-radius: 3px;
width: 100%;
}

#book .content {
display: flex;
align-items: center;
width: 100%;
margin: 0;
justify-content: space-between;
flex-wrap: wrap;
padding: 16px;
text-align: justify;
}

/* 响应式布局 */
@media screen and (max-width: 877px) {
    #book .page .content {
    flex-direction: column;
    align-items: center;
    }
}

/* 书籍卡片样式 */
#book .content li {
width: 380px;
list-style: none;
margin-bottom: 16px;
border-radius: 8px;
transition: all .3s ease 0s, transform .6s cubic-bezier(.6, .2, .1, 1) 0s;
}

#book .content li .info {
border-radius: 8px;
display: flex;
justify-content: flex-start;
padding: 16px 12px;
line-height: 1.7;
list-style: none;
}

/* 书籍封面3D效果 */
.book-container {
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 600px;
}

.book {
    position: relative;
    width: 100px;
    height: 150px;
    transform-style: preserve-3d;
    transform: rotateY(-30deg);
    transition: 1s ease;
    list-style: none;
}

.book:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 2px;
    width: 23px;
    height: 146px;
    transform: translateX(84.5px) rotateY(90deg);
    background: linear-gradient(90deg, #fff, #f9f9f9 5%, #fff 10%, #f9f9f9 15%, #fff 20%, #f9f9f9 25%, #fff 30%, #f9f9f9 35%, #fff 40%, #f9f9f9 45%, #fff 50%, #f9f9f9 55%, #fff 60%, #f9f9f9 65%, #fff 70%, #f9f9f9 75%, #fff 80%, #f9f9f9 85%, #fff 90%, #f9f9f9 95%, #fff);
}

.book > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 150px;
    transform: translateZ(12.5px);
    border-radius: 0 2px 2px 0;
    box-shadow: 5px 5px 20px #666;
}

.book:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 150px;
    transform: translateZ(-12.5px);
    background-color: #555;
    border-radius: 0 2px 2px 0;
}

/* 书籍信息卡片样式 */
#book .content li .info > div {
margin-left: 26px;
}

#book .content li .info h3 {
font-size: 16px;
position: unset;
background: none;
display: block;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
}

#book .content li .info h3:before {
display: none;
}

#book .content li .info p {
font-size: 14px;
line-height: 1.7;
}

/* 悬浮效果 */
#book .content li:hover .book {
transform: rotateY(0deg);
}

/* 书籍简介弹出层 */
#book .info .info-card {
position: relative;
width: 250px;
overflow: hidden;
transition: .3s;
}

#book .info .info-card .hidden-content {
position: absolute;
display: flex;
justify-content: center;
align-items: center;
top: 50%;
left: 50%;
height: 0%;
transform: translate(-50%, -50%);
filter: blur(12px);
opacity: 0;
background: #fff;
width: 100%;
transition: .5s;
}

#book .info .info-card .hidden-content .text {
height: 80%;
width: 80%;
padding: 5px;
overflow: hidden;
text-overflow: ellipsis;
font-size: 14px;
color: #676767;
float: left;
clear: both;
text-align: justify;
}

#book .info .info-card .hidden-content .text::first-letter {
font-size: 20px;
float: left;
margin: 0 .2em 0 0;
}

#book .info a:hover + .info-card .hidden-content {
opacity: 1;
height: 100%;
width: 100%;
filter: unset;
}

#book .content li .info a[target="_blank"]:hover {
color: #0056b3;
text-decoration: underline;
}

#book .content li .info .pwd-text {
font-size: 16px;
color: #666;
margin-top: 3px;
}
```


### Step3.修改index.md
在上述所说的`/source/books/index.md`中，修改为以下内容：
`title`、`banner_img`等可以自定义，此处不再缀述
html中的链接请自行替换，要增加书籍复制`<!-- 书籍示例 -->`下面的两个`<li>`标签之间的内容，然后更换后继续往后粘贴就是
```html
<li>
......
</li>
```

以下为`index.md`内容
```html
---
title: 书单
date: 2024-11-27 10:33:03
banner_img: 
---

<div id="book">
    <div class="page">
        <ul class="content">
            <!-- 书籍示例 -->
            <li>
                <div class="info">
                    <a href="可以填豆瓣链接" target="_blank" rel="noopener noreferrer" class="book-container">
                        <div class="book" title="我与地坛">
                            <img src="https://cdn.specialhua.top/hexo_img/我与地坛.webp" alt="我与地坛">
                        </div>
                    </a>
                    <div class="info-card">
                        <div class="hidden-content">
                            <p class="text">书籍简介</p>
                        </div>
                        <h3>《书名》</h3>
                        <p>作者：</p>
                        <p>出版时间：</p>
                        <p>
                            <a href="可以填书籍下载链接" target="_blank" rel="noopener noreferrer">📥 下载</a>
                        </p>
                        <p class="pwd-text">
                            提取码：xxxx
                        </p>
                    </div>
                </div>
            </li>
            <!-- 书籍示例2 -->
        </ul>
    </div>
</div>

```

### Step4.编辑`_config.fluid.yml`
在fluid主题配置中，加入导航栏按钮：
```yaml
navbar:
  menu:
    - { key: "书单", link: "/books/", icon: "iconfont icon-book"}
```
`link:`对应上述`hexo new page books`创建的页面，如果不是自行修改。`icon:`参考fluid主题配置文档，默认已提供一些icon图标

### Step5.不用多说
```shell
hexo clean && hexo g

hexo s

hexo d
```

### 效果
![3D书籍效果](https://cdn.specialhua.top/hexo_img/Screenshot_27-11月_16-27-00_16913.webp)

![鼠标悬浮后转2D及显示简介](https://cdn.specialhua.top/hexo_img/Screenshot_27-11月_16-29-41_17402.webp)