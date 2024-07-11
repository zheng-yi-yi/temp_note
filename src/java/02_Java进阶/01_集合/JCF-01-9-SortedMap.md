---
title: SortedMap接口
category: Java集合框架
tag:
  - SortedMap接口
icon: uis:web-grid-alt
order: 9
---

## 简介

`SortedMap` 是 Java 集合框架中的一个接口，它继承自 `Map` 接口。`SortedMap` 接口为映射中的键提供了一个总的排序。键可以按照自然排序或者通过构造函数传入的 `Comparator` 进行排序。

`SortedMap` 接口定义了一些特定的方法，用于操作有序映射：

- `firstKey()`：返回此映射中当前第一个（最低）键。
- `lastKey()`：返回此映射中当前最后一个（最高）键。
- `headMap(K toKey)`：返回此映射的部分视图，其键严格小于 `toKey`。
- `tailMap(K fromKey)`：返回此映射的部分视图，其键大于等于 `fromKey`。
- `subMap(K fromKey, K toKey)`：返回此映射的部分视图，其键的范围从 `fromKey`（包含）到 `toKey`（不包含）。
- `comparator()`：返回用来排序此映射的比较器，如果此映射使用其键的自然顺序，则返回 `null`。

`SortedMap` 接口的主要实现类是 `TreeMap`。`TreeMap` 是一个有序的映射，它的元素按照键的自然顺序排序，或者按照传递给映射构造函数的比较器进行排序。