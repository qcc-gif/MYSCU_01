# 云上川大-YYSCU

> 2021年研究与开发实践



## 项目背景

四川大学校园占地面积大，在校学生众多，拥有丰富多彩的校园生活。不少同学希望和其他在校生分享自己在川大的日常生活，然而目前学校缺少一个可供所有在校生分享讨论在校生活的论坛。由此我们打算开发一个这样的微信小程序，为川大师生提供一个分享讨论校园生活的渠道。

## 技术

该项目基于微信小程序开发平台，采用微信开发者平台 + Vant UI（前端），Node.js框架（后端）和SQLite（数据库）。

## 目录结构

- 目录结构描述

```
├── Readme.md   
├── project.config.json
├── .gitignore
├── YSSCU						// YSSCU 客户端                      
│   ├── api
│       └── api.js
│   ├── miniprogram				// vant ui 组件              
│   ├── pages					// 页面  
│   	├── authorize			// 用户授权
│   	├── adminlogin			// 管理员登录
│   	├── mine				// 个人空间
│   	├── administrator		// 管理员空间
│   	├── reward				// 打赏开发者
│   	├──  
│   	├──  
│   	├──  
│       └── 
│   ├── static					// 图标和图片  
│       └── icons
│       └── images
│   ├── utils  
│       └── utils.js
│   ├── app.js
│   ├── app.json
│   ├── app.wxss 
│   ├── package.json  
│   ├── package-lock.json
│   ├── package.config.json
│   ├── sitemap.json
│   └── XX              
├── server						// server 服务端
│   ├── bin
│   ├── db
│   ├── public
│   ├── routes
│   ├── views
│   ├── app.js
│   ├── packages.json
│   ├── package-lock.json
│   └── ysscu.db
```

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

