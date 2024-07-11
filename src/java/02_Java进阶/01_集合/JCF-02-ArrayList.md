---
title: ArrayList
category: Java集合框架
tag:
  - ArrayList
icon: uis:web-grid-alt
order: 10
---

# 简介

ArrayList（Java数组列表），是一个可调整大小的数组，位于`java.util`包下。

我们平时使用的数组和`ArrayList`区别在于，数组的大小无法修改（数组的长度一旦确定后是固定不变的，如果要向数组中添加元素或从数组中删除元素，必须创建一个大一点的新数组，然后将旧数组中的值拷贝过去），但ArrayList可以随时添加和删除元素，底层会自动做扩容工作。

# 如何使用？

## 创建 ArrayList 对象

创建 `ArrayList` 对象有两种主要的方法：

1. **使用默认构造函数：**
   ```java
   ArrayList<String> cars = new ArrayList<String>();
   ```
   这种方式创建了一个初始大小为 10 的空 `ArrayList` 对象。

2. **使用带有初始容量的构造函数：**
   ```java
   int initialCapacity = 20; // 你可以根据需求设置初始容量
   ArrayList<String> cars = new ArrayList<String>(initialCapacity);
   ```
   这种方式创建了一个指定初始容量的空 `ArrayList` 对象。提供一个初始容量，可以减少动态扩容的次数，提高性能。

> 一般情况下，使用默认构造函数就足够了。只有在对列表的大小有明确估计时，才会考虑使用带有初始容量的构造函数。
>
> 另外，也可以通过**已有集合创建 ArrayList 对象**：
>
> ```java
> // 通过已有集合创建 ArrayList
> List<String> existingList = Arrays.asList("Volvo", "BMW", "Ford");
> ArrayList<String> cars = new ArrayList<String>(existingList);
> ```
>
> **使用 Java 9 引入的 `List.of` 方法**:
>
> ```java
> // Java 9 及以上版本
> List<String> carList = List.of("Volvo", "BMW", "Ford");
> ArrayList<String> cars = new ArrayList<String>(carList);
> ```

## 添加元素

向 `ArrayList` 中添加元素有两种基本的方法：

1. **`add(E element)` 方法：** 使用该方法将指定的元素添加到列表的末尾。这是最常用的添加元素的方式。

   ```java
   ArrayList<String> cars = new ArrayList<String>();
   cars.add("Volvo");
   cars.add("BMW");
   cars.add("Ford");
   cars.add("Mazda");
   ```

2. **`add(int index, E element)` 方法：** 将指定的元素插入到列表的指定位置。插入位置后的元素将向右移动。

   ```java
   ArrayList<String> cars = new ArrayList<String>();
   cars.add("Volvo");
   cars.add("BMW");
   
   // 在索引为 1 的位置插入元素 "Ford"
   cars.add(1, "Ford");
   ```

## 访问元素

使用 `get` 方法，可以通过指定元素的索引来获取元素。索引从 0 开始，依次递增。

```java
String car = cars.get(0);
```

## 修改元素

使用 `set` 方法可以直接指定要修改的元素的索引，并提供新的值进行替换。

```java
// 将索引为 0 的元素修改为 "Opel"
cars.set(0, "Opel");
```

## 删除元素

删除 `ArrayList` 中的元素有以下几种方法：

1. **使用 `remove` 方法：**
   - 通过索引删除元素：`remove(int index)`
     ```java
     ArrayList<String> cars = new ArrayList<String>();
     cars.add("Volvo");
     cars.add("BMW");
     cars.remove(1); // 删除索引为 1 的元素 "BMW"
     ```

   - 通过元素值删除元素：`remove(Object o)`
     ```java
     ArrayList<String> cars = new ArrayList<String>();
     cars.add("Volvo");
     cars.add("BMW");
     cars.remove("Volvo"); // 删除值为 "Volvo" 的元素
     ```

2. **使用 `removeAll` 方法：**
   - 删除一个集合中的所有元素。
     ```java
     ArrayList<String> cars = new ArrayList<String>();
     cars.add("Volvo");
     cars.add("BMW");
     
     ArrayList<String> removeCars = new ArrayList<String>();
     removeCars.add("Volvo");
     
     cars.removeAll(removeCars); // 删除 cars 中与 removeCars 相同的元素
     ```

3. **使用 `clear` 方法：**
   - 清空整个 `ArrayList`，使其不包含任何元素。
     ```java
     ArrayList<String> cars = new ArrayList<String>();
     cars.add("Volvo");
     cars.add("BMW");
     
     cars.clear(); // 清空所有元素
     ```

## 获取元素数量

1. **size() 方法**

   使用 `size()` 方法可返回 `ArrayList` 中元素的数量。

   ```java
   int size = cars.size();
   ```

2. **isEmpty() 方法**

   另外，使用 `isEmpty()` 方法可以检查 `ArrayList` 是否为空。如果为空，它返回 `true`，否则返回 `false`。

   ```java
   boolean isEmpty = cars.isEmpty();
   ```

## 遍历列表

- 普通遍历：使用传统的 `for` 循环可以遍历 `ArrayList` 中的元素。通过获取列表的大小并使用索引来访问每个元素。

```java
public class Main {
	public static void main(String[] args) {
		ArrayList<String> cars = new ArrayList<String>();
		cars.add("Volvo");
		cars.add("BMW");
		cars.add("Ford");
		cars.add("Mazda");
	    for (int i = 0; i < cars.size(); i++) {
	    	System.out.println(cars.get(i));
	    }
	}
}
```

