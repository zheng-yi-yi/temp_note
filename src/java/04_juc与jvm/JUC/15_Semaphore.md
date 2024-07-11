---
title: Semaphore
category: Java
tag:
  - 多线程
order: 15
icon: uis:process
---


# 前言

在并发编程中，我们经常会遇到需要对受限资源进行访问控制的情况。例如，我们可能需要限制同一时刻最多只有一定数量的线程能够访问某个资源。这种情况下，我们就可以使用一种称为Semaphore（信号量）的同步工具。

## 什么是Semaphore？

Semaphore是一种用于控制多个进程访问有限资源的同步机制。它是一个整数值，代表可用资源的数量。Semaphore有两种主要操作：acquire（获取）和release（释放）。当一个线程尝试获取一个Semaphore时，如果Semaphore的值大于0，那么这个线程就可以继续执行，并且Semaphore的值会减1；如果Semaphore的值为0，那么这个线程就会被阻塞，直到其他线程释放一个Semaphore。

## 如何在Java中使用Semaphore？

在Java中，我们可以使用`java.util.concurrent.Semaphore`类来实现`Semaphore`。下面是一个简单的示例：

```java
import java.util.concurrent.Semaphore;

public class SemaphoreExample {
    private Semaphore semaphore = new Semaphore(3); // 最多允许3个线程同时访问

    public void doSomething() {
        try {
            semaphore.acquire(); // 获取一个Semaphore
            // 执行任务
            System.out.println("Thread " + Thread.currentThread().getId() + " is working");
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            semaphore.release(); // 释放一个Semaphore
        }
    }
}
```

在这个示例中，我们创建了一个Semaphore，最多允许3个线程同时访问。当一个线程调用`doSomething`方法时，它首先尝试获取一个Semaphore。如果成功，它就会执行任务，然后释放Semaphore。如果失败（即Semaphore的值为0），它就会被阻塞，直到其他线程释放一个Semaphore。

## 指定等待时间

`acquire()`方法会尝试获取一个许可，如果没有可用的许可，它会一直等待直到有许可被释放。这可能会导致线程阻塞，直到满足获取许可的条件。

此时，我们可以使用`tryAcquire()`方法，它可以接受一个超时参数。如果在指定的时间内没有可用的许可，它将返回false，这样线程就不会无限期地等待。

举个例子：

```java
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

public class SemaphoreExample {
    private Semaphore semaphore = new Semaphore(3); // 最多允许3个线程同时访问

    public void doSomething() {
        try {
            boolean acquired = semaphore.tryAcquire(1, TimeUnit.SECONDS); // 尝试在1秒内获取一个Semaphore
            if (acquired) {
                // 执行任务
                System.out.println("Thread " + Thread.currentThread().getId() + " is working");
                Thread.sleep(1000);
                semaphore.release(); // 释放一个Semaphore
            } else {
                System.out.println("Thread " + Thread.currentThread().getId() + " failed to acquire semaphore");
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

在这个例子中，每个线程会尝试在1秒内获取一个Semaphore。如果获取成功，它会执行任务并在完成后释放Semaphore。如果在1秒内无法获取Semaphore，它将打印一条消息并继续执行。

## 总结

`Semaphore`本质上就是一个信号计数器，用于限制同一时间的最大访问数量。如果要对某一受限资源进行限流访问，可以使用`Semaphore`，保证同一时间最多N个线程访问受限资源。

