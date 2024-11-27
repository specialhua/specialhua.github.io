---
share: true
categories:
  - 技术
tags:
  - blog
  - qexo
  - error
index_img: https://cdn.specialhua.top/hexo_img/wallhaven-dgp9pl.png-pic
banner_img: https://cdn.specialhua.top/hexo_img/wallhaven-dgp9pl.png-pic
comment: true
title: 记一次qexo说说Error500崩溃
date: 2024-11-28 02:11:57
updated: 2024-11-28 02:11:05
---
### 表现
在一次用手机（IOS18.1 safari）更新说说的标签时，成功发布说说，但是qexo后台访问说说页面时直接报错Error 500，表现为页面`https://qexo地址/talks.html`页面报错如图，但是其他后台管理页面正常。尝试通过qexo配置手册里的修复、重新部署均无法恢复。
![崩溃页面](https://cdn.specialhua.top/hexo_img/Screenshot_28-11月_02-30-03_193.png-pic)

### 排查
搜索qexo的issues，尝试查找`500`关键字，发现有关回答与数据库相关，于是想到可能是数据库字段内容出错导致炸了。

{% note warning %}
我使用的是qexo一键部署至vercel，数据库使用的是neondb
**如果你使用的是其他部署方式，或自建服务器方式，请根据自己的情况查看数据库表格的存储位置**
{% endnote %}


打开vercel，进入到qexo项目，在`Storage`选项内，右边有`Open in Neon`按钮，点击后进入数据库后台，如图，在`BRANCH——Tables——hexoweb_talkmodel`中可以看到**奇怪**的一点：
time字段，测试崩溃的数据值为`NaN`，猜测是数据库没对time字段，或是qexo没对该字段进行约束导致，可能是手机在更新说说时，意外的在时间字段传入了`NaN`，导致qexo说说后台无法正常读取数据，从而报错。
![Neondb后台](https://cdn.specialhua.top/hexo_img/Screenshot_28-11月_02-38-35_5582.png-pic)

### Bug复现
正如上图，在qexo后台说说管理页面，随便新建一条说说，将`更新于：`(yyyy-mm-dd hh:mi:ss格式)，直接写上NAN（删除时间留空是可以的，会自动捕获当前时间并转换为Unix时间戳），能够正常提交说说，但是当再次进入说说管理页面时，就报错了


### 解决
进入neondb后台管理，将`time`字段的值改为正常的Unix时间戳，可以用[时间戳转换器](https://tool.chinaz.com/tools/unixtime.aspx)进行转换，或者嫌麻烦，直接填写上下类似的值，并`Save change`即可。等待数据库update数据之后，再次进入说说页面就正常了
![Screenshot_28-11月_02-46-03_9311.png](https://cdn.specialhua.top/hexo_img/Screenshot_28-11月_02-46-03_9311.png-pic)

### 后记
已同步提交此bug至[qexo issues](https://github.com/Qexo/Qexo/issues/592)，向作者反馈问题，后续如有更新可能会修复bug