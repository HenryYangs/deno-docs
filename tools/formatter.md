## 代码格式化

Deno 内置了自动格式化TypeScript 和JavaScript 的代码格式化工具

```shell
# 格式化当前目录及其子目录下的所有 JS/TS 文件
deno fmt
# 格式化具体的文件
deno fmt myfile1.ts myfile2.ts
# 检查当前目录及其子目录下的所有JS/TS 文件是否都被格式化了
deno fmt --check
# 格式化标准输入然后写到标准输出中
cat file.ts | deno fmt -
```

`// deno-fmt-ignore` 注释之后的代码格式化都会被忽略：

<!-- prettier-ignore-start -->

```ts
// deno-fmt-ignore
export const identity = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
];
```

<!-- prettier-ignore-end -->

或者要忽略整个文件的格式化，那么就要在文件顶部加一句注释`// deno-fmt-ignore-file` 。
