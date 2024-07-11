---
title: AOP
category: framework
order: 9
icon: devicon:spring
tag:
  - Spring
---


# AOP

## 面向切面编程

面向切面编程（Aspect-Oriented Programming，AOP）是一种编程范式，其目标是提高模块化程度，特别是对于横切关注点（cross-cutting concerns）。横切关注点是那些影响多个模块的关注点，例如日志记录、事务管理、安全等。在传统的面向对象编程（OOP）中，这些关注点的代码往往分散在多个模块中，导致代码重复和难以维护。AOP 通过将这些关注点模块化，使得代码更加清晰和易于维护。

## 引入切面

Spring 提供了一种名为 Spring AOP 的 AOP 实现。Spring AOP 使用纯 Java 实现，无需特殊的编译过程或类加载器，与 Spring IoC 容器紧密集成，本质上AOP就是一种代理模式的实现方式，在Spring中实现AOP是非常方便的。

在 Spring AOP 中，切面（`Aspect`）可以使用 `@AspectJ` 注解的类来定义，切面可以包含多个通知（`Advice`）和切点（`Pointcut`）。通知定义了切面的行为，切点定义了切面应用的位置。

现在，我们来实现给`UserService`的每个业务方法执行前添加日志。

首先，我们先引入Maven依赖：

```java
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>6.0.0</version>
</dependency>
```

接着，我们定义一个切面类 `LoggingAspect`，并在其中定义一个前置通知 `logBefore`，该通知在 `UserService` 的每个方法执行前执行：

```java
package cn.zhengyiyi.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    @Before("execution(* cn.zhengyiyi.service.UserService.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Executing " + joinPoint.getSignature().getName());
    }
}
```

可以观察到，这里我们用到了两个注解：

- `@Aspect`：
  - 这个注解用于将一个类声明为切面（Aspect）。
  - 切面是包含通知（Advice）和切点（Pointcut）的模块。通知定义了切面的行为，切点定义了切面应用的位置。在 Spring AOP 中，切面通常是使用 `@Aspect` 注解的类。
- `@Before("execution(* cn.zhengyiyi.service.UserService.*(..))")`：
  - 这个注解定义了一个前置通知（Before advice）。前置通知是在连接点（Join point）之前执行的通知。在这个例子中，连接点是 `UserService` 类的所有方法。
  - `execution(* cn.zhengyiyi.service.UserService.*(..))` 是一个切点表达式，它匹配 `UserService` 类的所有方法。所以，`logBefore` 方法在每个匹配的方法执行前执行，打印出正在执行的方法名。

最后，我们需要在 Spring 配置中启用 AspectJ 自动代理（添加`@EnableAspectJAutoProxy`注解），以便 Spring AOP 可以处理 `@Aspect` 注解：

```java
@Configuration
@EnableAspectJAutoProxy
public class AppConfig {
    // ...
}
```

这样，每次执行 `UserService` 的方法时，都会先执行 `logBefore` 方法，打印出正在执行的方法名。

## 通知注解

除了 `@Before` 注解，Spring AOP 还提供了以下几种类型的通知注解：

- `@After`: 后置通知，无论连接点正常结束还是抛出异常，都会执行该通知。
- `@AfterReturning`: 返回后通知，只有在连接点正常结束后才会执行该通知。
- `@AfterThrowing`: 异常通知，只有在连接点抛出异常后才会执行该通知。
- `@Around`: 环绕通知，可以在连接点前后都执行一些操作。

这些注解都接受一个切点表达式，用于指定通知应用的位置。

## AOP 的优点

使用 Spring AOP，你可以：

- 将横切关注点模块化，减少代码重复，提高代码的可读性和可维护性。
- 在不修改源代码的情况下，添加或修改横切关注点的行为。这使得代码更加灵活，更易于扩展。
- 利用 Spring IoC 容器的特性，如依赖注入和生命周期管理，来管理切面。

## 注意事项

- Spring AOP 默认使用 JDK 动态代理来实现 AOP，这意味着只有接口的方法才能被增强。如果你需要增强类的方法，你可以配置 Spring AOP 使用 CGLIB 代理。
- Spring AOP 是一个代理-based AOP 框架，这意味着它不能处理自调用的情况。也就是说，如果一个方法内部调用了另一个方法，那么这个内部调用的方法不会被增强。

## 实现原理

在Spring AOP中，切面的注入到其他Bean的过程是通过代理机制实现的。当在Spring配置中启用AspectJ自动代理后，Spring会为每个匹配切点表达式的Bean创建一个代理。

这个代理会拦截所有对Bean方法的调用，然后根据切面的定义，执行相应的通知。例如，如果定义了一个前置通知，那么在方法执行前，代理会先执行这个通知。如果定义了一个后置通知，那么在方法执行后，代理会执行这个通知。

这个过程对于开发者来说是透明的，也就是说，你的代码并不需要知道它正在与一个代理交互，而不是直接与原始的Bean交互。这使得你可以在不修改原始代码的情况下，添加或修改横切关注点的行为。

Spring对接口类型使用JDK动态代理，对普通类使用CGLIB创建子类。如果一个Bean的class是final，Spring将无法为其创建子类。

尽管Spring容器内部实现AOP的逻辑比较复杂（需要使用AspectJ解析注解，并通过CGLIB实现代理类），但对于开发者来说，只需要定义切面和通知，然后让Spring去处理剩下的事情。

## 切点表达式

切点表达式定义了切面应用的位置。

以下是一些常见的切点表达式示例：

- `execution(* set*(..))`：匹配所有以“set”开头的方法。
- `execution(* com.xyz.service.AccountService.*(..))`：匹配`com.xyz.service.AccountService`类中的所有方法。
- `execution(* com.xyz.service.*.*(..))`：匹配`com.xyz.service`包中所有类的所有方法。
- `execution(* com.xyz.service..*.*(..))`：匹配`com.xyz.service`包及其子包中所有类的所有方法。
- `within(com.xyz.service.*)`：匹配`com.xyz.service`包中所有类的所有方法。
- `within(com.xyz.service..*)`：匹配`com.xyz.service`包及其子包中所有类的所有方法。
- `this(com.xyz.service.Account)`：匹配实现了`com.xyz.service.Account`接口的所有Bean。

这些切点表达式可以用于定义切面的通知，例如`@Before`、`@After`、`@Around`等。你可以根据需要选择合适的切点表达式，以便将切面应用到正确的位置。

更多内容查阅：[Declaring a Pointcut :: Spring Framework](https://docs.spring.io/spring-framework/reference/core/aop/ataspectj/pointcuts.html#aop-pointcuts-examples)