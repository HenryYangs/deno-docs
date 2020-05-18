## Workers

Deno支持
[`Web Worker API`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker).

Workers可以被用来在多线程上执行代码。每个`Worker`实例都运行在单独的线程上，每个线程只专用于这个worker。

到目前为止，Deno只支持`module`类型的workers，因此，创建新worker的时候，传递`type: "module"`就是必要的了：

```ts
// Good
new Worker("./worker.js", { type: "module" });

// Bad
new Worker("./worker.js");
new Worker("./worker.js", { type: "classic" });
```

### 权限

创建一个新的`Worker`实例和动态引入类似；因此，Deno要求适当的权限来执行这个动作。

对于使用本地模块的workers，`allow-read`权限时必需的：

```ts
// main.ts
new Worker("./worker.ts", { type: "module" });

// worker.ts
console.log("hello world");
self.close();
```

```shell
$ deno run main.ts
error: Uncaught PermissionDenied: read access to "./worker.ts", run again with the --allow-read flag

$ deno run --allow-read main.ts
hello world
```

对于使用远程模块的workers，`--allow-net`权限是必需的：

```ts
// main.ts
new Worker("https://example.com/worker.ts", { type: "module" });

// worker.ts
console.log("hello world");
self.close();
```

```shell
$ deno run main.ts
error: Uncaught PermissionDenied: net access to "https://example.com/worker.ts", run again with the --allow-net flag

$ deno run --allow-net main.ts
hello world
```

### 在worker中使用Deno

> 这是一个不稳定的特性。详情请参考
> [unstable features](/runtime/stability.md)。

默认情况下，在worker中`Deno`命名空间并不适用。

为了添加`Deno`命名空间，在创建worker时传入`deno: true`选项：

```ts
// main.js
const worker = new Worker("./worker.js", { type: "module", deno: true });
worker.postMessage({ filename: "./log.txt" });

// worker.js
self.onmessage = async (e) => {
  const { filename } = e.data;
  const text = await Deno.readTextFile(filename);
  console.log(text);
  self.close();
};

// log.txt
hello world
```

```shell
$ deno run --allow-read --unstable main.js
hello world
```

当`Deno`命名空间在worker中能使用时，worker继承了父进程的权限（即使用`--allow-*`标识的进程）。

官方也有意将workers权限做成可配置的。
