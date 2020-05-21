## 处理系统信号

> 以下内容使用了不稳定的特性。更多内容请参考[不稳定特性](/runtime/stability)。

[API文档](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/js/lib.deno.unstable.d.ts#Deno.signal)

可以使用 `Deno.signal()` 函数来处理系统信号。

```ts
for await (const _ of Deno.signal(Deno.Signal.SIGINT)) {
  console.log("interrupted!");
}
```

`Deno.signal()` 也支持Promise。

```ts
await Deno.signal(Deno.Signal.SIGINT);
console.log("interrupted!");
```

如果想停止监控信号，可以使用信号对象的 `dispose()` 方法。

```ts
const sig = Deno.signal(Deno.Signal.SIGINT);
setTimeout(() => {
  sig.dispose();
}, 5000);

for await (const _ of sig) {
  console.log("interrupted");
}
```

上面的for-await循环会在sig.dispose()被调用后5秒退出。