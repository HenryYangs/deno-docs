## 检测当前文件是否是主程序

想要检查当前脚本是不是作为主程序执行，只需要检查 `import.meta.main` 。

```ts
if (import.meta.main) {
  console.log("main");
}
```