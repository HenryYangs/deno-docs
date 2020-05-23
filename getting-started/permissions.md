## 权限

<!-- TODO(lucacasonato): 什么是权限 -->

<!-- TODO(lucacasonato): 所有权限描述 -->

### 权限白名单

Deno 也提供了权限白名单。

这是一个通过白名单来限制文件系统访问的例子。

```shell
$ deno run --allow-read=/usr https://deno.land/std/examples/cat.ts /etc/passwd
error: Uncaught PermissionDenied: read access to "/etc/passwd", run again with the --allow-read flag
► $deno$/dispatch_json.ts:40:11
    at DenoError ($deno$/errors.ts:20:5)
    ...
```

你可以给 `/etc` 路径设置权限。

```shell
$ deno run --allow-read=/etc https://deno.land/std/examples/cat.ts /etc/passwd
```

`--allow-write` 和 `--allow-read` 的用法一样。

这是一个限制 host 的例子。

```ts
const result = await fetch("https://deno.land/");
```

```shell
$ deno run --allow-net=deno.land https://deno.land/std/examples/curl.ts https://deno.land/
```
