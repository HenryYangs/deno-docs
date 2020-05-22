## 重载模块

可以使用 `--reload` 标识使本地的 `DENO_DIR` 缓存失效。它的作用是：

重新加载所有资源

`--reload`

有时候我们只想升级某些模块，那么可以通过给 `--reload` 标识传入一个变量来控制。

重新加载所有标准模块

`--reload=https://deno.land/std`

重新加载指定模块，使用逗号分隔URL

`--reload=https://deno.land/std/fs/copy.ts,https://deno.land/std/fmt/colors.ts`
