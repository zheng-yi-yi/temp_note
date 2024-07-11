---
title: LaTeX数学公式
category: 杂记
order: 1
icon: carbon:ibm-datastage
---

## Markdown语法

在Markdown中，LaTeX数学公式的编写遵循LaTeX语法。

下面展示一些基本的LaTeX数学公式的用法和使用效果。

> 备注：如果公式中包含特殊字符，需要使用反斜杠 `\` 进行转义。


### 基本运算符

| 显示结果                             | LaTeX代码                              |
| ------------------------------------ | -------------------------------------- |
| $x = y$                              | `$x = y$`                              |
| $x + y$                              | `$x + y$`                              |
| $x - y$                              | `$x - y$`                              |
| $x \times y$                         | `$x \times y$`                         |
| $x \div y$                           | `$x \div y$`                           |
| $x \cdot y$                          | `$ x\cdot y$`                          |
| $\left\vert 1024 \right\vert$        | `$\left\vert 1024 \right\vert$`        |
| $n^{10}$                             | `$n^{10}$`                             |
| $\sqrt{x}$                           | `$\sqrt{x}$`                           |
| $\sqrt[2]{x}$                        | `$\sqrt[2]{x}$`                        |
| $\sqrt[3]{x+y}$                      | `$\sqrt[3]{x+y}$`                      |
| $\sqrt[n]{x}$                        | `$\sqrt[n]{x}$`                        |
| $\surd$                              | `$\surd$`                              |
| $\sin x$                             | `$\sin x$`                             |
| $\cos \left(x + \frac \pi 2 \right)$ | `$\cos \left(x + \frac \pi 2 \right)$` |
| $\tan x$                             | `$\tan x$`                             |
| $\bar{x}$                            | `$\bar{x}$`                            |
| $\log x$                             | `$\log x$`                             |
| $\ln x$                              | `$\ln x$`                              |
| $\lg x$                              | `$\lg x$`                              |
| $\sum_{i=1}^{n} i$                   | `$\sum_{i=1}^{n} i$`                   |
| $\int_{a}^{b} f(x) dx$               | `$\int_{a}^{b} f(x) dx$`               |


### 小数


| 显示结果           | LaTeX代码            |
| ------------------ | -------------------- |
| $3.1415926 \cdots$ | `$3.1415926 \cdots$` |
| $1.\dot{3}$        | `$1.\dot{3}$`        |


### 分数

| 显示结果      | LaTeX代码       |
| ------------- | --------------- |
| $\frac{1}{3}$ | `$\frac{1}{3}$` |
| $1 \over 3$   | `$1 \over 3$`   |

### 比大小

| 显示结果  | LaTeX代码   |
| --------- | ----------- |
| $>$       | `$>$`       |
| $<$       | `$<$`       |
| $=$       | `$=$`       |
| $\ge$     | `$\ge$`     |
| $\le$     | `$\le$`     |
| $\approx$ | `$\approx$` |



### 括号

| 显示结果           | LaTeX代码            |
| ------------------ | -------------------- |
| $()$               | `$()$`               |
| $[]$               | `$[]$`               |
| $\{ \}$            | `$\{\}$`             |
| $\left(\right)$    | `$\left(\right)$`    |
| $\left[\right]$    | `$\left[\right]$`    |
| $\left\{ \right\}$ | `$\left\{ \right\}$` |



> 括号内有分数时，建议使用第二种括号。


### 特殊符号

| 显示结果   | LaTeX代码    |
| ---------- | ------------ |
| $\pi$      | `$\pi$`      |
| $\alpha$   | `$\alpha$`   |
| $\beta$    | `$\beta$`    |
| $\gamma$   | `$\gamma$`   |
| $\Delta$   | `$\Delta$`   |
| $\rho$     | `$\rho$`     |
| $\Omega$   | `$\Omega$`   |
| $\eta$     | `$\eta$`     |
| $\lambda$  | `$\lambda$`  |
| $\nu$      | `$\nu$`      |
| $\Epsilon$ | `$\Epsilon$` |
| $\Zeta$    | `$\Zeta$`    |
| $\Eta$     | `$\Eta$`     |
| $\Theta$   | `$\Theta$`   |


### 几何

| 显示结果                | LaTeX代码                 |
| ----------------------- | ------------------------- |
| $\because$              | `$\because$`              |
| $\angle A$              | `$\angle A$`              |
| $\parallel$             | `$\parallel$`             |
| $\perp$                 | `$\perp$`                 |
| $\triangle$             | `$\triangle$`             |
| $\cong$                 | `$\cong$`                 |
| $\backsim$              | `$\backsim$`              |
| $\sim$                  | `$\sim$`                  |
| $\odot$                 | `$\odot$`                 |
| $\bigodot$              | `$\bigodot$`              |
| $\overset {\frown}{AB}$ | `$\overset {\frown}{AB}$` |


> 平行四边形的符号 LaTeX 中没有这个符号，只能用 Unicode 字符 ▱。另外，想要用这个全等 ≌ 只能用 Unicode 字符。

### 集合

| 含义     | 显示结果       | LaTeX代码        |
| -------- | -------------- | ---------------- |
| 空集     | $\varnothing$  | `$\varnothing$`  |
| 正整数集 | $\mathbb{N^+}$ | `$\mathbb{N^+}$` |
|          | $\mathbb{N^*}$ | `$\mathbb{N^*}$` |
|          | $\mathbb{Z^+}$ | `$\mathbb{Z^+}$` |
|          | $\mathbb{Z^*}$ | `$\mathbb{Z^*}$` |
| 自然数集 | $\mathbb{N}$   | `$\mathbb{N}$`   |
| 整数集   | $\mathbb{Z}$   | `$\mathbb{Z}$`   |
| 有理数集 | $\mathbb{Q}$   | `$\mathbb{Q}$`   |
| 实数集   | $\mathbb{R}$   | `$\mathbb{R}$`   |
| 复数集   | $\mathbb{C}$   | `$\mathbb{C}$`   |
| 属于     | $\in$          | `$\in$`          |
|          | $\ni$          | `$\ni$`          |
| 不属于   | $\notin$       | `$\notin$`       |
|          | $\not \ni$     | `$\not \ni$`     |
| 包含于   | $\subseteq$    | `$\subseteq$`    |
| 真包含于 | $\subsetneqq$  | `$\subsetneqq$`  |
| 不包含于 | $\nsubseteq$   | `$\nsubseteq$`   |
| 交集     | $\cap$         | `$\cap$`         |
| 并集     | $\cup$         | `$\cup$`         |