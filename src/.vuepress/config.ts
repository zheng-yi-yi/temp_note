import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  title: "编程研习录",

  description: "一个全栈开发者的知识记录手册", // 「Java学习」深入浅出，涵盖Java开发者必备的基础技能和知识点

  lang: "zh-CN",

  theme,

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});