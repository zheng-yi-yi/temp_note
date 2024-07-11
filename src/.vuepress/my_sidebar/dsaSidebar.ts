// patternSidebar.ts
import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    // =============【数据结构与算法】=================
    "/dsa/": [
        "",
        "review.md",
        {
            text: "数据结构",
            icon: "carbon:data-structured",
            collapsible: true,
            prefix: "01_数据结构/",
            children: "structure",
        },
        {
            text: "图论",
            icon: "ph:graph-thin",
            collapsible: true,
            prefix: "02_图论/",
            children: "structure",
        },
        {
            text: "动态规划",
            icon: "simple-icons:dsautomobiles",
            collapsible: true,
            prefix: "04_动态规划/",
            children: "structure",
        },
        {
            text: "贪心",
            icon: "tabler:target-arrow",
            collapsible: true,
            prefix: "05_贪心/",
            children: "structure",
        },
        {
            text: "数论",
            icon: "carbon:math-curve",
            collapsible: true,
            prefix: "06_数论/",
            children: "structure",
        },
        {
            text: "杂记",
            icon: "basil:other-1-outline",
            collapsible: true,
            prefix: "03_杂记/",
            children: "structure",
        },
    ],
});
