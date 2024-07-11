---
title: Redisson
category: Redis
order: 3
tag:
  - 内存数据库
  - NoSQL
---

## 什么是 Redisson？

Redisson 是一个基于 Java 的 Redis 客户端库，它提供了一个 thread-safe 的方式来访问 Redis 数据库。Redisson 允许开发者使用熟悉的 Java 集合和数据结构来操作 Redis，例如 List、Map、Queue、Lock、Semaphore 等，从而简化了 Redis 的使用。

## Redisson 的特点

1. **`Thread-safe`**：Redisson 是线程安全的，允许多个线程同时访问 Redis 数据库。
2. **`Familiar Java API`**：Redisson 提供了熟悉的 Java 集合和数据结构 API，易于 Java 开发者使用。
3. **`High-performance`**：Redisson 提供了高性能的 Redis 访问方式，适合高并发和高性能应用场景。
4. **`Support for various data structures`**：Redisson 支持多种数据结构，例如 Map、List、Set、Queue 等。

## 如何使用 Redisson

1. 添加依赖项：在 Maven 或 Gradle 项目中添加 Redisson 依赖项。比如以下就是一个Maven依赖：

   ```xml
   <dependency>
       <groupId>org.redisson</groupId>
       <artifactId>redisson-spring-boot-starter</artifactId>
   </dependency>
   ```

2. 创建 Redisson 实例：使用 `Redisson.create()` 方法创建 `Redisson` 实例。

3. 获取 Redis 基于的 Java 对象：使用 `getMap()`、`getLock()`、`getExecutorService()` 等方法获取 Redis 基于的 Java 对象。

## 使用示例

### 配置文件

在`SpringBoot`配置文件`application-dev.yml`中，我们可以如下配置：

```yml
redis:
  sdk:
    config:
      host: localhost
      port: 6379
      password: 123456
      pool-size: 10
      min-idle-size: 5
      idle-timeout: 30000
      connect-timeout: 5000
      retry-attempts: 3
      retry-interval: 1000
      ping-interval: 60000
      keep-alive: true
```

- `host`：Redis服务器的主机名或IP地址。
- `port`：Redis服务器的端口号。
- `password`：用于连接Redis服务器的密码。
- `pool-size`：连接池的大小，即同时可以保持活动的最大连接数。
- `min-idle-size`：连接池中的最小空闲连接数。
- `idle-timeout`：连接空闲多久后将被释放，单位是毫秒。
- `connect-timeout`：连接超时时间，单位是毫秒。
- `retry-attempts`：如果连接失败，尝试重新连接的次数。
- `retry-interval`：如果连接失败，尝试重新连接的间隔时间，单位是毫秒。
- `ping-interval`：发送ping命令的间隔时间，单位是毫秒，用于检查连接是否仍然有效。
- `keep-alive`：是否在连接空闲时保持连接活动。

> "本身 Spring 也提供了 Redis 的配置，但鉴于兼容问题和后续的功能拓展，还是比较建议自己添加配置。"

### 配置类

首先，我们编写一个用于封装Redis配置参数的Java Bean类。

```java
@Data
@ConfigurationProperties(prefix = "redis.sdk.config", ignoreInvalidFields = true)
public class RedisClientConfigProperties {
    /**
     * host:ip
     */
    private String host;
    /**
     * 端口
     */
    private int port;
    /**
     * 账密
     */
    private String password;
    /**
     * 设置连接池的大小，默认为64
     */
    private int poolSize = 64;
    /**
     * 设置连接池的最小空闲连接数，默认为10
     */
    private int minIdleSize = 10;
    /**
     * 设置连接的最大空闲时间（单位：毫秒），超过该时间的空闲连接将被关闭，默认为10000
     */
    private int idleTimeout = 10000;
    /**
     * 设置连接超时时间（单位：毫秒），默认为10000
     */
    private int connectTimeout = 10000;
    /**
     * 设置连接重试次数，默认为3
     */
    private int retryAttempts = 3;
    /**
     * 设置连接重试的间隔时间（单位：毫秒），默认为1000
     */
    private int retryInterval = 1000;
    /**
     * 设置定期检查连接是否可用的时间间隔（单位：毫秒），默认为0，表示不进行定期检查
     */
    private int pingInterval = 0;
    /**
     * 设置是否保持长连接，默认为true
     */
    private boolean keepAlive = true;
}
```

