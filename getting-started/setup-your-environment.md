## 设置环境

为了高效使用Deno，你要设置你的环境：shell 自动补充，环境变量，你选择的编辑器和IDE。

### 环境变量

这是一些控制 Deno 行为的环境变量：

`DENO_DIR` 默认为 `$HOME/.deno` ，但是你可以设置为任何其他的路径，用来控制生成和缓存的源码从什么位置读写。 

`NO_COLOR` 设置后，会关掉标准输出的颜色。参见 https://no-color.org/ 。用户可以在不使用`--allow-env`的情况下使用布尔常量`Deno.noColor`测试环境变量是否设置了`NO_COLOR` 。

### Shell 自动补充

你可以使用命令行 `deno completions <shell>` 来生成完整的shell脚本。这个命令输出到标准输出，你应该将其重定向到适当的文件中。 

支持的shell 包括：

- zsh
- bash
- fish
- powershell
- elvish

例如：

```shell
deno completions bash > /usr/local/etc/bash_completion.d/deno.bash
source /usr/local/etc/bash_completion.d/deno.bash
```

### 编辑器 和 IDE

因为Deno 需要使用文件扩展名作为模块引入，并支持http 引入，大多数编辑器和语言服务器当前原生并不支持，发现文件或引入时有不必要的文件扩展名时会报错。 

社区开发了几个编辑器的插件来解决这些问题：

- [@axetroy](https://github.com/axetroy) 开发的 [VS Code](https://marketplace.visualstudio.com/items?itemName=axetroy.vscode-deno)

尚未支持JetBrains IDE，但是你可以持续关注这些问题以待更新：

- https://youtrack.jetbrains.com/issue/WEB-41607
- https://youtrack.jetbrains.com/issue/WEB-42983
- https://youtrack.jetbrains.com/issue/WEB-31667

如果这份清单中没有你最爱的IDE，或许你可以开发一个插件。我们的[社区不和谐群体](https://discord.gg/TGMHGv6) 可以给你一些启发。
