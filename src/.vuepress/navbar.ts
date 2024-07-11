import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "Java",
    icon: "ri:java-fill",
    link: "/java/01_Java基础/01_常见类/01_String.md"
  },
  {
    text: "C#",
    icon: "devicon-plain:csharp",
    link: "/csharp/01_CSharp语言基础/01_初识CSharp.md"
  },
  {
    text: "Angular",
    icon: "teenyicons:angular-outline",
    link: "/angular/01_基础入门.md"
  },
  {
    text: "数据结构与算法",
    icon: "carbon:data-vis-1",
    link: "/dsa/"
  },
  {
    text: "设计模式",
    icon: "carbon:deployment-pattern",
    children: [
      {
        text: "首页",
        link: "/pattern/README.md",
      },
      {
        text: "创建型模式",
        link: "/pattern/创建型模式/2_工厂方法.md",
      },
      {
        text: "结构型模式",
        link: "/pattern/结构型模式/01_外观模式.md",
      },
      {
        text: "行为型模式",
        link: "/pattern/行为型模式/01_策略模式.md",
      },
    ],
  },
  // {
  //   text: "练习",
  //   icon: "hugeicons:permanent-job",
  //   link: "/job/01_java/01_java基础.md"
  // },
  {
    text: "友情链接",
    icon: "mdi:internet",
    children: [
      {
        text: "编程开发",
        link: "/resource/04_编程开发.md",
      },
      {
        text: "实用工具",
        link: "/resource/05_实用工具.md",
      },
      {
        text: "AI应用层",
        link: "/resource/01_AI应用层.md",
      },
    ],
  },
  // {
  //   text: "数据库",
  //   icon: "material-symbols:database",
  //   link: "/database/"
  // },
  // {
  //   text: "MySQL",
  //   icon: "material-symbols:database",
  //   link: "/mysql/01_基础概念.md"
  // },
  // {
  //   text: "Redis",
  //   icon: "fontisto:redis",
  //   link: "/redis/01_redis.md"
  // },
]);