这个类使用了Spring Boot的`@ConfigurationProperties`注解，使得Spring Boot能够从配置文件中读取以`redis.sdk.config`为前缀的属性，并将这些属性的值自动设置到这个类的对应字段中（其实就是提供方便的方式从配置文件中读取Redis配置，并在Java代码中使用这些配置）。

> `Lombok`插件的`@Data`注解会自动为这个类生成`getter`和`setter`方法，以及`equals`、`hashCode`和`toString`方法。

下面，我们来编写一个Spring Boot的配置类`RedisClientConfig`，用于创建和配置`RedissonClient`。

> `RedissonClient`是`Redisson`库提供的一个客户端对象，用于与`Redis`数据库进行交互。

```java
@Configuration
@EnableConfigurationProperties(RedisClientConfigProperties.class)
public class RedisClientConfig {
    @Bean("redissonClient")
    public RedissonClient redissonClient(RedisClientConfigProperties properties) {
        Config config = new Config();
        config.useSingleServer()
            .setAddress("redis://" + properties.getHost() + ":" + properties.getPort())
            .setPassword(properties.getPassword())
            .setConnectionPoolSize(properties.getPoolSize())
            .setConnectionMinimumIdleSize(properties.getMinIdleSize())
            .setIdleConnectionTimeout(properties.getIdleTimeout())
            .setConnectTimeout(properties.getConnectTimeout())
            .setRetryAttempts(properties.getRetryAttempts())
            .setRetryInterval(properties.getRetryInterval())
            .setPingConnectionInterval(properties.getPingInterval())
            .setKeepAlive(properties.isKeepAlive());

        return Redisson.create(config);
    }
}
```

这里我们首先创建了一个`Config`对象，然后调用了`useSingleServer`方法来配置Redisson客户端使用单一服务器模式。然后，调用了一系列的`set`方法来设置Redis服务器的地址、密码、连接池大小、最小空闲连接数等等。这些参数的值都是从`RedisClientConfigProperties`对象中获取的。

最后，调用`Redisson.create(config)`来创建一个`RedissonClient`对象，并返回这个对象。此时这个实例会被Spring管理并注入到需要使用它的地方。

### Redis服务

有了 `RedissonClient` 对象后，我们可以在服务领域下编写一个 Redis 服务接口，用于封装Redis操作。接着编写一个服务实现类（也就是使用客户端对象的对应方法）：

