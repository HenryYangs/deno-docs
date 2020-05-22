## 脚本安装

Deno 提供了 `deno install` 命令来安装和部署可执行代码。

`deno install [OPTIONS...] [URL] [SCRIPT_ARGS...]` 会安装可用的 `URL` 脚本并命名为`EXE_NAME` 。

这个命令生成了一个薄的，可执行的 shell 脚本，它使用具体的CLI标识和主模块调用 `deno` 。它将程序安装在根目录的 bin 目录下。

例子：


```shell
$ deno install --allow-net --allow-read https://deno.land/std/http/file_server.ts
[1/1] Compiling https://deno.land/std/http/file_server.ts

✅ Successfully installed file_server.
/Users/deno/.deno/bin/file_server
```

你可以使用 `-n` 或 `--name` 来更改程序的名字：


```shell
  deno install --allow-net --allow-read -n serve https://deno.land/std/http/file_server.ts
```

程序名默认是按照以下方式推断的：

- 尝试获取URL路径中的文件名，上面的例子中就是 'file_server' 。
- 如果文件名是类似 'main', 'mod', 'index' 或者 'cli' 这样的通用名，并且没有父路径，那么就取父路径的名字。否则的话就取通用名。

要改变安装个根目录，可以使用 `--root` ：


```shell
$ deno install --allow-net --allow-read --root /usr/local https://deno.land/std/http/file_server.ts
```

安装根路径由以下优先级决定：

- `--root` 选项
- `DENO_INSTALL_ROOT` 环境变量
- `$HOME/.deno`

这些安装路径在使用时必须手动添加到path中。

```shell
$ echo 'export PATH="$HOME/.deno/bin:$PATH"' >> ~/.bashrc
```

运行脚本时需要在安装时设置权限。

```shell
$ deno install --allow-net --allow-read https://deno.land/std/http/file_server.ts 8080
```

以上命令新建了一个绑定到8080端口的有可读写权限的名为 `file_server` 的程序。

最佳实践是使用[`import.meta.main`](../examples/testing_if_main.md)作为可执行程序的入口。

例如：

```ts
// https://example.com/awesome/cli.ts
async function myAwesomeCli(): Promise<void> {
  -- snip --
}

if (import.meta.main) {
  myAwesomeCli();
}
```

在你的代码仓库中增加一个安装例子，确保让你用户知道你创建了一个可执行脚本：

```shell
# Install using deno install

$ deno install -n awesome_cli https://example.com/awesome/cli.ts
```
