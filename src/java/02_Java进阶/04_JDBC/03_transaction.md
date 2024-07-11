---
title: 事务
category: JDBC
tag:
  - 数据库
  - Java
order: 3
---

## 事务

当我们获取到`Connection`连接后，实际上是处于“自动Commit”的状态，每执行一条SQL都是作为事务自动执行的。

当我们需要执行一系列SQL语句，并要求它们要么全部成功，要么全部失败时，就需要手动设置事务来管理这些操作。

步骤如下：

1. **关闭自动提交**： 在开始事务前，首先需要关闭数据库连接的自动提交模式。这样做可以确保在事务中的所有操作作为一个整体执行，直到显式调用提交或回滚操作。

   ```
   conn.setAutoCommit(false);
   ```

2. **执行SQL**： 在关闭自动提交后，你可以执行一系列的SQL语句。这些操作包括插入、更新、删除等，它们都将作为一个事务的一部分。

   ```
   try (PreparedStatement ps = conn.prepareStatement("...")) {
       // 设置参数并执行SQL
   }
   ```

3. **提交事务**： 当所有SQL语句执行完毕后，如果一切顺利，需要显式调用提交方法来完成事务。这会使得事务中的所有操作永久保存到数据库中。

   ```
   conn.commit();
   ```

4. **打开自动提交**： 事务提交完成后，应该重新打开自动提交模式，以便后续的操作可以继续使用默认的自动提交行为。

   ```
   复制
   conn.setAutoCommit(true);
   ```

另外，如果事务提交失败或者SQL执行失败，会抛出SQL异常，此时我们需要捕获并且调用`conn.rollback()`进行事务回滚。

```java
try {
    // 关闭自动提交，执行SQL语句
    conn.setAutoCommit(false);
    // ... 执行一系列SQL操作
    // 提交事务
    conn.commit();
} catch (SQLException e) {
    // 如果出现异常，回滚事务
    try {
        conn.rollback();
    } catch (SQLException ex) {
        // 处理回滚时可能出现的异常
    }
    // 重新抛出原始异常或者处理
    throw e;
} finally {
    // 打开自动提交
    conn.setAutoCommit(true);
}
```

## 事务隔离

如果要设定事务的隔离级别，可以使用`Connection`对象的`setTransactionIsolation`方法，该方法接受一个表示隔离级别的常量参数。

```java
// 设置事务隔离级别为REPEATABLE_READ
conn.setTransactionIsolation(Connection.REPEATABLE_READ);
```

对于MySQL而言，默认的隔离级别是`REPEATABLE_READ`。

> 事务的四种隔离级别：
>
> 1. **READ_UNCOMMITTED**：最低的隔离级别，允许事务读取未提交的数据变更，可能会导致脏读、不可重复读和幻读。
> 2. **READ_COMMITTED**：较高的隔离级别，只允许事务读取已经提交的数据，可以避免脏读，但是不可重复读和幻读仍然可能发生。
> 3. **REPEATABLE_READ**：更高级别的隔离，确保在同一事务中多次读取同一数据的结果是一致的，除非数据被本事务自己修改。这是MySQL的默认隔离级别，可以避免脏读和不可重复读，但幻读可能发生。
> 4. **SERIALIZABLE**：最高的隔离级别，强制事务串行执行，可以避免脏读、不可重复读和幻读，但可能导致大量的超时和性能问题。