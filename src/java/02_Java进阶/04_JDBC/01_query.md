---
title: 查询
category: JDBC
tag:
  - 数据库
  - Java
order: 1
---

## 准备

比如现在我们有这张表：

```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `java` float NOT NULL DEFAULT 0,
  `python` float NOT NULL DEFAULT 0,
  `math` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, '晨曦', 85, 90, 95);
INSERT INTO `student` VALUES (2, '泽宇', 88, 92, 96);
INSERT INTO `student` VALUES (3, '风华', 80, 85, 90);
INSERT INTO `student` VALUES (4, '景行', 82, 87, 92);
INSERT INTO `student` VALUES (5, '涵博', 85, 90, 95);
INSERT INTO `student` VALUES (6, '宇轩', 88, 93, 98);
INSERT INTO `student` VALUES (7, '梓宸', 81, 86, 91);
INSERT INTO `student` VALUES (8, '铭洲', 83, 88, 93);
INSERT INTO `student` VALUES (9, '诗涵', 86, 91, 96);
INSERT INTO `student` VALUES (10, '梦琪', 89, 94, 99);
INSERT INTO `student` VALUES (11, '清婉', 82, 87, 92);
INSERT INTO `student` VALUES (12, '灵珊', 84, 89, 94);
INSERT INTO `student` VALUES (13, '雅婷', 87, 92, 97);
INSERT INTO `student` VALUES (14, '思宁', 90, 95, 100);
INSERT INTO `student` VALUES (15, '芷若', 83, 88, 93);
INSERT INTO `student` VALUES (16, '雨彤', 85, 90, 95);

SET FOREIGN_KEY_CHECKS = 1;
```

## JDBC查询

在连接到数据库后，使用JDBC进行数据库查询的操作主要包括以下步骤：

1. 通过`Connection`提供的`createStatement()`方法创建Statement对象
2. 调用`Statement`对象提供的`executeQuery`方法并传入SQL语句执行查询操作，获得结果集`ResultSet`
3. 处理查询结果，反复调用`ResultSet`的`next()`方法并读取每一行结果。
4. 最后关闭连接

举个例子，假设我们要查询`student`表中的所有记录：

```java
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/learnmysql?&serverTimezone=UTC&characterEncoding=utf8";
        String user = "username";	// 这里填你使用的用户
        String password = "password";	// 以及密码

        try {
            // 1. 创建数据库连接
            Connection conn = DriverManager.getConnection(url, user, password);

            // 2. 创建Statement对象
            Statement stmt = conn.createStatement();

            // 3. 执行SQL查询
            ResultSet rs = stmt.executeQuery("SELECT * FROM student");

            // 4. 处理查询结果
            while (rs.next()) {
                System.out.println(rs.getInt("id") + ", " + rs.getString("NAME") + ", " + rs.getFloat("java") + ", " + rs.getFloat("python") + ", " + rs.getFloat("math"));
            }

            // 5. 关闭连接
            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

运行结果：

```java
1, 晨曦, 85.0, 90.0, 95.0
2, 泽宇, 88.0, 92.0, 96.0
3, 风华, 80.0, 85.0, 90.0
// ...
```

> 注意事项：
>
> - Statement和ResultSet都是需要关闭的资源。在Java 7及以上版本，我们可以使用try-with-resources语句来自动关闭这些资源。这种语句会在try块结束时自动关闭在括号内声明的所有资源，无论是否发生异常。
> - rs.next()方法用于检查结果集中是否还有更多的行。如果有，rs.next()会返回true，并将当前行移动到下一行。因此，我们通常在while循环中使用rs.next()来遍历所有的行。
> - 在ResultSet中，列的索引是从1开始的，而不是从0开始。这是JDBC API的一个特性，和Java的其他部分（如数组和列表）的索引从0开始不同。
> - 当我们从ResultSet中获取列的值时，我们需要根据列的数据类型调用相应的get方法，如getLong、getString等。并且，我们需要根据SELECT语句中列的顺序来确定索引。如果我们调用了错误的get方法或使用了错误的索引，将会抛出SQLException。

## 参数化查询

### SQL注入

**SQL注入**是一种代码注入技术，攻击者通过在查询中插入恶意的SQL代码，来操纵或破坏你的数据库。例如，假设你有一个登录表单，你可能会使用如下的SQL查询来检查用户名和密码：

```sql
String sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
```

如果一个恶意用户输入了`' OR '1'='1`作为用户名，那么SQL查询将变成：

```sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = ''
```

这将返回所有用户，因为`'1'='1'`总是为真。这就是SQL注入。

### 参数化查询

**参数化查询**是一种防止SQL注入的技术。它允许你在SQL查询中插入占位符，然后在执行查询之前提供占位符的值。这样，即使用户输入了恶意的SQL代码，也不会影响查询的结构。

**PreparedStatement**是Java的JDBC API中的一个接口，它支持参数化查询。你可以使用`?`作为占位符，然后使用`setXXX`方法来设置占位符的值。例如：

```java
String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setString(1, username);
pstmt.setString(2, password);
ResultSet rs = pstmt.executeQuery();
```

我们把之前的`Statement`代码改为使用`PreparedStatement`：

```java
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/learnmysql?&serverTimezone=UTC&characterEncoding=utf8";
        String user = "username";	// 这里填你使用的用户
        String password = "password";	// 以及密码

        try {
            // 1. 创建数据库连接
            Connection conn = DriverManager.getConnection(url, user, password);

            // 2. 创建PreparedStatement对象
            String sql = "SELECT * FROM student WHERE NAME = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);

            // 3. 设置参数
            pstmt.setString(1, "晨曦");

            // 4. 执行SQL查询
            ResultSet rs = pstmt.executeQuery();

            // 5. 处理查询结果
            while (rs.next()) {
                System.out.println(rs.getInt("id") + ", " + rs.getString("NAME") + ", " + rs.getFloat("java") + ", " + rs.getFloat("python") + ", " + rs.getFloat("math"));
            }

            // 6. 关闭连接
            rs.close();
            pstmt.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 数据类型映射

| SQL数据类型   | Java数据类型             |
| ------------- | ------------------------ |
| BIT, BOOL     | boolean                  |
| INTEGER       | int                      |
| BIGINT        | long                     |
| REAL          | float                    |
| FLOAT, DOUBLE | double                   |
| CHAR, VARCHAR | String                   |
| DECIMAL       | BigDecimal               |
| DATE          | java.sql.Date, LocalDate |
| TIME          | java.sql.Time, LocalTime |

