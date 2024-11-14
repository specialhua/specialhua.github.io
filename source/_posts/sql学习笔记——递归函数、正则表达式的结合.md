---
share: true
categories:
  - 技术
tags:
  - 开窗函数
  - 数据库
  - sql
title: sql学习笔记——递归函数、正则表达式的结合
index_img: https://cdn.specialhua.top/hexo_img/wallhaven-rrl1kj.webp
banner_img: https://cdn.specialhua.top/hexo_img/wallhaven-rrl1kj.webp
date: 2023-10-10 00:11:28
updated: 2024-11-14 00:11:29
comment: true
---
最近在学习数据库的过程中，遇到了需要使用递归来解决的问题，但因为使用的是神通数据库，它似乎搬 的是oracle的一些函数和方法，于是突发奇想直接搜oracle的相关教程，看神通能否执行，结果真的可以，就当一个积累吧，万一以后用到。

### 样表还是经典的emp表

![image-20231008221337873](https://cdn.specialhua.top/picgo/image-20231008221337873.png)

如图，emp表结构为上

empno为员工编号，mgr为这名员工的主管，仅根据这两列就可以涉及到递归的用法

问：如何查出ename为"king"，职位为“president”的员工（即老板）下属的员工情况，及管理层级情况呢？

直接上语句：

```sql
SELECT EMPNO,
	ENAME,
	JOB,
	MGR,
	LEVEL,
	SYS_CONNECT_BY_PATH(ENAME,'->') road
FROM EMP
START WITH empno=7839
CONNECT BY PRIOR EMPNO = MGR;
```

查询结果如下：

![image-20231008223212579](https://cdn.specialhua.top/picgo/image-20231008223212579.png)

### start with 与 connect by

oracle的这种递归方式结构上很明了清晰，`start with`标识了递归的开始，比如这里老板的员工id为7839，因此就指定从这个id开始

connect by 后面跟递归的两个方向，本例中，一个是员工编号empno，一个是主管编号mgr：

可以这样理解：先使用`=`把他们相连，即：`empno = mgr`这是树结构寻径的基本条件

还有一个`prior`它用以表示寻径的方向，若为上面sql语句中的`PRIOR EMPNO = MGR`，即靠在empno这边，即向下寻径，若要向上寻径，则应放在mgr那边，写成这样：`EMPNO = PRIOR MGR`

### level 和SYS_CONNECT_BY_PATH

这俩为可选的“参数”，在递归的时候很好用，level用于生成一个表示该项处于树结构的第几层的伪列，SYS_CONNECT_BY_PATH（列名，连接符）用以生成一条路径，直观表示寻径的过程

### 结合正则表达式

把上一个查询作为子表，可以结合`regexp_substr`使用正则表达式来对上面的路径进行分列

语句：

```sql
SELECT *,
	regexp_substr(road,'[^->]+',1,1) 大领导,
	regexp_substr(road,'[^->]+',1,2) 二领导,
	regexp_substr(road,'[^->]+',1,3) 三领导,
	regexp_substr(road,'[^->]+',1,4) 本人
	FROM(
        SELECT EMPNO,
            ENAME,
            JOB,
            MGR,
            LEVEL,
            SYS_CONNECT_BY_PATH(ENAME,'->') road
            FROM EMP
            START WITH empno=7839
            CONNECT BY PRIOR EMPNO = MGR
);
```

按'->'去分列，可实现在一行内查查询出领导：

![image-20231008230823018](https://cdn.specialhua.top/picgo/image-20231008230823018.png)