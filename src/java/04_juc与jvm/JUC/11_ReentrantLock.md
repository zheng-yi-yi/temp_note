---
title: ReentrantLock
category: Java
tag:
  - 多线程
order: 11
icon: uis:process
---

# 一、前言

自Java 5起，`java.util.concurrent`包被引入以提供更高级的并发处理功能，简化多线程程序的编写。其中，`ReentrantLock`提供了一种替代`synchronized`的同步机制。

使用`ReentrantLock`获取锁的方式更安全，因为它允许尝试获取锁，并在失败时进行其他处理。在使用`ReentrantLock`时，必须先获取锁，然后执行关键代码，最后确保在`finally`块中释放锁。

> 小结：
>
> `ReentrantLock`是一个实现了`Lock`接口的类，它具有与`synchronized`相同的并发性和内存语义，但是添加了类似锁投票、定时锁等候和可中断锁等候的一些特性。

# 二、ReentrantLock

之前我们学过的`synchronized`，是Java语言层面提供的关键字，用于加锁，但它较为笨重，且在获取锁时必须一直等待，没有额外的尝试机制。`ReentrantLock`是`java.util.concurrent.locks`包提供的一种锁，可以作为`synchronized`的替代品，它允许更灵活的锁操作。

来看这个例子：

```java
public class Counter {
    private int count;

    public void add(int n) {
        synchronized(this) {
            count += n;
        }
    }
}
```

上述`Counter`类使用了`synchronized`关键字来加锁，那如果用`ReentrantLock`替代呢？代码可以改造为：

```java
public class Counter {
    private final Lock lock = new ReentrantLock();
    private int count;

    public void add(int n) {
        lock.lock();
        try {
            count += n;
        } finally {
            lock.unlock();
        }
    }
}
```

可以看到，在上述代码的转换中：

- `synchronized`关键字被替换为了`ReentrantLock`的实例。
- `synchronized`关键字锁住的代码块被替换为了`lock.lock()`和`lock.unlock()`之间的代码块。
- `lock.lock()`用于获取锁，`lock.unlock()`用于释放锁。为了确保锁能够被正确释放，我们会在`finally`代码块中调用`lock.unlock()`。

`ReentrantLock`相比`synchronized`关键字，提供了更多的功能，例如可以被中断的获取锁操作、超时的获取锁操作，以及尝试获取锁但不立即阻塞的操作等，下面我们来看它的基本使用。

# 三、基本使用

`ReentrantLock`的基本使用流程如下：

1. 创建`ReentrantLock`实例：`ReentrantLock lock = new ReentrantLock();`

2. 在需要保护的代码块前调用`lock()`方法获取锁：`lock.lock();`

3. 在保护的代码块后调用`unlock()`方法释放锁：`lock.unlock();`

4. 使用`try-finally`块确保锁一定会被释放：`finally { lock.unlock(); }`

以下是一个简单的使用示例：

```java
import java.util.concurrent.locks.ReentrantLock;

public class Counter {
    private final ReentrantLock lock = new ReentrantLock();
    private int count = 0;

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }

    public int getCount() {
        return count;
    }
}
```

在这个示例中，`increment()`方法使用了`ReentrantLock`来保护对`count`的访问，确保在并发环境下的正确性。

注意，`ReentrantLock`的`lock()`和`unlock()`必须成对出现，否则可能导致死锁。因此，通常我们会在`finally`块中调用`unlock()`方法，以确保锁一定会被释放。

此外，`ReentrantLock`还提供了一些高级功能，如可中断的获取锁（`lockInterruptibly()`）、可超时的获取锁（`tryLock(long timeout, TimeUnit unit)`）以及公平锁和非公平锁的选择等。

# 四、超时则放弃

`ReentrantLock`与`synchronized`一样是可重入锁，一个线程可以多次获取同一个锁。`tryLock()`方法允许锁的尝试获取，可以在一定时间内尝试获取锁，如果超时则放弃，这种方式可以防止线程在无法获取锁时无限期地等待，从而降低了死锁的可能性。

```java
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.TimeUnit;

public class SafeCounter {
    
    // 创建一个可重入锁
    private final ReentrantLock lock = new ReentrantLock();
    
    // 计数器
    private int count = 0;

    // 增加计数的方法
    public void increment() {
        try {
            // 尝试获取锁，等待时间为1秒
            if (lock.tryLock(1, TimeUnit.SECONDS)) {
                try {
                    // 如果获取到锁，增加计数
                    count++;
                } finally {
                    // 最后释放锁
                    lock.unlock();
                }
            } else {
                // 如果没有获取到锁，打印信息
                System.out.println("Could not acquire lock, doing something else");
            }
        } catch (InterruptedException e) {
            // 如果在等待锁的过程中被中断，重新设置中断状态
            Thread.currentThread().interrupt();
        }
    }

    // 获取当前计数的方法
    public int getCount() {
        return count;
    }
    
    // 测试方法
    public static void main(String[] args) throws InterruptedException {
        // 创建一个SafeCounter对象
        final SafeCounter counter = new SafeCounter();
        
        // 创建10个线程
        Thread[] threads = new Thread[10];

        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(() -> {
                // 每个线程调用1000次increment方法
                for (int j = 0; j < 1000; j++) {
                    counter.increment();
                }
            });
            // 启动线程
            threads[i].start();
        }

        // 等待所有线程结束
        for (Thread thread : threads) {
            thread.join();
        }

        // 打印最后的计数值
        System.out.println("Final count: " + counter.getCount());
    }
    
}
// 运行结果：
// Final count: 10000
```

