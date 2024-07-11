// @ts-ignore
import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "www.zhengyiyi.cn",

  author: {
    name: "翼同学",
    url: "https://github.com/zheng-yi-yi",
  },

  iconAssets: "iconify", // "iconify", "fontawesome", "fontawesome-with-brands"

  logo: "/logo.svg",

  repo: "https://github.com/zheng-yi-yi",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  darkmode: "toggle", // 在深色模式和浅色模式之间切换，https://theme-hope.vuejs.press/zh/config/theme/appearance.html#iconassets

  // 页脚
  footer:
      '<img src="/bei.svg" alt="备案图标">  <a href="https://beian.mps.gov.cn/#/query/webSearch?code=44040402000231" rel="noreferrer" target="_blank">粤公网安备44040402000231</a>\n' +
      '  &nbsp;&nbsp;&nbsp; \n' +
      '  <a href="https://beian.miit.gov.cn/" target="备案查询">粤ICP备2024223050号-1</a>',

  displayFooter: true,

  // encrypt: {
  //   config: {
  //     // 这会加密整个 guide 目录，并且两个密码都是可用的
  //     "/guide/": ["1234", "5678"],
  //     // 这只会加密 config/page.html
  //     "/config/page.html": "1234",
  //   },
  // },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },


  lastUpdated: true, // 是否显示页面最后更新时间

  fullscreen: true, // 全屏按钮

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {

    // pnpm add -D vuepress-plugin-search-pro
    // https://theme-hope.vuejs.press/zh/guide/feature/search.html#%E4%BD%BF%E7%94%A8-vuepress-plugin-search-pro
    searchPro: true,

    copyright: {
      author: "翼同学(zhengyiyi.cn)",
      license: "MIT",
      triggerLength: 100,
      maxLength: 700,
      canonical: "https://www.zhengyiyi.cn/",
      global: true,
    },

    copyCode: {
      showInMobile: true // 在移动端也展示复制按钮
    },

    components: { // 使用内置组件：https://theme-hope.vuejs.press/zh/guide/component/built-in.html
      components: [
        "Share",
        "SiteInfo",
        "VPCard",
        // "ArtPlayer",
        // "Badge",
        // "BiliBili",
        // "CodePen",
        // "PDF",
        // "StackBlitz",
        // "VPBanner",
        // "VidStack",
        // "XiGua",
      ],
    },

    // Markdown增强
    mdEnhance: {
      // 使用 KaTeX 启用 TeX 支持
      // pnpm add -D katex
      // Vuepress文档：https://theme-hope.vuejs.press/zh/guide/markdown/grammar/tex.html
      // 官方文档：https://katex.org/docs/options.html
      katex: true,

      // 支持代码块分组
      codetabs: true,

      // 启用 mermaid，供画图使用
      // pnpm add -D mermaid
      // Vuepress文档：https://theme-hope.vuejs.press/zh/guide/markdown/chart/mermaid.html
      // https://plugin-md-enhance.vuejs.press/zh/guide/chart/mermaid.html#%E4%BE%8B%E5%AD%90
      mermaid: true,


      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 katex
      // katex: true,

      // 在启用之前安装 mathjax-full
      // mathjax: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
