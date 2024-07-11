---
title: Set接口
category: Java集合框架
tag:
  - Set接口
icon: uis:web-grid-alt
order: 4
---

## 简介


`Set` 是 Java 集合框架中的一个接口，它继承自 `Collection` 接口。

`Set` 接口的特点是不允许集合中有重复的元素。如果试图将重复的元素加入到 `Set` 中，`Set` 不会报错，但会呈现一个去重的效果。另外一个，Set接口的对象是可以添加null值，存放的数据也是无序的，即添加的顺序和取出的顺序是不一致的。但是，取出的顺序是固定不变的。

`Set` 接口的主要方法都继承自 `Collection` 接口，包括 `add`、`remove`、`contains`、`size`、`isEmpty`、`clear` 等。

## Set实现类

`Set` 接口有几个主要的实现类，比如 `HashSet`、`LinkedHashSet` 和 `TreeSet`。

- `HashSet`：它不保证集合元素的顺序；允许包含值为 `null` 的元素。
- `LinkedHashSet`：它是 `HashSet` 的子类，它增加了一条链表来维护元素的插入顺序，所以元素的迭代顺序是按照它们被插入到集合中的顺序。
- `TreeSet`：它是一个有序的集合，它的元素按照自然顺序排序，或者按照传递给集合构造函数的比较器进行排序。