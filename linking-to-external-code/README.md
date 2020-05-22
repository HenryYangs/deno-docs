# 引入外部代码

在[开始](../getting-started/README.md)章节中，我们看到Deno可以从URL执行脚本。像浏览器中的JavaScript一样，Deno可以用URL直接引入库。下面这个例子使用了URL来引入一个断言库：

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

assertEquals("hello", "hello");
assertEquals("world", "world");

console.log("Asserted! 🎉");
```

试一试执行它：

```shell
$ deno run test.ts
Compile file:///mnt/f9/Projects/github.com/denoland/deno/docs/test.ts
Download https://deno.land/std/testing/asserts.ts
Download https://deno.land/std/fmt/colors.ts
Download https://deno.land/std/testing/diff.ts
Asserted! 🎉
```

注意，我们并没有必要为这段代码使用 `allow-net` 标识，但它还是访问了网络。运行时有特殊的访问权限去下载引入并且将它们缓存到硬盘上。

Deno将远程引入缓存到 `$DENO_DIR` 这个环境变量指定的目录下。默认情况下，如果 `$DENO_DIR` 没有指定，那么它会指向系统的缓存目录。下次再执行代码的时候，则不会请求下载。如果代码没有改变，它甚至不会被重新编译。默认的目录是：

- Linux/Redox: `$XDG_CACHE_HOME/deno` 或者 `$HOME/.cache/deno`
- Windows: `%LOCALAPPDATA%/deno` ( `%LOCALAPPDATA%` = `FOLDERID_LocalAppData` )
- macOS: `$HOME/Library/Caches/deno`
- 如果发生了错误，那么会回退到使用 `$HOME/.deno`

## FAQ

### 万一 `https://deno.land/` 挂了什么怎么办？

依赖外部服务器对于开发来说很方便，但是对于生产环境来说就很脆弱了。生产环境的程序的依赖必须时刻可用。在Deno中，这是通过在源控制系统中检查 `$DENO_DIR` 并且在运行时指定 `$DENO_DIR` 来完成的。

### 我应该如何确信一个可能改变的URL？

使用 `lock file`（命令行中使用 `--lock` 命令）可以确保执行我们预期的代码。更多内容请参考[链接](/linking-to-external-code/integrity-checking.md)。

### 如何引入指定的版本？

在URL中指定版本号即可。例如，这个URL指定了要被执行的代码源：`https://unpkg.com/liltest@0.0.5/dist/liltest.js` 。结合之前提到的在生产环境中配置 `$DENO_DIR` 来存储代码，可以确切地指定要被执行的代码，并且不需要网络连接。

### 导出导入URL似乎很麻烦

> 如果其中一个URL指向了一个版本略微不同的地址该怎么办？

> 在大型项目中到处维护URL不是很容易出错吗？

解决方法是在一个 `deps.ts` 文件中集中处理引入和重新导出的外部依赖库（和Node的 `package.json` 文件是一个目的）。

例如，我们正在一个大型项目中使用上述的断言库。与其在各个地方引入 `"https://deno.land/std/testing/asserts.ts"` 这个链接，不如新建一个可以导出第三方代码的 `deps.ts` 文件：

```ts
export {
  assert,
  assertEquals,
  assertStrContains,
} from "https://deno.land/std/testing/asserts.ts";
```

那么，贯穿整个项目的就是引入 `deps.ts` ，并且可以避免维护多个相同的URL：

```ts
import { assertEquals, runTests, test } from "./deps.ts";
```

这个设计规避了由于包管理软件、代码仓库中心化和多余的文件格式导致的不必要的复杂性。
