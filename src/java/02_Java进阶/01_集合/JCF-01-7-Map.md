---
title: Map接口
category: Java集合框架
tag:
  - Map接口
icon: uis:web-grid-alt
order: 7
---

## 简介


`Map` 是 Java 集合框架中的一个接口，它不是 `Collection` 接口的子接口。`Map` 接口存储键值对（key-value pairs），键和值都是对象。在 `Map` 中，键必须是唯一的，但是值可以重复。

`Map` 接口定义了一些方法，用于操作键值对：

- `put(K key, V value)`：将指定的值与此映射中的指定键关联（可选操作）。
- `get(Object key)`：返回到指定键所映射的值，或 `null`（如果此映射包含该键的映射）。
- `remove(Object key)`：如果存在（从可选的操作），从此映射中移除一个键的映射。
- `containsKey(Object key)`：如果此映射包含指定键的映射，则返回 `true`。
- `containsValue(Object value)`：如果此映射将一个或多个键映射到指定值，则返回 `true`。
- `size()`：返回此映射中的键-值映射关系数。
- `isEmpty()`：如果此映射未包含键-值映射关系，则返回 `true`。

`Map` 接口的主要实现类包括 `HashMap`、`LinkedHashMap`、`TreeMap` 和 `Hashtable`。

- `HashMap`：它基于哈希表实现，不保证映射的顺序。
- `LinkedHashMap`：它是 `HashMap` 的子类，维护了一个运行于所有条目的双向链表，可以按照插入顺序或者访问顺序（LRU）来遍历。
- `TreeMap`：它是一个有序的键值对集合，它的元素按照键的自然顺序或者提供的比较器进行排序。
- `Hashtable`：它和 `HashMap` 类似，但是它是线程安全的，所有的方法都是同步的，性能较低。