---
title: StringBuilder
category: Java
order: 2
tag:
  - Java核心类
---

## 1. 简介

`StringBuilder`是用于表示可变的字符序列，与`String`类不同，`String`对象是不可变的。利用`StringBuilder`，我们可以高效地拼接字符串，`StringBuilder`对象在新增字符时不会创建新的临时对象。

```java
public class Example {
    public static void main(String[] args) {
        StringBuilder str = new StringBuilder("Hello");
        System.out.println(str.toString());
        str.append(" World!");
        System.out.println(str.toString());
    }
}
```

运行结果：

```
Hello
Hello World!
```

`StringBuilder`支持链式操作，最终加工完成后可调用 `toString()`方法得到最终字符串。

```java
StringBuilder sb = new StringBuilder();
sb.append("Hello").append(" ").append("World").append("!");
System.out.println(sb.toString());  // 输出: Hello World!
```

## 2. 操作

1. `append()`: 添加数据到当前`StringBuilder`对象的末尾。这个方法有多个重载版本，可以接受不同类型的参数，如`String`，`int`，`char`等。

    ```java
    StringBuilder sb = new StringBuilder();
    sb.append("Hello");
    sb.append(123);
    sb.append('A');
    ```

2. `insert()`: 在指定位置插入数据。这个方法也有多个重载版本，可以接受不同类型的参数。

    ```java
    StringBuilder sb = new StringBuilder("Hello");
    sb.insert(5, " World");  // 插入字符串
    ```

3. `delete()`: 删除从`start`位置开始到`end`位置的字符。

    ```java
    StringBuilder sb = new StringBuilder("Hello World");
    sb.delete(5, 6);  // 删除空格
    ```

4. `reverse()`: 将当前`StringBuilder`对象中的字符反转。

    ```java
    StringBuilder sb = new StringBuilder("Hello");
    sb.reverse();  // olleH
    ```

5. `toString()`: 返回当前`StringBuilder`对象的字符串表示。

    ```java
    StringBuilder sb = new StringBuilder("Hello");
    String s = sb.toString();
    ```

6. `length()`: 返回当前`StringBuilder`对象的长度。

    ```java
    StringBuilder sb = new StringBuilder("Hello");
    int len = sb.length();  // 5
    ```

7. `setLength()`: 设置当前`StringBuilder`对象的长度。如果新的长度小于当前长度，那么多余的字符将被丢弃。如果新的长度大于当前长度，那么会添加空字符。

    ```java
    StringBuilder sb = new StringBuilder("Hello");
    sb.setLength(3);  // Hel
    sb.setLength(5);  // Hel\0\0
    ```

## 3. StringBuffer

`StringBuffer`和`StringBuilder`在功能上是相似的，它们都是用于处理可变字符串的。区别在于`StringBuffer`是线程安全的，而`StringBuilder`不是。

> 线程安全是有代价的。`StringBuffer`的操作需要进行同步，这会导致它在单线程环境中的性能比`StringBuilder`差。因此如果在单线程环境中处理字符串，应该使用`StringBuilder`。
