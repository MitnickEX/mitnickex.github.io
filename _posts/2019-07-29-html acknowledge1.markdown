---
layout:     post
title:      "五星电器星象仪的开发之路(1)"
subtitle:   "Jenkins Login页的二次开发"
date:       2019-07-29
author:     "MitnickEX"
header-img: "img/post-bg-seo.jpg"
tags:
    - HTML
    - 网站
    - Jenkins
---

*开篇语，此处省略一万字，有机会再补*


- [五星电器星象仪的开发之路(1) - Jenkins Login页的二次开发](http://mitnickex.github.io/2019/07/29/html-acknowledge1/)


----------

# 背景图的设置 #

## 安装Login Page Theme ##
首先需要编辑Login页面的内容，必须安装一个Jenkins的插件——Login Page Theme。
详细的安装步骤和插件地址见另一篇文章《xxxxxxx》(还没写，囧)

## 修饰你的登录页 ##

最最简单又直接的做法是在插件的内容框中加入样式代码。
同时，针对需要修饰的组件进行进行编辑，
比如下面这段代码主要针对.simple-page和.simple-page .logo这2个div进行了样式的处理
 
      <style>
    .simple-page {
    background-image: url('http://172.26.128.128/TestGroup/TOOLS/login.png');
    background-repeat: no-repeat;
    background-size:100% 100%;
    background-position: 50% 0;
    overflow: hidden;
    background-attachment: fixed;
    height: 100%;
    }
    .simple-page .logo {
    background-image: url('/jenkins/static/94b369a7/images/xxx.svg');
    background-repeat: no-repeat;
    background-position: 50% 0;
    height: 230px;
    }
      </style>
    

对应的操作分别是：1.对背景图进行了设置；2.对Logo进行设置。但是在预览后发现第一个针对.simple-page的样式并没有达到覆盖全屏的期望。
![](https://i.imgur.com/Am4yqWp.png)
所以，进行多番调研代码上的尝试，依然没什么用……

最后将.simple-page直接换成了body，完美搞定！！！
![](https://i.imgur.com/aBsHUpi.png)

----
Notes：本篇文章由于时间问题只进行简单尝试，精品文章请持续关注，即将到来！