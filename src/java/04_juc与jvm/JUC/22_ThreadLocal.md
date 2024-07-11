---
title: ThreadLocal
category: Java
tag:
  - 多线程
order: 22
icon: uis:process
---

ThreadLocal 是 Java 中的一个类，它提供了线程局部变量。这些变量与普通的同步变量不同，ThreadLocal 中每个线程都有自己的独立副本。每个线程都可以独立地改变自己的副本，而不会影响其他线程所对应的副本。

## 使用方法

创建一个 ThreadLocal 变量：

```java
ThreadLocal<Integer> threadLocal = new ThreadLocal<>();
```

为 ThreadLocal 变量设置值：

```java
threadLocal.set(100);
```

获取 ThreadLocal 变量的值：

```java
Integer value = threadLocal.get();
```

移除 ThreadLocal 变量的值：

```java
threadLocal.remove();
```

## 注意事项

1. ThreadLocal 不解决对象的共享访问问题，因此不适合作为类的字段使用。
2. ThreadLocal 实例通常作为类的静态字段来初始化，这样可以确保每个线程都能访问到同一个 ThreadLocal 实例，但每个线程都有自己的值副本。
3. ThreadLocal 有内存泄漏的问题，如果不再需要使用，需要手动调用其 remove() 方法清除（如果`ThreadLocal`没有被清除，该线程执行其他代码时，会把上一次的状态带进去）。

## 示例代码

```java
public class ThreadLocalExample {

    private static final ThreadLocal<Integer> threadLocal = new ThreadLocal<>();

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            try {
                threadLocal.set(100);
                System.out.println("Thread1 value: " + threadLocal.get());
            } finally {
                threadLocal.remove();
            }
        });

        Thread t2 = new Thread(() -> {
            try {
                threadLocal.set(200);
                System.out.println("Thread2 value: " + threadLocal.get());
            } finally {
                threadLocal.remove();
            }
        });

        t1.start();
        t2.start();
    }
}
//Thread1 value: 100
//Thread2 value: 200
```

这里我们创建了两个线程，每个线程都有自己的 ThreadLocal 变量副本。因此，当它们分别设置和获取值时，不会互相影响。

## 总结

1. **线程隔离**：ThreadLocal 提供了一种将状态与线程关联的机制。每个线程都有自己的 ThreadLocal 变量副本，这样就可以确保每个线程都可以独立地改变自己的副本，而不会影响其他线程所对应的副本。
2. **上下文传递**：ThreadLocal 非常适合在一个线程的处理流程中保持上下文。例如，在 Web 应用中，我们可以使用 ThreadLocal 来传递用户的身份信息，或者在数据库操作中，我们可以使用 ThreadLocal 来传递数据库连接。
3. **资源清理**：使用 ThreadLocal 时，一定要记住在不再需要使用它时调用其 remove() 方法以防止内存泄漏。通常，我们会在 try...finally 结构中使用 ThreadLocal，并在 finally 块中调用其 remove() 方法。
4. **静态字段初始化**：ThreadLocal 实例通常作为类的静态字段来初始化，这样可以确保每个线程都能访问到同一个 ThreadLocal 实例，但每个线程都有自己的值副本。