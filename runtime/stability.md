## 稳定性

作为Deno的1.0.0版本，`Deno` 命名空间下的API都是稳定的。也就是说之后的版本也会在1.0.0的基础上继续开发。

但是，并不是所有的Deno的特性都已经可以放心地在生产环境中使用了。有一些特性还没有准备好的原因是它们还处在提案阶段，因此它们需要使用 `--unstable` 来解锁。使用这个标记会做一下几件事情：

- 在运行时允许使用不稳定的API。
- 向TypeScript类型定义中添加
  [`lib.deno.unstable.d.ts`](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.unstable.d.ts)
  文件以便于做类型检查。这包含 `deno类型` 的输出。

使用者必须意识到不稳定的API可能**不会经历安全性检查**，将来可能会成为**破坏性变更的API**，同时也**没有准备好在生产环境中使用**。

此外，Deno的标准模块也还没有稳定 (https://deno.land/std/) 。

我们在脚手架中通过标准模块的版本来区分。