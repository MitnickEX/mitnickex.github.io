---
layout:     post
title:      "个人觉得那些有用的WebDriver API"
subtitle:   ""
date:       2016-09-12
author:     "MitnickEX"
header-img: "img/post-bg-selenium.jpg"
tags:
    - 自动化测试
    - API
    - Selenium
---

*最近在学习Selenium，关于浏览器的自动化脚本，大部分可以通过IDE直接录制，但是也有一部分需要手动去coding，不能单纯依靠录制去实现，以下就是个人觉得需要了解和掌握的录制完的API*


****

# 1.控制浏览器 #
## 1.1 控制浏览器窗口大小##
有时候我们希望能以某种浏览器尺寸打开，如可以将浏览器设置成移动端大小480*800，然后访问移动站点，这时候我们就需要用到`set_window_size()`
> `#参数数字为像素点`
> 
> `Print("设置浏览器宽480、高800显示")`
> 
> `driver.set_window_size(480, 800)`
> 
> `driver.quit()`

以及全屏模式的方法`maximize_window()`

## 1.2 控制浏览器后退、前进及刷新 ##
`driver.back()` #返回

`driver.forward()` #前进

`driver.refresh()` #刷新

****
# 2.WebElement接口常用方法 #
## 2.1 定位方法 ##


1. id定位

	`find_element_by_id()`

2. name定位
 
	`find_element_by_name()`

3. class定位

	`find_element_by_class_name()`

4. tag定位

	`find_element_by_tag_name()`

5. link / partial link定位

	`find_element_by_link_test()`
	`find_elemnet_by_partial_link_text()`

6. XPath定位

	`find_element_by_xpath()` 
	>XPath又分为绝对路径定位、利用元素属性定位、层级与属性整洁、使用逻辑运算符

7. CSS定位

	`find_element_by_css_selector()`
	>定位速度比XPath快
	>
	>| 选择器  | 例子 | 描述 |
	>| ------------- | ------------- | ------------- |
	>| .class  | .intro  | class选择器，选择class="intro"的所有元素 |
	>| #id  | #firstname  | id选择器，选择id="firstname"的所有元素 |
	>| *  | *  | 选择所有元素 |
	>| element  | p  | 元素所有< p>元素 |
	>| element > element  | div > input  | 选择父元素为< div>元素之后的所有< input>元素 |
	>| element + element  | div + input  | 选择同一级中紧接在< div>元素之后的所有< input>元素 |
	>| [attribute=value]  | [target=_blank]  | 选择 target="_blank"的所有元素 |
			
## 2.2 简单元素操作 ##
1. 清除文本`clear()`
2. 模拟按键输入`send_keys(*value)`
3. 返回元素尺寸`size`
4. 获取元素的文本`text`
5. 获得属性值`get_attribute(name)`
6. 设置该元素是否用户可见`is_displayed()`

# 3.其他一些个人觉得有用的 #
## 3.1 操作Cookie ##
1. 获得所有Cookie信息`driver.get_cookies()`
2. 返回字典的key为“name”的cookie信息`driver.get_cookie(name)`
3. 添加cookie，“cookie_dict”指字典对象，必须有name和value值`driver.add_cookie(cookie_dict)`
4. 删除所有cookie信息`driver.delete_all_cookies()`

## 3.2 调用JavaScript ##
WebDriver提供了`execute_script()`方法来执行JavaScript代码，如设置浏览器的滚动条位置：
> `js="window.scrollTo(100,450);"`
> 
> `driver.execute_script(js)`
> 
> `sleep(3)`

## 3.3 窗口截图 ##
WebDriver提供了截图函数`get_screenshot_as_file()`来截取当前窗口，如：
> `driver.get_screenshot_as_file("D:\\test\\test.jpg")`

