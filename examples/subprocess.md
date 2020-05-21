## 运行子进程

[API文档](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.run)

栗子先行🌰：

```ts
// create subprocess
const p = Deno.run({
  cmd: ["echo", "hello"],
});

// await its completion
await p.status();
```

执行它：

```shell
$ deno run --allow-run ./subprocess_simple.ts
hello
```

`window.onload` 被指定为一个函数。这个函数在主程序加载后被执行。这和浏览器中的[onload](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)是一样的，而且它可以在主入口文件中使用。

默认情况下，当你使用 `Deno.run()` 时，它是 `stdin`、`stdout` 和 `stderr` 的父进程。如果想和正在运行的子进程通信，可以使用`"piped"`选项。

```ts
const fileNames = Deno.args;

const p = Deno.run({
  cmd: [
    "deno",
    "run",
    "--allow-read",
    "https://deno.land/std/examples/cat.ts",
    ...fileNames,
  ],
  stdout: "piped",
  stderr: "piped",
});

const { code } = await p.status();

if (code === 0) {
  const rawOutput = await p.output();
  await Deno.stdout.write(rawOutput);
} else {
  const rawError = await p.stderrOutput();
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);
```

当执行一下命令时：

```shell
$ deno run --allow-run ./subprocess.ts <somefile>
[file content]

$ deno run --allow-run ./subprocess.ts non_existent_file.md

Uncaught NotFound: No such file or directory (os error 2)
    at DenoError (deno/js/errors.ts:22:5)
    at maybeError (deno/js/errors.ts:41:12)
    at handleAsyncMsgFromRust (deno/js/dispatch.ts:27:17)
```