- `for-each`遍历：使用增强型 `for-each` 循环可以更简洁地遍历 `ArrayList` 中的元素。

```java
public class Main {
	public static void main(String[] args) {
		ArrayList<String> cars = new ArrayList<String>();
		cars.add("Volvo");
		cars.add("BMW");
		cars.add("Ford");
		cars.add("Mazda");
	    for (String i : cars) {
	    	System.out.println(i);
	    }
	}
}
```

- **使用迭代器**：

```java
public class Main {
	public static void main(String[] args) {
		ArrayList<String> cars = new ArrayList<String>();
		cars.add("Volvo");
		cars.add("BMW");
		cars.add("Ford");
		cars.add("Mazda");
		Iterator<String> iterator = cars.iterator();
		while (iterator.hasNext()) { // 使用迭代器遍历
			String car = iterator.next();
			System.out.println(car);
		}
	}
}
```

- **使用Java 8的Stream API**：

```java
public class Main {
	public static void main(String[] args) {
		ArrayList<String> cars = new ArrayList<String>();
		cars.add("Volvo");
		cars.add("BMW");
		cars.add("Ford");
		cars.add("Mazda");
		// 使用Stream API遍历
		cars.stream().forEach(element -> System.out.println(element));
		// 或者
        // cars.forEach(element -> System.out.println(element));
	}
}
```

## 排序

对`ArrayList`中的元素进行排序，可以使用`Collections.sort()`方法：

```java
import java.util.ArrayList;
import java.util.Collections;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> cars = new ArrayList<String>();
    cars.add("Volvo");
    cars.add("BMW");
    cars.add("Ford");
    cars.add("Mazda");

    // 使用Collections.sort()进行排序
    Collections.sort(cars);

    // 打印排序后的元素
    for (String car : cars) {
      System.out.println(car);
    }
  }
}
```

我们来看源码：

```java
public static <T extends Comparable<? super T>> void sort(List<T> list) {
    list.sort(null);
}
```

可以看到，该方法利用列表自身的 `sort(Comparator)` 方法进行排序。但是！该方法要求列表中的元素必须实现 `Comparable` 接口。因此，如果`ArrayList`中存储的是我们自定义的类，然后该类必须实现实现`Comparator`接口，才能进行排序。

为什么 `String` 类型和基本数据类型的包装类可以进行排序？原因在于它们实现了 `Comparable` 接口，定义了它们的自然排序方式。这使得 `Collections.sort()` 方法能够利用它们的自然顺序进行排序。

如果`ArrayList`中存储的自定义类型对象，并没有实现`Comparator`接口，此时又想排序。那么可以传递一个实现了 `Comparator` 接口的比较器（匿名类），此时会调用`Collections`的另一个方法，源码如下：

```java
public static <T> void sort(List<T> list, Comparator<? super T> c) {
    list.sort(c);
}
```

原理也是一样的。举个例子：

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {
        ArrayList<Person> people = new ArrayList<>();
        people.add(new Person(25, "Alice"));
        people.add(new Person(30, "Bob"));
        people.add(new Person(22, "Charlie"));

        // 使用Comparator进行排序，根据Person对象的age属性
        Collections.sort(people, new Comparator<Person>() {
            @Override
            public int compare(Person person1, Person person2) {
                return person1.getAge() - person2.getAge();
            }
        });

        // 打印排序后的结果
        for (Person person : people) {
            System.out.println(person);
        }
    }
}

class Person {
    private int age;
    private String name;

    public Person(int age, String name) {
        this.age = age;
        this.name = name;
    }

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Person [age=" + age + ", name=" + name + "]";
	}

}
```



## 存储任意类型

`ArrayList` 中的元素实际上是对象。在上面的示例中，我们创建了“String”类型的元素（对象）。事实上，我们可以存储任意类型，比如自定义类型的对象`TreeNode`。

注意，如果要使用基本数据类型（例如 `int`），我们必须指定对应的包装类（`Integer`）。

> - `Byte`（对应 `byte`）
> - `Short`（对应 `short`）
> - `Integer`（对应 `int`）
> - `Long`（对应 `long`）
> - `Float`（对应 `float`）
> - `Double`（对应 `double`）
> - `Character`（对应 `char`）
> - `Boolean`（对应 `boolean`）

举例：

```java
import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<Integer> myNumbers = new ArrayList<Integer>();
    myNumbers.add(10);
    myNumbers.add(100);
    myNumbers.add(1000);
    myNumbers.add(10000);
    for (int i : myNumbers) {
      System.out.println(i);
    }
  }
}
```



## 其他常用方法

| Modifier and Type | Method and Description                                                                               |
| :---------------- | ---------------------------------------------------------------------------------------------------- |
| `boolean`         | `contains(Object o)`如果此列表包含指定元素，则返回`true 。`                                          |
| `int`             | `indexOf(Object o)`返回此列表中指定元素第一次出现的索引，如果此列表不包含该元素，则返回 -1。         |
| `int`             | `lastIndexOf(Object o)`返回此列表中最后一次出现的指定元素的索引，如果此列表不包含该元素，则返回 -1。 |
| `Object[]`        | `toArray()`返回一个数组，其中按正确顺序（从第一个元素到最后一个元素）包含此列表中的所有元素。        |



# 小结

`ArrayList` 是 Java 中的动态数组，位于 `java.util` 包下。相对于普通数组，`ArrayList` 具有动态调整大小的能力，使得在运行时能够轻松添加、删除元素，而无需事先指定数组大小。