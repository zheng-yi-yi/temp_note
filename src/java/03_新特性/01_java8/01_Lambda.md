---
title: Lambda表达式
category: Java
tag:
  - java8新特性
order: 1
---

## 什么是 Lambda 表达式？

Lambda表达式是Java 8的特性，它是一种匿名函数，可以使代码更简洁、更灵活。它支持函数式编程，可以将函数作为参数传递或作为结果返回，配合Stream API，可以方便地进行并行处理和集合操作，同时也支持延迟执行，提高了代码的执行效率。

比如，下面使用匿名类创建一个线程：

```java
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello, World!");
    }
}).start();
```

使用Lambda表达式创建同样的线程：

```java
new Thread(() -> System.out.println("Hello, World!")).start();
```

再比如，下面使用使用匿名类对列表进行排序：

```java
List<String> list = Arrays.asList("Apple", "Banana", "Cherry");
Collections.sort(list, new Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        return s1.compareTo(s2);
    }
});
```

使用Lambda表达式进行同样的排序：

```java
List<String> list = Arrays.asList("Apple", "Banana", "Cherry");
Collections.sort(list, (s1, s2) -> s1.compareTo(s2));
```

在这两个例子中，我们可以看到，使用Lambda表达式可以使代码更简洁，更易读。

## 语法

Lambda表达式的语法主要包括以下三个部分：

1. **参数列表**：位于Lambda操作符（->）的左侧，用于定义Lambda表达式的输入参数。参数可以有多个，用逗号分隔，如果没有参数，需要使用一对空括号"()"表示。参数的类型可以显式声明，也可以由编译器推断。
2. **Lambda操作符**：也称为箭头操作符，用"->"表示。它将参数列表和Lambda体分隔开。
3. **Lambda体**：位于Lambda操作符的右侧，是Lambda表达式的主体部分，包含了Lambda表达式需要执行的代码。Lambda体可以是一个表达式，也可以是一个代码块。如果是表达式，那么这个表达式的值就是Lambda表达式的返回值；如果是代码块，那么需要用大括号"{}"括起来，可以包含多条语句，如果有返回值，需要使用return语句返回。

下面是一些Lambda表达式的例子：

**无参、无返回值：**

在一个新线程中打印一条消息：

```java
new Thread(() -> System.out.println("Hello, World!")).start();
```

**需要参数，但没返回值：**

遍历一个列表，打印出每个元素：

```java
List<String> list = Arrays.asList("Apple", "Banana", "Cherry");
list.forEach((String s) -> System.out.println(s));
```

**数据类型可以省略，即“类型推断“：**

同样是遍历一个列表，打印出每个元素，但是省略了参数的数据类型：

```java
List<String> list = Arrays.asList("Apple", "Banana", "Cherry");
list.forEach((s) -> System.out.println(s));
```

**只需要一个参数时，参数的小括号可以省略：**

同样是遍历一个列表，打印出每个元素，但是省略了参数的小括号：

```java
List<String> list = Arrays.asList("Apple", "Banana", "Cherry");
list.forEach(s -> System.out.println(s));
```

**需要两个或以上的参数，并且有多条执行语句，有返回值：**

使用Lambda表达式定义一个Comparator，用于排序：

```java
List<String> list = Arrays.asList("Apple", "Banana", "Cherry");
Collections.sort(list, (s1, s2) -> {
    System.out.println("Sorting...");
    return s1.compareTo(s2);
});
```

**当 Lambda 体只有一条语句时，return 与大括号若有，都可以省略：**

同样是定义一个Comparator，但是省略了return和大括号：

```java
List<String> list = Arrays.asList("Apple", "Banana", "Cherry");
Collections.sort(list, (s1, s2) -> s1.compareTo(s2));
```

## 类型推断

Java编译器可以进行类型推断，这是因为当我们使用Lambda表达式时，通常都是在一个特定的上下文中，这个上下文提供了足够的信息来推断出参数的类型，比如函数式接口。

::: tip

**函数式接口**是**只有一个抽象方法**的接口，这个抽象方法的签名提供了Lambda表达式需要的参数类型和返回类型。

:::

当我们将一个Lambda表达式赋值给一个函数式接口类型的变量，或者作为一个函数式接口类型的参数传递时，Java编译器就可以根据这个函数式接口的抽象方法的签名来推断出Lambda表达式的参数类型和返回类型。
