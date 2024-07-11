---
title: CompletableFuture
category: Java
tag:
  - 多线程
order: 20
icon: uis:process
---

## 前言

> “使用`Future`获得异步执行结果时，要么调用阻塞方法`get()`，要么轮询看`isDone()`是否为`true`，这两种方法都不是很好，因为主线程也会被迫等待。
>
> 从Java 8开始引入了`CompletableFuture`，它针对`Future`做了改进，可以传入回调对象，当异步任务完成或者发生异常时，自动调用回调对象的回调方法。”

`CompletableFuture`是Java 8引入的一个非常强大的类，用于处理异步编程中的非阻塞操作。它是`Future`的一个增强版，提供了更加丰富的API，允许开发者编写更加简洁和灵活的异步代码。`CompletableFuture`可以与`Executor`一起使用，以便在另一个线程中执行计算并处理其结果。

## CompletableFuture的特点

- **非阻塞**：`CompletableFuture`提供了一系列的非阻塞操作，允许开发者在不阻塞当前线程的情况下执行异步操作。
- **链式调用**：`CompletableFuture`支持链式调用，可以在一个`then`方法之后继续调用另一个`then`方法，这样可以将多个计算步骤链接起来。
- **异常处理**：`CompletableFuture`提供了异常处理机制，可以方便地处理异步操作中出现的异常。
- **组合多个Future**：可以将多个`CompletableFuture`组合在一起，以便同时处理多个异步操作的结果。

## CompletableFuture的基本用法

### 创建CompletableFuture

我们可以使用`supplyAsync`方法创建一个`CompletableFuture`。这个方法接受一个实现了`Supplier`接口的对象，然后异步地执行它，并返回一个`CompletableFuture`对象。

```java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    // 异步执行的代码
    return "Hello, World!";
});
```

> `Supplier`接口：
>
> ```java
> @FunctionalInterface
> public interface Supplier<T> {
> 
>     /**
>      * Gets a result.
>      *
>      * @return a result
>      */
>     T get();
> }
> ```

当我们创建这个`CompletableFuture`对象后，它就被提交给默认的线程池执行了，此时，我们需要定义回调。

### 使用CompletableFuture

我们可以使用`thenAccept`方法处理计算结果。

这个方法接受一个`Consumer`对象，当计算完成时，**它会接收计算结果，但不返回新的结果**：

```java
future.thenAccept(result -> {
    System.out.println(result);
});
```

另外，我们也可以使用`thenApply`方法处理计算结果。

这个方法接受一个`Function`对象，**当计算完成时，它会接收计算结果，并返回一个新的结果**：

```java
CompletableFuture<String> future2 = future.thenApply(result -> {
    return result + "!";
});
```

### 处理异常

使用`exceptionally`方法可以处理异常。这个方法接受一个`Function`对象，它接收异常，并返回一个新的结果：

```java
future.exceptionally(e -> {
    return "An error occurred";
});
```



### 链式调用

`CompletableFuture`还提供了链式调用，也就是串行执行，比如：

```java
import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            // 第一个任务
            return "Hello";
        }).thenApply(result -> {
            // 第一个任务完成后，立即执行第二个任务
            return result + " World";
        }).thenApply(result -> {
            // 第二个任务完成后，立即执行第三个任务
            return result + ", Welcome to CompletableFuture!";
        });

        // 如果执行成功:
        future.thenAccept(System.out::println);
        // 如果执行异常:
        future.exceptionally((e) -> {
            e.printStackTrace();
            return null;
        });
    }
}
```

### 组合多个CompletableFuture

`CompletableFuture`的`anyOf`和`allOf`方法允许你处理多个`CompletableFuture`。

- `anyOf`方法接受一个`CompletableFuture`的数组，当数组中的任何一个`CompletableFuture`完成时，它返回一个新的`CompletableFuture`。这个新的`CompletableFuture`的结果是第一个完成的`CompletableFuture`的结果。
- `allOf`方法也接受一个`CompletableFuture`的数组，但是它会等待所有的`CompletableFuture`都完成。当所有的`CompletableFuture`都完成时，它返回一个新的`CompletableFuture`。这个新的`CompletableFuture`没有结果，因为它只是表示所有的`CompletableFuture`都完成了。

```java
import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
            // 第一个任务
            return "Hello";
        });

        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
            // 第二个任务
            return "World";
        });

        // anyOf示例
        CompletableFuture<Object> anyOfFuture = CompletableFuture.anyOf(future1, future2);
        try {
            System.out.println(anyOfFuture.get());  // 打印第一个完成的任务的结果
        } catch (Exception e) {
            e.printStackTrace();
        }

        // allOf示例
        CompletableFuture<Void> allOfFuture = CompletableFuture.allOf(future1, future2);
        allOfFuture.thenRun(() -> {
            // 所有任务完成后，执行此Runnable
            try {
                System.out.println(future1.get() + " " + future2.get());  // 打印所有任务的结果
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
// Hello
// Hello World
```



## 注意事项

- **正确管理线程池**：在使用`CompletableFuture`时，需要注意正确管理线程池，避免资源泄露。
- **避免阻塞**：`CompletableFuture`的设计初衷是非阻塞，因此应尽量避免在异步代码中使用阻塞调用。
- **合理使用join**：`join`方法会阻塞当前线程直到`CompletableFuture`完成。在响应式编程中，应谨慎使用`join`。

## 总结

`CompletableFuture`主要用于指定异步处理流程，包括处理正常结果（`thenAccept()`）、处理异常结果（`exceptional()`）、串行化另一个`CompletableFuture`（`thenApplyAsync()`），以及并行化多个`CompletableFuture`（`anyOf()`和`allOf()`）。

在`CompletableFuture`中，带有`Async`后缀的方法表示该操作将在新的线程中异步执行。如果方法接受`Executor`参数，那么该参数将指定执行异步操作的线程池。如果没有提供`Executor`，则使用默认的`ForkJoinPool.commonPool()`。例如，`supplyAsync`和`thenApplyAsync`方法会在新的线程中执行提供的`Supplier`和`Function`。而没有`Async`后缀的方法，如`thenApply`，将在当前线程中执行操作。