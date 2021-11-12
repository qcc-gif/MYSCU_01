# 云上川大-YYSCU

> 2021年研究与开发实践



## 项目背景

四川大学校园占地面积大，在校学生众多，拥有丰富多彩的校园生活。不少同学希望和其他在校生分享自己在川大的日常生活，然而目前学校缺少一个可供所有在校生分享讨论在校生活的论坛。由此我们打算开发一个这样的微信小程序，为川大师生提供一个分享讨论校园生活的渠道。

## 技术

该项目基于微信小程序开发平台，采用Vant UI（前端），Node.js框架（后端）和SQLite（数据库）。

## 目录结构

* YSSCU 小程序端

  > cmd

  ```bash
  npm install
  ```

  微信开发者工具勾选 使用npm模块，不检查HTTP

  工具 -> 构建npm

* server 服务端

  > cmd

  ```bash
  cd server
  
  npm install
  
  npm start # 运行 默认在3000端口
  ```

  

## 参考资料

nodejs的async和await <https://www.cnblogs.com/chenqionghe/p/11413643.html>

