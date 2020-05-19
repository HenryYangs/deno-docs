## 打包

`deno bundle [URL]`会输出一个 包含所有具体输入的依赖的 JavaScript 文件。例如：

```
> deno bundle https://deno.land/std/examples/colors.ts colors.bundle.js
Bundling "colors.bundle.js"
Emitting bundle to "colors.bundle.js"
9.2 kB emitted.
```

如果你省略了输出文件，那么打包就会被输出到标准输出。

这个包只能作为Deno 的模块执行：

```
deno run colors.bundle.js
```

输出是一个自包含的ES 模块，命令行主模块提供的任何export 都可用。例如，如果主模块是这样的：

```ts
export { foo } from "./foo.js";

export const bar = "bar";
```

它可以像这样被import：

```ts
import { foo, bar } from "./lib.bundle.js";
```

打包结果也可以被web 浏览器加载。这个打包结果是一个自包含的ES模块，因此type 属性必须设置为`"module"`。
例如：

```html
<script type="module" src="website.bundle.js"></script>
```

或者你也可以在其他ES 模块中import 使用：

```html
<script type="module">
  import * as website from "website.bundle.js";
</script>
```
