# 运行时

所有运行时的函数(Web API和`Deno`的全局变量)的文档请参考
[`doc.deno.land`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts)。

## Web APIs

对于那些已经在web标准中存在的API，例如`fetch`，Deno就不再重复造轮子了。

这些Web API的文档请参考
[doc.deno.land](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/js/lib.deno.shared_globals.d.ts)。

Web API的TypeScript类型定义请参考
[`lib.deno.shared_globals.d.ts`](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.shared_globals.d.ts)
以及
[`lib.deno.window.d.ts`](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.window.d.ts)。

workers的定义请参考
[`lib.deno.worker.d.ts`](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.worker.d.ts)。

## `Deno` 全局变量

所有不是web标准的API都在全局的`Deno`命名空间中。

这些API有：读取文件内容，建立TCP连接，执行子进程等。

`Deno`命名空间的TypeScript类型定义请参考[`lib.deno.ns.d.ts`](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.ns.d.ts)。

所有`Deno`的API文档请参考[doc.deno.land](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/js/lib.deno.ns.d.ts)。