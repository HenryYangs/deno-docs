## 安装

Deno 支持 MacOS, Linux, Windows 操作系统。它是一个可执行的二进制文件。它没有外部依赖。

### 下载安装

[deno安装](https://github.com/denoland/deno_install) 提供了便捷下载安装二进制的脚本。

(macOS and Linux) 使用 Shell 安装:

```shell
curl -fsSL https://deno.land/x/install/install.sh | sh
```

(Windows) 使用 PowerShell 安装:

```shell
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

(Windows) 使用 [Scoop](https://scoop.sh/)安装:

```shell
scoop install deno
```

(Windows) 使用[Chocolatey](https://chocolatey.org/packages/deno) 安装:

```shell
choco install deno
```

(macOS) 使用[Homebrew](https://formulae.brew.sh/formula/deno) 安装:

```shell
brew install deno
```

(Windows, macOS, Linux) 使用[Cargo](https://crates.io/crates/deno) 安装:

```shell
cargo install deno
```

在 [github.com/denoland/deno/releases](https://github.com/denoland/deno/releases) 下载压缩包文件之后可以手动安装Deno 二进制文件。这些包只包含一个可执行文件。在macOS 和Linux 上要设置可执行位。


### 测试安装

运行 `deno --version` 测试安装。如果控制台打印出Deno 版本号，则安装成功。

使用 `deno help` 查看Deno 命令使用，`deno help <subcommand>` 查看具体子命令的帮助。

### 更新

更新安装的旧版本执行 `deno upgrade` 将会从[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases)获取最新的版本。 解压之后，替换当前执行文件即可。

### 源码编译

`贡献` 章节将会演示如何编译源码进行安装。
