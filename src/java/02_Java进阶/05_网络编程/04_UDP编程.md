---
title: UDP编程
category: Java
tag:
  - 计算机网络
order: 4
---

## 1. 概述

使用`DatagramSocket`和`DatagramPacket`类可以实现基于UDP协议的网络通信。UDP（用户数据报协议）是一种无连接的协议，相比TCP，它不保证数据的可靠传输，但在某些需要高速传输且可以容忍丢包的场景下，UDP通常是更优的选择。

## 2. UDP服务器端

服务器端的任务是创建一个`DatagramSocket`实例，监听一个端口，等待客户端的消息，接收到消息后可以进行相应的处理。

首先，服务器端需要创建一个`DatagramSocket`实例，并指定监听的端口号。

```java
int port = 8888; // 服务器监听的端口号
DatagramSocket serverSocket = new DatagramSocket(port);
```

然后是接收数据。服务器端通过`receive`方法接收客户端发送的数据，同样的，该方法会阻塞，直到接收到数据。

```java
byte[] receiveData = new byte[1024]; // 接收数据的缓冲区
DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
serverSocket.receive(receivePacket);
String message = new String(receivePacket.getData(), 0, receivePacket.getLength());
System.out.println("接收到的消息：" + message);
```

当服务器端接收到客户端发送的`DatagramPacket`后，通常需要立即回复一个或多个UDP包。由于UDP是无连接的，每个接收到的`DatagramPacket`都包含了发送方的地址和端口信息，使得服务器能够知道回复的目的地。服务器通过设置数据并使用`DatagramSocket`的`send`方法来发送UDP包给客户端。

最后调用`close`方法即可关闭`DatagramSocket`。

```java
serverSocket.close();
```

## 3. UDP客户端

客户端这边也是创建一个`DatagramSocket`实例，构造要发送的数据包，然后发送到服务器端。同样的，先创建一个`DatagramSocket`实例，但不需要指定端口号（系统会自动分配）。

```java
DatagramSocket clientSocket = new DatagramSocket();
```

客户端使用`send`方法可以发送数据。首先，需要将发送的消息转换为字节数组，然后封装到`DatagramPacket`对象中，指定服务器的IP地址和端口号。

```java
String serverIP = "127.0.0.1"; // 服务器的IP地址
int serverPort = 8888; // 服务器的端口号
String message = "Hello, UDP Server!";
byte[] sendData = message.getBytes();
InetAddress serverAddress = InetAddress.getByName(serverIP);
DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, serverAddress, serverPort);
clientSocket.send(sendPacket);
```

最后调用`close`方法即可关闭`DatagramSocket`。

```java
clientSocket.close();
```

## 4. 小结

UDP编程在Java中相对简单，主要涉及`DatagramSocket`和`DatagramPacket`两个类的使用。虽然UDP不保证数据的可靠性和顺序，但它的高效性使其在视频流、实时游戏等领域非常有用。

