---
title: ForkJoin
category: Java
tag:
  - 多线程
order: 21
icon: uis:process
---

## 一、前言

> “Java 7开始引入了一种新的Fork/Join线程池，它可以执行一种特殊的任务：把一个大任务拆成多个小任务并行执行。”

ForkJoin 是 Java 7 引入的一种并行执行任务的工具，是 ExecutorService 接口的一个实现。它使用了一种被称为工作窃取的算法，允许线程偷取其他线程的任务来提高 CPU 利用率。

## 二、工作原理

Fork/Join线程池的工作原理是基于“分治法”（Divide and Conquer）。当一个任务足够大时，它会被分解为更小的子任务，这些子任务可以并行执行。每个子任务可以继续分解，直到它们变得足够小，可以直接计算。最后，所有子任务的结果被合并，得到最终结果。

> ForkJoin 框架的主要思想是将一个大任务分解（fork）成若干个小任务（子任务），再将一个个小任务的结果进行合并（join）。

## 三、如何使用Fork/Join线程池

使用Fork/Join框架来并行计算一个数组的和：

```java
import java.util.concurrent.RecursiveTask;

public class SumTask extends RecursiveTask<Long> {
    private final long[] numbers;
    private final int start;
    private final int end;
    public static final long threshold = 10_000;

    public SumTask(long[] numbers, int start, int end) {
        this.numbers = numbers;
        this.start = start;
        this.end = end;
    }

    @Override
    protected Long compute() {
        int length = end - start;
        if (length <= threshold) {
            return computeSequentially();
        }
        SumTask leftTask = new SumTask(numbers, start, start + length / 2);
        leftTask.fork();
        SumTask rightTask = new SumTask(numbers, start + length / 2, end);
        Long rightResult = rightTask.compute();
        Long leftResult = leftTask.join();
        return leftResult + rightResult;
    }

    private long computeSequentially() {
        long sum = 0;
        for (int i = start; i < end; i++) {
            sum += numbers[i];
        }
        return sum;
    }
}
```

在上述代码中，我们创建了一个`SumTask`类，该类继承了`RecursiveTask`，并重写了`compute`方法。

如果任务的大小小于或等于阈值，我们就直接计算结果；否则，我们就将任务分解为两个子任务。我们使用`fork`方法来异步执行左侧的子任务，然后调用`compute`方法来执行右侧的子任务。最后，我们使用`join`方法来获取左侧子任务的结果，并将其与右侧子任务的结果相加。

要使用Fork/Join框架，我们需要创建一个`ForkJoinPool`，并将顶层的`ForkJoinTask`提交给它：

```java
import java.util.concurrent.ForkJoinPool;

public class Main {
    public static void main(String[] args) {
        long[] numbers = new long[20_000_000];
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = i;
        }
        ForkJoinPool pool = new ForkJoinPool();
        Long sum = pool.invoke(new SumTask(numbers, 0, numbers.length));
        System.out.println(sum);
    }
}
```

在上述代码中，我们首先创建了一个包含2000万个元素的数组，然后创建了一个`ForkJoinPool`，并将一个`SumTask`提交给它。最后，我们打印出计算得到的和。

## 四、注意事项

- ForkJoin 框架最适合的是计算密集型的任务，如果任务中包含 I/O 操作，或者任务的执行时间过长，那么 ForkJoin 框架的性能就会大打折扣。
- 在使用 ForkJoin 框架时，需要注意任务的划分粒度，如果划分的任务过小，那么任务调度的开销可能会影响到性能。
