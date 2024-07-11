---
home: true
icon: home
title: 首页
heroImage: /logo.svg
bgImage: #
bgImageDark: # 
heroText: 编程研习录
tagline: 一个全栈开发者的知识记录手册  # 「Java学习」深入浅出，涵盖Java开发者必备的基础技能和知识点
actions:
  - text: 开始阅读
    link: /dsa/review.md
    type: primary
#  - text: 面试系列
#    link: /Interview/01_Java基础/01_基础知识.md
#    type: default
footer:
  <img src="/bei.svg" alt="备案图标">  <a href="https://beian.mps.gov.cn/#/query/webSearch?code=44040402000231" rel="noreferrer" target="_blank">粤公网安备44040402000231</a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://beian.miit.gov.cn/" target="备案查询">粤ICP备2024223050号-1</a>

highlights:
  - header: Java
    # description: 这里添加一定的描述词
    bgImage: #
    bgImageDark: # 
    features:
      - title: 集合框架
        icon: f7:arrow-branch
        details: 提供一套用于处理数据的接口和类
        link: /java/02_Java进阶/01_集合/JCF-01-1-Collection.md
      - title: JVM
        icon: material-symbols:deployed-code
        details: Java核心组件，字节码的运行环境
        link: /java/04_juc与jvm/JVM/JVM体系结构.md
      - title: 正则表达式
        icon: mdi:regex
        details: 一种强大的文本处理工具
        link: /java/01_Java基础/05_正则表达式/01-概述.md
      - title: JDBC
        icon: oui:vis-query-sql
        details: Java程序访问数据库的标准接口
        link: /java/02_Java进阶/04_JDBC/01_query.md
      - title: Java8新特性
        icon: icon-park:astonished-face
        details: Lambda、方法引用、Stream、Optional...
        link: /java/03_新特性/01_java8/01_Lambda.md
      - title: JUC
        icon: f7:arrow-branch
        details: 允许程序并发执行，提高效率
        link: /java/04_juc与jvm/JUC/01-概述.md
      - title: 分布式
        icon: uim:object-ungroup
        details: 提高系统的可扩展性、可用性和性能
        link: /java/00_随记/02_分享/04_分布式基础理论.md
      - title: 工程测试
        icon: uim:object-ungroup
        details: 验证系统的质量与性能
        link: /java/00_随记/01_实践/02_JMeter.md
  - header: 设计模式
    description: 设计模式是解决软件设计中常见问题的最佳实践，它们是被反复使用、经过精心编写的、可重用的面向对象代码模板。
    image: /assets/image/features.svg
    bgImage: # 
    bgImageDark: # 
    features:
      - title: 创建型模式
        icon: marketeq:create-note-alt
        details: 关注对象的创建机制，尝试在创建对象的过程中提供更多的灵活性和效率。例如：单例、工厂、抽象工厂、建造者、原型等。
        link: /pattern/创建型模式/2_工厂方法.md
      - title: 结构型模式
        icon: logos:struts
        details: 关注类和对象的组合，以获得新的结构来提供新的功能。例如：适配器、桥接、装饰器、组合、代理、享元等。
        link: /pattern/结构型模式/01_外观模式.md
      - title: 行为型模式
        icon: icon-park:folder-code
        details: 关注对象之间的通信，为对象之间的通信提供更加灵活的通信方式。例如：策略、模板方法、迭代器、中介者等。
        link: /pattern/行为型模式/01_策略模式.md
#  - header: 数据库
#    image: /assets/image/Cloud_Database.svg
#    bgImage: # 
#    bgImageDark: # 
#    highlights:
#      - title: MySQL
#        icon: simple-icons:mysql
#        details: 广泛使用的开源关系型数据库管理系统，提供了多种数据类型支持、强大的查询语言、事务处理、索引和全文搜索等功能，适用于各种规模的应用开发。
#        link: /database/mysql/01_introduction.md
#      - title: Redis
#        icon: logos:redis
#        details: 开源的、支持网络、可基于内存亦可持久化的键值对存储数据库，常用于实现缓存、消息队列等功能，以提高应用的性能和响应速度。
#        link: /database/redis/01_intro.md
#  - header: 常用框架
#    #    description: 
#    image: /assets/image/hc-framework.svg
#    bgImage: # 
#    bgImageDark: # 
#    highlights:
#      - title: Spring
#        icon: simple-icons:spring
#        details: 轻量级框架，简化JavaEE应用程序开发
#        link: /framework/
#
#      - title: SpringBoot
#        icon: simple-icons:spring
#        details: 简化Spring应用的初始搭建以及开发过程
#        link: /framework/
#
#      - title: MyBatis
#        icon: mdi:bird
#        details: 一款优秀的持久层框架
#        link: /framework/
---