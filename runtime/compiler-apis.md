## 编译API

> 这是一个不稳定的Deno特性。了解更多，请阅读
> [unstable features](/runtime/stability.md).

Deno支持运行时访问内置的TypeScript编译器。在`Deno`命名空间中提供了三种访问模式。

### `Deno.compile()`

和`deno cache`类似，可以读取和缓存代码，编译但不执行代码。最多接受三个变量：`rootName`，可选的`sources`，以及可选的`options`。

`rootName`是用来生成最终程序的根模块。就像给命令行代码`deno run --reload example.ts`传入的模块名一样。

`sources`是一个哈希表，键是模块名，值是模块的文本源。如果传入了`sources`，Deno尝试解析`sources`中所有的模块且不会尝试从Deno外部解析这些模块名。如果没有传入`Source`，Deno会尝试从命令行传入的根模块解析调用的模块名。Deno也会缓存所有资源。所有被解析的资源都被当做动态加载，并且根据是本地或远程资源来要求read或net权限。

`option`参数是类型为`Deno.CompilerOptions`的可选项集合，同时也是Deno支持的TypeScript编译器选项的子集。

这个方法返回一个元组类型。第一个参数包含代码中的错误信息。第二个参数是一个对象，内容是输出的文件名和文件内容。

举个栗子🌰:

```ts
const [diagnostics, emitMap] = await Deno.compile("/foo.ts", {
  "/foo.ts": `import * as bar from "./bar.ts";\nconsole.log(bar);\n`,
  "/bar.ts": `export const bar = "bar";\n`,
});

assert(diagnostics == null); // ensuring no diagnostics are returned
console.log(emitMap);
```

我们期望返回的map中包含四个“文件”，分别是 `/foo.js.map`, `/foo.js`,
`/bar.js.map`, 和 `/bar.js`。

当没有提供第二个参数时，可以像在命令行中一样使用本地或远程的模块。因此，可以这样做：

```ts
const [diagnostics, emitMap] = await Deno.compile(
  "https://deno.land/std/examples/welcome.ts"
);
```

在上面的代码中，`emitMap`仅包含一个简单的`console.log()`语句。

### `Deno.bundle()`

这个函数和命令行中的`deno bundle`很相似。它和`Deno.compile()`也很像，但它不是返回map文件，而是返回一个字符串，这个字符串是独立的JavaScript ES模块，它包含了所有引用并解析的代码，并且导出根模块中导出的内容。这个函数最多接受三个参数：`rootName`，可选的`sources`，以及可选的`options`。

`rootName`是用来生成最终程序的根模块。就像给命令行代码`deno bundle example.ts`传入的模块名一样。

`sources`是一个哈希表，键是模块名，值是模块的文本源。如果传入了`sources`，Deno尝试解析`sources`中所有的模块且不会尝试从Deno外部解析这些模块名。如果没有传入`Source`，Deno会尝试从命令行传入的根模块解析调用的模块名。所有被解析的资源都被当做动态加载，并且根据是本地或远程资源来要求read或net权限。Deno也会缓存所有的资源。

`option`参数是类型为`Deno.CompilerOptions`的可选项集合，同时也是Deno支持的TypeScript编译器选项的子集。

举个栗子🌰：

```ts
const [diagnostics, emit] = await Deno.bundle("/foo.ts", {
  "/foo.ts": `import * as bar from "./bar.ts";\nconsole.log(bar);\n`,
  "/bar.ts": `export const bar = "bar";\n`,
});

assert(diagnostics == null); // ensuring no diagnostics are returned
console.log(emit);
```

我们期望`emit`是一个ES模块的文本，它包含两个模块的输出。

当没有提供第二个参数时，可以像在命令行中一样使用本地或远程的模块。因此，可以这样做：

```ts
const [diagnostics, emit] = await Deno.bundle(
  "https://deno.land/std/http/server.ts"
);
```

这样的情况下，`emit`将会是一个独立的JavaScript ES模块，它包含所有被解析的依赖并且导出和源模块相同的导出。

