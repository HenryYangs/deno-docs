## 程序的生命周期

Deno支持浏览器兼容的生命周期事件：`load`和`unload`。开发者可以在程序中使用这些事件来提供初始化或清除代码。

`load`事件的监听器可以是异步的，同时也会被等待(be awaited)。`unload`事件的监听器必须是同步的。这两个事件都不能被取消。

举个栗子🌰：

```ts
// main.ts
import "./imported.ts";

const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (main)`);
};

window.addEventListener("load", handler);

window.addEventListener("unload", handler);

window.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (main)`);
};

window.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (main)`);
};

console.log("log from main script");

// imported.ts
const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (imported)`);
};

window.addEventListener("load", handler);
window.addEventListener("unload", handler);

window.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (imported)`);
};

window.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (imported)`);
};

console.log("log from imported script");
```

注意，可以同时使用`window.addEventListener`和`window.onload`/`window.onunload`来定义事件的回调函数。
这两者有一个很重要的区别，再来举个栗子🌰：

```shell
$ deno run main.ts
log from imported script
log from main script
got load event in onload function (main)
got load event in event handler (imported)
got load event in event handler (main)
got unload event in onunload function (main)
got unload event in event handler (imported)
got unload event in event handler (main)
```

所有通过`window.addEventListener`添加的事件都执行了，但是`imported.ts`中定义的`window.onload`和`window.onunload`都被`main.ts`中的定义覆盖了。