# 测试

Deno 内置了测试JavaScript 和TypeScript 代码的测试运行器。

## 写测试

你需要调用 `Deno.test` 的时候带上要测试点的名字和对应的测试函数：

```ts
Deno.test("hello world", () => {
  const x = 1 + 2;
  if (x !== 3) {
    throw Error("x should be equal to 3");
  }
});
```

https://deno.land/std/testing 有一些有用的断言库可以让测试更简单：

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("hello world", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});
```

### Async 函数

如果测试函数中返回promise可以测试异步代码，这样你可以在定义函数的时候使用 `async` 关键字：

```ts
Deno.test("async hello world", async () => {
  const x = 1 + 2;

  // await some async task
  await delay(100);

  if (x !== 3) {
    throw Error("x should be equal to 3");
  }
});
```

### Resource and async op sanitizers

Deno 的某些行为会在资源表中创建资源([或许更多内容](./contributing/architecture.md))，这些资源在使用完之后必须要关掉。

测试运行器会检查每个测试定义中创建的所有资源都被关闭。这样做是为了防止资源泄漏。
所有测试默认开启检查，但可通过设置布尔值 `sanitizeResources` 为false 来禁用。

对于类似文件系统交互的异步操作也是这样的。测试运行器检查测试开始到测试结束前都每个操作都是闭环的。
所有测试默认开启检查，但可通过设置布尔值 `sanitizeOps` 为false 来禁用。


```ts
Deno.test({
  name: "leaky test",
  fn() {
    Deno.open("hello.txt");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
```

### 忽略测试

有时候你可能需要在某些情况下忽略测试（比如你只想在Windows 下运行测试）。这样你可以在测试定义中设置布尔值 `ignore` ，为true时忽略。

```ts
Deno.test({
  name: "do macOS feature",
  ignore: Deno.build.os !== "darwin",
  fn() {
    doMacOSFeature();
  },
});
```

## 运行测试

运行测试调用 `deno test` 带上包含测试函数的文件：

```shell
deno test my_test.ts
```

你也可以省略文件名，当前目录及其子目录下的所有 `{*_,}test.{js,ts,jsx,tsx}` 文件中的测试都会被执行。
如果你传了一个目录，那么这个目录下的所有匹配 `{*_,}test.{js,ts,jsx,tsx}` 的文件都会被执行。
