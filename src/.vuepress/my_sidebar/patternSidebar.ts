// patternSidebar.ts
import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    // =============【设计模式】=================
    "/pattern/": [
        "",
        "模式总览.md",
        {
            text: "创建型模式",
            icon: "gridicons:create",
            collapsible: true,
            prefix: "创建型模式/",
            children: "structure",
        },
        {
            text: "结构型模式",
            icon: "solar:structure-linear",
            collapsible: true,
            prefix: "结构型模式/",
            children: "structure",
        },
        {
            text: "行为型模式",
            icon: "carbon:data-structured",
            collapsible: true,
            prefix: "行为型模式/",
            children: "structure",
        },
    ]
});
