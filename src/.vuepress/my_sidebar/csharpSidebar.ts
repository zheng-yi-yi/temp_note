// patternSidebar.ts
import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/csharp/": [
        // ======================= 01_C#基础 ===========================
        {
            text: "C#语言基础",
            icon: "arcticons:cubasis",
            collapsible: true,
            prefix: "01_CSharp语言基础/",
            children: "structure"
        },
        // ======================= 02_NET基础 ===========================
        // {
        //     text: ".NET平台",
        //     icon: "raphael:icons",
        //     collapsible: true,
        //     prefix: "02_NET基础/",
        //     children: "structure"
        // },
        // ======================= 03_ASP.NET Core ===========================
        // {
        //     text: "ASP.NET Core",
        //     icon: "simple-icons:kentico",
        //     collapsible: true,
        //     prefix: "03_ASPNETCore/",
        //     children: "structure"
        // },
        // ======================= 04_Entity Framework Core ===========================
        // {
        //     text: "Entity Framework Core",
        //     icon: "logos:effect-icon",
        //     collapsible: true,
        //     prefix: "04_EFC/",
        //     children: "structure"
        // },
    ]
});