```java
@Service("redissonService")
public class RedissonService implements IRedisService {

    @Resource
    private RedissonClient redissonClient;

    // 设置键值对
    public <T> void setValue(String key, T value) {
        redissonClient.<T>getBucket(key).set(value);
    }

    // 设置键值对，并设置过期时间
    @Override
    public <T> void setValue(String key, T value, long expired) {
        RBucket<T> bucket = redissonClient.getBucket(key);
        bucket.set(value, Duration.ofMillis(expired));
    }

    // 获取键对应的值
    public <T> T getValue(String key) {
        return redissonClient.<T>getBucket(key).get();
    }

    // 获取队列
    @Override
    public <T> RQueue<T> getQueue(String key) {
        return redissonClient.getQueue(key);
    }

    // 获取阻塞队列
    @Override
    public <T> RBlockingQueue<T> getBlockingQueue(String key) {
        return redissonClient.getBlockingQueue(key);
    }

    // 获取延迟队列
    @Override
    public <T> RDelayedQueue<T> getDelayedQueue(RBlockingQueue<T> rBlockingQueue) {
        return redissonClient.getDelayedQueue(rBlockingQueue);
    }

    // 原子递增
    @Override
    public long incr(String key) {
        return redissonClient.getAtomicLong(key).incrementAndGet();
    }

    // 原子增加指定的值
    @Override
    public long incrBy(String key, long delta) {
        return redissonClient.getAtomicLong(key).addAndGet(delta);
    }

    // 原子递减
    @Override
    public long decr(String key) {
        return redissonClient.getAtomicLong(key).decrementAndGet();
    }

    // 原子减少指定的值
    @Override
    public long decrBy(String key, long delta) {
        return redissonClient.getAtomicLong(key).addAndGet(-delta);
    }

    // 删除键
    @Override
    public void remove(String key) {
        redissonClient.getBucket(key).delete();
    }

    // 判断键是否存在
    @Override
    public boolean isExists(String key) {
        return redissonClient.getBucket(key).isExists();
    }

    // 添加元素到集合
    public void addToSet(String key, String value) {
        RSet<String> set = redissonClient.getSet(key);
        set.add(value);
    }

    // 判断元素是否在集合中
    public boolean isSetMember(String key, String value) {
        RSet<String> set = redissonClient.getSet(key);
        return set.contains(value);
    }

    // 添加元素到列表
    public void addToList(String key, String value) {
        RList<String> list = redissonClient.getList(key);
        list.add(value);
    }

    // 从列表中获取元素
    public String getFromList(String key, int index) {
        RList<String> list = redissonClient.getList(key);
        return list.get(index);
    }

    // 添加键值对到哈希表
    public void addToMap(String key, String field, String value) {
        RMap<String, String> map = redissonClient.getMap(key);
        map.put(field, value);
    }

    // 从哈希表中获取值
    public String getFromMap(String key, String field) {
        RMap<String, String> map = redissonClient.getMap(key);
        return map.get(field);
    }

    // 添加元素到有序集合
    public void addToSortedSet(String key, String value) {
        RSortedSet<String> sortedSet = redissonClient.getSortedSet(key);
        sortedSet.add(value);
    }

    // 获取锁
    @Override
    public RLock getLock(String key) {
        return redissonClient.getLock(key);
    }

    // 获取公平锁
    @Override
    public RLock getFairLock(String key) {
        return redissonClient.getFairLock(key);
    }

    // 获取读写锁
    @Override
    public RReadWriteLock getReadWriteLock(String key) {
        return redissonClient.getReadWriteLock(key);
    }

    // 获取信号量
    @Override
    public RSemaphore getSemaphore(String key) {
        return redissonClient.getSemaphore(key);
    }

    // 获取可过期的信号量
    @Override
    public RPermitExpirableSemaphore getPermitExpirableSemaphore(String key) {
        return redissonClient.getPermitExpirableSemaphore(key);
    }

    // 获取倒计时锁
    @Override
    public RCountDownLatch getCountDownLatch(String key) {
        return redissonClient.getCountDownLatch(key);
    }

    // 获取布隆过滤器
    @Override
    public <T> RBloomFilter<T> getBloomFilter(String key) {
        return redissonClient.getBloomFilter(key);
    }
}
```

### 使用Redis

Redis 的大部分操作确实都是缓存数据，以提高系统的 QPS（每秒查询率）。Redis 作为一个缓存层，可以减少对数据库的读写压力，提高系统的响应速度和吞吐量。

比如：

```java
@Override
public UserEntity queryUser(String userId) {
    // 从Redis缓存中获取用户数据
    UserEntity userEntity = redissonService.getValue(userId);
    // 如果缓存中没有用户数据
    if (null == userEntity) {
        // 从数据库中查询用户数据
        UserPO userPO = userDao.selectByUserId(userId);
        // 创建一个新的UserEntity对象
        userEntity = new UserEntity();
        // 设置用户名和邮箱
        userEntity.setUserName(userPO.getUserName());
        userEntity.setEmail(userPO.getEmail());
        // 将查询结果存入Redis缓存
        redissonService.setValue(userId, userEntity);
    }
    // 返回查询结果
    return userEntity;
}
```

## 资源

1. **Redisson 官方文档**：<https://redisson.org/>
2. **Redisson GitHub 仓库**：<https://github.com/redisson/redisson>

**其他 Java Redis 客户端**

1. Jedis：<https://github.com/redis/jedis>
2. Lettuce：<https://github.com/lettuce-io/lettuce-core>

