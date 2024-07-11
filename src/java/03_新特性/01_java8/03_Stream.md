---
title: Stream
category: Java
tag:
  - java8新特性
order: 4
---

::: tip

Stream（`java.util.stream`）是Java 8中引入的一种新的数据处理方式，它允许我们以声明式的方式处理数据集合，可以进行并行或串行的读取、过滤、映射、匹配、聚合等操作，大大提高了编程效率和程序可读性，把真正的函数式编程风格引入到`Java`中。

:::

## Stream API

Java8中有两大最为重要的改变，第一个是**Lambda 表达式**，另外一个就是**Stream API**。`Stream` 是 `Java 8` 中处理集合的关键抽象概念，它可以指定你希望对集合进行的操作，可以执行非常复杂的查找、过滤和映射数据等操作。

使用 `Stream API` 对集合数据进行操作，就类似于使用SQL 执行的数据库查询。 也可以使用 `Stream API` 来并行执行操作。简言之，`Stream API` 提供了一种 **高效且易于使用的** 处理数据的方式。

## 到底什么是Stream？

`Stream`，说白了就是新的数据处理方式，它是数据渠道，用于操作数据源（集合、数组等）所生成的元素序列。可以说，“集合讲的是数据，`Stream`讲的是计算”。

`Stream`允许我们以声明式的方式处理数据集合，可以进行并行或串行的读取、过滤、映射、匹配、聚合等操作，具体特性如下：

1. **`Stream`不存储元素**：`Stream`自身并不会存储元素，它只是对数据源进行计算。
2. **`Stream`不改变源对象**：所有的`Stream`操作都不会改变源对象，而是会返回一个持有结果的新`Stream`。
3. **`Stream`操作是延迟执行的**：这意味着他们会等到需要结果的时候才执行。这种特性使得`Stream`可以优化性能，例如，如果`Stream`被链式调用，那么所有操作可以一次性执行，避免了在每个中间操作时创建多余的临时对象。

## Stream操作步骤

使用`Java 8`的`Stream`进行数据处理，通常包含以下三个基本步骤：

1. **创建`Stream`**：首先，我们需要从一个数据源（如：集合、数组）获取一个`Stream`，比如调用`stream()`或`parallelStream()`方法。
2. **中间操作**：然后，我们可以对`Stream`进行一系列的中间操作，如`filter`、`map`、`sorted`等。这些操作可以形成一个操作链，每个操作都会返回一个新的`Stream`。
3. **终止操作**：最后，我们需要进行一个终止操作，如`forEach`、`count`、`collect`等。一旦执行终止操作，就会执行中间操作链，并产生结果。之后，该`Stream`就不会再被使用。

> 使用`Stream`进行数据处理的过程就像是在操纵一个流水线：首先创建一个流水线（创建`Stream`），然后在流水线上添加一系列的处理工序（中间操作），最后启动流水线并输出结果（终止操作）。这种方式使得我们的代码更加简洁、易读，也更易于并行化处理。

## 创建Stream的四种方式

### 1. 通过集合

`Java 8` 中的 `Collection` 接口被扩展，提供了两个获取流的方法：

- `default Stream stream()` : 返回一个顺序流
- `default Stream parallelStream()` : 返回一个并行流

比如：

```java
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream();  // 通过集合创建Stream
```

### 2. 通过数组

我们也可以使用`Arrays.stream()`方法，通过数组创建`Stream`：

-  `public static <T> Stream<T> stream(T[] array)`: 返回一个流

比如：

```java
int[] array = {1, 2, 3, 4, 5};
IntStream stream = Arrays.stream(array);  // 通过数组创建Stream
```

### 3. 通过Stream.of

我们可以使用`Stream`类静态方法`of()`，通过显式的值创建`Stream`。

- `public static <T> Stream<T> of(T... values)` : 返回一个流

比如：

```java
Stream<String> stream = Stream.of("a", "b", "c");  // 通过Stream.of创建Stream
```

### 4. 创建无限流

我们可以使用`Stream.iterate()`和`Stream.generate()`方法，创建无限流。

`Stream.iterate()`方法接收两个参数：一个初始值，以及一个产生下一个值的函数。

- `public static<T> Stream<T> iterate(final T seed, final UnaryOperator<T> f)`

比如：

```java
Stream<Integer> iterateStream = Stream.iterate(0, n -> n + 2);
```

在这个例子中，我们创建了一个无限流，它的初始值是`0`，每次增加`2`。所以，这个流的元素将会是`0, 2, 4, 6, 8, ...`

