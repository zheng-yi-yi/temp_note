---
title: 使用注解装配AOP
category: framework
order: 10
icon: devicon:spring
tag:
  - Spring
---

## 引言

前面提到，AOP（面向切面编程）是一种编程范式，可以将横切关注点（如日志、安全性、事务管理等）从业务逻辑中分离，提高代码的可重用性和可维护性。然而，使用`AspectJ`注解和`execution()`切面表达式的AOP装配方式可能会导致不需要AOP代理的组件被自动代理（范围可能过大），这不是最佳实践。

更好的方式是使用注解来装配AOP，这样可以让Bean清晰地知道自己是否被代理，使用起来简单，且能明确标识AOP装配，是推荐的使用AOP的方式。

本文将介绍如何使用注解来装配AOP，使用注解实现AOP需要先定义注解，然后使用`@Around("@annotation(name)")`实现装配；

## 注解的定义

首先，我们需要定义一个注解:

```java
@Target(METHOD)
@Retention(RUNTIME)
public @interface MyAnnotation {
    String value();
}
```

这个注解可以被用来标记需要被AOP拦截的方法。

## 标注注解

在需要被代理的方法上，标注该注解：

```java
@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired // set注入
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @MyAnnotation("register") // 标注我们定义的注解
    public User register(String username, String password) {
		// ...
    }

    @MyAnnotation("login") // 标注我们定义的注解
    public User login(String username, String password) {
        // ...
    }
}
```

## 使用注解装配AOP

接着，我们在AOP切面中使用`@Around`注解，配合`@annotation(myAnnotation)`表达式，来拦截所有标注了`MyAnnotation`的方法。在这个切面方法中，我们可以获取到方法执行前后的时间，从而计算出方法的执行时间。

```java
@Aspect
@Component
public class MyAspect {
    @Around("@annotation(myAnnotation)")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint, MyAnnotation myAnnotation) throws Throwable {
        String name = myAnnotation.value();
        long start = System.currentTimeMillis();

        System.out.println("[监控] " + name + ": 开始执行...");

        try {
            return joinPoint.proceed();
        } finally {
            long executionTime = System.currentTimeMillis() - start;
            System.out.println("[监控] " + name + ": 执行结束，耗时 " + executionTime + "ms");
        }
    }
}
```

在这里：

- `@Around`注解表示我们定义的这个方法是一个环绕通知，它会在目标方法执行前后都被调用。
- `@annotation(myAnnotation)`表达式表示我们要拦截的是所有标注了`MyAnnotation`的方法。这个表达式的`myAnnotation`参数就是我们定义的`MyAnnotation`注解的实例，我们可以通过这个实例获取到注解的属性值。
- `ProceedingJoinPoint`参数表示我们拦截到的方法，我们可以通过它来调用目标方法。
- 在切面方法中，我们首先记录下方法执行前的时间，然后调用目标方法，最后记录下方法执行后的时间，从而计算出方法的执行时间。

这样，我们就实现了使用注解来装配AOP的功能，使得我们的代码更加清晰，易于理解。

## 使用注解装配AOP的优势

使用注解装配AOP具有以下优势：

- **简洁性**：注解提供了一种声明式的方法来配置AOP，减少了配置的复杂性。
- **明确性**：通过注解，哪些方法或类将被AOP拦截变得非常明确，提高了代码的可读性。
- **灵活性**：注解允许开发者灵活地指定哪些方法需要AOP增强，而无需对所有方法进行一刀切的处理。

## 结论

总的来说，使用注解装配AOP是一种有效的方法，它可以帮助我们更好地管理和组织代码，提高代码的可读性和可维护性。