## 引入maps

> 这是一个不稳定的特性。详情请参考
> [稳定性](/runtime/stability.md).

Deno支持[引入maps](https://github.com/WICG/import-maps).

可以使用`--importmap=<FILE>`这个脚手架标识来引入map。

当前的局限性：

- 单个的map引入
- 没有降级处理的URL
- Deno不支持`std:`命名空间
- 只支持`file:`, `http:`和`https:`模式

举个栗子🌰:

```js
// import_map.json

{
   "imports": {
      "http/": "https://deno.land/std/http/"
   }
}
```

```ts
// hello_server.ts

import { serve } from "http/server.ts";

const body = new TextEncoder().encode("Hello World\n");
for await (const req of serve(":8000")) {
  req.respond({ body });
}
```

```shell
$ deno run --importmap=import_map.json --unstable hello_server.ts
```