// sidebar.ts
import { sidebar } from "vuepress-theme-hope";
// @ts-ignore
import javaSidebar from "./my_sidebar/javaSidebar";
// @ts-ignore
import patternSidebar from "./my_sidebar/patternSidebar";
// @ts-ignore
import dsaSidebar from "./my_sidebar/dsaSidebar";
// @ts-ignore
import csharpSidebar from "./my_sidebar/csharpSidebar";

export default sidebar({
  "/resource/": "structure",
  "/angular/": "structure",

  ...javaSidebar,
  ...patternSidebar,
  ...dsaSidebar,
  ...csharpSidebar,

});
