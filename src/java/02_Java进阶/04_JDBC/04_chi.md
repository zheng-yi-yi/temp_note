---
title: JDBC连接池
category: JDBC
tag:
  - 数据库
  - Java
order: 4
---

在进行数据库操作时，频繁地创建和销毁JDBC连接会导致性能问题。为了提高效率，引入了连接池的概念。JDBC连接池允许复用已经创建的连接，从而减少资源消耗和提高性能。

## JDBC连接池的作用

- **资源优化**：连接池通过复用连接，减少了创建和销毁连接的开销。
- **性能提升**：由于连接复用，减少了连接创建的时间，提高了数据库操作的响应速度。
- **并发支持**：连接池能够管理多个连接，支持高并发环境下的数据库访问。

## 连接池的实现

- **标准接口**：`javax.sql.DataSource`是连接池的标准接口，但仅是一个接口，需要具体的实现。
- 常用实现：
  - HikariCP
  - Druid
  - C3P0
  - BoneCP

## 举例

以HikariCP为例，我们先添加Maven依赖：

```xml
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>2.7.1</version>
</dependency>
```

接下来，创建一个`DataSource`实例，即连接池：

```java
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://localhost:3306/test");
config.setUsername("root");
config.setPassword("password");
config.addDataSourceProperty("connectionTimeout", "1000"); // 连接超时：1秒
config.addDataSourceProperty("idleTimeout", "60000"); // 空闲超时：60秒
config.addDataSourceProperty("maximumPoolSize", "10"); // 最大连接数：10
DataSource ds = new HikariDataSource(config);
```

创建`DataSource`实例是一个资源密集型操作，通常将其作为全局变量，并在整个应用程序生命周期中使用。

接下来就可以使用连接池了，获取`Connection`：

```java
try (Connection conn = ds.getConnection()) {
    // 在此获取连接
    ...
} // 在此“关闭”连接
```

通过连接池获取的连接不需要指定JDBC的URL、用户名、密码等信息，因为这些信息已存储在连接池内部。

## 连接池的管理

- **连接获取**：第一次调用`ds.getConnection()`时，连接池会创建一个新的`Connection`。
- **连接释放**：调用`conn.close()`时，连接不是被真正关闭，而是被释放回连接池。

连接池内部维护了多个`Connection`实例，根据应用程序的需求，管理这些连接的状态（空闲或正在使用）。

## 配置和监控

连接池提供了大量参数进行配置，如最小/最大活动连接数、空闲连接的自动关闭时间等。这些参数应根据应用程序的负载合理配置。大多数连接池还提供了实时状态监控功能，以便于跟踪和优化性能。