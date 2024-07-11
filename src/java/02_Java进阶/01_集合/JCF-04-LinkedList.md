---
title: LinkedList用法
category: Java集合框架
tag:
  - LinkedList
icon: uis:web-grid-alt
order: 12
---

# 简介

`LinkedList`（链表）位于`java.util`包下，与`ArrayList`不同，`LinkedList`不是基于数组实现的，而是通过链表结构实现的（双向链表）。

链表是由一系列节点组成的数据结构，每个节点包含数据和指向下一个节点的引用。在`LinkedList`中，每个节点都保存了对前一个节点和后一个节点的引用，这使得在链表中插入或删除元素更为高效，因为不需要像数组一样进行元素的拷贝和移动。

`LinkedList`的优势在于在中间插入或删除元素时的效率比`ArrayList`更高，因为它不需要移动大量元素。然而，在按索引访问元素时，`LinkedList`的性能相对较差，因为需要从头或尾开始遍历链表。

> 如果需要频繁访问列表中的某一个元素，或者只需要在列表末尾进行添加和删除元素操作，那么可以用`ArrayList`。如果需要通过循环迭代来访问列表中的某些元素，或者需要频繁的在列表开头、中间、末尾等位置进行添加和删除元素操作，则建议使用`LinkedList`。

# 如何使用？

在上一节，我们已经学习了`ArrayList`的常见用法。而`LinkedList`在使用体验上和`ArrayList`差不多：

```java
import java.util.LinkedList;

public class Main {
  public static void main(String[] args) {
    LinkedList<String> cars = new LinkedList<String>();
    cars.add("Volvo");
    cars.add("BMW");
    cars.add("Ford");
    cars.add("Mazda");
    System.out.println(cars);
  }
}
```

类`LinkedList`是一个集合，可以包含许多相同类型的对象，就像`ArrayList`一样，它们都实现了该`List`接口，因此我们可以以相同的方式添加元素、修改元素和删除元素。

但是，`LinkedList`不仅实现了`List`接口，还实现了`Deque`接口，因此`LinkedList`不仅可以看作一个顺序容器，还可以看做一个**队列**（`Queue`），同时还可以看作一个栈（`Stack`）。

注意，`Java`中没有一个叫做`Queue`的类（`Queue`是一个接口，并且`Deque`接口还继承了`Queue`接口）。

> “关于栈或队列，现在的首选是`ArrayDeque`，它有着比`LinkedList`（当作栈或队列使用时）有着更好的性能。”

`LinkedList`和`ArrayList`的用法虽然类似，但是它们的构建方式不同，我们在下一节再来学习`LinkedList`的内部实现逻辑。现在先来看常见用法。

## 创建 LinkedList 对象

在`LinkedList`中创建`LinkedList`对象有两种主要方法：

1. **无参数构造函数：** 使用无参数的构造函数直接创建一个空的`LinkedList`对象。例如：
   ```java
   LinkedList<String> cars = new LinkedList<String>();
   ```

2. **使用已有集合来构建LinkedList：**，可以将现有的集合（如List）作为参数传递给`LinkedList`有参构造器，从而创建一个包含相同元素的`LinkedList`对象。例如：
   ```java
   List<String> list = Arrays.asList("Volvo", "BMW", "Ford", "Mazda");
   LinkedList<String> cars = new LinkedList<String>(list);
   ```

这两种方法都可以用来创建LinkedList对象。

## 添加元素


| 方法原型                                       | 含义                                                         | 例子                                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `add(E element)`                               | 将指定的元素追加到此列表的末尾。                             | `cars.add("Mercedes");`                                                              |
| `add(int index, E element)`                    | 将指定的元素插入到列表的指定位置。                           | `cars.add(2, "Chevrolet");`                                                          |
| `addFirst(E element)`                          | 在列表的开头插入指定的元素。                                 | `cars.addFirst("Toyota");`                                                           |
| `addLast(E element)`                           | 在列表的末尾追加指定的元素（与add()方法相同）。              | `cars.addLast("Honda");`                                                             |
| `offer(E element)`                             | 将指定的元素添加到此列表的末尾（与`add()`方法相似）。        | `cars.offer("Audi");`                                                                |
| `offerFirst(E element)`                        | 在列表的开头插入指定的元素（与`addFirst()`方法相似）。       | `cars.offerFirst("Jaguar");`                                                         |
| `offerLast(E element)`                         | 在列表的末尾追加指定的元素（与`addLast()`方法相似）。        | `cars.offerLast("Porsche");`                                                         |
| `push(E e)`                                    | 将元素推送到由该列表表示的栈的顶部（其实就是`addFirst()`）。 | `cars.push("Toyota");`                                                               |
| `addAll(int index, Collection<? extends E> c)` | 将指定集合中的所有元素按其顺序插入到列表的指定位置。         | `List<String> newCars = Arrays.asList("Tesla", "Kia"); cars.addAll(3, newCars);`     |
| `addAll(Collection<? extends E> c)`            | 将指定集合中的所有元素按其顺序添加到列表的末尾。             | `List<String> newCars = Arrays.asList("Nissan", "Chevrolet"); cars.addAll(newCars);` |

