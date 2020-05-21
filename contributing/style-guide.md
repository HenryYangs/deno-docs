# Deno风格指南

## 目录

## 版权标题

仓库中大部分模块都应该有以下的版权标题：

```ts
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
```

如果代码是的来源是别处，请确保文件有合适的版权标题。我们值接受MIT、BSD和Apache协议代码。

## 在文件名中使用下划线，不要使用中横线

举个栗子🌰: 使用 `file_server.ts` 而不是 `file-server.ts`.

## 给新的特性添加测试代码

每个模块的公共功能都应该包含或者带有测试代码

## TODO 注释

TODO 注释中通常应该包含一个issue或者作者的github用户名的括号。例如：

```ts
// TODO(ry): Add tests.
// TODO(#123): Support Windows.
// FIXME(#349): Sometimes panics.
```

## 不推荐元编程。包括使用Proxy。

代码含义明确，即便有可能会增加代码量。

可能在某些情况下，使用一些技巧更合理，但在绝大多数情况下并不是这样。

## Rust

遵守Rust的编程习惯，并且与已有代码保持一致。

## Typescript

代码库了TypeScript部分包括 `cli/js` 和标准库 `std`。

### 使用TypeScript而不是JavaScript.

### 使用术语“module”而不是“library”或“package”.

为了清晰和一致，避免使用术语“library”和“package”。使用“module”表示一个单一的JS或TS文件，也表示一个TS/JS目录的代码。

### 不要使用文件名`index.ts`/`index.js`.

Deno不会特殊处理“index.js”或者“index.ts”。使用这样的文件名，表示它们可以被排除在模块之外，其实它们并不能被排除。这很令人困扰。

如果一个目录下的代码需要一个默认的入口，使用 `mod.ts` 这样的文件名。
文件名 `mod.ts` 遵循Rust规范，它比 `index.ts` 短，并且不会给人预想它是如何工作的。

### 导出的函数：最多两个变量，剩下的放到options参数中。

当设计函数接口时，请务必遵循以下规则。

1. 公共API的函数接受0-2个变量，外加一个options对象（如果有必要的话，总共最多3个变量）。

2. 可选参数应该都放在options对象中。

   可选的参数如果不放在options对象中，当只有一个可选参数的时候还能接受。但如果以后想添加更多可选参数，那简直就是一场灾难。

<!-- prettier-ignore-start -->
<!-- see https://github.com/prettier/prettier/issues/3679 -->

3. “options”变量是唯一一个常规“对象”。

   其它参数可以是对象，但是它们在运行时必须通过拥有以下任意内容，从而可以和普通对象有所区分：

    - 一个可辨识的原型(e.g. `Array`, `Map`, `Date`, `class MyThing`)
    - 一个常见的symbol属性(e.g. 一个有 `Symbol.iterator` 的迭代器).

   这让API可以向后兼容，即便options的位置发生改变。

<!-- prettier-ignore-end -->

```ts
// BAD: 可选参数不是options变量的一部分。 (#2)
export function resolve(
  hostname: string,
  family?: "ipv4" | "ipv6",
  timeout?: number
): IPAddress[] {}

// GOOD.
export interface ResolveOptions {
  family?: "ipv4" | "ipv6";
  timeout?: number;
}
export function resolve(
  hostname: string,
  options: ResolveOptions = {}
): IPAddress[] {}
```

```ts
export interface Environment {
  [key: string]: string;
}

// BAD: `env` 可能是一个常规对象而且和options对象无法区分。(#3)
export function runShellWithEnv(cmdline: string, env: Environment): string {}

// GOOD.
export interface RunShellOptions {
  env: Environment;
}
export function runShellWithEnv(
  cmdline: string,
  options: RunShellOptions
): string {}
```

```ts
// BAD: 超过三个变量 (#1)，多个可选参数 (#2)。
export function renameSync(
  oldname: string,
  newname: string,
  replaceExisting?: boolean,
  followLinks?: boolean
) {}

// GOOD.
interface RenameOptions {
  replaceExisting?: boolean;
  followLinks?: boolean;
}
export function renameSync(
  oldname: string,
  newname: string,
  options: RenameOptions = {}
) {}
```

