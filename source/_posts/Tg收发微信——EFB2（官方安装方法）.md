---
share: true
categories:
  - 技术
tags:
  - wechat
  - EFB
  - bot
  - TG
title: Tg收发微信——EFB2（官方安装方法）
date: 2021-04-02 00:11:07
updated: 2024-11-14 00:11:37
comment: true
---
### 一些话

终究还是要感谢开发、维护的作者、贡献者：
Eana Hufwe
![respect!!!](https://cdn.specialhua.top/blog/2022-03-16-respect.jpeg-pic)

**很高兴自己的文章能够上 Google 搜索的前几名~请留意本文末的“最后编辑时间”，如无意外，截至编辑日时 EFB 项目依然能稳定运行。我会时不时更新一些内容，以便教程能够更清晰、更详细。如果有朋友联系我遇到了什么问题，是如何解决的，我尽量会更新到 `6.3 一些我遇到的问题、报错` 的内容里，以便后来者能够参考。**

我习惯于先写作用，优缺点，再写相关教程，方便你快速地了解，并决定到底搭不搭建。
另外，我讨厌微信，**小而美**，**拉近人与人的距离**，——这些，跟它都毫不搭边，我们太多人被裹挟着使用了它，如果有一天微信不再是应用市场“必装软件”，那该多好啊。。。我所需要的，不过是想念某个朋友的时候，能跟他聊上两句就够了，我不需要那么多的工作群、朋友群、炫耀/广告圈。。。

我常说，我们都是 Wechat OS 的逃离者，很怀念那个只能一条打几十字的短信年代，它给了我们很多思考的时间、措辞的时间、想念的时间。
——而这些，我们终究是没法再踏进历史的河流了。

### 1.关于以前写的一篇

上一篇文章：[利用 Telegram 收发微信——EFB2.0](https://specialhua.top/20190910/cid=8.html) 中使用的是 Docker 方法安装，其实也没有多么的方便，而且由于今晚帮一位哥们安装，走 docker 安了一遍到最后报错如下

![老方法报错](https://cdn.specialhua.top/picgo/%E8%80%81%E6%96%B9%E6%B3%95%E6%8A%A5%E9%94%99.png#mirages-width=619&mirages-height=103&mirages-cdn-type=1)

前面一堆报错，最后关键是：

> "catbaron.sticker2img"is not foung

搜索后，解决方案也有，戳这：[Sticker2Img: A middleware for EFB](%5BGitHub%20-%20catbaron0/efb-sticker2img-middleware:%20Convert%20stickers%20to%20image%5D(https://github.com/catbaron0/efb-sticker2img-middleware))，但是前一篇采用 docker 方式安装后，再进行上面 github 里的操作仍然不行。于是干脆直接找相关官方文档来看，毕竟也好长时间没折腾了。其实整个过程意外的简单，而且后续更新升级也容易。

一些简介性内容就直接搬以前的了。优点和缺点我会讲的更详细一些。

### 2.简介

简单来说，收发原理是：
**Tg 端消息——Telegram bot —— EFB ——微信网页版 ≈ 微信——微信消息**
TG 与微信之间并无联系，但使用了 *EFB 项目（2.1）*，*TG Bot（2.2）*，*微信网页版（2.3）*，即可实现互通

有关更详细的工作原理，请查看 [EFB 工作原理](https://ehforwarderbot.readthedocs.io/zh_CN/latest/guide/walkthrough.html "原理")。

#### 2.1 EH Forwarder Bot（EFB）

EH Forwarder Bot（EFB） 是一个可扩展的开源聊天平台隧道 Bot 框架，目前支持在 Telegram 上收发微信、QQ、Facebook Message 信息，支持文字、语音、图片、视频、表情互通，虽有一些功能限制但可用性良好。

#### 2.2 TG Bot

你可以把 Telegram bot 理解为 QQ 群中某些机器人，在群聊中他能实现入群审核、自动回复等，只不过我们要自己创建机器人，并赋予它一些配合 EFB 使用的指令，就可以使用啦（很简单，不信你往下看）。
我们要做的就是创建 Bot，并把他绑定到 Telegram 自建的各种群组中，比如以对方名称（私人）、以微信群名、以公众号名建立的群组，EFB 负责不停的把这些消息通过 Telegram 群组 id 和微信对话作一一绑定，并收发信息展现在 Telegram 群组中。

#### 2.3 微信网页版

由于手机 APP 及 PC 桌面版的大量使用，现在已经很少有人使用网页版了
本项目需要调用微信网页版。

[tip type="error" title="警告如下！警告如下！警告如下！（重要的事说三遍！）"]

微信会对使用第三方客户端登录微信网页版的用户实行封禁，就是无法再使用网页版登录网页版微信！根据经验微信账号较老的用户封禁率似乎不高。

[/tip]

PS：我的微信号大概是 2013 年创建的，目前使用 EFB 近四年无封禁

---

使用或考虑购买 VPS 以前，首先尝试登录[微信网页版](https://wx.qq.com)，扫码看是否会出现以下提示：

![网页封禁](https://cdn.specialhua.top/picgo/20210401230727.png#mirages-width=2143&mirages-height=364&mirages-cdn-type=1)

否则 ，当你买好 VPS，弄了半天，到最后终于扫码成功时出现以下提示，直接 GG（这也是我帮老哥鼓捣，自己最后折腾了好几次基础环境后，封禁提示才看到）

![最后封禁](https://cdn.specialhua.top/picgo/20210401231143.png#mirages-width=907&mirages-height=301&mirages-cdn-type=1)

---

因此，网页版微信不同于 windows、mac、android 平板，如网页版被封禁，请默默关掉本页，并说一句：**张小龙，sm 玩意儿**

##### 2021-12-26 解封方法

~~此方法预计将急速失效~~。（此方法自 2022 年初就已失效，贴在这里看以后会不会生效吧）
微信网页版解封方法：
先用新上线的网页版文件传输助手 https://filehelper.weixin.qq.com/ 随便传个文件。
再去登录 https://wx.qq.com/ 就会发现微信网页版可以正常登录了。
亲测有效，之前登不上微信网页版要抓住这次机会。

消息来源：
https://hostloc.com/thread-946732-1-2.html

---

### 3.EFB 能实现的功能、优点、缺点

综合考虑微信的功能，对比 EFB 项目，其功能及优缺点如下：

#### 3.1 基础功能

1.**文字消息的收发**
2.**图片的收发**
3.**视频的读取（从 tg 发视频，对方收到的是文件）**
4.**语音的接收（从 tg 发语音，对方收到的是文件）**
5.**传送文件（大于 200M 文件未尝试过）**

#### 3.2 优点

1.**消息云同步，文字，语音，图片，视频，发送的链接，文件都可以永久保存在 tg 云端，这个，可是好的太多！太多！！太多！！！了，以微信的尿性，不占用你 10 个 G 内存说不过去。任何时候你都可以去翻翻某个群、某个好友以前给你发过的东西。（前女友/男友在哪天几点几分伤你心都可以拿出来算旧账@(你懂的)）**

同时，相关信息是被标签所分类的。

**对于查找文件——超级方便，即便你没在微信客户端保存，都会被记录**

**对于微信 OS 动不动就图片已失效——完美复刻，再也不怕领导发给你的图片式工作安排丢了 ，高清大图你值得拥有。**

**对于历史链接——提供预览，再也不用面对看不懂的域名，摸不着头脑。**

**对于 GIFs——搞笑表情包是谁发的，立马就能定位。**

![消息云端](https://cdn.specialhua.top/blog/2022-03-17-20210401233912.png-pic#pic_left)

2.**消息几乎无延迟，对比 Gcmformojo~~（一款曾经代替微信/qq OS 的应用，已成历史）~~，tg 发消息很快，没有卡顿，就像你正常聊天一样，也几乎没有消息发送失败的情况（除非网络抽风，服务器被打/被墙）。**

3.**耗电，明显优于微信毒瘤。tg 自带 Gcm/IOS 同样支持消息推送，如果你需要，可以不留 tg 后台，由 Gcm/IOS push 拉起通知。**

4.**无需强制要求挂梯，以往 Gcmformojo 有的地区需要挂飞机才能收发，而 tg 自带一个代理功能，正常使用 TG 即可通过其内嵌代理收发微信。**

5.**TG 支持的消息功能，将会“镜像”的同步于微信，比如延迟、定时发送消息的功能。**

![定时发送](https://cdn.specialhua.top/blog/2022-03-17-20210401232305.png-pic)

6.**tg 表情包支持，另外注意不要发送涉黄、政治敏感的表情包，避免被微信屏蔽或封禁**

![贴纸](https://cdn.specialhua.top/blog/2022-03-17-20210401232442.png-pic)

7.**公众号信息也能推送，而且 TG 自带应用内浏览器，也能方便的查看公众号推送的文章。支持批量绑定公众号至某一个群组，并设为静音，支持单设某一个或几个公众号的群组进行单独推送。**

8.**多客户端支持，tg 支持很多客户端，如 mac os、ios、andorid、windows、linux，你完全可以用于取代微信各种版本。而且，tg 轻量且速度快。**

9.**分组功能，比如工作群可以全部收到 TG 的文件夹功能下，通过不同选项标签直接展示所有工作群消息。**

10.**聚合聊天，emmm @(勉强)如果你经常水在各种 tg 群、Tg 频道、新闻、科普、资源等等，要转发个什么东西给微信的好朋友看，随手即可转达。**

11.**消息静音设置，这可太方便了，某些特别吵的群，直接不通知，而某些群，需要午休的时候为了避免打扰到自己， 可以选择 tg 的“暂时屏蔽通知”功能，比微信简单粗暴的通知或不通知好太多了。**

![自定义通知](https://cdn.specialhua.top/blog/2022-03-17-20210401233959.png-pic)

12.**硬核物理多开。微信的多开更多的仅限于移动端 +pc 端，或者你用自签名的方式在一台设备上多开 N 个微信账号，对于同一个账号，tg 是支持同账号多设备的，这意味着你可以在多个设备上同时登录同一个 tg 账号，然后不同设备都可以向微信端发送消息。双持，三持，N 持的兄弟就很舒服了。举个例子，你主设备是 ios，同时装 tg 和微信。微信用来刷刷朋友圈，备用机是一台安卓，只装一个 tg，偶尔拿着外出也能收发微信。**

13.**相关中间件支持，例如在 Telegram 上实现语音转文字、Telegram 历史消息搜索、表情包插件等。**

14.**“买一送一”的 Bug 功能——防撤回，以及撤回自己的消息（同样受限于 2min），呃，你的领导深夜喝醉在大群里给老婆发的文字、语音、照片啥的，呃。。。你可以顺手转发到自己的收藏里。。。**

15.**Bug 级“微信”换皮，新春限定？VVIP？NO...你只是逃离了微信 OS 而已。使用 4 年下来，被问的最多的便是“你这什么骚版本的微信？怎么跟我的不一样”，你要说装 B 吧，也是，更多的， TG 支持太多的外观，挺赏心悦目的。**

#### 3.3 缺点

1.语音通话、视频通话不支持，原因比较简单，微信利用自身 APP 实现，当然不能放到 TG 上实现，但是 TG 会发送一段文字，如：

> 微信团队: (不支持)
> [Unsupported message, please check your phone.]

接收到这样的信息请及时打开手机微信查看是否有通话消息，有时还是会遗漏语音通话消息的。

2.默认所有消息会通过你创建的 TG bot 发送给你，也就是你的好友 A,B,C 的消息都通过一个聊天窗口发送给你，刚开始会比较乱，但是通过 TG 的群组功能，可实现消息分流，但需要你手动创建群组 A，群组 B，群组 C 来分流消息。

3.对方发来的定位信息能显示具体的地址和地图简略信息，但因为我国地图算法的加密，google 显示的当然不准确。

4.朋友圈、视频号、游戏——不支持，这年头，正经人谁看广告圈，谁在朋友圈发布自己的负能量，刚好减少自己浪费时间的时光~反倒是优点。

5.企业微信消息，如果你不把该群迁移到企业微信中，正常推送，没有区别。相反，如果你在企业微信里迁移过该群，则消息不再推送到 Tg。两者兼用的朋友，反倒是优点。

---

### 4.准备工作

1.一台能访问国外网站的 VPS 服务器，即要连通 Telegram（我目前在用 UFOVPS，稳定，~~香港双向 cn2 GIA~~(2021-8-20 在用他家的 香港 BGP，最近他家的 CN2 一直被打)目前支持 国内支付渠道，如果有需要的可以用：**[我的推广链注册](https://www.ufovps.com/aff.php?aff=435)**）（它是为了吸引用户，通过分享注册链的方式，如果你用我的链注册并充值 10 元以上，使用 30 天不退款，我会有一定佣金。算是对我的支持吧~）

2.Android 手机搭建需要 Juice ssh 这款软件，如何利用 juicessh 连接服务器在 ` 小白搭建心得(2017Gcmformojo).pdf` 文档靠前部分（使用公钥连接，目前 android 相关 ssh 软件应很多，这里仅供参考）

| 名称           | 下载地址                                                                           | 密码         |
| ---------------- | -------------------------------------------------------------------------------------- | -------------- |
| 小白心得.pdf | https://pan.specialhua.top/s/aXc8<br />https://pan.baidu.com/s/1E2BvTKdGej0lSlkEwNHO_g | 6666<br />sm1p |
| juicessh.apk     | https://pan.specialhua.top/s/LWUq<br />https://pan.baidu.com/s/1bCGWe6                 | 6666<br />xhg2 |

3.IOS 搭建，app store 搜索 Termius，免费就够用。

4.windows 搭建需要 xshell 或 putty 等，请自行上网搜索。

5.Telegram，主体软件。Android play store 或 apkpure 或 IOS app store（非国区账号）

6.系统使用 Ubuntu 20.04 x64

### 5.主体教程

**对于在 ssh 客户端中执行的 linux 代码，有些我会用形如 `sudo su` 这样的格式来表达（夹穿插在文字叙述部分），而为了保证美观，大部分代码（在换行后，或者说独立于文字叙述的）我会使用下面第一种“引用”样式。**
**而需要在 nano、vim 等编辑界面编辑的内容，我会使用下面第二种“代码框”样式来示范需要填写的内容。**

> `hello word!`
> `这里并没有1，2，3，4的行号，是一句一句执行的代码`

```
hello word!
这里有1，2，3，4的行号
```

参考的文档：

[官方文档](https://ehforwarderbot.readthedocs.io/en/latest/)

[ehForwarderBot 遇到的那些坑](https://blog.shzxm.com/2020/12/31/efb/)，作者的[博客](https://blog.shzxm.com/)，感谢这位大佬，很详细了，**安装过程几乎都是搬运的他的，在他的原文里还指出了大量官方插件等文档。**

---

#### 5.1 配置 TG 机器人阶段

##### 5.1.1 获取 Bot Token

1.在 Telegram 里, 对 @botfather 说话: /newbot
2.按照要求给 Bot 取名
3.获取 Bot Token 安全原因: Token 必须保密（这串 token 要记好，**待会要用**）
4.允许 Bot 读取非指令信息，对 @botfather 说话: /setprivacy, 选择 disable
5.允许将 Bot 添加进群组，对 @botfather 说话: /setjoingroups, 选择 enable
6.允许 Bot 提供指令列表，对 @botfather 说话: /setcommands, 输入以下内容

```
help - 显示命令列表.
link - 将远程会话绑定到 Telegram 群组
chat - 生成会话头
recog - 回复语音消息以进行识别
info - 显示当前 Telegram 聊天的信息.
unlink_all - 将所有远程会话从 Telegram 群组解绑.
update_info - 更新群组名称和头像
extra - 获取更多功能
```

(复制以上内容一次性发给 botfather)

##### 5.1.2 获取 Telegram 账户 ID

再和另外一个机器人 @get_id_bot 对话（也是搜索得到这个机器人），点击 start 即可获得你的 Telegram ID，一串数字（Chat ID）。

至此，Telegram 的配置完成，我们得到两个重要东西：**token、Telegram ID**（**待会要用**）

形如：

> token——123456789:ABCDEFG1ABCDEFG1ABCDEFG1
>
> Telegram ID——987654321

#### 5.2VPS 搭建

##### 5.2.1 依赖环境安装

> `sudo su`
> `apt full-upgrade -y`
> `apt install python3 python3-pip python3-setuptools python3-yaml ffmpeg  libcairo2-dev  libcairo2 nano -y`
> `python3 -m pip install --upgrade pip`
> `python3 -m pip install --upgrade Pillow`

##### 5.2.2 安装 efb 主体

> `pip3 install ehforwarderbot`
> `pip3 install efb-telegram-master `
> `pip3 install efb-wechat-slave`
> `pip3 install --upgrade Pillow`

##### 5.2.3 贴纸插件

确保你安装成功 libcairo2，把 tg 的贴纸发送到微信

> `pip3 install "efb-telegram-master[tgs]"`

#### 5.3 配置文件

`mkdir` 是新建文件夹语法，nano 保存退出是<kbd>ctrl</kbd>+<kbd>x</kbd>

根目录下：

> `mkdir -p /root/.ehforwarderbot/profiles/default/`

> `mkdir -p /root/.ehforwarderbot/profiles/default/blueset.telegram`

##### 5.3.1 配置 default/config.yaml

上面第一行代码，创建了 `~default/` 目录，还是在根目录下，使用 nano 编辑并粘贴以下内容：

> `nano /root/.ehforwarderbot/profiles/default/config.yaml`

```
master_channel: blueset.telegram
slave_channels:
- blueset.wechat
flags: 
  delete_on_edit: true
```

**（注意格式！有的手机 juichssh 粘贴进去以后并不会分段，或首字母缺失）**

##### 5.3.2 配置 default/blueset.telegram/config.yaml

上面第二行代码，创建了 `~blueset.telegram` 目录，还是在根目录下使用 nano 编辑、替换自己的 `token`,`telegram id` 粘贴以下内容：

> `nano /root/.ehforwarderbot/profiles/default/blueset.telegram/config.yaml`

```
token: "" #在""中间 填入你之前找botfather申请的api
admins:
- 1234 #把数字修改为你的个人 telegram id 在上方获取过
#- 1279136259 #如果,想要多个账号使用同一个微信,可在这里加入第二个id或者多个id,去掉开头的#
flags:
  send_image_as_file: false
  #将所有图像消息作为文件发送,以防止主动报文的图像压缩.需要更多的流量,可以开启,改为ture
  animated_stickers: true
  #启用对动画贴纸的实验性支持启用对动画贴纸的实验性支持,该依赖已包含在教程依赖
  default_media_prompt: text
  #图片/视频/文件消息没有标题时的占位符文本.
```

一个样例：

```
token: "123456789:ABCDEFG1ABCDEFG1ABCDEFG1" 
admins:
- 123456789
flags:
  send_image_as_file: false
  animated_stickers: true
  default_media_prompt: text
```

**（注意格式！有的手机 juichssh 粘贴进去以后并不会分段，注意首字母可能缺失）**
**（`send_image_as_file` 字段我建议使用 false，不然所有图片文件都将以文件形式呈现，使用 false 的话，除非对方选择以原图发送，否则就是正常的图片）**

#### 5.3 启动

根目录下：

> `ehforwarderbot`

此时，扫码要使用手机后置摄像头，截图并在相册里选择二维码的方式会遭遇微信提示不能登录

如果此时你已成功登录，在你的 xshell 等终端工具关闭以后，EFB 自然掉线，因为没有做进程守护，此时请看下面的 6.3.2 的内容。

### 6.使用你的 EFB 机器人

#### 6.1 简单用起来吧

此时别关掉你的 ssh 客户端哦，一关掉 efb 进程就被结束了。这部分内容你可以当作成功运行 EFB 后体验一下具体的操作，如果要关掉 ssh 客户端还能继续使用的话，请看 `6.2.1 后台` 部分。
和你之前申请的 bot 对话 发送 `/start`

其余常用命令：

`/chat` 为 和谁对话

> 若是在 Bot 中对方发来消息，在 Telegram 中回复该对话（Android 应为长按该消息，IOS 左滑该消息），可以直接回复给该人。在新版本 EFB 中，回复过该人消息一次，接下来短期内的连续对话，不用每一条都一一“引用”该消息，直接对你的 Bot 对话，所有消息都将发送给该人。

`/link` 为 绑定对话到某个群组

> 下面使用一个例子来说明（假设你有一名叫李 AB 的好友）
>
> 1. 首先在 Telegram 中创建一个新的群组，就用李 AB 这个名字，然后将你的机器人邀请进来，群组创建完毕。
> 2. 回到你的机器人对话中，输入 /link 李 A（不必输全名，机器人会检索含有此关键字的所有好友，然后选中李 AB，选择 link，选择你刚刚创建的 梁 AB 这个群组，成功后，以后这个叫李 AB 的好友发来的信息不会在机器人那显示了，而是在这个群组）
> 3. 常聊的几个人、工作群、公众号、不常看的公众号单独建 TG 群，使消息分流，其余不常用的，使用机器人窗口接收

`/rm` 为 撤回某条消息，和微信的规则是一样的，2 分钟内都可以。具体使用为回复要撤回的内容并发送 `/rm`
`/extra` 主要为掉线重新登录 或者 强制刷新对话列表使用
`/update_info` 为当前的群组更新微信信息，在群组中使用，可以更新群聊头像为群组成员，群组名称为微信群聊名称

#### 6.2 后台、更新

##### 6.2.1 后台

进程守护 可以确保 efb 在后台运行

> `cd /etc/systemd/system/`
> `nano efb.service`

进入编辑界面后 复制粘贴下列代码 `ctrl+x` 保存退出

```
[Unit]
Description=ehforwarderbot
After=network.target

[Install]
WantedBy=multi-user.target

[Service]
Type=simple
WorkingDirectory=/root
ExecStart=/usr/local/bin/ehforwarderbot
Restart=always
```

接着 输入以下代码启动 efb，并开机自启 efb

> 1.重新加载进程守护
> `systemctl daemon-reload`
> 2.进程守护 启动 efb
> `systemctl start efb.service`
> 3.打印日志，此时不会直接显示二维码，而需要你打开 https 的链接，进行扫码登录
> `journalctl -f -u efb.service`
> 4.进程守护 开机自启 efb
> `systemctl enable efb.service`

另外的，这里我把常用的 `systemctl` 命令合集放在这里，方便你随时查看。
停止、启动、关闭自启、查看状态、打印后台日志，可以使用以下这些代码（这里为保持美观，我只是使用代码框包裹住了这些命令）

> ```
> #进程守护 停止efb
> systemctl stop efb.service
> #进程守护 启动efb
> systemctl start efb.service
> #进程守护 关闭开机自启efb
> systemctl disable efb.service
> #查看当前 efb 状态
> systemctl status efb.service
> #实时查看 efb 守护日志
> journalctl -f -u efb.service
> ```

##### 6.2.2 更新

> `pip3 install --upgrade ehforwarderbot`
> `pip3 install --upgrade efb-telegram-master`
> `pip3 install --upgrade efb-wechat-slave`

#### 6.3 一些我遇到的问题、报错

##### 6.3.1 Cannot uninstall 'PyYAML'

在帮别人安装时，`ehforwarderbot` 后，出现报错如下：

```
root@xxx:~# ehforwarderbot
……省略……
Traceback (most recent call last):
  File "/usr/local/bin/ehforwarderbot", line 8, in <module>
    sys.exit(main())
  File "/usr/local/lib/python3.6/dist-packages/ehforwarderbot/__main__.py", line 330, in main
    conf = config.load_config()
  File "/usr/local/lib/python3.6/dist-packages/ehforwarderbot/config.py", line 61, in load_config
    raise ValueError(_("\"{}\" is not found.").format(i))
ValueError: "blueset.wechat" is not found.
```

最后一句表明主体 `efb-wechat-slave` 并没有安装好，尝试再次安装

```
root@xxxxx:~# pip3 install efb-wechat-slave
Collecting efb-wechat-slave
  Using cached efb_wechat_slave-2.0.4-py3-none-any.whl (216 kB)
 省略``
Installing collected packages: PyYaml, itchat, efb-wechat-slave
  Attempting uninstall: PyYaml
    Found existing installation: PyYAML 3.12
ERROR: Cannot uninstall 'PyYAML'. It is a distutils installed project and thus we cannot accurately determine which files belong to it which would lead to only a partial uninstall.
```

最后一句红字报错，翻译过来就是，错误：无法卸载“ PyYAML”。 这是一个 distutils 安装的项目，因此我们无法准确确定属于该文件的文件，这只会导致部分卸载。
pip 10 不再卸载 distutils 软件包。所以降级到 pip 8.1.1，根目录下：

> `sudo -H pip3 install pip==8.1.1`

再次安装 efb-wechat-slave，安装代码见 5.2.2 部分。

##### 6.3.2 simplejson.errors.JSONDecodeError

在 ehforwarderbot 运行之后，表现为 `Initializing slave blueset.wechat...` 之后，提示如下：

```
2021-04-21 02:25:24,378 [Level 99]: ehforwarderbot.__main__ (__main__.init; [*main*.py:129](main.py:129))
 Initializing slave blueset.wechat...
Traceback (most recent call last):
File "/usr/local/bin/ehforwarderbot", line 8, in <module>
sys.exit(main())
File "/usr/local/lib/python3.8/dist-packages/ehforwarderbot/__main__.py", line 339, in main
。。。省略。。。
File "/usr/lib/python3/dist-packages/simplejson/decoder.py", line 400, in raw_decode
return self.scan_once(s, idx=_w(s, idx).end())
simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
```

解决方案：
1.使用电脑打开微信网页版，检查你的 Web 网页登录权限是否健在
2.重启 vps，重新登录看是否好转
3.尝试删除这个文件：

> .ehforwarderbot/profiles/default/blueset.wechat/wxpy.pkl
 <br>具体为：

> `rm -f .ehforwarderbot/profiles/default/blueset.wechat/wxpy.pkl`

4.使用 `kill -9` 强制关闭 ehforwarderbot 进程
2021 年 12 月 23 日，我的朋友、以及在群里的部分人遭遇了掉线，以及如上报错，使用该方法成功登录

在使用 `systemctl start efb.service` 指令后，使用 `ps -aux` 查看当前所有进程的情况

你会发现 ehforwarderbot 的 PID 一直在变，于是使用简单的 kill 命令无法正常关闭该进程，使用以下命令（多运行几次），将其结束掉

> `ps aux | grep ehforwarderbot | awk '{print $2}'  | xargs kill -9`

再次使用 `ps -aux` 查看进程直至 ehforwarderbot 已经被关闭，稍等片刻再尝试登录

##### 6.3.3 冲突轮询，请确保只有一个实例在运行

一般是你刚使用 `ehforwarderbot` 进行登录后，由于你继续使用 `systemctl` 做进程守护，导致运行了两个实例，只需要确保进程守护已经做好后：
1.把 efb 进程停止

> `systemctl stop efb.service`

2.查看一下 efb 进程是否为 died，而非 running

> `systemctl status efb.service`

3.使用 `systemctl start efb.service` 启动 EFB，而不是刚开始搭建完毕时使用的 `ehforwarderbot`，并用 `journalctl -f -u efb.service` 来查看后台进程的情况。

4.如出现二维码 qrcode 的链接，打开或复制到浏览器去扫码登录，如提示正在初始化从端、加载中间件、所有中间件加载完毕等字样，说明已经登录成功了。

##### 6.3.4 偶尔发现没有消息推送了怎么办？

虽说 EFB 能保持数月不掉线。
但为延长续航，我用空调狗等 APP(Android) 冻结了微信、IOS 不开启消息微信推送，但是手机版微信不能长期不上线，有时候手机关机没电太久，也会导致 EFB 掉线，这时就需要到 VPS 服务器控制端，手动重启服务器，一般就能重连。

### 7.EFB 讨论相关

[Github Discussions (论坛/社区)](https://github.com/ehForwarderBot/ehForwarderBot/discussions) *主要* 讨论社区

[Telegram 频道](https://t.me/EFBSupport)群组入口请从此处进入