但是，由于这是一个无限流，所以我们不能直接对它进行操作，否则操作将永远不会结束。我们需要使用`limit()`方法来限制流的大小：

```java
Stream<Integer> limitedStream = iterateStream.limit(10);
limitedStream.forEach(System.out::println);  // 打印前10个偶数
```

`Stream.generate()`方法接收一个供应函数（`Supplier`），用于生成流的下一个元素：

- `public static<T> Stream<T> generate(Supplier<? extends T> s)`

比如：

```java
Stream<Double> generateStream = Stream.generate(Math::random);
```

在这个例子中，我们创建了一个无限流，它的每个元素都是一个随机数。

同样，我们需要使用`limit()`方法来限制流的大小：

```java
Stream<Double> limitedStream = generateStream.limit(5);
limitedStream.forEach(System.out::println);  // 打印5个随机数
```

## Stream 的中间操作

在`Java 8`的`Stream API`中，中间操作（如`filter`、`map`、`sorted`等）只定义了操作，但并不会立即执行。它们会形成一个操作链，等待终止操作（如`forEach`、`count`、`collect`等）的触发。

只有当终止操作被触发时，中间操作链上的所有操作才会一次性全部执行，这也称为“惰性求值”。

### 筛选与切片

筛选与切片操作用于从`Stream`中选择出一部分元素。

- `filter(Predicate p)`：根据p条件过滤元素。
- `limit(n)`：截断流，使其元素不超过给定数量。
- `skip(n)`：跳过元素，返回一个扔掉了前`n`个元素的流。若流中元素不足`n`个，则返回一个空流，与`limit(n)`互补。
- `distinct()`：筛选，通过流所生成元素的`hashCode()`和`equals()`去除重复元素。

```java
import java.util.stream.Stream;

public class StreamDemo {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 2, 3);

        // 使用filter方法过滤出偶数
        Stream<Integer> filteredStream = stream.filter(n -> n % 2 == 0);
        filteredStream.forEach(System.out::println);  // 输出：2 4 2

        // 使用limit方法截断流
        stream = Stream.of(1, 2, 3, 4, 5, 2, 3);
        Stream<Integer> limitedStream = stream.limit(3);
        limitedStream.forEach(System.out::println);  // 输出：1 2 3

        // 使用skip方法跳过元素
        stream = Stream.of(1, 2, 3, 4, 5, 2, 3);
        Stream<Integer> skippedStream = stream.skip(3);
        skippedStream.forEach(System.out::println);  // 输出：4 5 2 3

        // 使用distinct方法去除重复元素
        stream = Stream.of(1, 2, 3, 4, 5, 2, 3);
        Stream<Integer> distinctStream = stream.distinct();
        distinctStream.forEach(System.out::println);  // 输出：1 2 3 4 5
    }
}
```

### 映射

映射操作用于将`Stream`中的每个元素转换为另一种形式或提取信息。

- `map(Function f)`：接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素。
- `flatMap(Function f)`：接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流。

```java
import java.util.stream.Stream;

public class StreamDemo {
    public static void main(String[] args) {
        Stream<String> stream = Stream.of("a", "b", "c");

        // 使用map方法将每个元素转换为大写
        Stream<String> mappedStream = stream.map(String::toUpperCase);
        mappedStream.forEach(System.out::println);  // 输出：A B C

        // 使用flatMap方法将每个单词转换为字符流，然后将所有字符流连接成一个流
        Stream<String> wordStream = Stream.of("Hello", "World");
        Stream<String> flatMappedStream = wordStream.flatMap(word -> Stream.of(word.split("")));
        flatMappedStream.forEach(System.out::println);  // 输出：H e l l o W o r l d
    }
}
```

### 排序

排序操作用于对`Stream`中的元素进行排序。

- `sorted()`：产生一个新流，其中按自然顺序排序。
- `sorted(Comparator comp)`：产生一个新流，其中按比较器顺序排序。

```java
import java.util.Comparator;
import java.util.stream.Stream;

public class StreamDemo {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.of(2, 1, 3, 5, 4);

        // 使用sorted方法进行自然排序
        Stream<Integer> sortedStream = stream.sorted();
        sortedStream.forEach(System.out::println);  // 输出：1 2 3 4 5

        // 使用sorted(Comparator)方法进行自定义排序
        stream = Stream.of(2, 1, 3, 5, 4);
        Stream<Integer> customSortedStream = stream.sorted(Comparator.reverseOrder());
        customSortedStream.forEach(System.out::println);  // 输出：5 4 3 2 1
    }
}
```

