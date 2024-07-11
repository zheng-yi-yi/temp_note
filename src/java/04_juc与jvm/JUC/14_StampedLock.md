---
title: StampedLock
category: Java
tag:
  - 多线程
order: 14
icon: uis:process
---


## 前言

在Java并发编程中，合理地管理对共享资源的访问是确保数据一致性和性能的关键。上一节，我们学习了 `ReadWriteLock` ，它可以解决多线程同时读，但只有一个线程能写的问题。但是也存在一个问题：“如果有线程正在读，写线程需要等待读线程释放锁后才能获取写锁，即读的过程中不允许写，这是一种悲观的读锁。”

之所以这样，是因为它的设计初衷就是保证数据的一致性。在读取数据的时候，如果允许写入，可能会导致读取到的数据不一致。因此，当有线程正在读取数据时，写线程必须等待读线程释放锁。这种策略被称为"悲观读锁"，因为它假设最坏的情况，即读操作和写操作总是有冲突的。

然而，在某些情况下，这种悲观的策略可能会导致性能问题，特别是在读操作远多于写操作的情况下。为了解决这个问题，Java在1.8版本中引入了`StampedLock`，它提供了一种"乐观读锁"的策略，允许一个线程获取读锁的同时，其他线程可以获取写锁，只有当写操作实际发生时，才会阻塞读操作。这可以在多数情况下提高性能。

> 有了乐观锁，就有一定概率导致读取的数据不一致，因此我们需要添加判断逻辑来检查当前读的过程中是否有写入。

## StampedLock 简介

`StampedLock`是Java 8引入的一种新的读写锁，它在`ReadWriteLock`的基础上进行了改进，允许在读操作进行的同时，如果有线程获取写锁并进行写入操作。

这种锁策略是基于乐观锁的设计理念，即乐观地估计读操作期间不会有写入，从而提高并发性能。

## 功能特点

- **乐观读锁**：`StampedLock`提供了乐观读锁，允许在读操作期间进行写操作，这与`ReadWriteLock`的悲观读锁不同，后者在读操作期间不允许写操作。
- **版本号验证**：通过`tryOptimisticRead()`获取乐观读锁时，会返回一个版本号。我们可以使用这个版本号在读取操作后通过`validate()`方法检查是否有写操作发生，从而确保数据的一致性。
- **性能提升**：由于乐观读锁在读操作期间不阻塞写操作，因此可以提高并发执行效率，特别是在写操作不频繁的场景下。

## 实现示例

以下是一个使用`StampedLock`的Java示例。这个示例中，我们有一个点类，它有两个坐标`x`和`y`。我们使用`StampedLock`来保证线程安全。

```java
import java.util.concurrent.locks.StampedLock;

public class Point {
    private double x, y;
    private final StampedLock sl = new StampedLock();

    // an exclusively locked method
    void move(double deltaX, double deltaY) { 
        long stamp = sl.writeLock(); // 获取写锁
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            sl.unlockWrite(stamp); // 释放写锁
        }
    }

    // a read-only method
    double distanceFromOrigin() { 
        long stamp = sl.tryOptimisticRead(); // 获取一个乐观读锁
        double currentX = x, currentY = y;
        
        // 检查乐观读锁后是否有其他写锁发生
        if (!sl.validate(stamp)) { // 如果给定的stamp与当前锁的状态不匹配
            stamp = sl.readLock(); // 获取一个悲观读锁
            try {
                currentX = x;
                currentY = y;
            } finally {
                sl.unlockRead(stamp); // 释放悲观读锁
            }
        }
        return Math.hypot(currentX, currentY);
    }
}
```

## 适用场景

`StampedLock`适用于读操作远多于写操作的场景，并且对数据一致性的要求允许一定的误差。在这种情况下，使用`StampedLock`可以有效地提高读取操作的性能，同时通过版本号验证来确保数据的最终一致性。

## 总结

1. `StampedLock`提供了三种模式的锁：写锁、悲观读锁和乐观读锁。写锁和悲观读锁的行为类似于`ReadWriteLock`的写锁和读锁，但乐观读锁是`StampedLock`特有的。
2. 乐观读锁是一种尝试读取，但不完全阻止写入的锁。当一个线程持有乐观读锁时，写入仍然可能发生。线程需要在读取后验证数据是否已被修改。如果数据未被修改，读取就成功了。如果数据被修改了，通常需要获取悲观读锁并重新读取。
3. `StampedLock`的锁升级功能允许一个线程在持有读锁的情况下获取写锁。这在"先检查再运行"的场景中非常有用。
4. `StampedLock`是不可重入的。这意味着一个线程不能多次获取同一锁，否则会导致阻塞。
5. 使用`StampedLock`可以提高并发性，但是也会增加代码的复杂性。因此，只有在确实需要更高并发性，并且可以管理额外的复杂性时，才应该使用`StampedLock`。