```ts
// BAD: 过多参数 (#1)
export function pwrite(
  fd: number,
  buffer: TypedArray,
  offset: number,
  length: number,
  position: number
) {}

// BETTER.
export interface PWrite {
  fd: number;
  buffer: TypedArray;
  offset: number;
  length: number;
  position: number;
}
export function pwrite(options: PWrite) {}
```

### 最小化依赖；不要搞出循环引入。

虽然 `cli/js` 和 `std` 没有外部依赖，但我们还是要非常小心地维护内部依赖，使它们简单并且可维护。更重要的是，千万不要引入循环依赖。

### 如果一个文件名以下划线开头，那么就不要引入了。

有时候，可能会出现一种情况，一个内部模块是必须的，但是它的API还没有稳定或者没有准备好被引用。这种情况下，给它们加一个下划线开头。按照约定，只有其所在的目录可以引用它。

### 给导出的内容用JSDoc写文档。

我们很努力地完善文档。每一个符号都应该有一行文档。

如果可能的话，使用单行注释写文档。例如：

```ts
/** foo does bar. */
export function foo() {
  // ...
}
```

文档易读是十分重要的，但是提供附加的样式信息来确保生成的文档支持更多的富文本也是一个重要的需求。因此JSDoc应该遵守markdown标记来是文本更丰富。

虽然markdown支持HTML标签，但是在JSDoc中是被禁止的。

代码内容应该放在反引号（\`）中间，而不是引号。例如：

```ts
/** Import something from the `deno` module. */
```

不要给函数参数写注释，除非它们真的含义不明（如果它们真的含义不明，那么API应该重新考虑了）。
因此 `@param` 普遍来说不应该使用。如果使用了 `@param` ，那么它就不应该包含 `type` 字段了，因为TypeScript已经有强制类型了。

```ts
/**
 * Function with non obvious param.
 * @param foo Description of non obvious parameter.
 */
```

垂直方向的空格应该尽可能少。因此单行注释应该这样写：

```ts
/** This is a good single line JSDoc. */
```

而不是

```ts
/**
 * This is a bad single line JSDoc.
 */
```

代码简例不应使用三个反引号来标记。
应该使用缩进，缩进前应该有一个换行，并且代码行有6个缩进。这比第一行注释多了4个缩进。举个栗子🌰：

```ts
/** A straight forward comment and an example:
 *
 *       import { foo } from "deno";
 *       foo("bar");
 */
```

代码简例不应该再包含注释。它已经在注释中了。如果还需要注释的话，那么这个可能就不是一个好示例了。

### 每个模块都应该有一个测试模块。

每个有公共函数的模块，例如 `foo.ts`，都应该有一个测试模块，例如 `foo_test.ts`。由于不同的上下文，`cli/js` 模块的测试应该在 `cli/js/tests` 中，否则它们的关系应该是兄弟目录。

### 单元测试应该十分明确。

为了更好地理解测试用例，函数应该有正确的命名，从而能在测试代码中得到提示。举例如下：

```
test myTestFunction ... ok
```

测试的例子：

```ts
import { assertEquals } from "https://deno.land/std@v0.11/testing/asserts.ts";
import { foo } from "./mod.ts";

Deno.test("myTestFunction" function() {
  assertEquals(foo(), { bar: "bar" });
});
```

### 顶层函数不要使用箭头函数。

顶层函数应该使用 `function` 关键字。箭头函数语法应该仅限闭包使用。

不好的示例：

```ts
export const foo = (): string => {
  return "bar";
};
```

正确的示例：

```ts
export function foo(): string {
  return "bar";
}
```

### `std`

#### 不要依赖外部代码。

`https://deno.land/std/` 希望能成为所有Deno程序可以依赖的基础库。我们希望向用户保证，这些代码没有包含隐藏的未被reviewed的第三方代码。
is intended to be baseline functionality that all Deno
programs can rely on. We want to guarantee to users that this code does not
include potentially unreviewed third party code.