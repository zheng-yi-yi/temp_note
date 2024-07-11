---
title: SortedSet接口
category: Java集合框架
tag:
  - SortedSet接口
icon: uis:web-grid-alt
order: 8
---

## 简介

`SortedSet` 是 Java 集合框架中的一个接口，它继承自 `Set` 接口。`SortedSet` 接口为集合中的元素提供了一个总的排序。元素可以按照自然排序或者通过构造函数传入的 `Comparator` 进行排序。

`SortedSet` 接口定义了一些特定的方法，用于操作有序集合：

- `first()`：返回此 set 中当前第一个（最低）元素。
- `last()`：返回此 set 中当前最后一个（最高）元素。
- `headSet(E toElement)`：返回此 set 的部分视图，其元素严格小于 `toElement`。
- `tailSet(E fromElement)`：返回此 set 的部分视图，其元素大于等于 `fromElement`。
- `subSet(E fromElement, E toElement)`：返回此 set 的部分视图，其元素的范围从 `fromElement`（包含）到 `toElement`（不包含）。
- `comparator()`：返回用来排序此 set 的比较器，如果此 set 使用其元素的自然顺序，则返回 `null`。

`SortedSet` 接口的主要实现类是 `TreeSet`。`TreeSet` 是一个有序的集合，它的元素按照自然顺序排序，或者按照传递给集合构造函数的比较器进行排序。