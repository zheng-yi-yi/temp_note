// javaSidebar.ts
import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/java/": [
        // ======================= 01_Java基础 ===========================
        {
            text: "Java基础",
            icon: "vscode-icons:file-type-codekit",
            collapsible: true,
            prefix: "01_Java基础/",
            children: [
                {
                    text: "常见类",
                    collapsible: true,
                    prefix: "01_常见类/",
                    children: "structure",
                },
                {
                    text: "异常处理",
                    collapsible: true,
                    prefix: "02_异常处理/",
                    children: "structure",
                },
                // {
                //   text: "注解",
                //   collapsible: true,
                //   prefix: "03_注解/",
                //   children: "structure",
                // },
                // {
                //   text: "泛型",
                //   collapsible: true,
                //   prefix: "04_泛型/",
                //   children: "structure",
                // },
                {
                    text: "正则表达式",
                    collapsible: true,
                    prefix: "05_正则表达式/",
                    children: "structure",
                }
            ],
        },
        // ======================= 02_Java进阶 ===========================
        {
            text: "Java进阶",
            icon: "vscode-icons:file-type-codekit",
            collapsible: true,
            prefix: "02_Java进阶/",
            children: [
                {
                    text: "集合",
                    collapsible: true,
                    prefix: "01_集合/",
                    children: "structure",
                },
                {
                    text: "IO",
                    collapsible: true,
                    prefix: "02_IO/",
                    children: "structure",
                },
                // {
                //   text: "反射",
                //   collapsible: true,
                //   prefix: "03_反射/",
                //   children: "structure",
                // }
                {
                    text: "JDBC",
                    collapsible: true,
                    prefix: "04_JDBC/",
                    children: "structure",
                },
                {
                    text: "网络编程",
                    collapsible: true,
                    prefix: "05_网络编程/",
                    children: "structure",
                },
                // {
                //   text: "XML与JSON",
                //   collapsible: true,
                //   prefix: "06_XML与JSON/",
                //   children: "structure",
                // },
                {
                    text: "Maven",
                    collapsible: true,
                    prefix: "07_Maven/",
                    children: "structure",
                }
            ],
        },
        // ======================= 03_新特性 ===========================
        {
            text: "新特性",
            icon: "vscode-icons:file-type-codekit",
            collapsible: true,
            prefix: "03_新特性/",
            children: [
                {
                    text: "Java 8",
                    collapsible: true,
                    prefix: "01_java8/",
                    children: "structure",
                }
            ],
        },
        // ======================= 04_juc与jvm ===========================
        {
            text: "JUC与JVM",
            icon: "vscode-icons:file-type-codekit",
            collapsible: true,
            prefix: "04_juc与jvm/",
            children: [
                {
                    text: "多线程",
                    collapsible: true,
                    prefix: "JUC/",
                    children: "structure",
                },
                {
                    text: "虚拟机",
                    collapsible: true,
                    prefix: "JVM/",
                    children: "structure",
                }
            ],
        },
        // ======================= 05_数据库 ===========================
        {
            text: "数据库",
            icon: "vscode-icons:file-type-codekit",
            collapsible: true,
            prefix: "05_数据库/",
            children: [
                // ======================= MySQL ===========================
                {
                    text: "MySQL",
                    collapsible: true,
                    prefix: "01_MySQL/",
                    children: [
                        {
                            text: "MySQL基础",
                            collapsible: true,
                            prefix: "01_MySQL基础/",
                            children: "structure",
                        },
                        {
                            text: "数据检索",
                            collapsible: true,
                            prefix: "02_数据检索与排序/",
                            children: "structure",
                        },
                        {
                            text: "数据处理",
                            collapsible: true,
                            prefix: "03_数据处理与分析/",
                            children: "structure",
                        },
                        {
                            text: "MySQL进阶",
                            collapsible: true,
                            prefix: "04_MySQL进阶/",
                            children: "structure",
                        },
                    ],
                },
                // ======================= Redis ===========================
                {
                    text: "Redis",
                    collapsible: true,
                    prefix: "02_Redis/",
                    children: "structure",
                },
                // ======================= MongoDB ===========================
                {
                    text: "MongoDB",
                    collapsible: true,
                    prefix: "03_MongoDB/",
                    children: "structure",
                }
            ],
        },
        // ======================= 07_spring ===========================
        {
            text: "Spring",
            icon: "vscode-icons:file-type-codekit",
            collapsible: true,
            prefix: "07_spring/",
            children: "structure",
            // children: [
            //   {
            //     text: "",
            //     collapsible: true,
            //     prefix: "/",
            //     children: "structure",
            //   }
            // ],
        },

        // ======================= 00_随记 ===========================
        {
            text: "随记",
            icon: "vscode-icons:file-type-codekit",
            collapsible: true,
            prefix: "00_随记/",
            children: [
                {
                    text: "实践",
                    collapsible: true,
                    prefix: "01_实践/",
                    children: "structure",
                },
                {
                    text: "分享",
                    collapsible: true,
                    prefix: "02_分享/",
                    children: "structure",
                }
            ],
        }
    ]
});