## 访问元素

| 方法原型         | 含义                                                               | 例子                                  |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------- |
| `get(int index)` | 返回列表中指定位置的元素。                                         | `String firstCar = cars.get(0);`      |
| `getFirst()`     | 返回列表的第一个元素。                                             | `String firstCar = cars.getFirst();`  |
| `getLast()`      | 返回列表的最后一个元素。                                           | `String lastCar = cars.getLast();`    |
| `element()`      | 返回列表的第一个元素，如果列表为空则抛出`NoSuchElementException`。 | `String firstCar = cars.element();`   |
| `peek()`         | 返回列表的第一个元素，如果列表为空则返回`null`。                   | `String firstCar = cars.peek();`      |
| `peekFirst()`    | 返回列表的第一个元素，如果列表为空则返回`null`。                   | `String firstCar = cars.peekFirst();` |
| `peekLast()`     | 返回列表的最后一个元素，如果列表为空则返回`null`。                 | `String lastCar = cars.peekLast();`   |


## 修改元素

| 方法原型                    | 含义                                   | 例子                              |
| --------------------------- | -------------------------------------- | --------------------------------- |
| `set(int index, E element)` | 将指定位置的元素设置为指定的元素。     | `cars.set(index, "newCar");`      |
| `setFirst(E element)`       | 将列表的第一个元素设置为指定的元素。   | `cars.setFirst("UpdatedToyota");` |
| `setLast(E element)`        | 将列表的最后一个元素设置为指定的元素。 | `cars.setLast("UpdatedHonda");`   |

## 删除元素

| 方法原型                          | 含义                                                             | 例子                                                 |
| --------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------- |
| `remove()`                        | 删除第一个元素。                                                 | `cars.remove();`                                     |
| `remove(Object o)`                | 根据元素值删除第一个匹配的元素。                                 | `cars.remove("BMW");`                                |
| `remove(int index)`               | 根据索引位置删除元素。                                           | `cars.remove(1); // 删除索引为1的元素（第二个元素）` |
| `removeFirst()`                   | 删除链表的第一个元素。                                           | `cars.removeFirst();`                                |
| `removeLast()`                    | 删除链表的最后一个元素。                                         | `cars.removeLast();`                                 |
| `pop()`                           | 从列表表示的栈中弹出一个元素，即删除并返回列表的第一个元素。     | `cars.pop();`                                        |
| `poll()`                          | 检索并移除列表的头（第一个元素）。如果列表为空，则返回`null`。   | `cars.poll();`                                       |
| `pollFirst()`                     | 检索并移除列表的头（第一个元素）。如果列表为空，则返回`null`。   | `cars.pollFirst();`                                  |
| `pollLast()`                      | 检索并移除列表的尾（最后一个元素）。如果列表为空，则返回`null`。 | `cars.pollLast();`                                   |
| `removeFirstOccurrence(Object o)` | 删除第一次出现的指定元素。                                       | `cars.removeFirstOccurrence("Ford");`                |
| `removeLastOccurrence(Object o)`  | 删除最后一次出现的指定元素。                                     | `cars.removeLastOccurrence("Volvo");`                |

## 遍历链表

在LinkedList中进行遍历：

1. **使用增强for循环（for-each循环）：**
   ```java
   for (String car : cars) {
       System.out.println(car);
   }
   ```

2. **使用迭代器（Iterator）：**
   ```java
   Iterator<String> iterator = cars.iterator();
   while (iterator.hasNext()) {
       String car = iterator.next();
       System.out.println(car);
   }
   ```

3. **使用Java 8的forEach方法：**
   ```java
   cars.forEach(car -> System.out.println(car));
   ```

4. **通过索引访问元素：**
   ```java
   for (int i = 0; i < cars.size(); i++) {
       String car = cars.get(i);
       System.out.println(car);
   }
   ```

## 排序

同样的，在LinkedList中进行排序有以下两种主要方法：

1. **Collections.sort() 方法：** 你可以使用`Collections`类的`sort()`方法来对LinkedList进行排序。注意，该方法会改变原始LinkedList的顺序。
   ```java
   LinkedList<String> cars = new LinkedList<String>();
   // 添加元素到LinkedList
   Collections.sort(cars);
   ```

2. **自定义Comparator排序：** 你可以使用`Collections.sort()`方法的重载版本，传递一个自定义的`Comparator`对象（实现了`Comparator`接口的`compare`方法），以实现根据特定条件进行排序。
   ```java
   LinkedList<String> cars = new LinkedList<String>();
   // 添加元素到LinkedList
   Collections.sort(cars, new CustomComparator());
   ```


# 总结

我们来总结一下。

`LinkedList`内部采用双向链表结构实现，在插入和删除操作时效率比较高，但随机访问元素的效率相对较低（因为需要从头节点或尾节点开始遍历）。

作为 `List` 接口的实现，`LinkedList` 具备了有序、可重复的特性。同时，作为 `Deque` 接口的实现，它支持双端队列的操作，可以在队列的两端进行插入和删除操作。