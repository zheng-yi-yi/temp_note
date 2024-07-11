---
title: Java的异常
category: Java基础
order: 1
tag:
  - 异常
---

## 1. 异常机制

Java内置了一套异常处理机制，用异常来表示错误，而异常类层次结构主要由`Throwable`类派生出来的两个主要子类：`Error`和`Exception`：

```
java.lang.Throwable
│
├─ java.lang.Error
│  ├─ java.lang.VirtualMachineError
│  │  ├─ java.lang.StackOverflowError
│  │  └─ java.lang.OutOfMemoryError
│  └─ ...
│
└─ java.lang.Exception
   ├─ java.lang.RuntimeException
   │  ├─ java.lang.NullPointerException
   │  ├─ java.lang.IndexOutOfBoundsException
   │  └─ ...
   ├─ java.lang.ClassNotFoundException
   ├─ java.io.IOException
   └─ ...
```

可以看到，`Throwable`是异常体系的根，并分为两大体系：

- `Error`：
  - 表示严重的问题，程序对此一般无能为力，一旦产生，JVM一般会选择终止线程。比如内存耗尽`OutOfMemoryError`、栈溢出`StackOverflowError`等。
- `Exception`：
  - 运行时发生的错误，这时程序可以捕捉并处理。比如空指针异常`NullPointerException`、网络读取失败`SocketException`等。
  - 注意，`Exception`可以分为两类，`RuntimeException`及其子类，以及非`RuntimeException`类。

::: tip

Java规定，`Exception`及其子类（不包括`RuntimeException`及其子类）必须被捕获，这种类型的异常被称为Checked Exception。

:::

## 2. 抛出异常 与 捕获异常

在Java API中，有很多地方可能会发生错误，此时在方法签名中会使用`throws`关键字来声明可能会抛出的异常类型。这样，调用该方法的代码就知道可能会遇到哪些异常，并可以选择捕获和处理这些异常。

例如，下面的方法签名表示`readFile`方法可能会抛出`IOException`：

```java
public void readFile(String fileName) throws IOException {
    // ...
}
```

在调用这个方法的时候，我们需要处理可能抛出的`IOException`：

```java
try {
    readFile("myfile.txt");
} catch (IOException e) {
    System.out.println("读取文件时发生错误: " + e.getMessage());
}
```

> “当某个方法抛出了异常时，如果当前方法没有捕获异常，异常就会被抛到上层调用方法，直到遇到某个`try ... catch`被捕获为止。”

可以看到，在编写代码时，我们会将可能发生异常的代码放到`try {...}`中，然后使用`catch`捕获对应的`Exception`及其子类。

> 如果我们不捕获`Checked Exception`（非`RuntimeException`类），Java编译器会报错，因为Java要求我们必须处理或声明所有的Checked Exception。控制台会输出类似以下的错误信息：
>
> ```shell
> error: unreported exception Exception; must be caught or declared to be thrown
> ```
>
> 这个错误信息告诉我们，我们必须捕获或声明可能抛出的`Checked Exception`。

另一方面，如果我们没有`try`代码，而是直接在 `main()` 方法中`throws Exception`：

```java
public static void main(String[] args) throws Exception {
    // 抛出一个异常
    throw new Exception("这是一个异常");
}
```

此时程序一旦发生异常，则会立即退出，并在控制台打印出异常的堆栈跟踪信息，例如：

```shell
Exception in thread "main" java.lang.Exception: 这是一个异常
    at com.example.Main.main(Main.java:3)
```

我们是可以使用多个`catch`语句，分别捕获对应的`Exception`及其子类。

最佳实践是按照从最具体到最一般的顺序捕获异常。因为一旦一个异常被捕获，后续的`catch`语句将不会被执行。

```java
try {
    // 风险代码，可能会抛出异常
} catch (FileNotFoundException e) {
    // 处理文件未找到异常
} catch (IOException e) {
    // 处理输入输出异常
} catch (Exception e) {
    // 处理一般异常
}
```

总的来说，JVM在捕获到异常后，会从上到下匹配`catch`语句，匹配到某个`catch`后，执行`catch`代码块，然后不再继续匹配。

## 3. finally 语句块

 `try` 或 `catch` 代码块的后面，还可以有 `finally`块，它的作用是：

- 无论 `try` 块中是否发生异常，`finally` 块中的代码总是会被执行。

一般来说，我们会把一些资源的关闭语句放到`finally` 块中，它可以保证有无错误都会执行相应代码。

```java
try {
    // 风险代码，可能会抛出异常
} catch (Exception e) {
    // 处理异常
} finally {
    // 无论是否发生异常，这里的代码都会被执行
}
```

`finally`语句不是必须的，它是可选的。在处理异常时，可以只有 `try` 块，或者 `try-catch` 块，或者 `try-catch-finally` 块，或者 `try-finally` 块。

