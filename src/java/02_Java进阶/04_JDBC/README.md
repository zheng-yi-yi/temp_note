---
title: JDBC
category: JDBC
---

## 背景

在Java出现之前，数据库的访问主要通过ODBC（Open Database Connectivity）实现。但是，ODBC是用C语言编写的，不适合Java程序。因此，Sun公司在Java中引入了JDBC，使Java程序能够通过统一的接口访问各种关系数据库。

## 什么是JDBC

JDBC（Java Database Connectivity，Java数据库连接）是Java语言中用来规范客户端程序如何访问数据库的应用程序接口，提供了诸如查询和更新数据库中数据的方法。JDBC是Java SE的一部分，任何Java应用都可以包含JDBC代码。

你可以把JDBC看作是连接Java程序和数据库的桥梁。通过JDBC，Java程序可以执行SQL语句，查询、插入、更新和删除数据库中的数据。JDBC提供了一套标准的API，使得开发者无需关心底层数据库的具体实现，只需要关注业务逻辑即可。

> 小结：JDBC是一组Java标准API，它定义了客户端如何访问数据库。JDBC接口规范位于`java.sql`包中，但这些接口不能直接使用，需要通过具体的实现类来实现。当我们选择使用特定类型的数据库时，就需要使用对应数据库提供的JDBC驱动。

## 优势

JDBC接口是Java标准库的一部分，它定义了访问数据库的标准方法。而具体如何实现这些方法，是由各个数据库厂商提供的JDBC驱动来完成的。例如，如果你的Java程序需要访问MySQL数据库，你就需要使用Oracle公司提供的MySQL JDBC驱动，引入对应jar包即可。这种设计使得Java程序可以使用一套统一的代码来访问各种不同的数据库，只需要更换相应的JDBC驱动即可。这极大地提高了代码的可移植性和复用性。

## JDBC驱动

以MySQL为例，我们可以通过Maven依赖来添加JDBC驱动：

```xml
<!-- MySQL 5.x -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
    <scope>runtime</scope>
</dependency>

<!-- MySQL 8.x -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.23</version>
    <scope>runtime</scope>
</dependency>
```

注意，依赖的`scope`应设置为`runtime`，这样在编译时不需要数据库的jar包，仅在运行时需要。

## 建立连接

使用JDBC连接数据库需要准备URL、用户名和密码。以MySQL为例，连接URL的格式如下：

```sql
jdbc:mysql://<hostname>:<port>/<db>?key1=value1&key2=value2
```

举个例子，如果你的MySQL数据库运行在本地（localhost），端口号为3306，数据库名为mydb，用户名为root，密码为password，那么你的JDBC连接URL和连接代码如下：

```java
String url = "jdbc:mysql://localhost:3306/mydb?&serverTimezone=UTC&characterEncoding=utf8";
String username = "root";
String password = "password";
Connection conn = DriverManager.getConnection(url, username, password);
```

> 记录：
>
> - `useSSL=false`：这表示连接不使用SSL加密。MySQL默认开启了SSL加密，但在开发环境中通常不需要。
> - `serverTimezone=UTC`：从MySQL 5.1.33开始，MySQL要求必须设置serverTimezone参数，这里设置为UTC。
> - `characterEncoding=utf8`：这表示使用UTF-8字符编码来连接数据库，允许应用程序处理各种国际字符。

在JDBC中，`Connection`是一个接口，它代表了Java应用程序和数据库之间的一个会话（session）。所有的数据库操作都必须在一个会话的上下文中进行。`Connection`对象提供了许多用于执行SQL语句的方法，如`createStatement()`、`prepareStatement()`和`prepareCall()`等。

当你使用`DriverManager.getConnection()`方法连接数据库时，就会得到一个`Connection`对象。在完成数据库操作后，你应该调用`Connection`对象的`close()`方法来关闭会话，释放数据库资源。例如：

```java
conn.close();
```

请注意，虽然`Connection`对象的`close()`方法通常在finally块中调用，以确保无论是否发生异常，连接都能被正确关闭，但在Java 7及更高版本中，可以使用try-with-resources语句自动关闭资源，如下所示：

```java
try (Connection conn = DriverManager.getConnection(url, username, password)) {
    // 使用conn进行数据库操作...
} catch (SQLException e) {
    // 处理异常...
}
// 这里无需显式关闭Connection，因为try-with-resources语句会自动关闭
```



## JDBC操作

`DriverManager`类是JDBC的核心类，它负责加载数据库驱动，并提供方法来建立到数据库的连接。

当你调用`DriverManager.getConnection()`方法时，`DriverManager`会遍历已注册的驱动程序，并尝试使用每个驱动程序建立连接，直到成功建立连接或尝试完所有驱动程序。

这个过程是自动的，你不需要手动加载驱动或选择驱动。你只需要提供正确的URL、用户名和密码，`DriverManager`就会为你处理其余的事情。

在建立了数据库连接之后，会执行以下操作：

1. **创建Statement或PreparedStatement**：使用Connection对象的`createStatement()`或`prepareStatement()`方法创建一个Statement或PreparedStatement对象，用于执行SQL语句。
2. **执行SQL语句**：使用Statement或PreparedStatement对象的`executeQuery()`或`executeUpdate()`方法执行SQL查询或更新语句。
3. **处理结果**：
   - 如果执行的是查询语句，`executeQuery()`方法会返回一个ResultSet对象，你可以遍历这个对象来获取查询结果。
   - 如果执行的是更新语句，`executeUpdate()`方法会返回一个int值，表示受影响的行数。
4. **关闭资源**：在完成数据库操作后，你应该关闭ResultSet、Statement或PreparedStatement以及Connection对象，以释放数据库资源。这通常在finally块中完成，或者在Java 7及更高版本中，可以使用try-with-resources语句自动关闭资源。

比如：

```sql
String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
String username = "root";
String password = "password";

try (Connection conn = DriverManager.getConnection(url, username, password)) {
    String sql = "SELECT * FROM students";
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
        while (rs.next()) {
            int id = rs.getInt("ID");
            String name = rs.getString("Name");
            int age = rs.getInt("Age");
            System.out.println("ID: " + id + ", Name: " + name + ", Age: " + age);
        }
    }
} catch (SQLException e) {
    e.printStackTrace();
}
```

这里我们首先创建了一个Statement对象，然后执行了一个SQL查询语句，遍历了查询结果，并在完成后关闭了所有的资源。
