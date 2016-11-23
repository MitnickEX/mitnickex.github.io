---
layout:     post
title:      "那些超有用的工具(2)"
subtitle:   "性能测试工具"
date:       2016-11-23
author:     "MitnickEX"
header-img: "img/post-bg-basic-acknowledge.jpg"
tags:
    - 测试工具
    - Web

---

*又是一个好长时间没更新，不是我懒，真的是最近项目全起来了。说到今天要介绍的这个工具最早是在[欧朋](http://www.oupeng.com)工作时，听当时一个领导兼前辈兼邻居TC说的，当时只觉得这个工具很牛逼，和时下流行的Loadrunner以及Jmeter截然不同，但是并没有去自己试用一番。*

# What is Locust? #
官方的定义是一个**easy-to-use**并且**distributed**的**user load testing tool**。它适用于负载测试网站（或其他系统），并计算出一个系统可以有多少并发用户处理。

正如翻译过来的中文名字“蝗虫”，在测试过程中，一大群蝗虫会攻击你的网站。而其中每只蝗虫的行为是由你定义的，并且在swarming过程中会显示实时的Web UI监视。
![](http://i.imgur.com/jgEGZqq.png)

Locust是完全基于事件的，因此它可以支持数千个并发用户在一台机器上。与许多其它的基于事件的应用它不使用回调。相反，它使用轻量进程，通过GEVENT。官方给出的说法是：

>Each locust swarming your site is actually running inside its own process

但是，有一点需要注意的它完全基于Python开发，用Python来编写用户行为。嗯，如果想用好它的话，你必须对Web开发有一定的认识。而且还要熟悉Python开发。

# Installation #


1.安装Python

Python的安装在这里就不展开了，官方：https://www.python.org/
另外，建议安装Python 2.6以上的版本，最好不要下载Python 3.x，因为和Locust兼容性不好。

2.安装Locust

- 通过pip命令安装 

		pip install locustio

- 通过easy_install安装

		easy_install locustio

- 通过GitHub上克隆项目安装（Python3推荐）

		https://github.com/locustio/locust

3.安装ZeroMQ

> If you intend to run Locust distributed across multiple processes/machines, we recommend you to also install pyzmq.

如果你打算运行Locust分布在多个进程/机器，我们建议你也安装pyzmq。

    pip install pyzmq

4.安装成功，CMD敲入命令验证。 
	
	locust --help

Tips：Read more detailed installations instructions in the [documentation](http://docs.locust.io/en/latest/installation.html).

# Quick Start #

创建一个python文件，通过Python编写性能测试脚本。如下：

	# -*- coding:utf-8 -*-
	from locust import HttpLocust, TaskSet, task
	class UserBehavior(TaskSet):
	    @task(1)
	    def baidu(self):
	        self.client.get("/")
	class WebsiteUser(HttpLocust):
	    task_set = UserBehavior
	    min_wait = 3000
	    max_wait = 6000

- 创建UserBehavior()类继承TaskSet类，为用户行为。
- 创建baidu() 方法表示一个行为，访问百度首页。用@task() 装饰该方法为一个任务。1表示一个Locust实例被挑选执行的权重，数值越大，执行频率越高。在当前UserBehavior()行为下只有一个baidu()任务，所以，这里的权重设置为几，并无影响。
- WebsiteUser()类用于设置性能测试。
- task_set ：指向一个定义了的用户行为类。
- min_wait ：用户执行任务之间等待时间的下界，单位：毫秒。
- max_wait ：用户执行任务之间等待时间的上界，单位：毫秒。

用上述文件运行Locust，如果他命名为load_test.py，我们可以在该目录下运行：

	locust -f load_test.py --host=https://www.baidu.com

load_test.py 为测试脚本，https://www.baidu.com 为测试的网站。

打开浏览器访问：http://127.0.0.1:8089
![](http://i.imgur.com/OeZElgS.png)

- Number of users to simulate：设置模拟用户数
- Hatch rate (users spawned/second)：每秒产生（启动）的用户数

最后，点击Start swarming 开始运行性能测试。