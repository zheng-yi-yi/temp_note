---
title: List接口
category: Java集合框架
tag:
  - List接口
icon: uis:web-grid-alt
order: 3
---

## 简介


List接口继承自Collection接口，表示有序集合（也称为序列），特点如下：

- **有序性：** List 中的元素是有序的，可以根据它们的插入顺序访问。
- **允许重复：** List 允许存储相同的元素，同一个元素可以出现多次。
- **可基于索引：** 通过索引获取、设置、添加和删除元素。
- **搜索功能：** 提供了查找元素在列表中位置的方法，如 `indexOf` 和 `lastIndexOf`。

Java 提供了两个通用 `List` 实现类，分别是`ArrayList` 和`LinkedList`。

## 使用List

### 基本操作

List 接口继承自 Collection 接口，因此包含了基本的增加、删除、查询等操作。以下是一些常用的基本操作：

- `add(E element)`: 将元素添加到列表的末尾。

- `addAll(Collection<? extends E> c)`: 将指定集合的所有元素添加到列表的末尾。

- `remove(Object element)`: 从列表中删除指定元素的第一个匹配项。

- `get(int index)`: 获取列表中指定位置的元素。

- `set(int index, E element)`: 将列表中指定位置的元素替换为指定的元素。

### 基于索引访问/搜索元素

List 提供了基于位置的访问和搜索操作：

- `indexOf(Object o)`: 返回指定元素在列表中第一次出现的位置。

- `lastIndexOf(Object o)`: 返回指定元素在列表中最后一次出现的位置。

- `subList(int fromIndex, int toIndex)`: 返回列表中指定范围的子列表。

### 迭代器

`List` 提供了两种迭代器，包括标准的 `Iterator` 和更丰富的 `ListIterator`。

`ListIterator` 允许双向遍历、修改列表以及获取当前迭代器的位置。

```java
List<String> myList = new ArrayList<>();
ListIterator<String> iterator = myList.listIterator();

while (iterator.hasNext()) {
    String element = iterator.next();
    // 迭代列表中的元素
}

while (iterator.hasPrevious()) {
    String element = iterator.previous();
    // 逆向迭代列表中的元素
}
```

### Range-View 操作

List 提供了 `subList(int fromIndex, int toIndex)` 方法，返回列表中指定范围的子列表视图。这个子列表是原列表的一个视图，对子列表的修改会反映在原列表上。

```java
List<String> myList = new ArrayList<>();
List<String> subList = myList.subList(1, 4);
// subList 是 myList 中索引 1 到 3 的子列表

subList.clear(); // 清空子列表，会影响原列表
```

### List 算法

Collections 类提供了多个 List 特定的算法，包括排序、随机排列、反转、旋转、交换、替换等。这些算法提供了高效地操作 List 的方式。

```java
List<Integer> numbers = new ArrayList<>();
// 添加元素到 numbers 中

Collections.sort(numbers); // 对列表进行排序

Collections.shuffle(numbers); // 随机排列列表中的元素

Collections.reverse(numbers); // 反转

// 其他操作包括 rotate、swap、replaceAll、fill、copy、binarySearch 等
```


# 接口方法记录

**增加（Add）:**
1. `add(E): boolean` - 将元素添加到列表的末尾。
2. `addAll(Collection<? extends E>): boolean` - 将指定集合中的所有元素添加到列表的末尾。
3. `addAll(int, Collection<? extends E>): boolean` - 在指定位置插入指定集合中的所有元素。
4. `add(int, E): void` - 在指定位置插入元素。

**删除（Remove）:**
1. `remove(Object): boolean` - 从列表中删除指定的元素。
2. `removeAll(Collection<?>): boolean` - 从列表中删除包含在指定集合中的所有元素。
3. `remove(int): E` - 删除指定位置的元素。

**修改（Modify）:**
1. `set(int, E): E` - 用指定的元素替换列表中指定位置的元素。
2. `replaceAll(UnaryOperator<E>): void` - 使用指定的操作符对列表的每个元素进行替换。

**查询（Query）:**
1. `size(): int` - 返回列表中的元素数。
2. `isEmpty(): boolean` - 判断列表是否为空。
3. `contains(Object): boolean` - 判断列表是否包含指定的元素。
4. `containsAll(Collection<?>): boolean` - 判断列表是否包含指定集合中的所有元素。
5. `get(int): E` - 返回列表中指定位置的元素。
6. `indexOf(Object): int` - 返回列表中指定元素的第一个出现位置的索引。
7. `lastIndexOf(Object): int` - 返回列表中指定元素的最后一个出现位置的索引。
8. `iterator(): Iterator<E>` - 返回在列表中的元素上进行迭代的迭代器。
9. `listIterator(): ListIterator<E>` - 返回列表中的列表迭代器（从第一个元素开始）。
10. `listIterator(int): ListIterator<E>` - 返回列表中的列表迭代器（从指定位置开始）。
11. `subList(int, int): List<E>` - 返回列表中指定范围的部分视图。

**其他（Other）:**
1. `toArray(): Object[]` - 将列表转换为数组。
2. `toArray(T[]): T[]` - 将列表转换为指定类型的数组。
3. `clear(): void` - 从列表中删除所有元素。
4. `sort(Comparator<? super E>): void` - 根据指定的比较器对列表进行排序。
5. `spliterator(): Spliterator<E>` - 返回列表的分割器。
6. `equals(Object): boolean` - 判断列表是否与指定对象相等。
7. `hashCode(): int` - 返回列表的哈希码。