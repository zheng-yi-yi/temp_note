---
title: Queue接口
category: Java集合框架
tag:
  - Queue接口
icon: uis:web-grid-alt
order: 5
---

## 简介


`Queue` 是 Java 集合框架中的一个接口，它继承自 `Collection` 接口。`Queue` 接口代表了一个先进先出（FIFO）的队列。

`Queue` 接口定义了一些特定的方法，用于操作队列的头部和尾部元素：

- `add(E e)`：将指定的元素插入到队列的尾部，如果成功则返回 `true`，如果队列已满，则抛出 `IllegalStateException`。
- `offer(E e)`：将指定的元素插入到队列的尾部，如果成功则返回 `true`，如果队列已满，则返回 `false`。
- `remove()`：移除并返回队列的头部元素，如果队列为空，则抛出 `NoSuchElementException`。
- `poll()`：移除并返回队列的头部元素，如果队列为空，则返回 `null`。
- `element()`：返回队列的头部元素但不移除，如果队列为空，则抛出 `NoSuchElementException`。
- `peek()`：返回队列的头部元素但不移除，如果队列为空，则返回 `null`。

`Queue` 接口的主要实现类包括 `LinkedList`、`PriorityQueue` 和 `ArrayDeque`。

- `LinkedList`：它是一个双向链表，实现了 `List` 和 `Deque` 接口，可以作为 FIFO（先进先出）队列使用。
- `PriorityQueue`：它是一个优先队列，元素按照自然顺序或者提供的比较器进行排序。
- `ArrayDeque`：它是一个基于数组的双端队列，没有容量限制，可以作为栈或者队列使用。