## Stream 的终止操作

终止操作是触发流计算的操作。一旦流计算被触发，数据就会被消费，流就不能再被使用了。终止操作生成的接口，可以是任何不是流的值，比如`List`，`Integer`甚至`void`。

### 匹配与查找

匹配与查找操作可以检查流中的元素是否满足某种条件。

1. **allMatch(Predicate p)**：检查流中的所有元素**是否都满足**给定的条件。如果所有元素都满足条件，则返回true；否则返回false。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
boolean allMatch = stream.allMatch(n -> n > 0);  // 输出：true
```

2. **anyMatch(Predicate p)**：检查流中**是否有元素满足**给定的条件。如果至少有一个元素满足条件，则返回true；否则返回false。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
boolean anyMatch = stream.anyMatch(n -> n > 3);  // 输出：true
```

3. **noneMatch(Predicate p)**：检查流中的所有元素是否**都不满足**给定的条件。如果所有元素都不满足条件，则返回true；否则返回false。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
boolean noneMatch = stream.noneMatch(n -> n > 5);  // 输出：true
```

4. **findFirst()**：返回流中的第一个元素。如果流为空，返回一个空的Optional。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
Optional<Integer> first = stream.findFirst();  // 输出：Optional[1]
```

5. **findAny()**：返回流中的任意一个元素。如果流为空，返回一个空的Optional。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
Optional<Integer> any = stream.findAny();  // 输出：Optional[1]
```

6. **count()**：返回流中元素的总数。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
long count = stream.count();  // 输出：5
```

7. **max(Comparator c)**：返回流中的最大值，根据提供的Comparator进行比较。如果流为空，返回一个空的Optional。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
Optional<Integer> max = stream.max(Comparator.naturalOrder());  // 输出：Optional[5]
```

8. **min(Comparator c)**：返回流中的最小值，根据提供的Comparator进行比较。如果流为空，返回一个空的Optional。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
Optional<Integer> min = stream.min(Comparator.naturalOrder());  // 输出：Optional[1]
```

