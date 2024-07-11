---
title: Atomic
category: Java
tag:
  - 多线程
order: 17
icon: uis:process
---


## 前言

Java中的`java.util.concurrent.atomic`包提供了一组以原子方式操作单个变量的工具类，这些类主要用于解决在并发编程中，多线程对共享数据进行修改时可能出现的数据不一致问题。原子操作类通过无锁（lock-free）的方式实现了线程安全（thread-safe）的访问，主要依赖于CAS（Compare and Set）操作。

## 原子操作类

ava的`java.util.concurrent`包除了提供底层锁、并发集合外，还提供了一组原子操作的封装类，它们位于`java.util.concurrent.atomic`包。这里我们以`AtomicInteger`类为例。

### AtomicInteger

`AtomicInteger`是`java.util.concurrent.atomic`包中的一个类，它提供的原子操作主要包括：

- `addAndGet(int delta)`: 增加值并返回新值。
- `incrementAndGet()`: 加1后返回新值。
- `get()`: 获取当前值。
- `compareAndSet(int expect, int update)`: 用CAS方式设置值。

举个例子：

```java
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        AtomicInteger atomicInteger = new AtomicInteger(0);

        // 使用addAndGet增加值
        int newValue = atomicInteger.addAndGet(5);
        System.out.println("New Value: " + newValue);  // 输出: New Value: 5

        // 使用incrementAndGet增加值
        newValue = atomicInteger.incrementAndGet();
        System.out.println("New Value: " + newValue);  // 输出: New Value: 6

        // 使用get获取当前值
        int currentValue = atomicInteger.get();
        System.out.println("Current Value: " + currentValue);  // 输出: Current Value: 6

        // 使用compareAndSet设置值，将值从6改为9
        boolean wasNewValueSet = atomicInteger.compareAndSet(6, 9);
        System.out.println("Was New Value Set? " + wasNewValueSet);  // 输出: Was New Value Set? true
    }
}
```

在这个例子中，我们首先创建了一个初始值为0的`AtomicInteger`。然后我们使用`addAndGet`方法增加了5，然后使用`incrementAndGet`方法增加了1。接着我们使用`get`方法获取了当前值。最后，我们尝试使用`compareAndSet`方法将值从6改为9，这个操作成功了，所以返回了`true`。

### 其他原子操作类

1. `AtomicLong`：类似于`AtomicInteger`，但是针对基本类型`long`的原子操作。
2. `AtomicBoolean`：针对布尔类型`boolean`的原子操作类。
3. `AtomicReference`：适用于对象引用的原子操作，可以用于任意类型的引用，不仅仅是基本数据类型。
4. `AtomicReferenceArray`、`AtomicIntegerArray`、`AtomicLongArray`：这些类提供了对数组的原子操作，分别对应对象引用、整数和长整数类型的数组。
5. `AtomicStampedReference`：提供了带有版本号的原子引用，可以用于解决ABA问题。
6. `AtomicMarkableReference`：类似于`AtomicStampedReference`，但是提供了一个布尔标记位，用于记录引用是否被修改过。

## 实现原理

### CAS操作

这些原子操作类`Atomic`的主要工作原理是使用了CAS（Compare-and-Swap）操作。CAS是一种无锁的技术，可以在并发编程中实现线程安全。

CAS操作包含三个操作数 —— 内存位置（V）、预期原值（A）和新值（B）。如果内存位置的当前值等于预期原值，则将该位置的值修改为新值。这个比较和替换的操作是一个原子操作，即在这个操作过程中不会被其他线程打断。

也就是说，如果`AtomicInteger`的当前值等于预期值，那么就会将其设置为新的值，并返回`true`；否则，不会做任何操作，并返回`false`。

### ABA问题

CAS操作方式的优点是避免了传统的线程同步的开销（如使用`synchronized`关键字）。但是，它也有一些缺点，比如ABA问题，即在这个过程中，如果原值被其他线程改变了两次，回到了原值，这个时候CAS操作还是会认为值没有被其他线程改变。为了解决这个问题，Java提供了`AtomicStampedReference`类，它通过使用版本号（或者说是时间戳）来保证CAS操作的正确性。

## 总结

- 原子操作通过无锁的方式实现了线程安全。
- 适用于计数器、累加器等场景。
- 通过封装好的API简化了多线程编程的复杂性。