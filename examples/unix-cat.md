## 一个Unix Cat的实现

在这个程序中，每一个命令行变量都被当做一个文件名，打开文件，打印文件内容。

```ts
for (let i = 0; i < Deno.args.length; i++) {
  let filename = Deno.args[i];
  let file = await Deno.open(filename);
  await Deno.copy(file, Deno.stdout);
  file.close();
}
```

这里的 `copy()` 函数的操作只会从内核到用户空间再到内核副本拷贝。也就是说，从文件中读取数据，到写到输出流，内存使用是一样的。这描绘了Deno在I/O流上的基本设计目标。

试一试：

```shell
deno run --allow-read https://deno.land/std/examples/cat.ts /etc/passwd
```
