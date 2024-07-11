---
title: Resource
category: framework
order: 6
icon: devicon:spring
tag:
  - Spring
---

## 前言

`org.springframework.core.io.Resource` 接口是Spring框架中定义的一个顶层接口，用于抽象化各种类型的资源访问。这个接口提供了一种统一的方式来处理不同类型的底层资源，如文件系统资源、类路径资源、URL资源等。通过这种方式，Spring使得资源的加载和访问变得更加灵活和方便。它提供了一种通用的方式来从底层资源加载输入流。

## 核心功能

`Resource` 接口的核心功能包括：

- 获取资源的输入流（`InputStream`）：`InputStream getInputStream() throws IOException`
- 获取资源的文件名：`String getFilename()`
- 获取资源对应的File对象：`File getFile() throws IOException`
- 判断资源是否存在：`boolean exists()`
- 获取资源的URL或URI表示：`URL getURL() throws IOException` 和 `URI getURI() throws IOException`
- 创建资源的相对路径：`Resource createRelative(String relativePath) throws IOException`

以下是一个使用 `Resource` 的例子：

```java
Resource resource = new ClassPathResource("config.xml");
InputStream is = resource.getInputStream();
```



## Resource 的实现类

Spring 提供了多种 `Resource` 的实现类，包括：

- `UrlResource`: 对 `java.net.URL` 进行封装，它可以用来加载各种实际存在的资源，如文件、HTTP 资源、FTP 资源等。
- `ClassPathResource`: `ClassPath` 类型资源的实现。使用给定的 `ClassLoader` 或者给定的 Class 来加载资源。
- `FileSystemResource`: 对 `java.io.File` 进行封装，它用来访问文件系统中的资源。
- `ServletContextResource`: 用于访问 `ServletContext` 资源，它对应于 Web 应用程序的根目录。



## 使用场景

- 配置文件的加载：Spring容器使用`Resource`接口来加载配置文件，如XML配置文件、属性文件等。
- 模板的加载：Spring MVC和Spring WebFlux中的模板解析器使用`Resource`接口来加载模板文件。
- 数据的读取：在数据访问层，`Resource`接口可以用来读取存储在文件系统中的数据文件。



## 示例代码

```java
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Value;
import java.util.Properties;
import java.io.IOException;
import java.io.InputStream;

public class AppConfig {

    @Value("classpath:app.properties")
    private Resource configResource;

    public Properties loadProperties() throws IOException {
        Properties properties = new Properties();
        try (InputStream in = configResource.getInputStream()) {
            properties.load(in);
        }
        return properties;
    }
}
```

使用 `@Value` 注解将 `app.properties` 文件注入到 `configResource` 字段中。这个文件位于类路径（`classpath`）下，所以我们在文件名前加了 `classpath:` 前缀。这样，我们就可以方便地读取配置文件，而无需关心文件的定位和打开输入流的细节。

## 总结

`org.springframework.core.io.Resource` 接口为Spring框架中的资源访问提供了一个统一的抽象层。通过使用`Resource`接口及其实现类和相关工具类，开发者可以更加方便地处理各种类型的资源，无论是文件系统资源、类路径资源还是URL资源，我们都可以使用相同的 API 来访问它们。