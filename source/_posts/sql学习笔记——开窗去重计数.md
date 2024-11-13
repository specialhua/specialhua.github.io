---
share: true
categories:
  - 技术
tags:
  - 开窗函数
  - 数据库
  - sql
title: sql学习笔记——开窗去重计数
date: 2023-10-11 00:11:19
updated: 2024-11-14 00:11:43
---
最近在做题时碰到很多次最终的结果要计算“平均值”的情况。而这种平均值的分子往往是分组后各自有“几行”，分母往往是“组内有几个”（要去重）的问题

组内求和、计数很简单，我做题时很喜欢开窗出来看一下分组求和的结果，思维习惯使然，我总是不想在最开始就把题目抽象到去group by哪几列，我喜欢站在大局上去观察这个表，很可能我还需要去观察其他列的情况，一开始就用group by抽象掉太没意思了。

那么问题来了，如何解决count(distinct uid)只能用在普通聚合、无法运用在开窗函数的情况？

场景是这样的：

### 题目

![image-20231011223511130](https://cdn.specialhua.top/picgo/image-20231011223511130.png)

有一张用户登录情况表（TB_USER_LOG）如上图，建表语句如下（神通数据库中时间戳为timestamp，sql、mysql中应为datetime，如需要，自行修改）：

```sql
CREATE TABLE tb_user_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid INT NOT NULL,
    artical_id INT NOT NULL,
    in_time TIMESTAMP,
    out_time TIMESTAMP,
    sign_in TINYINT DEFAULT 0
);
```

测试数据：

```sql
INSERT INTO tb_user_log(uid, artical_id, in_time, out_time, sign_in) VALUES
  (101, 9001, '2021-11-01 10:00:00', '2021-11-01 10:00:31', 0),
  (102, 9001, '2021-11-01 10:00:00', '2021-11-01 10:00:24', 0),
  (102, 9002, '2021-11-01 11:00:00', '2021-11-01 11:00:11', 0),
  (101, 9001, '2021-11-02 10:00:00', '2021-11-02 10:00:50', 0),
  (102, 9002, '2021-11-02 11:00:01', '2021-11-02 11:00:24', 0);
```

表结构：uid-用户ID, artical_id-文章ID, in_time-进入时间, out_time-离开时间, sign_in-是否签到

业务逻辑：**artical_id-文章ID**代表用户浏览的文章的ID，**artical_id-文章ID**为**0**表示用户在非文章内容页（比如App内的列表页、活动页等）。

### 问题：

统计2021年11月每天的人均浏览文章时长（秒数），结果保留1位小数，并按时长由短到长排序。

输出结果如图：

![image-20231011224024100](https://cdn.specialhua.top/picgo/image-20231011224024100.png)

### 普通常规思路

最后结果是两列，dt及avg_viiew_len_sec

那么group by 部分肯定dt咯，前面去做聚合就行了。

```sql
SELECT date_format(IN_TIME,'%Y-%m-%d') dt,
	ROUND(SUM(datediff('ss',IN_TIME,OUT_TIME))/COUNT(DISTINCT UID),1) as avg_view_len_sec
FROM TB_USER_LOG
WHERE date_format(OUT_TIME,'%Y%m')='202111' AND ARTICAL_ID <>0
GROUP BY dt
ORDER BY avg_view_len_sec DESC;
```

### 如果我就是要用开窗做呢？

首先很容易想到的语句是这个：不管三七二十一先把那些可能用的上的列选上，sum来求一下时间差的和，语句和图分别为：

```sql
SELECT ID,
	UID,
	ARTICAL_ID,
	date_format(IN_TIME,'%Y-%m-%d') dt,
	SUM(datediff('ss',IN_TIME,OUT_TIME)) OVER(PARTITION BY date_format(IN_TIME,'%Y-%m-%d')) sum_vt
FROM TB_USER_LOG;
```

![image-20231011230549856](https://cdn.specialhua.top/picgo/image-20231011230549856.png)

那么下一步就很容易想到，接着上count啊，把uid里同一天的数出来有几个就好了，所以写成这样，当然是要报错的，distinct在窗口函数中不被支持：

```sql
SELECT ID,
	UID,
	ARTICAL_ID,
	date_format(IN_TIME,'%Y-%m-%d') dt,
	SUM(datediff('ss',IN_TIME,OUT_TIME)) OVER(PARTITION BY date_format(IN_TIME,'%Y-%m-%d')) sum_vt,
	COUNT(DISTINCT UID) OVER(PARTITION BY date_format(IN_TIME,'%Y-%m-%d')) cnt
FROM TB_USER_LOG;
```

![image-20231011230900405](https://cdn.specialhua.top/picgo/image-20231011230900405.png)

### 理解dense_rank()

对于计算机来说，你要它去计数，它至少要分别得出两样东西，一是“这个东西是啥？”——字符串？int?二是“它跟其他的一样么？”——“A”与“B”是一个东西么？**于是它与排序的关系是密不可分的**，如果我们使用`dense_rank()`来对uid进行排序呢？别忘了，字符串也能排序，底层的ASCII编码极大的帮助了我们，A-Z,a-z,0-9顺序和我们的int也是极契合的。

```sql
SELECT ID,
	UID,
	ARTICAL_ID,
	date_format(IN_TIME,'%Y-%m-%d') dt,
	DENSE_RANK() OVER(ORDER BY UID) rn,
	SUM(datediff('ss',IN_TIME,OUT_TIME)) OVER(PARTITION BY date_format(IN_TIME,'%Y-%m-%d')) sum_vt
FROM TB_USER_LOG;
```

看，rn这列，UID为102的在同一天rn都为2，这样无论他有多少重复的uid都能"count"了

![image-20231011231911064](https://cdn.specialhua.top/picgo/image-20231011231911064.png)

所以，你也想到了，**`dense_rank() over()`结合`max() over()`应该能解决我们的问题了**，来看一下最后的代码（没有选前面的id,uid,artical_id等）

```sql
SELECT DISTINCT dt,
	ROUND(sum_vt/MAX(rn) OVER(PARTITION BY dt),1) avg_view_len_sec
FROM (
	SELECT date_format(IN_TIME,'%Y-%m-%d') dt,
		DENSE_RANK() OVER(ORDER BY UID) rn,
		SUM(datediff('ss',IN_TIME,OUT_TIME)) OVER(PARTITION BY date_format(IN_TIME,'%Y-%m-%d')) sum_vt
	FROM TB_USER_LOG
	WHERE date_format(OUT_TIME,'%Y%m')='202111' AND ARTICAL_ID <>0
)
ORDER BY avg_view_len_sec DESC;
```