### Prefix named Luban, salute the God of craftsman

![luban](https://shengun-blog.oss-cn-hangzhou.aliyuncs.com/luban.png)

## 介绍
#### react常用组建库
- Select 
  - 支持搜索
- Checkbox
- VirtualTree
  - 支持虚拟滚动
- Modal
  - 支持拖拽
- Clipboard
- ExCoArrow  (收缩展开的arrow)
- Tooltip
- Button
  - 支持loading
- Message  
  - success
  - warn
  - error
- Radio
- Icon
- Notification
- Speaker  (手机扬声器icon)
  - 播放动效
- Grid
  - 支持xs, sm, md, lg, xl 5个大小
  - 自定义span
- carousel (轮播banner)


#### react常用hook封装
- useDragAble
  - 拖拽目标元素
- useOutsideClick
  - 点击目标元素之外 （e.g.点击目标元素之外， 隐藏目标元素）


## 为什么写这个

- ant-design 是写后台管理系统的一套UI解决方案。 但在平时写非系统网站的时候，需要展现的ui风格差异较大。 
- 如果只需要引用一个antd组件，会同时引入大量的配置文件，css样式很多地方需要覆盖， 会产生大量冗余的代码。
- css完全根据项目自定义（库里面除了必要的css如动效，排版）， 没有任何多余的代码。
- 所有组件对外接口，跟antd类似


## 使用方法 
```js
yarn add luban-view --save
```
or 

```text
直接将需要用的组件copy到项目中
```



