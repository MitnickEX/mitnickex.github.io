---
layout:     post
title:      "那些超有用的工具(3)"
subtitle:   "Instrument入门"
date:       2017-01-11
author:     "MitnickEX"
header-img: "img/post-bg-basic-acknowledge.jpg"
tags:
    - 测试工具
    - Web
    - iOS
    - Instrument

---

*最近又没更新，因为最近又超充实囔~~~忙成狗了！！！！但是往往是这种时候才会有突破，今天分享一个iOS的性能工具。另外，预告下忙过这阵会发布一个超级大干货，关键词：Python、Beatifulsoup，懂的自然懂了。*
 
## Instrument介绍 ##
Instruments是一个强大灵活的性能分析和测试工具，能够帮助你分析OS X和iOS上的应用程序及进程，以便于更好地了解和优化其性能。
 
## Why: 忙忙人海为什么选中了你 ##
iOS本身可用的性能测试工具并不多，为什么选择instruments:

1. 越狱设备可通过后台进程采集数据，但是新设备无法越狱
2. 在APP中嵌入性能采集模块，但是第三方应用无法使用

所以，选择Apple自己家的instruments
 
## When: 什么时候使用instruments ##
当你想要对APP性能进行调优测试，解决问题，分析cpu、内存、资源消耗等信息时，就可以使用instruments 进行监控。

在使用instruments之前可以使用xcode参考调试导航栏中指标信息，如图所示：
![](http://i.imgur.com/Pg42mx3.png)
但是xcode 调试获取到数据信息同release版本可能并不一致，并不能够真实的表达线上版本APP相关的性能指标，因此若想获取更真实的数据、同时想获得更详细的信息时，就可以使用instruments。
 
## What：Instruments能够为你做什么？ ##
1. 检查一个或多个应用、进程的运行情况
2. 检查设备详细的配置，例如WiFi，蓝牙
3. 在模拟器或真机上执行概要分析
4. 可以自动以的设置DTrace 工具，用来分析系统和应用程序的运行情况
5. 跟踪源代码中存在的问题
6. 对应用进行性能分析
7. 查找应用中的内存问题，如内存泄漏等问题
8. 确定优化应用程序的方法，从而提高性能
9. 排除常规系统故障
10. 可以将工具的配置作为模板保存起来
 
## How：怎样使用Instruments？ ##
**举个栗子(timeprofiler)**

Time Profiler工具对系统CPU上运行的进程执行低开销，基于时间的采样。通过该工具能够查看内核和进程的使用、性能存在的瓶颈。

使用方法：

1. 打开跟踪模板 profiling template
2. 选择指定的调试设备及目标应用
3. 点击record按钮，开始执行进行监控
4. 在监控数据过程中，正常使用APP
5. 分析收集到数据信息

使用CPU使用率视图来比较指定时间段内的内核的使用情况，查找不平衡的内核使用情；使用线程策略视图来检查应用程序在执行工作时对线程的使用，主线程上的大量工作可能会使应用程序的用户界面无响应或速度变慢。

> Instruments官方文档：https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/index.html
 
----
## Instrument常用工具 ##
下面简单介绍几个常用的监测工具，想了解更多大家可通过官方文档继续挖掘。

**allocation**

用于发现内存不合理引用，检测重复操作能否正常分配、释放内存，若内存不能正确释放，就会出现内存的持续增长。
 
**leak**

用于检测内存泄漏问题，但是leak可能有时不能准确的定位内存泄漏问题，建议使用allocation。
 
**core animation graphics**

用来检测帧频率，来测量iOS应用程序的gpu性能。
 
**time profiler**

检测内核使用情况
> ps:使用CPU使用率视图来比较指定时间段内的内核的使用情况，查找不平衡的内核使用情；使用线程策略视图来检查应用程序在执行工作时对线程的使用，主线程上的大量工作可能会使应用程序的用户界面无响应或速度变慢。
 
**energy log**

能够监控设备电量的使用以及设备组件的开关状态，如cpu、gpu、网络、屏幕亮度、蓝牙、GPS、WiFi

通过连接设备进行电量监控，这样做会导致获取的数据并不够真实，因此在真实的情况下更准确地对设备进行监控才是我们想要的。

在iOS设备上录电量使用情况方法

1. 设置->开发者->logging->start recording,点击启动，则可以在使用设备时对电量消耗进行记录。
2. 电量监控完毕后，点击stop recording，结束记录。注意：若数据监控过程中，手机电量耗尽或关机，则记录的日志数据将丢失，因此使用时需注意这一点。
3. 连接设备，在instruments中导入跟踪数据，file->import logged data from device.
4. 分析收集到的监控数据，方法同上。
 
**通过命令行使用工具**

命令如下：

    instruments -t "Activity Monitor"-D ~/Desktop/ab.trace -w "{deviceid}" -l 50000/private/var/mobile/Containers/Bundle/Application/{deviceid}/Map.app/Map
 
-D 生成trace文件的保存目录

-W 设备id

-L 设置监控时间，单位毫秒

> application指定应用所在目录，其他参数设置，详见官方文档
> https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/Recording,Pausing,andStoppingTraces.html#//apple_ref/doc/uid/TP40004652-CH12-SW1

**注意事项：**

---
- 最小化工具对数据收集的影响

	instrument旨在最大限度地减少其对数据收集的影响。 因此可以通过更改一些基本设置，减少instrument对数据收集的影响。
	如减少工具的采样时间，以便于收集更多的数据。然而减少采样时间导致的高采样率可能导致几个问题：

	1. 每个样品都需要处理时间。高采样率就会使用更多的处理时间。
	2. 采样间隔时间可能不一致。每次启动样本会出现中断。所以当使用非常小的采样间隔时，这些中断发生时的变化可能导致采样率的显着变化。
	3. 小采样间隔导致采集更多样品。每个样本都使用系统内存，大量样本会快速占用内存使得机器剩余可用内存更少。
	
---
- 延迟模式运行instrument

	当你退出正在测试的APP时再进行数据分析，能都提高性能相关数据的准确性。通常instruments在应用程序运行时分析和显示数据，允许你在收集数据时查看数据。但是执行分析会占用CPU时间和内存导致目标进程效率降低，导致进程不能正常的进行。而以延迟模式运行就是在应用程序运行完毕后或单击停止后直到数据收集完成，再进行数据分析。
	
	在延迟模式下，instruments完成数据采集后，instruments处理数据并在屏幕上显示。推迟数据分析会为数据收集过程的后期增加时间，但它有助于确保与性能相关的数据准确。
 
## 关于instruments性能测试的思考 ##
通过对instrument的调研使用，发现instruments确实能够帮助我们进行性能调优，但是作为测试人员，我们更想通过采集的数据定位分析问题，instruments展示给我们的数据并不完全，如 Activity Monitor只提供了CPU瞬时值，Network也只提供了总流量，它们均不提供采集样本值，想分析完整的采集数据，肿么办！通过非官方API解析trace文件，获取想要的数据，也许就是我们后续要做的事情~