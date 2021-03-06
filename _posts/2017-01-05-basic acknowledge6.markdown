---
layout:     post
title:      "服务端用例设计的思路"
subtitle:   "为全栈而奋斗"
date:       2017-01-05
author:     "MitnickEX"
header-img: "img/post-bg-basic-acknowledge.jpg"
tags:
    - 用例
    - 服务端

---

*写在前面，本文转自搜狗测试，[原文地址](http://mp.weixin.qq.com/s?__biz=MjM5ODY4ODIxOA==&mid=2653200712&idx=1&sn=bce31744edcb113e2e1c8d51a1959e02&chksm=bd16e5fd8a616ceb07bd5a745395ad1f699a6384b9f0dceb40cdcabb53f4951e4440c07807f4&mpshare=1&scene=1&srcid=0105pmnIkA6f4HQwjyCFewxT#rd)*

首先服务端的测试包含哪些东西呢?
第一反应是不是,服务端嘛~!就是后端,就是java,就是php,就是c++
![](http://i.imgur.com/lDEzEGS.png)
.那些都是语言.当然语言也会成为测试内容的一部分.
实际上,服务端的测试简单来说就是除了前端以外的的测试,

![](http://i.imgur.com/lZzlang.png)

总的来说可以分为以下两类:

**1. WEB或者APP的提供业务逻辑的服务端接口测试**

**2. 数据库、缓存系统、中间件、、jar包依赖、输入输出敏感信息等测试**

> 其中接口测试占据工作工作中的80%,接口测试的重点是要检查数据的交换，传递和控制管理过程，以及系统间的相互逻辑依赖关系等。下面粗略的列举出测试的几个点。

1.    检查接口请求是否正确，返回数据的正确性与格式
2.    检查接口入参的默认值、参数类型、非空校验、以及边界值检查接口的容错性.
3.    所有功能都需要考虑兼容老版本，列表页的接口需考虑排序值
4.    检查接口的性能以及安全性
5.    对于接口内部依赖接口的不可靠性预防(如:依赖的第三方接口超时)

那么有人要问了,那么对于接口测试如何才能做到完善完备的测试呢?

下面干货来了,在写测试用例时候可以根据该图的思路分支进行用例设计。
![](http://i.imgur.com/NNdfPLN.png)

---

对于第二部分的后端的数据库、缓存系统、中间件、文件系统、jar包依赖、输入输出敏感信息等测试这方面其实是要根据各个公司的流程和实际的开发环境来决定的,以下是前辈在实际项目中一些总结,请对号入座各取所需

**1.      性能**

- 项目涉及老系统的QPS是多少？新系统预估的QPS是多少？如何预估的？
- 项目对外提供接口或者页面的平均响应时间是多少？
- 修改对系统的请求量是否会有影响？预估变化是多少？要给出计算和评估方式，不能拍脑袋！
- 修改对系统的处理能力是否会有影响？对CPU和内存开销影响有多大？响应时间是否会变慢？
- 修改对公共系统是否有影响，如数据库，消息中间件。

**2.      内容**


i.页面   


- 资源

	(1)所有页面资源要转到公司统一CDN的下，所有资源要写相对路径
  
	(2)所有的地址在上线前都要检查为外网地址


- 文字描述

	公司名称等名词正确，语句通顺，无错别字。

**3.      数据**

- 对老数据的影响:此次上线的接口模块产生的一系列活动和效果对老数据的影响
- 金额计算:验证精度匹配
- 接口参数类型:参数是否都是用到了对应类型如:bigdecimal
- 备份:是否涉及数据备份？
- 数据清洗:是否需要对老数据进行清理和处理？
- 初始化脚本:核对初始化脚本数据正确、是否齐全

**4.      安全**

i.敏感信息测试

- 请求方式:请求中包含敏感信息的要使用post请求（使用live http header工具查看）
- 多余敏感信息:当接口返回中有当前页面不需要的敏感信息时要对接口拆分
- 敏感信息隐藏:页面中有屏蔽敏感信息的要查看其原代码是否会明文显示
生成的订单等打码,手机号前三后四作为显示

ii.越权访问

- 无权限:无权限访问有权限页面或接口（如：未登录访问已登录页面）
- 低权限:低权限访问高权限页面或接口

**5.      冲突测试**

i.接口并发测试

- 多线程

	(1)是否涉及数据库操作的多线程并发？

	(2)多线程是否需要加锁进行处理？

ii.管理后台

管理后台同时操作测试

**6.      第三方依赖测试**

如果是java:是否引用了第三方的jar包？本次升级是否依赖第三方jar更改？

**7.      系统结构**

i.新应用

- POM文件:新服务器
- 数据库访问权限:要有所使用库的访问权限
- 配置文件:配置文件名称规则、配置文件内容

ii.系统结构

- 外部系统异常，数据持久层异常（redis，memcache，db异常）,是否捕捉，是否影响主流程？
- 外部系统异常，调用第三方接口返回失败，异常，超时，是否捕捉，是否影响主流程？
- 对外部系统异常必须try catch
 
**8.      对外部系统影响，服务提供者与服务消费者**

i.对上游系统

- 是否修改原有接口的数据结构与返回数据的格式？
- 都有哪些外部系统（上游系统）调用了被修改的接口？

ii.对下游系统

- 是否新增调用第三方接口（包含下游系统，数据库，消息中间件）？
- 对新增调用第三方接口（包含下游系统，数据库，消息中间件）的压力有多少大，多少QPS？
- 接口调用方是否有缓存？自己是否需要做缓存？

**9.      监控**

- 项目上线后是否响应监控？监控是否加告警？
- 项目发布后应该查看哪些监控？

**10.  日志**

- 日志级别:应为INFO级别 
- 关键业务流程和异常流程是否有日志记录？

**11.  发布流程**

i.数据脚本

- 最后一个版本由DBA审核通过(业务不同要求不同)
- 内容正确，特别是涉及到展现给用户的文字（包括业务端用户和运营人员）
 
ii.业务端确认

- 核查收到需求文档中所列各业务端总监确认邮件。    
- 确认内容为知晓此事并做相应改动或无影响。
- 系统的业务峰值时间段是什么？是随时发布，还是业务低谷发布？

iii.周知人员

- 协调PM、开发做好发布前准备
- 工作时间发布管理后台，需要PM提前通知运营人员

iiii.发布评审

- 复杂项目必须提前定义发布流程，要求拉着QA leader，开发leader一起确认。

总结以上,可以形成一个进行接口测试的模板,
![](http://i.imgur.com/PDbLITg.jpg)
网盘地址[http://pan.baidu.com/s/1kVpwUZ9](http://pan.baidu.com/s/1kVpwUZ9)