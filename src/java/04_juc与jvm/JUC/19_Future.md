---
title: Future
category: Java
tag:
  - 多线程
order: 19
icon: uis:process
---
 

`Future`是Java中的一个接口，它代表了一个异步计算的结果。它提供了检查计算是否完成，等待计算完成，以及检索计算结果的方法。

## 前言

上一节我们提到，使用Java提供的线程池可以方便地利用多线程执行多个任务，减少在创建和销毁线程时所花费的时间，只需将执行的任务实现`Runnable`接口，然后丢给线程池去执行即可。

但这有一个问题，就是`Runnable`接口的方法并没有返回值，如果任务需要返回一个结果，就只能保存到变量中。

所以，Java标准库还提供了另一个接口：`Callable`接口。该接口的`call`方法有返回值，这样就可以方便地获取任务的执行结果。

## Callable接口

`Callable`接口是一个泛型接口，你可以指定`call`方法的返回类型。

```java
public interface Callable<V> {
    V call() throws Exception;
}
```

当我们创建一个实现了`Callable`接口的类，就可以将它提交给`ExecutorService`来执行。

```java
class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        // do something
        return "result";
    }
}
```

然后，你可以像这样使用它：

```java
ExecutorService executor = Executors.newFixedThreadPool(1);
MyCallable task = new MyCallable();
Future<String> future = executor.submit(task);
```

## 获取结果

`ExecutorService.submit(Callable)`方法返回一个`Future`对象，你可以使用它来获取任务的结果。

```java
try {
    String result = future.get();
} catch (ExecutionException | InterruptedException e) {
    // handle the exception
}
```

`Future.get()`方法可能会阻塞，直到任务完成。如果你不想阻塞，你可以使用`Future.isDone()`方法来检查任务是否完成。

当然，你也可以使用`get`方法的另一个版本，它接受一个超时参数。如果计算在超时时间内没有完成，这个方法会抛出`TimeoutException`。

```java
try {
    String result = future.get(1, TimeUnit.SECONDS);
} catch (TimeoutException e) {
    // handle the timeout
}
```

## 取消Future

你可以使用`cancel`方法取消一个还没有完成的计算。如果计算已经完成，或者由于其他原因无法取消，这个方法会返回`false`。否则，它会返回`true`。

```java
boolean wasCancelled = future.cancel(true);
```

注意，取消一个`Future`并不会中断正在运行的线程。如果你想中断线程，你需要在你的`Callable`对象中检查线程的中断状态，并在适当的时候退出。

比如：

```java
class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        while (!Thread.currentThread().isInterrupted()) {
            // do something
        }
        return "result";
    }
}
```

## 总结

在Java中，`Future`是一个代表异步操作可能完成的结果的对象。它是`java.util.concurrent`包中的一部分，通常与`ExecutorService`结合使用，以便在另一个线程中执行任务并获取其结果。

主要方法如下：

- `boolean cancel(boolean mayInterruptIfRunning)`: 尝试取消任务。如果任务尚未开始或已完成，则此方法不会影响任务。`mayInterruptIfRunning`参数确定是否应该尝试停止正在运行的任务。
- `boolean isCancelled()`: 返回任务是否被取消。
- `boolean isDone()`: 返回任务是否已完成。
- `V get()`: 获取任务的结果，如果任务尚未完成，则等待它完成。
- `V get(long timeout, TimeUnit unit)`: 在指定的时间内等待任务完成并获取结果，如果超时则抛出`TimeoutException`。