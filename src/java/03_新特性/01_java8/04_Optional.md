---
title: Optional类
category: Java
tag:
  - java8新特性
order: 5
---

::: tip

`Optional<T>`是`Java 8`引入的一个容器类，用于解决`null`值处理的问题，避免出现空指针异常。它可以包含类型为`T`的对象，也可以什么都不包含，在这种情况下，我们可以说`Optional`包含的是空值。

:::

## 常见方法

| 方法                                                             | 描述                                                     |
|----------------------------------------------------------------|--------------------------------------------------------|
| `Optional.of(T t)`                                             | 为非`null`的值创建一个`Optional`。                              |
| `Optional.empty()`                                             | 创建一个空的`Optional`实例。                                    |
| `Optional.ofNullable(T t)`                                     | 为指定的值创建一个`Optional`，如果指定的值为`null`，则返回一个空的`Optional`。   |
| `boolean isPresent()`                                          | 如果值存在返回`true`，否则返回`false`。                             |
| `T get()`                                                      | 如果`Optional`有值则将其返回，否则抛出`NoSuchElementException`。      |
| `void ifPresent(Consumer<? super T> consumer)`                 | 如果有值，则使用该值调用指定的消费者，否则不做任何事情。                           |
| `Optional<T> filter(Predicate<? super T> predicate)`           | 如果有值并且满足断言条件返回包含该值的`Optional`，否则返回空`Optional`。         |
| `Optional<T> map(Function<? super T, ? extends U> mapper)`     | 如果有值，应用`mapping`函数并返回`Optional`类型的结果，否则返回空`Optional`。  |
| `Optional<T> flatMap(Function<? super T, Optional<U>> mapper)` | 如果有值，将该值应用在`mapping`函数返回Optional类型返回值，否则返回空`Optional`。 |
| `T orElse(T other)`                                            | 如果有值则将其返回，否则返回指定的`other`对象。                            |
| `T orElseGet(Supplier<? extends T> other)`                     | 如果有值则将其返回，否则返回从指定的`Supplier`接口生成的值。                    |
| `T orElseThrow(Supplier<? extends X> exceptionSupplier)`       | 如果有值则将其返回，否则抛出由指定的`Supplier`接口生成的异常。                   |

## 示例代码

```java
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class OptionalExample {
    public static void main(String[] args) {
        // 使用of方法创建一个非空的Optional
        Optional<String> nonEmptyOptional = Optional.of("GitHub Copilot");
        System.out.println(nonEmptyOptional.get()); // 输出: GitHub Copilot

        // 使用empty方法创建一个空的Optional
        Optional<String> emptyOptional = Optional.empty();
        System.out.println(emptyOptional.isPresent()); // 输出: false

        // 使用ofNullable方法创建一个可以接受null的Optional
        Optional<String> nullableOptional = Optional.ofNullable(null);
        System.out.println(nullableOptional.isPresent()); // 输出: false

        // 使用isPresent方法检查Optional是否有值
        System.out.println(nonEmptyOptional.isPresent()); // 输出: true

        // 使用ifPresent方法在Optional有值的情况下执行某个操作
        Consumer<String> consumer = System.out::println;
        nonEmptyOptional.ifPresent(consumer); // 输出: GitHub Copilot

        // 使用filter方法在Optional有值且满足条件的情况下返回Optional
        Predicate<String> predicate = value -> value.startsWith("GitHub");
        System.out.println(nonEmptyOptional.filter(predicate).isPresent()); // 输出: true

        // 使用map方法在Optional有值的情况下对其进行转换
        Function<String, Integer> mapper = String::length;
        Optional<Integer> mappedOptional = nonEmptyOptional.map(mapper);
        System.out.println(mappedOptional.get()); // 输出: 14

        // 使用flatMap方法在Optional有值的情况下对其进行转换并返回Optional
        Function<String, Optional<Integer>> flatMapper = value -> Optional.of(value.length());
        Optional<Integer> flatMappedOptional = nonEmptyOptional.flatMap(flatMapper);
        System.out.println(flatMappedOptional.get()); // 输出: 14

        // 使用orElse方法在Optional有值的情况下返回其值，否则返回其他值
        System.out.println(emptyOptional.orElse("Default Value")); // 输出: Default Value

        // 使用orElseGet方法在Optional有值的情况下返回其值，否则返回由Supplier生成的值
        Supplier<String> supplier = () -> "Default Value";
        System.out.println(emptyOptional.orElseGet(supplier)); // 输出: Default Value

        // 使用orElseThrow方法在Optional有值的情况下返回其值，否则抛出由Supplier生成的异常
        Supplier<RuntimeException> exceptionSupplier = () -> new RuntimeException("No value present");
        try {
            System.out.println(emptyOptional.orElseThrow(exceptionSupplier));
        } catch (RuntimeException e) {
            System.out.println(e.getMessage()); // 输出: No value present
        }
    }
}
```