9. **forEach(Consumer c)**：对流中的每个元素执行给定的操作。这是一种内部迭代，即迭代操作由Stream API完成，而不需要用户显式地进行迭代。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
stream.forEach(System.out::println);  // 输出：1 2 3 4 5
```



### 规约

规约（reduce）是一种特殊的终止操作，它可以将流中的所有元素结合起来得到一个值。

1. **`reduce(T identity, BinaryOperator<T> accumulator)`**：这个方法接收两个参数，第一个参数是初始值，第二个参数是一个二元运算符。流中的元素会与初始值一起使用二元运算符进行运算，得到一个结果。

2. **`reduce(BinaryOperator<T> accumulator)`**：这个方法只接收一个参数，即一个二元运算符。流中的元素会使用这个二元运算符进行运算，得到一个结果。由于没有初始值，如果流为空，这个方法会返回一个空的`Optional`。

```java
import java.util.Optional;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        // 使用reduce(T identity, BinaryOperator<T> accumulator)方法
        Stream<Integer> stream1 = Stream.of(1, 2, 3, 4, 5);
        Integer sum = stream1.reduce(0, Integer::sum);
        System.out.println("The sum is: " + sum);  // 输出：The sum is: 15

        // 使用reduce(BinaryOperator<T> accumulator)方法
        Stream<Integer> stream2 = Stream.of(1, 2, 3, 4, 5);
        Optional<Integer> product = stream2.reduce((a, b) -> a * b);
        product.ifPresent(p -> System.out.println("The product is: " + p));  // 输出：The product is: 120
    }
}
```



### 收集

在`Java`中，`Stream`流的终止操作之一是“收集”，它通过`collect`方法实现。

`collect`方法通过接受一个`Collector`接口的实现，将流转换位其他形式，比如List、Set或Map等，用于给`Stream`中的元素做汇总。

另外，`Java`中的`Collectors`类提供了许多实用静态方法，可以很方便地创建常见的收集器实例。

下面这张表格列出了一些常见的`Collectors`方法，以及它们的作用和示例：

| 方法                  | 返回类型                | 作用                                                         | 示例                                                         |
| --------------------- | ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `toList()`            | `List`                  | 把流中元素收集到`List`                                       | `List<Employee> emps = list.stream().collect(Collectors.toList());` |
| `toSet()`             | `Set`                   | 把流中元素收集到`Set`                                        | `Set<Employee> emps = list.stream().collect(Collectors.toSet());` |
| `toCollection()`      | `Collection`            | 把流中元素收集到创建的集合                                   | `Collection<Employee> emps = list.stream().collect(Collectors.toCollection(ArrayList::new));` |
| `counting()`          | `Long`                  | 计算流中元素的个数                                           | `long count = list.stream().collect(Collectors.counting());` |
| `summingInt()`        | `Integer`               | 对流中元素的整数属性求和                                     | `int total = list.stream().collect(Collectors.summingInt(Employee::getSalary));` |
| `averagingInt()`      | `Double`                | 计算流中元素Integer属性的平均值                              | `double avg = list.stream().collect(Collectors.averagingInt(Employee::getSalary));` |
| `summarizingInt()`    | `IntSummaryStatistics`  | 收集流中Integer属性的统计值                                  | `IntSummaryStatistics iss = list.stream().collect(Collectors.summarizingInt(Employee::getSalary));` |
| `joining()`           | `String`                | 连接流中每个字符串                                           | `String str = list.stream().map(Employee::getName).collect(Collectors.joining());` |
| `maxBy()`             | `Optional<T>`           | 根据比较器选择最大值                                         | `Optional<Employee> max = list.stream().collect(Collectors.maxBy(Comparator.comparingInt(Employee::getSalary)));` |
| `minBy()`             | `Optional<T>`           | 根据比较器选择最小值                                         | `Optional<Employee> min = list.stream().collect(Collectors.minBy(Comparator.comparingInt(Employee::getSalary)));` |
| `reducing()`          | `T`                     | 从一个作为累加器的初始值开始，利用BinaryOperator与流中元素逐个结合，从而归约成单个值 | `int total = list.stream().collect(Collectors.reducing(0, Employee::getSalary, Integer::sum));` |
| `collectingAndThen()` | `R`                     | 包裹另一个收集器，对其结果转换函数                           | `int how = list.stream().collect(Collectors.collectingAndThen(Collectors.toList(), List::size));` |
| `groupingBy()`        | `Map<K, List<T>>`       | 根据某属性值对流分组，属性为K，结果为V                       | `Map<Status, List<Employee>> map = list.stream().collect(Collectors.groupingBy(Employee::getStatus));` |
| `partitioningBy()`    | `Map<Boolean, List<T>>` | 根据true或false进行分区                                      | `Map<Boolean, List<Employee>> vd = list.stream().collect(Collectors.partitioningBy(Employee::isManager));` |

注意：在这个表格中，`Employee`是一个假设的类，`Status`是`Employee`的一个属性，`getSalary`、`getName`、`getStatus`和`isManager`是`Employee`类的方法。

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

class Employee {
	private String name;
	private int salary;

	public Employee(String name, int salary) {
		super();
		this.name = name;
		this.salary = salary;
	}

	public String getName() {
		return this.name;
	}

	public int getSalary() {
		return this.salary;
	}

	@Override
	public String toString() {
		return name;
	}
}

public class Main {
	public static void main(String[] args) {
		List<Employee> employees = new ArrayList<>();
		employees.add(new Employee("Alice", 10000));
		employees.add(new Employee("Bob", 20000));
		employees.add(new Employee("Charlie", 15000));

		// 收集到List
		List<Employee> list = employees.stream().collect(Collectors.toList());
		System.out.println("List: " + list); // List: [Alice, Bob, Charlie]

		// 收集到Set
		Set<Employee> set = employees.stream().collect(Collectors.toSet());
		System.out.println("Set: " + set); // Set: [Bob, Alice, Charlie]

		// 收集到Map
		Map<String, Integer> map = employees.stream().collect(Collectors.toMap(Employee::getName, Employee::getSalary));
		System.out.println("Map: " + map); // Map: {Bob=20000, Alice=10000, Charlie=15000}

		// 计算总工资
		int totalSalary = employees.stream().collect(Collectors.summingInt(Employee::getSalary));
		System.out.println("Total salary: " + totalSalary); // Total salary: 45000

		// 计算平均工资
		double averageSalary = employees.stream().collect(Collectors.averagingInt(Employee::getSalary));
		System.out.println("Average salary: " + averageSalary); // Average salary: 15000.0

		// 连接所有员工的名字
		String names = employees.stream().map(Employee::getName).collect(Collectors.joining(", "));
		System.out.println("Names: " + names); // Names: Alice, Bob, Charlie
	}
}
```



