---
title: HTTP编程
category: Java
tag:
  - 计算机网络
order: 5
---

### 什么是HTTP？

HTTP（HyperText Transfer Protocol，超文本传输协议）是目前使用最广泛的Web应用程序协议，例如，浏览器访问网站，手机App访问后台服务器，都是通过HTTP协议实现的。

### HTTP的工作原理

HTTP是基于TCP协议之上的一种请求-响应协议。当浏览器请求访问某个网站时，会发生以下过程：

1. **建立TCP连接**：浏览器和网站服务器之间首先建立TCP连接，服务器通常使用80端口（HTTP）或443端口（HTTPS）。
2. **发送HTTP请求**：浏览器向服务器发送一个HTTP请求。
3. **接收HTTP响应**：服务器收到请求后，返回一个HTTP响应，响应中包含了HTML的网页内容。
4. **显示网页**：浏览器解析HTML后显示网页内容。

### HTTP请求-响应示例

一个完整的HTTP请求-响应过程如下：

**HTTP请求**：
```
GET / HTTP/1.1
Host: www.sina.com.cn
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36
Accept: */*
Accept-Language: zh-CN,en
```

**HTTP响应**：
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 133251

<!DOCTYPE html>
<html>
<body>
<h1>Hello</h1>
...
</body>
</html>
```

### HTTP请求的组成

HTTP请求由HTTP Header和HTTP Body两部分构成：

1. **请求行**：包括请求方法、请求路径和HTTP版本，例如，`GET / HTTP/1.1`。
2. **HTTP Header**：每一行是`Header: Value`格式，用于传递客户端信息和请求参数。
   - `Host`：请求的域名。
   - `User-Agent`：客户端自身标识信息。
   - `Accept`：客户端能处理的响应格式。
   - `Accept-Language`：客户端接收的语言。

3. **HTTP Body**：用于传递数据，在GET请求中没有Body，在POST请求中包含实际的数据内容。

### HTTP响应的组成

HTTP响应也由Header和Body两部分组成：

1. **状态行**：包括HTTP版本、响应状态码和响应说明，例如，`HTTP/1.1 200 OK`。
2. **HTTP Header**：描述响应内容和其他信息。
   - `Content-Type`：响应内容的类型。
   - `Content-Length`：响应内容的长度。

3. **HTTP Body**：实际的响应内容，如HTML页面、图片等。

### 常见的HTTP方法

- **GET**：请求指定资源，参数附加在URL后面。
- **POST**：提交数据，参数包含在请求Body中。
- **PUT**：更新资源。
- **DELETE**：删除资源。

### HTTP状态码

- **1xx**：提示信息，例如101表示协议切换。
- **2xx**：成功，例如200表示请求成功。
- **3xx**：重定向，例如301表示永久重定向。
- **4xx**：客户端错误，例如404表示资源不存在。
- **5xx**：服务器错误，例如500表示服务器内部错误。

### HTTP/1.1和HTTP/2.0的区别

- **HTTP/1.1**：允许在一个TCP连接中反复发送-响应，提高了效率。
- **HTTP/2.0**：允许客户端在没有收到响应的时候，发送多个HTTP请求，服务器可以并行返回响应，大大提高了效率。

通过以上描述，我们可以了解到HTTP协议的基础工作原理和其在Web应用中的重要性。HTTP的发展也随着互联网需求不断提升，从最早的HTTP/1.0到现在的HTTP/2.0，提升了通信效率和用户体验。