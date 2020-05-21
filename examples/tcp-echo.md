## TCP响应服务器

这是一个在8080端口接受请求的简单服务器，并且返回客户端发送的任何内容。

```ts
const listener = Deno.listen({ port: 8080 });
console.log("listening on 0.0.0.0:8080");
for await (const conn of listener) {
  Deno.copy(conn, conn);
}
```

当启动这个程序之后，它会抛出权限拒绝的错误。

```shell
$ deno run https://deno.land/std/examples/echo_server.ts
error: Uncaught PermissionDenied: network access to "0.0.0.0:8080", run again with the --allow-net flag
► $deno$/dispatch_json.ts:40:11
    at DenoError ($deno$/errors.ts:20:5)
    ...
```

由于安全性原因，Deno不允许程序在没有明确授权下访问网络。为了允许访问网络，使用命令行选项：

```shell
deno run --allow-net https://deno.land/std/examples/echo_server.ts
```

尝试使用netcat发送数据来测试一下：

```shell
$ nc localhost 8080
hello world
hello world
```

就像 `cat.ts` 的例子，这里的 `copy()` 函数依然没有使用多余的内存空间。代码接收到一个来自内核的包并返回，就这样而已。