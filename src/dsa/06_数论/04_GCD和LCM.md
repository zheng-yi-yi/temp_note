---
title: GCD和LCM
category: 算法
order: 4
icon: tabler:math-symbols
---

## 整除

整除的定义：

- 给定两个整数 $a$ 和 $b$，如果存在整数 $c$ 使得 $a = b \cdot c$，那么我们就说 $b$ 整除 $a$，或者 $a$ 能被 $b$ 整除，记作 $b|a$。

性质如下：

- 如果 $a|b$，那么我们可以说 $b$ 是 $a$ 的倍数，$a$ 是 $b$ 的因数。

- 如果 $a|b$ 且 $b|c$，那么 $a|c$。
- 如果 $a|b$ 和 $a|c$，那么 $a|(b+c)$ 和 $a|(b-c)$。
- 如果 $a|b$，那么对于任何整数 $c$，都有 $a|(bc)$。

## 最大公约数（GCD）

### 定义

对于两个非零整数 $a$ 和 $b$，他们的最大公约数是满足以下两个条件的最大的正整数：

- 它能同时整除 $a$ 和 $b$。
- 任何其他能同时整除 $a$ 和 $b$ 的数都必须能被它整除。

### 性质

- $\gcd(a, b) = \gcd(a, a + b) = \gcd(a, k \cdot a + b)$
-  $\gcd(ka, kb) = k \cdot \gcd(a, b)$ 
- $\gcd(a, \gcd(b, c)) = \gcd(\gcd(a, b), c)$
- $\gcd(a+cb, b) = \gcd(a, b)$
- 若 $\gcd(a, b) = d$，则 $\gcd(a/d, b/d) = 1$，即二者互质
- $x$ 是 $a$ 和 $b$ 的公因子，当且仅当 $x$ 是 $a$ 和 $b$ 的最大公约数的因子。

### 实现

辗转相除法（也称为欧几里得算法）可用于计算两个数的最大公约数：

```java
public static long gcd(long a, long b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

> 当`b`为`0`时，返回`a`作为结果；否则，将`b`和`a`除以`b`的余数作为新的参数调用自身。

对于大数，可以使用`BigInteger`类：

```java
public static String gcd(String a, String b) {
    BigInteger num1 = new BigInteger(a);
    BigInteger num2 = new BigInteger(b);
    return num1.gcd(num2).toString();
}
```

## 算术基本定理

对于任何一个大于 $1$ 的自然数 $n$，存在唯一的素数 $p_1, p_2, ..., p_k$ 和自然数 $e_1, e_2, ..., e_k$，使得：$n = p_1^{e_1} \cdot p_2^{e_2} \cdot ... \cdot p_k^{e_k}$。

其中，$p_1 < p_2 < ... < p_k$ 是素数，$e_1, e_2, ..., e_k$ 是大于 $0$ 的自然数。

> 简单来说：任何大于 $1$ 的正整数 $n$ 都可以唯一分解为有限个质数的乘积。

## 最小公倍数（LCM）

### 定义

对于两个非零整数 $a$ 和 $b$，他们的最小公倍数 $\operatorname{lcm}(a, b)$ 是满足以下两个条件的最小的正整数：

- 它能同时被 $a$ 和 $b$ 整除
- 任何其他能同时被 $a$ 和 $b$ 整除的数都必须能整除它

### 性质

- $\gcd(a, b) \cdot \operatorname{lcm}(a, b) = |a \cdot b|$

- $\operatorname{lcm}(a, \operatorname{lcm}(b, c)) = \operatorname{lcm}(\operatorname{lcm}(a, b), c)$

- $\operatorname{lcm}(a, b \cdot c) = \operatorname{lcm}(\operatorname{lcm}(a, b), \operatorname{lcm}(a, c))$

### 实现

```java
public static long lcm(long a, long b) {
    return a / gcd(a, b) * b;
}
```

## 裴蜀定理

裴蜀定理是关于 GCD 的一个定理。

定义：如果 $a$ 和 $b$ 均为整数，则有整数 $x$ 和 $y$ 使 $ax+by=gcd(a,b)$。

> 简单来说，对任何整数 $a$ 和 $b$ ，关于 $x$ 和 $y$ 的线性方程 $ax + by = gcd(a, b)$ 一定有整数解。

可以这么理解：

对于任意的 $x$ 和 $y$ ， $d = ax+by$，$d$ 一定是 $gcd(a,b)$ 的整数倍。最小的 $d$ 是 $gcd(a,b)$。

## 练习

### [Problem - 5019](https://acm.hdu.edu.cn/showproblem.php?pid=5019)

问题描述：给定三个整数x、y、k，问x和y的第k大公约数。

参考：

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int T = scanner.nextInt();
        List<Long> v = new ArrayList<>();
        while (T-- > 0) {
            long x = scanner.nextLong();
            long y = scanner.nextLong();
            long k = scanner.nextLong();
            long d = gcd(x, y);
            v.clear();
            for (long i = 1; i * i <= d; ++i) {
                if (d % i == 0) {
                    v.add(i);
                    if (i * i != d) {
                        v.add(d / i);
                    }
                }
            }
            Collections.sort(v);
            if (v.size() >= k) {
                System.out.println(v.get(v.size() - (int)k));
            } else {
                System.out.println(-1);
            }
        }
        scanner.close();
    }

    // 计算最大公约数
    public static long gcd(long a, long b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

### [Problem - 2504](https://acm.hdu.edu.cn/showproblem.php?pid=2504)

问题描述：给定三个正整数$a$，$b$，$c$（$0 < a, b, c < 10^6$），其中$c$不等于$b$。如果$a$和$c$的最大公约数为$b$，已知$a$和$b$，求满足条件的最小的$c$。

思路：暴力搜索 $2b$ ~ $ab$ 中符合条件的 $c$ 。

参考：

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int T = scanner.nextInt();
        while(T-- > 0) {
            int a = scanner.nextInt();
            int b = scanner.nextInt();
            for (int c = 2 * b; c <= a * b; c += b) {
                if (gcd(a, c) == b) {
                    System.out.println(c);
                    break;
                }
            }
        }
        scanner.close();
    }

    private static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

## 题单

### 因子

- [2427. 公因子的数目](https://leetcode.cn/problems/number-of-common-factors/)
- [1952. 三除数](https://leetcode.cn/problems/three-divisors/)
- [1492. n 的第 k 个因子](https://leetcode.cn/problems/the-kth-factor-of-n/)
- [507. 完美数](https://leetcode.cn/problems/perfect-number/)
- [1390. 四因数](https://leetcode.cn/problems/four-divisors/)
- [1362. 最接近的因数](https://leetcode.cn/problems/closest-divisors/)
- [829. 连续整数求和](https://leetcode.cn/problems/consecutive-numbers-sum/)
- [952. 按公因数计算最大组件大小](https://leetcode.cn/problems/largest-component-size-by-common-factor/)
