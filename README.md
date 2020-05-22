# 介绍

Deno 是一个默认安全的 JavaScript/TypeScript 运行时环境，有很好的开发体验。

它的基础是V8, Rust 和Tokio。

## 功能亮点

- 默认安全。没有文件、网络、环境读写（除非设置允许）。
- 支持 TypeScript 开箱即用。
- 输出单个可执行文件 ( `deno` )。 （waiting-to-checked）
- 内置依赖检测工具 `deno info` 和代码格式化工具 `deno fmt` 。
- 有[一套已审核通过的标准模块](https://github.com/denoland/deno/tree/master/std)保证了Deno 可用。
- 多脚本可打包为一个JS文件。

## 哲学

Deno 旨在为当代程序员提供一个高效安全的脚本环境。

Deno 以单个可执行程序的方式部署。Deno 程序的URL就是一个[15MB 的可执行程序压缩包](https://github.com/denoland/deno/releases)。Deno 同时承担运行时和打包管理的角色。它使用标准的浏览器兼容协议加载URL模块。

另外，旧有的使用 bash 或 python 编写的工具脚本都可以用Deno 来替换

## 目标

- 只输出一个可执行程序 `deno` 。
- 默认安全
  - 只有在特别允许下，脚本才能访问文件、系统环境和网络。
- 浏览器兼容：没有使用 `Deno` 作为全局命名空间（或者特征测试）的完全使用 Javascript 写的 Deno 程序子集，都应该原封不动的在现代浏览器中可直接运行。
- 提供内置工具，如单元测试、代码格式化、提高开发体验的提示等。
- 用户不用接触V8 概念。
- 高效提供HTTP服务。

## 与Node.js 进行比较

- Deno 不用 `npm`
  - 它使用模块引用作为URL或者文件路径。
-  Deno 在它的模块解析算法中不使用 `package.json` 。
- Deno 中的所有异步操作返回 Promise 。因此，Deno 的 API 和 node API 不一样。
- Deno 需要特殊设置才能访问文件、网络和操作系统。
- 未捕获的错误都会致使 Deno 退出。
- 使用"ES Modules"，不支持 `require()` 。第三方模块通过URL引入：

  ```javascript
  import * as log from "https://deno.land/std/log/mod.ts";
  ```

## 其他关键行为

- 第一次获取远程代码的时候就会缓存，并且永远不会更新，除非使用 `--reload` （因此，在飞机上也可以工作 ）。
- 通过远程 URL 加载的模块或文件是缓存的、不可变的。

## Logo

这些 Deno 的 logo,像 Deno 软件是在 MIT license 下面部署的（开放域免费使用）。

- [@ry 手绘版](https://deno.land/images/deno_logo.png)

- [@hashrock 动画版](https://github.com/denolib/animated-deno-logo/)

- [@kevinkassimo 高分辨率SVG版](https://github.com/denolib/high-res-deno-logo)

- [@tanakaworld 像素化动画版](https://deno.land/images/deno_logo_4.gif)