---
title: 控制反转
category: framework
order: 2
icon: devicon:spring
tag:
  - Spring
---


控制反转（Inversion of Control，简称IoC）是Spring框架的核心理念之一。它是一种设计原则，用于降低计算机程序各组件间的耦合度。

## 什么是控制反转？

IoC（Inversion of Control，控制反转）是一种设计原则，用于减少计算机程序中的耦合。

在传统的程序设计中，我们通常使用直接实例化的方式在一个对象内部创建另一个对象，这种方式会导致两个对象之间产生高度耦合。而在IoC原则下，对象的创建和绑定都交由程序控制器完成，对象之间的关系由控制器维护，从而实现对象之间的解耦。

在Spring框架中，IoC容器就是用来实现这种控制反转的。IoC容器负责实例化、定位、配置应用程序中的对象，并自动解决对象之间的依赖。在Spring中，IoC容器通过读取配置文件或者注解，自动装配对象之间的依赖关系。

## 传统程序

我们来看这个在线音乐商店例子，其中有`ArtistService`和`AlbumService`，它们都需要访问数据库来获取艺术家和专辑的信息。

```java
public class ArtistService {
    private HikariConfig config = new HikariConfig();
    private DataSource dataSource = new HikariDataSource(config);

    public Artist getArtist(long artistId) {
        try (Connection conn = dataSource.getConnection()) {
            // ...
            return artist;
        }
    }
}

public class AlbumService {
    private HikariConfig config = new HikariConfig();
    private DataSource dataSource = new HikariDataSource(config);

    public Album getAlbum(long albumId) {
        try (Connection conn = dataSource.getConnection()) {
            // ...
            return album;
        }
    }
}

public class PlaylistServlet extends HttpServlet {
    private ArtistService artistService = new ArtistService();
    private AlbumService albumService = new AlbumService();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long currentUserId = getFromCookie(req);
        Artist currentArtist = artistService.getArtist(currentUserId);
        Album album = albumService.getAlbum(req.getParameter("albumId"));
        playlistService.addToPlaylist(currentArtist, album);
        // ...
    }
}
```

这样编写代码会有一些缺点：

1. **实例化困难**：组件需要创建和管理其依赖项，如`HikariDataSource`。
2. **资源浪费**：多个组件可能会创建多个相同的依赖实例（如多个`DataSource`），而不是共享单一实例，导致资源浪费。
3. **生命周期管理**：组件的创建、使用和销毁需要协调管理，以确保资源正确释放，避免内存泄漏。
4. **复杂性增加**：随着系统中组件数量的增加，管理和维护这些组件间的依赖关系变得更加复杂。
5. **测试困难**：组件的测试通常需要真实的环境，如数据库，这使得测试变得更加复杂和依赖于外部条件。

为了解决这些问题，引入了IoC（控制反转）的设计原则。

IoC通过将组件的创建、配置和管理的控制权从组件本身转移到外部容器，实现了依赖关系的自动注入。这样，组件就不再需要知道如何创建其依赖项，而是依赖于容器来提供所需的依赖项。

在IoC模式下，应用程序的控制流程发生了反转，应用程序不再负责创建和管理组件，而是由IoC容器负责。这种模式通过“注入”机制实现，可以是通过属性设置（Set注入）、构造方法或其他方式，将依赖项注入到组件中。这样，组件就可以在运行时接收到所需的依赖项，而无需自行创建。

因此，Spring就是一个IoC容器，负责组件创建、依赖注入、生命周期管理和配置管理等。

## 依赖注入

在Spring框架中，控制反转主要通过依赖注入（Dependency Injection，简称DI）来实现。Spring容器负责创建对象，解析对象间的依赖关系，并进行依赖注入。

在Spring中，我们可以通过以下方式进行依赖注入：

1. **构造器注入**：通过构造函数将依赖注入到对象中。
2. **Setter注入**：通过setter方法将依赖注入到对象中。
3. **字段注入**：直接在字段上注解，将依赖注入到对象中。

比如之前那个程序，我们可以修改`ArtistService`和`AlbumService`，使它们接受一个`DataSource`作为构造函数的参数：