### `Deno.transpileOnly()`

这个函数是基于TypeScript函数`transpileModule()`。它做的工作是“抹去”模块中的类型并且返回JavaScript。没有类型检查也没有依赖关系的解析。
这个函数接受最多两个参数，第一个参数是哈希表，键是模块名，值是对应的内容。
传入的模块名的唯一作用是，在source map中能将内容对应到源文件名。
第二个参数是可选的`options`，类型是`Deno.CompilerOptions`。
这个函数的返回值是一个map，键是提供的源模块名，值是一个有`source`和可选的`map`属性的对象。`source`是模块输出的内容。`map`属性是source map。Source map是默认提供的，但是可以在`options`中关闭。

🌰例子来了：

```ts
const result = await Deno.transpileOnly({
  "/foo.ts": `enum Foo { Foo, Bar, Baz };\n`,
});

console.log(result["/foo.ts"].source);
console.log(result["/foo.ts"].map);
```

我们期望的是`enum`会被重写成一个构造枚举的IIFE，同时map也会被定义。

### 引用TypeScript的库文件

当使用`deno run`，或者其它使用TypeScript类型检查的Deno命令时，代码会被Deno支持的环境中自定义库解析。默认情况下，进行TypeScript类型检查的编译器运行时API也会使用这些库（`Deno.compile()`和`Deno.bundle()`）。

但如果你想为其它运行时编译或者打包TypeScript，你可能会想覆盖默认的库。为了支持这一需求，运行时API在编译选项中提供了`lib`选项。例如，如果有一段在浏览器中运行的TypeScript代码，那就会需要使用TypeScript的`"dom"`库：

```ts
const [errors, emitted] = await Deno.compile(
  "main.ts",
  {
    "main.ts": `document.getElementById("foo");\n`,
  },
  {
    lib: ["dom", "esnext"],
  }
);
```

TypeScript支持的所有库，请参考
[`lib` compiler option](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
文档。

**不要忘了引入JavaScript库**

就像`tsc`一样，当提供了`lib`编译选项时，就会覆盖默认值，那也就是说基础的JavaScript库不会被引入，因此需要引入一个最适合你的代码的目标运行时（例如：`es5`, `es2015`, `es2016`, `es2017`, `es2018`, `es2019`, `es2020` 或 `esnext`）。

#### 引入`Deno`命名空间

除了TypeScript提供的库，还有四个Deno内置的库可以使用：

- `deno.ns` - 提供`Deno`命名空间。
- `deno.shared_globals` - 提供Deno在运行时支持的全局接口和变量，会在最终运行时库中暴露。
- `deno.window` - 暴露全局变量以及Deno命名空间，它们在Deno的主线程中可用，并且是运行时编译API的默认值。
- `deno.worker` - 暴露给Deno下所有线程可用的全局变量。

因此，为了给编译器添加Deno命名空间，必须在`lib`数组中加入`deno.ns`库。再来个栗子🌰：

```ts
const [errors, emitted] = await Deno.compile(
  "main.ts",
  {
    "main.ts": `document.getElementById("foo");\n`,
  },
  {
    lib: ["dom", "esnext", "deno.ns"],
  }
);
```

**注意：** Deno命名空间期望一个最低ES2018的运行时环境。这意味着如果你使用的库比ES2018要“低”，那么会在编译过程中记录这个错误。

#### 使用三斜杠引用

没有必要在编译选项中指明`lib`字段。Deno也支持可以被嵌入文件内容的[三斜杠引用库](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-lib-)。例如有一个`main.ts`：

```ts
/// <reference lib="dom" />

document.getElementById("foo");
```

它会被编译成如下代码，且不会报错：

```ts
const [errors, emitted] = await Deno.compile("./main.ts", undefined, {
  lib: ["esnext"],
});
```

**注意：** `dom`库会和Deno中某些默认的全局函数或变量冲突。为了避免这样的问题，需要在运行时编译API的编译选项中指定`lib`选项。