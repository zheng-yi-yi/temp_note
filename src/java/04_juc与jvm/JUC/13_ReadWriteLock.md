---
title: ReadWriteLock
category: Java
tag:
  - 多线程
order: 13
icon: uis:process
---

## 前言

前面提到的`ReentrantLock`是可以保证只有一个线程可以执行临界区代码。但很多时候，我们希望资源允许多个线程同时去读，但任意时刻只能有一个线程修改，像这种情况就可以使用`ReadWriteLock`。

## ReadWriteLock 简介

`ReadWriteLock`是一个高级锁机制，它允许多个线程同时读取共享资源，但在写入时只允许一个线程执行。这种锁策略适用于读操作远多于写操作的场景，可以显著提高并发读取的效率。

## 功能特点

- **写入独占**：当一个线程获得写锁时，其他线程（无论是读还是写）都必须等待，确保写入操作的独占性和数据的一致性。
- **读取共享**：当没有线程持有写锁时，多个线程可以同时获得读锁，共享对资源的读取，提高了读取操作的并发性。
- **性能优化**：通过分离读写锁，`ReadWriteLock`在高并发读取的场景下，减少了线程等待的时间，提升了系统的整体性能。

## 举个栗子

```
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ReadWriteLockExample {
    private ReadWriteLock rwLock = new ReentrantReadWriteLock();

    public void read() {
        rwLock.readLock().lock();
        try {
            // 执行读操作
            // ...
        } finally {
            rwLock.readLock().unlock();
        }
    }

    public void write() {
        rwLock.writeLock().lock();
        try {
            // 执行写操作
            // ...
        } finally {
            rwLock.writeLock().unlock();
        }
    }
}
```

在这个示例中，我们创建了一个`ReentrantReadWriteLock`实例。`read`方法获取读锁，执行读操作，然后释放读锁。`write`方法获取写锁，执行写操作，然后释放写锁。

`ReentrantReadWriteLock`的读锁和写锁遵循以下规则：

- 读锁是共享的，也就是说，多个线程可以同时持有读锁，只要没有线程持有写锁。
- 写锁是独占的，也就是说，持有写锁的线程可以阻止其他线程获取读锁或写锁。
- 如果一个线程已经持有写锁，那么它可以再次获取读锁，这就是所谓的重入。但是，持有读锁的线程不能获取写锁。

## 适用场景

`ReadWriteLock`特别适合于读多写少的场景，例如一个在线词典。在这种情况下，可能有很多人（线程）同时查询词典（读操作），但只有在很少的情况下，比如添加新词或者更新词义（写操作）时，才需要写入。在这种情况下，使用`ReadWriteLock`可以提高性能，因为读操作不会阻塞其他读操作，只有在写操作时才会阻塞。

## 总结

`ReadWriteLock`通过分离读写锁，允许多个线程并发地读取共享资源，而在写入时保证资源的独占性。这种锁策略在提高读取效率的同时，也保证了数据的一致性，适用于读操作远多于写操作的应用场景。开发者在设计并发程序时，应根据实际需求合理选择和使用`ReadWriteLock`，以达到优化性能的目的。