```java
public class ArtistService {
    private DataSource dataSource;

    public ArtistService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Artist getArtist(long artistId) {
        try (Connection conn = dataSource.getConnection()) {
            // ...
            return artist;
        }
    }
}

public class AlbumService {
    private DataSource dataSource;

    public AlbumService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Album getAlbum(long albumId) {
        try (Connection conn = dataSource.getConnection()) {
            // ...
            return album;
        }
    }
}
```

然后，我们需要修改`PlaylistServlet`，使它接受`ArtistService`和`AlbumService`作为构造函数的参数：

```java
public class PlaylistServlet extends HttpServlet {
    private ArtistService artistService;
    private AlbumService albumService;

    public PlaylistServlet(ArtistService artistService, AlbumService albumService) {
        this.artistService = artistService;
        this.albumService = albumService;
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long currentUserId = getFromCookie(req);
        Artist currentArtist = artistService.getArtist(currentUserId);
        Album album = albumService.getAlbum(req.getParameter("albumId"));
        playlistService.addToPlaylist(currentArtist, album);
        // ...
    }
}
```

这样，所有组件（JavaBean）就不再由应用程序所创建和配置了，一切都由Ioc容器，也就是Spring来负责。应用程序直接使用已经创建并配置好的组件即可。

这里，为了实现依赖注入，我们还需要告诉Ioc容器，如何创建组件，以及各组件之间的依赖关系。

最简单的方式就是通过XML文件来实现：

```xml
<beans>
    <bean id="dataSource" class="HikariDataSource" />
    
    <bean id="artistService" class="ArtistService">
        <constructor-arg ref="dataSource" />
    </bean>
    
    <bean id="albumService" class="AlbumService">
        <constructor-arg ref="dataSource" />
    </bean>
    
    <bean id="playlistServlet" class="PlaylistServlet">
        <constructor-arg ref="artistService" />
        <constructor-arg ref="albumService" />
    </bean>
</beans>
```

这个XML配置定义了应用程序中的四个主要组件，并通过Spring的依赖注入功能，将`dataSource`注入到`artistService`和`albumService`中，然后再将`artistService`和`albumService`注入到`playlistServlet`中。这样，我们就可以通过IoC容器来管理我们的服务和`DataSource`，并且可以更容易地测试我们的服务。

因此，XML配置是Spring框架的一部分，用于配置和管理应用程序中的对象及其依赖关系。这种配置方式被称为声明式配置，因为你只需要声明对象和它们的依赖关系，而不需要编写代码来手动创建和管理这些对象。

当Spring启动时，它会读取这个XML配置文件，然后创建和配置所有定义的bean。当一个bean被请求时（例如，当`PlaylistServlet`被请求时），Spring会自动注入所有需要的依赖，然后返回bean。这就是所谓的控制反转（IoC）：你不需要手动管理对象的生命周期和依赖关系，而是将这些工作交给Spring来处理。

## 控制反转的好处

1. **降低耦合度**：由于对象的创建和管理都由IoC容器完成，对象之间的依赖关系变得更加松散，降低了耦合度。
2. **提高模块的可测试性**：由于依赖的注入，我们可以在测试时，将真实的依赖替换为模拟对象，提高了模块的可测试性。
3. **提高代码的可读性和可维护性**：由于对象的创建和管理都由IoC容器完成，业务代码更加清晰，提高了代码的可读性和可维护性。

## 无侵入式容器

Spring是一种无侵入式的IoC（控制反转）容器。无侵入式意味着Spring不会强制你的代码依赖于Spring特定的类或接口。你的业务类不需要继承特定的基类或实现特定的接口。这使得你的代码更加清晰，更容易测试，并且更容易在不同的环境中重用。

例如，你可以在Spring中使用POJO（Plain Old Java Object）来定义你的服务和组件，然后通过XML配置或者注解来配置它们的依赖关系。Spring会自动管理这些对象的生命周期，并在需要的时候注入依赖。

这种无侵入式的设计是Spring的一个重要特性，它使得Spring成为一个非常灵活和强大的框架。

