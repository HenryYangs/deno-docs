## 查看和撤销权限

> 以下内容使用了不稳定的特性。更多内容请参考[不稳定特性](/runtime/stability)。

有时候，一段代码可能想撤销之前的授权。之后，再需要这些权限就会失败。

```ts
// 查看权限
const status = await Deno.permissions.query({ name: "write" });
if (status.state !== "granted") {
  throw new Error("need write permission");
}

const log = await Deno.open("request.log", "a+");

// 撤销权限
await Deno.permissions.revoke({ name: "read" });
await Deno.permissions.revoke({ name: "write" });

// 使用日志文件
const encoder = new TextEncoder();
await log.write(encoder.encode("hello\n"));

// 失败了。。。
await Deno.remove("request.log");
```