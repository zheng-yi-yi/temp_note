---
title: Deque接口
category: Java集合框架
tag:
  - Deque接口
icon: uis:web-grid-alt
order: 6
---

## 简介

`Deque`（双端队列）是 Java 集合框架中的一个接口，它继承自 `Queue` 接口。`Deque` 支持在两端插入和移除元素，因此可以被当作堆栈（先进后出）或队列（先进先出）来使用。

`Deque` 接口定义了一些特定的方法，用于操作双端队列的头部和尾部元素：

- `addFirst(E e)` 和 `addLast(E e)`：在双端队列的头部或尾部插入元素，如果双端队列已满，则抛出 `IllegalStateException`。
- `offerFirst(E e)` 和 `offerLast(E e)`：在双端队列的头部或尾部插入元素，如果双端队列已满，则返回 `false`。
- `removeFirst()` 和 `removeLast()`：移除并返回双端队列的头部或尾部元素，如果双端队列为空，则抛出 `NoSuchElementException`。
- `pollFirst()` 和 `pollLast()`：移除并返回双端队列的头部或尾部元素，如果双端队列为空，则返回 `null`。
- `getFirst()` 和 `getLast()`：返回双端队列的头部或尾部元素但不移除，如果双端队列为空，则抛出 `NoSuchElementException`。
- `peekFirst()` 和 `peekLast()`：返回双端队列的头部或尾部元素但不移除，如果双端队列为空，则返回 `null`。

`Deque` 接口的主要实现类包括 `LinkedList` 和 `ArrayDeque`。

- `LinkedList`：它是一个双向链表，实现了 `List` 和 `Deque` 接口，可以作为双端队列使用。
- `ArrayDeque`：它是一个基于数组的双端队列，没有容量限制，可以作为栈或者队列使用。

## 小结

**在首尾添加（Add at the beginning and end）:**
1. `addFirst(E): void` - 在列表的开头添加指定元素。
2. `addLast(E): void` - 在列表的末尾添加指定元素。
3. `offerFirst(E): boolean` - 在列表的开头添加指定元素，如果成功则返回 `true`。
4. `offerLast(E): boolean` - 在列表的末尾添加指定元素，如果成功则返回 `true`。

**删除首尾元素（Remove first and last element）:**
1. `removeFirst(): E` - 删除并返回列表的第一个元素。
2. `removeLast(): E` - 删除并返回列表的最后一个元素。
3. `pollFirst(): E` - 检索并移除列表的第一个元素，如果列表为空，则返回 `null`。
4. `pollLast(): E` - 检索并移除列表的最后一个元素，如果列表为空，则返回 `null`。

**获取首尾元素（Get first and last element）:**
1. `getFirst(): E` - 返回列表的第一个元素。
2. `getLast(): E` - 返回列表的最后一个元素。
3. `peekFirst(): E` - 检索但不移除列表的第一个元素，如果列表为空，则返回 `null`。
4. `peekLast(): E` - 检索但不移除列表的最后一个元素，如果列表为空，则返回 `null`。

**移除指定元素（Remove specified element）:**
1. `removeFirstOccurrence(Object): boolean` - 移除第一次出现的指定元素。
2. `removeLastOccurrence(Object): boolean` - 移除最后一次出现的指定元素。
3. `remove(Object): boolean` - 从列表中移除指定元素。

**队列操作（Queue operations）:**
1. `add(E): boolean` - 将元素添加到列表的末尾。
2. `offer(E): boolean` - 将元素添加到列表的末尾，如果成功则返回 `true`。
3. `remove(): E` - 删除并返回列表的第一个元素。
4. `poll(): E` - 检索并移除列表的第一个元素，如果列表为空，则返回 `null`。
5. `element(): E` - 返回列表的第一个元素，如果列表为空，则抛出异常。
6. `peek(): E` - 检索但不移除列表的第一个元素，如果列表为空，则返回 `null`。

**其他（Other）:**
1. `size(): int` - 返回列表中的元素数。
2. `iterator(): Iterator<E>` - 返回在列表中的元素上进行迭代的迭代器。
3. `descendingIterator(): Iterator<E>` - 返回在列表中的元素上进行降序迭代的迭代器。
