---
title: StringJoiner
category: Java
order: 3
tag:
  - Java核心类
---

## 1. 概述

前面讲过，要高效地拼接字符串，就应该使用 `StringBuilder`。但有时，我们需要在字符串之间添加分隔符，前缀和后缀，此时，就可以使用 `StringJoiner`。

> `StringJoiner`是`Java 8`引入的一个类，适用于用分隔符拼接数组的需求。

## 2. 基本用法


1. 创建`StringJoiner`实例并添加元素：

    ```java
    StringJoiner sj = new StringJoiner(", ");
    sj.add("alpha");
    sj.add("beta");
    sj.add("gamma");
    System.out.println(sj.toString());  // 输出: alpha, beta, gamma
    ```

2. 创建`StringJoiner`实例时添加前缀和后缀：

    ```java
    StringJoiner sj = new StringJoiner(", ", "{", "}");
    sj.add("alpha");
    sj.add("beta");
    sj.add("gamma");
    System.out.println(sj.toString());  // 输出: {alpha, beta, gamma}
    ```

3. 合并两个`StringJoiner`实例：

    ```java
    StringJoiner sj1 = new StringJoiner(", ");
    sj1.add("alpha");
    sj1.add("beta");
    
    StringJoiner sj2 = new StringJoiner(", ");
    sj2.add("gamma");
    sj2.add("delta");
    
    sj1.merge(sj2);
    System.out.println(sj1.toString());  // 输出: alpha, beta, gamma, delta
    ```

4. 设置当`StringJoiner`没有任何元素时的表示：

    ```java
    StringJoiner sj = new StringJoiner(", ");
    sj.setEmptyValue("empty");
    System.out.println(sj.toString());  // 输出: empty
    ```

5. 获取`StringJoiner`生成的字符串的长度：

    ```java
    StringJoiner sj = new StringJoiner(", ");
    sj.add("alpha");
    sj.add("beta");
    System.out.println(sj.length());  // 输出: 11
    ```

## 3. String.join()

String类也提供了一个静态方法`join()`，该方法允许你使用指定的分隔符将多个字符串连接在一起，其内部实际上使用了`StringJoiner`来完成字符串的拼接：

```java
String[] names = {"Bob", "Alice", "Grace"};
String s = String.join(", ", names);
System.out.println(s);  // 输出: Bob, Alice, Grace
```
