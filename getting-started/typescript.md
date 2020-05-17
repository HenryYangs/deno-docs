## 使用TypeScript

<!-- TODO(lucacasonato): '只引入 .ts'的文字描述 -->

### 使用外部类型定义

JavaScript 和 TypeScript在Deno 运行时都可以作为第一语言。这说明，它需要完全合格的模块名，包括扩展名（或提供正确媒体类型的服务器）。另外，Deno 不能解析‘魔术’模块。

然而开箱即用TypeScript 编译器要依赖没有扩展名的模块和Node.js模块解析逻辑将类型应用到JavaScript 模块。

为了弥合这一鸿沟，在不使用‘魔术’解析的情况，Deno 支持三种类指向类型定义文件的方式。

#### 编译提示


如果你正在引入一个知道类型定义文件位置的JavaScript 模块，你可以在import 的时候以编译提示的形式指定类型定义。
编译提示告知 Deno 引入的JavaScript 代码相关的`.d.ts`文件的位置。这个提示是`@deno-types`，指定的值是在编译器中使用的，而不是在JavaScript 模块中使用。例如，你有一个`foo.js`，并且你知道它的类型文件是`foo.d.ts`，那么你的代码就会是这样的：

```ts
// @deno-types="./foo.d.ts"
import * as foo from "./foo.js";
```

它的值和引入模块的解析逻辑是一样的，意味着文件需要扩展名，并且是相对当前模块的。当然它也支持远程路径。


这个提示会影响接下来的`import`语句（或`export ... from`语句），`@deno-types`的值会在编译的时候替换指定的模块。如上面的例子，Deno 编译器会加载 `./foo.d.ts` 而不是 `./foo.js`。但是 Deno 运行程序的时候仍然会加载`./foo.js`。

#### JS文件中的三斜杠reference指令

如果你正在组织Deno 要使用的模块，你想要通知Deno 他的类型文件的位置，你可以在实际代码位置使用三斜杠指令。
例如，你有一个叫 ‘foo.js’ 的JavaScript 模块，你想要在这个文件中给Deno提供它的类型文件位置，那它的内容看起来像这样：

```js
/// <reference types="./foo.d.ts" />
export const foo = "foo";
```

Deno 能够看到它，尽管运行时的时候会加载`foo.js`，编译器在检查类型的时候会使用`foo.d.ts`。
指令的值的解析逻辑和引入模块的解析逻辑一样，那么它是相对当前文件路径，必须有文件扩展名。当然它也支持远程路径。

#### X-TypeScript-Types 自定义 header


如果你正在组织Deno 要使用的模块，你想要通知Deno 他的类型文件的位置，你可以使用一个自定义的HTTP header `X-TypeScript-Types`来告诉Deno 那个文件的位置。


这个header 的工作原理和上面提到的三斜杠指令是一样的，它只是意味着JavaScript文件内容本身并不需要修改，类型定义文件的位置可以由服务器本身决定。

**并不是所有的类型定义都是支持的**

Deno 会使用编译器提示来加载指定的`.d.ts`，但是一些`.d.ts`包含不支持的特性。尤其，一些`.d.ts` 使用模块解析逻辑来加载其他包中的类型定义。例如，一个类型包含`node` 的类型引用指令用来解析类似`./node_modules/@types/node/index.d.ts`的路径。由于它依赖非相关的‘魔术’解析，Deno 不支持这种。

**为什么不在TypeScript文件中使用三斜杠类型reference?**

TypeScript编译器支持三斜杠指令，包括类型引用指令。如果Deno 用它，那么就会干扰TypeScript编译器的行为。Deno 只会去JavaScript 或JSX文件中找这个指令。

### 自定义 TypeScript 编译器选项

在Deno 的生态中，为了默认遵从TypeScript 理想的严格模式，所有的严格标识都可用。
然而，为了提供定制化，类似 `tsconfig.json` 这样的定制化配置文件必须在程序执行时提供给Deno。


你需要设置 `-c` 参数显示地告诉Deno执行你的应用时要使用哪个配置文件。

```shell
deno run -c tsconfig.json mod.ts
```

以下是当前Deno 支持的设置和它们的默认值：

```json
{
  "compilerOptions": {
    "allowJs": false,
    "allowUmdGlobalAccess": false,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "alwaysStrict": true,
    "assumeChangesOnlyAffectDirectDependencies": false,
    "checkJs": false,
    "disableSizeLimit": false,
    "generateCpuProfile": "profile.cpuprofile",
    "jsx": "react",
    "jsxFactory": "React.createElement",
    "lib": [],
    "noFallthroughCasesInSwitch": false,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitUseStrict": false,
    "noStrictGenericChecks": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveConstEnums": false,
    "removeComments": false,
    "resolveJsonModule": true,
    "strict": true,
    "strictBindCallApply": true,
    "strictFunctionTypes": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "suppressExcessPropertyErrors": false,
    "suppressImplicitAnyIndexErrors": false,
    "useDefineForClassFields": false
  }
}
```

支持的值以及应用案例文档请参见[typescript 文档](https://www.typescriptlang.org/docs/handbook/compiler-options.html)。

**说明**: 以上未列出的选项要么Deno 不支持，要么在TypeScript文档中的废弃/试验列表中。
