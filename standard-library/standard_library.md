
# 标准库

Deno 提供了一套经过核心团队成员审核以保证能在Deno 下正常工作的标准模块。

标准库参见： https://deno.land/std/

## 版本稳定性

这套标准库目前还不稳定，因此Deno 的各个版本中是不尽相同的。 最新的版本请参考 https://deno.land/std/ 或者
https://deno.land/std/version.ts

强烈推荐使用引入的时候带上标准库的版本号，避免意外变化。

## 问题解决

标准库中提供的一些模块使用了不稳定的API。

试试在命令控制台中不使用 `--unstable` 的情况下运行一些模块，会出现很多TypeScript 错误，
提示这些API不在 `Deno` 命名空间中：

```typescript
// main.ts
import { copy } from "https://deno.land/std@0.50.0/fs/copy.ts";

copy("log.txt", "log-old.txt");
```

```shell
$ deno run --allow-read --allow-write main.ts
Compile file:///dev/deno/main.ts
Download https://deno.land/std@0.50.0/fs/copy.ts
Download https://deno.land/std@0.50.0/fs/ensure_dir.ts
Download https://deno.land/std@0.50.0/fs/_util.ts
error: TS2339 [ERROR]: Property 'utime' does not exist on type 'typeof Deno'.
    await Deno.utime(dest, statInfo.atime, statInfo.mtime);
               ~~~~~
    at https://deno.land/std@0.50.0/fs/copy.ts:90:16

TS2339 [ERROR]: Property 'utimeSync' does not exist on type 'typeof Deno'.
    Deno.utimeSync(dest, statInfo.atime, statInfo.mtime);
         ~~~~~~~~~
    at https://deno.land/std@0.50.0/fs/copy.ts:101:10
```

解决方法就是执行的时候加上 `--unstable` 标识：

```shell
$ deno run --allow-read --allow-write --unstable main.ts
```

确保产生错误的API 是不稳定版，参见：[`lib.deno.unstable.d.ts`](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.unstable.d.ts)中的声明。

这个问题在不久的将来就能够被解决的。
