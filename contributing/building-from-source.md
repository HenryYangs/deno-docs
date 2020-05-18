## 从源码构建

以下内容将讲述如何从源码构建Deno。如果只是想使用Deno，可以下载已构建的可执行版本（更多信息请参考`开始`章节）。

### 克隆仓库

在Linux或Mac上克隆：

```shell
git clone --recurse-submodules https://github.com/denoland/deno.git
```

Windows用户需要多几个步骤：

1. [开启开发者模式](https://www.google.com/search?q=windows+enable+developer+mode)
   (否则软链接时会要求管理员权限)。
2. 确保使用git版本使2.19.2或更新。
3. checkout之前配置 `core.symlinks=true` ：
   ```shell
   git config --global core.symlinks true
   git clone --recurse-submodules https://github.com/denoland/deno.git
   ```

### 预备知识

构建Deno最简单的方式是使用一个预编译的V8版本：

```
cargo build -vv
```

但是，如果想从源码构建Deno和V8：

```
V8_FROM_SOURCE=1 cargo build -vv
```

当从源码构建V8时，有几个依赖需要确认：

[Python 2](https://www.python.org/downloads). 确保在 `PATH` 中存在一个没有后缀的`python`/`python.exe`并且指向Python 2,
[而不是3](https://github.com/denoland/deno/issues/464#issuecomment-411795578).

对于Linux用户，glib-2.0开发文件也必须安装。（在Ubuntu上，执行`apt install libglib2.0-dev`）

Mac用户必须安装 [XCode](https://developer.apple.com/xcode/) 。

对Windows用户而言：

1. 下载带有"Desktop development with C++"工具的 [VS Community 2019](https://www.visualstudio.com/downloads/) 
   并且确保选择了以下这些工具：

   - Visual C++ tools for CMake
   - Windows 10 SDK (10.0.17763.0)
   - Testing tools core features - Build Tools
   - Visual C++ ATL for x86 and x64
   - Visual C++ MFC for x86 and x64
   - C++/CLI support
   - VC++ 2015.3 v14.00 (v140) toolset for desktop

2. 启用 "Debugging Tools for Windows". 打开 "Control Panel" → "Programs" →
   "Programs and Features" → 选择 "Windows Software Development Kit - Windows
   10" → "Change" → "Change" → 勾选 "Debugging Tools For Windows" → "Change" ->
   "Finish"。 或者使用:
   [Debugging Tools for Windows](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/)
   (注意: 打开链接会下载文件，你必须手动安装`X64 Debuggers And Tools-x64_en-us.msi`)。

阅读 [rusty_v8的README](https://github.com/denoland/rusty_v8) 以获取更多细节。

### 构建

使用Cargo构建：

```shell
# Build:
cargo build -vv

# Build errors?  Ensure you have latest master and try building again, or if that doesn't work try:
cargo clean && cargo build -vv

# Run:
./target/debug/deno run cli/tests/002_hello.ts
```