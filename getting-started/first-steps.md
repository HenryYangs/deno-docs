## 第一步
这篇文章包含几个简单的例子来教你一些 Deno 的基础知识。

这个文档假设你已经具备JavaScript知识，尤其是 `async` / `await` 知识。 如果你不知道，你需要在尝试Deno 之前到[JavaScript基础](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)这里去学习先。

### Hello World
Deno 是JavaScript 和 TypeScript 的运行时环境，它致力于使用web 新特性的时候做到web兼容。

由于它的浏览器兼容性，一个简单的 `Hello World` 程序和你在浏览器中运行的没有区别。

```ts
console.log("Welcome to Deno 🦕");
```

试一下这个程序：

```shell
deno run https://deno.land/std/examples/welcome.ts
```

### 发起 HTTP 请求
很多程序通过HTTP请求获取web server 上的数据。我们也来写一个获取文件内容并打印到终端的小程序。

你可以如同在浏览器中一样使用web 标准API [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 来发起HTTP请求:

```ts
const url = Deno.args[0];
const res = await fetch(url);

const body = new Uint8Array(await res.arrayBuffer());
await Deno.stdout.write(body);
```

让我们一步步看一下这个程序：

1. 获取传给程序的第一个参数并存储在变量 `url` 中。
2. 针对这个url 发起请求，等待响应，并将响应结果存到变量 `res` 中。
3. 用[`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)解析响应体，等待响应结果，并将其转化成 [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)， 然后存储为变量 `body` 。
4. 将 `body` 内容写到 `标准输出` 中。

试试下面的脚本:

```shell
deno run https://deno.land/std/examples/curl.ts https://example.com
```

你会看到这个程序将报出网络连接错误，难道我们写错了？你可能想起了介绍中提到的Deno 是默认安全的。
所以你需要显示地设置类似网络连接的权限“特权”。

设置正确的权限标识，然后再试一次：

```shell
deno run --allow-net=example.com https://deno.land/std/examples/curl.ts https://example.com
```

### 读文件
Deno 也提供一些非web 的API。它们挂在 `Deno` 全局上。你可以在[doc.deno.land](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts)找到这些API的文档说明。

例如文件系统API 没有web 标准格式，所以Deno 提供了它自己的API。

本程序中，每一个命令行参数被认为是一个文件名，文件会被打开，然后打印到标准输出。

```ts
for (let i = 0; i < Deno.args.length; i++) {
  let filename = Deno.args[i];
  let file = await Deno.open(filename);
  await Deno.copy(file, Deno.stdout);
  file.close();
}
```

这里的 `copy()` 函数只是一个 内核-> 用户空间 -> 内核的拷贝。
从文件中读取的数据被放到同一块内存中，然后写到标准输出，展示了Deno IO 流的基本设计方向。

试试这个程序：

```shell
deno run --allow-read https://deno.land/std/examples/cat.ts /etc/passwd
```

### 简易 TCP 服务器
这是一个建立在8080端口上简单的服务器程序，返回它发送给客户端的内容。

```ts
const listener = Deno.listen({ port: 8080 });
console.log("listening on 0.0.0.0:8080");
for await (const conn of listener) {
  Deno.copy(conn, conn);
}
```

为了安全，Deno 不能在未经允许的情况下访问网络，为了访问网络，要使用命令行标识：

```shell
deno run --allow-net https://deno.land/std/examples/echo_server.ts
```

试试用netcat 发送数据来测试它：

```shell
$ nc localhost 8080
hello world
hello world
```

如同例子 `cat.ts` ，这里的 `copy()` 函数没有额外的内存拷贝。它从内核中获取包数据，然后直接返回。

### 更多示例
你可以在 `示例` 一章找到更多示例，比如一个HTTP 文件服务器。
