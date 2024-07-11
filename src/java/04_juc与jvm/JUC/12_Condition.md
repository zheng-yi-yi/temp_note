---
title: Condition
category: Java
tag:
  - 多线程
order: 12
icon: uis:process
---

# 一、前言

前面我们提到，`ReentrantLock`提供了一种比`synchronized`更安全的线程同步机制，但是，`synchronized`可以配合`wait`和`notify`实现线程在条件不满足时等待，条件满足时唤醒，那使用`ReentrantLock`时，我们该如何编写`wait`和`notify`的逻辑呢？

这就引出了`Condition`。

简单来说，`Condition`对象可以用于替代`synchronized`关键字中的`wait`和`notify`功能，以实现线程间的条件等待和通知。

# 二、Condition使用示例

```java
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ConditionExample {
    private Lock lock = new ReentrantLock();
    private Condition condition = lock.newCondition();

    public void conditionWait() throws InterruptedException {
        lock.lock();
        try {
            // 等待
            condition.await();
        } finally {
            lock.unlock();
        }
    }

    public void conditionSignal() {
        lock.lock();
        try {
            // 唤醒等待的线程
            condition.signal();
        } finally {
            lock.unlock();
        }
    }
}
```

可以看到，使用`Condition`时，引用的`Condition`对象必须从`Lock`实例的`newCondition()`返回，这样才能获得一个绑定了`Lock`实例的`Condition`实例。

# 三、Condition的工作原理

`Condition`接口的`await()`, `signal()`, 和 `signalAll()`方法与`synchronized`关键字配合`Object`类的`wait()`, `notify()`, 和 `notifyAll()`方法的行为非常相似。

- `await()`: 使当前线程等待，同时释放当前锁，当其他线程中使用`signal()`或`signalAll()`方法时，线程会重新尝试获得锁并继续执行。
- `signal()`: 唤醒一个等待在此锁相关的`Condition`上的线程。如果有多个线程在等待，选择哪个线程唤醒是不确定的。
- `signalAll()`: 唤醒所有等待在此锁相关的`Condition`上的线程。

# 四、等待超时机制

同样的，`Condition`接口提供了一个带有超时参数的`await()`方法，允许线程等待一定的时间。这个方法的签名是`await(long time, TimeUnit unit)`，其中`time`参数指定了等待的最长时间，`unit`参数指定了时间的单位。

如果在指定的时间内，线程没有被`signal()`或`signalAll()`方法唤醒，那么线程会自动醒来并尝试重新获取锁。如果线程在指定的时间内被唤醒，那么线程会立即醒来。

这个方法在处理那些需要在一定时间内完成的操作时非常有用。例如，现在有一个操作需要在10秒内完成，如果操作没有在10秒内完成，那么你可能就需要取消操作并做一些清理工作。

以下是一个使用带有超时参数的`await()`方法的示例：

```java
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ConditionExample {
    private Lock lock = new ReentrantLock();
    private Condition condition = lock.newCondition();

    public void conditionWait() throws InterruptedException {
        lock.lock();
        try {
            // 等待最多5秒
            boolean isSignalled = condition.await(5, TimeUnit.SECONDS);
            if (isSignalled) {
                // 线程在5秒内被唤醒
            } else {
                // 线程在5秒内未被唤醒
            }
        } finally {
            lock.unlock();
        }
    }

    public void conditionSignal() {
        lock.lock();
        try {
            // 唤醒等待的线程
            condition.signal();
        } finally {
            lock.unlock();
        }
    }
}
```

# 五、小结

- `Condition`可以替代`synchronized`中的`wait`和`notify`机制。
- 使用`Condition`时，必须从`Lock`对象获取`Condition`实例。
- 通过`Condition`和`Lock`的配合使用，可以实现更灵活的线程同步和条件等待机制。