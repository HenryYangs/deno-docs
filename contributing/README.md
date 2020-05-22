# 贡献

- 请阅读 [风格指南](/contributing/style-guide.md)。

- 不要把 [性能测试](https://deno.land/benchmarks.html) 玩坏了。

- 在 [社区聊天室](https://discord.gg/TGMHGv6) 寻求帮助。

- 如果你准备处理一条issue，在开始动工之前记得先在issue中留言。

- 请在论坛中表现出你的专业度。不知道什么叫专业？请阅读[Rust的行为准则](https://www.rust-lang.org/policies/code-of-conduct)。还有问题？给 ry@tinyclouds.org 发邮件。

## 开发

如何从源码构建的教程请参考[文档](/contributing/building-from-source.md)。

## 提交一个pr

在提交之前，请确保做了以下几件事：

1. 有相关的issue并且已经在PR中引用了。
2. 测试覆盖了所有变更。
3. 确保通过 `cargo test` 。
4. 使用 `tools/format.py` 格式化代码。
5. 确保通过 `./tools/lint.py` 。

## 第三方代码的改动

[`deno的第三方代码`](https://github.com/denoland/deno_third_party) 包含了大多数Deno依赖的外部代码，因此我们可以在任何时候都非常清楚地知道所执行的代码。这些代码使用手动或私有脚本来维护。因此你可能需要 @ry 或者 @piscisaureus 的帮助来修改这些代码。

## 增加Ops（即绑定 - bindings）

我们非常关系在增加新的API时发生的错误。当向Deno中增加Op时，应该研究一下其它平台对应的接口。请列举出在Go、Node、Rust以及Python下是如何完成的。

可以参考一下 `Deno.rename()` 是如何被起草直到被采纳的过程
[PR #671](https://github.com/denoland/deno/pull/671).

## 文档API

给公共API写文档是非常重要的，而且我们想在代码中以行内的方式完成。这可以确保代码和文档会被紧密结合在一起。

### 使用JSDoc

所有通过 `deno` 模块以及global/ `window` 命名空间对外暴露的API和类型，都应该有JSDoc文档。
文档可以被TypeScript编译器解析，而且很容易向下兼容。
JSDoc的文档内容位于代码上方，并且以 `/**` 开始，以 `*/` 结尾。看个例子🌰：

```ts
/** A simple JSDoc comment */
export const FOO = "foo";
```

更多内容请查看 https://jsdoc.app/
