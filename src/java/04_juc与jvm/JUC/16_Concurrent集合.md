---
title: Concurrent
category: Java
tag:
  - 多线程
order: 16
icon: uis:process
---


## 概述

在`Java`中，`Concurrent`集合是一种特殊类型的集合，它们可以在多线程环境中使用，而无需显式同步。这些集合在`java.util.concurrent`包中。

| interface | non-thread-safe             | thread-safe                                  |
| :-------- | :-------------------------- | :------------------------------------------- |
| `List`    | `ArrayList`                 | `CopyOnWriteArrayList`                       |
| `Map`     | `HashMap`                   | `ConcurrentHashMap`                          |
| `Set`     | `HashSet` / `TreeSet`       | `CopyOnWriteArraySet`                        |
| `Queue`   | `ArrayDeque` / `LinkedList` | `ArrayBlockingQueue` / `LinkedBlockingQueue` |
| `Deque`   | `ArrayDeque` / `LinkedList` | `LinkedBlockingDeque`                        |

## 如何使用

`Concurrent`集合的使用方式与非线程安全的集合类完全相同。它们都实现了Java的标准集合接口，如Map、List、Set等。因此，你可以像使用非线程安全的集合类一样使用它们，例如添加元素、删除元素、遍历集合等。

```java
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Test {
    public static void main(String[] args) {
        Map<String, String> map = new ConcurrentHashMap<>();

        map.put("key1", "value1");
        map.put("key2", "value2");
        map.put("key3", "value3");

        // 使用putIfAbsent方法
        map.putIfAbsent("key3", "value4");
        map.putIfAbsent("key4", "value4");

        System.out.println("ConcurrentHashMap: " + map);
    }
}
// ConcurrentHashMap: {key1=value1, key2=value2, key3=value3, key4=value4}
```

## Concurrent集合的优点

- **线程安全**：`Concurrent`集合是线程安全的，这意味着多个线程可以同时访问和修改集合，而不会产生不一致的结果。
- **高性能**：与传统的同步集合相比，`Concurrent`集合提供了更高的性能。这是因为它们使用了更高级的并发控制机制（如分段锁定）。

## 线程安全集合转换器

`java.util.Collections`工具类还提供了一个旧的线程安全集合转换器，可以这么用：

```
Map unsafeMap = new HashMap();
Map threadSafeMap = Collections.synchronizedMap(unsafeMap);
```

`Collections.synchronizedXxx()`方法返回的是一个包装过的集合，所有的方法都通过`synchronized`关键字进行同步。

但这样获得的集合安全类，性能很低，比`java.util.concurrent`集合要低很多，所以不推荐这样使用。

