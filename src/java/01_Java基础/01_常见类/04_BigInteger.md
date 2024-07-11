---
title: BigInteger
order: 4
category: Java
tag:
  - Java核心类
---

## 1. 简介

Java提供了一个大整数类，名为`BigInteger`类，这个类位于`java.math`包下，提供了一系列的方法来进行大整数的算术运算。

## 2. 操作

1. **创建BigInteger**：传递字符串作为构造方法的参数

```java
BigInteger bigInt = new BigInteger("12345678901234567890");
```

2. **加法**：使用`add`方法进行加法运算。

```java
BigInteger bigInt1 = new BigInteger("12345678901234567890");
BigInteger bigInt2 = new BigInteger("98765432109876543210");
BigInteger sum = bigInt1.add(bigInt2);
```

3. **减法**：使用`subtract`方法进行减法运算。

```java
BigInteger bigInt1 = new BigInteger("98765432109876543210");
BigInteger bigInt2 = new BigInteger("12345678901234567890");
BigInteger difference = bigInt1.subtract(bigInt2);
```

4. **乘法**：使用`multiply`方法进行乘法运算。

```java
BigInteger bigInt1 = new BigInteger("12345678901234567890");
BigInteger bigInt2 = new BigInteger("98765432109876543210");
BigInteger product = bigInt1.multiply(bigInt2);
```

5. **除法**：使用`divide`方法进行除法运算。

```java
BigInteger bigInt1 = new BigInteger("98765432109876543210");
BigInteger bigInt2 = new BigInteger("12345678901234567890");
BigInteger quotient = bigInt1.divide(bigInt2);
```

6. **取模**：使用`mod`方法进行取模运算。

```java
BigInteger bigInt1 = new BigInteger("98765432109876543210");
BigInteger bigInt2 = new BigInteger("12345678901234567890");
BigInteger remainder = bigInt1.mod(bigInt2);
```

7. **幂运算**：使用`pow`方法进行幂运算。

```java
BigInteger bigInt = new BigInteger("12345678901234567890");
BigInteger result = bigInt.pow(2);
```

## 3. 其他方法

1. **比较**：`BigInteger`类提供了`compareTo`方法来比较两个`BigInteger`的大小。

```java
BigInteger bigInt1 = new BigInteger("12345678901234567890");
BigInteger bigInt2 = new BigInteger("98765432109876543210");
int result = bigInt1.compareTo(bigInt2);
// 返回-1表示bigInt1小于bigInt2，0表示相等，1表示bigInt1大于bigInt2
```

2. **绝对值**：`abs`方法返回`BigInteger`的绝对值。

```java
BigInteger bigInt = new BigInteger("-12345678901234567890");
BigInteger absBigInt = bigInt.abs(); // 返回12345678901234567890
```

3. **最大值和最小值**：`max`和`min`方法可以用来找出两个`BigInteger`中的最大值和最小值。

```java
BigInteger bigInt1 = new BigInteger("12345678901234567890");
BigInteger bigInt2 = new BigInteger("98765432109876543210");
BigInteger maxBigInt = bigInt1.max(bigInt2);
// 返回98765432109876543210
BigInteger minBigInt = bigInt1.min(bigInt2);
// 返回12345678901234567890
```

4. **取反**：`negate`方法返回`BigInteger`的取反值。

```java
BigInteger bigInt = new BigInteger("12345678901234567890");
BigInteger negBigInt = bigInt.negate(); // 返回-12345678901234567890
```

5. **位操作**：`BigInteger`类还提供了一些位操作的方法，如`and`, `or`, `xor`, `not`, `shiftLeft`, `shiftRight`等。

```java
BigInteger bigInt1 = new BigInteger("1010", 2);
BigInteger bigInt2 = new BigInteger("1100", 2);
BigInteger andResult = bigInt1.and(bigInt2); // 返回8，即1000
BigInteger orResult = bigInt1.or(bigInt2); // 返回14，即1110
BigInteger xorResult = bigInt1.xor(bigInt2); // 返回6，即0110
BigInteger notResult = bigInt1.not(); // 返回-11，即0101
BigInteger shiftLeftResult = bigInt1.shiftLeft(2); // 返回40，即00101000
BigInteger shiftRightResult = bigInt1.shiftRight(2); // 返回2，即0010
```
