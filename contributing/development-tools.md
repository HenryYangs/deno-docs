## 测试和工具

### 测试

测试 `deno`:

```shell
# Run the whole suite:
cargo test

# Only test cli/js/:
cargo test js_unit_tests
```

测试 `std/`:

```shell
cargo test std_tests
```

### 代码检查和格式化

检查代码：

```shell
./tools/lint.py
```

格式化代码：

```shell
./tools/format.py
```

### 性能分析

开始性能分析,

```sh
# 确保我们构建的是发布版本
# 构建Deno和V8的d8
ninja -C target/release d8

# 使用--prod执行脚本分析程序
./target/release/deno run tests/http_bench.ts --allow-net --v8-flags=--prof &

third_party/wrk/linux/wrk http://localhost:4500/
kill `pgrep deno`
```

V8会在当前目录写入一个文件，文件名类似：
`isolate-0x7fad98242400-v8.log`. 检查这个文件

```sh
D8_PATH=target/release/ ./third_party/v8/tools/linux-tick-processor
isolate-0x7fad98242400-v8.log > prof.log
# 在macOS上，使用 ./third_party/v8/tools/mac-tick-processor
```

`prof.log` 文件包含了不同调用的分布信息。

如果想使用Web UI查看日志，可以生成一个日志的JSON文件：

```sh
D8_PATH=target/release/ ./third_party/v8/tools/linux-tick-processor
isolate-0x7fad98242400-v8.log --preprocess > prof.json
```

在浏览器中打开 `third_party/v8/tools/profview/index.html` ，然后选择 `prof.json` 文件以查看分布图。

性能分析中常用的V8选项：

- --prof
- --log-internal-timer-events
- --log-timer-events
- --track-gc
- --log-source-code
- --track-gc-object-stats

了解更多 `d8` 和性能分析，可以查看以下链接：

- [https://v8.dev/docs/d8](https://v8.dev/docs/d8)
- [https://v8.dev/docs/profile](https://v8.dev/docs/profile)

### 使用LLDB调试

我们可以使用LLDB来调试Deno。

```shell
$ lldb -- target/debug/deno run tests/worker.js
> run
> bt
> up
> up
> l
```

我们可以使用 `rust-lldb` 来调试Rust代码。
应该使用 `rustc` 命令，同时，它是LLDB的一个包装器。

```shell
$ rust-lldb -- ./target/debug/deno run --allow-net tests/http_bench.ts
# 在macOS上，你可能会看到这样的警告：
# `ImportError: cannot import name _remove_dead_weakref`
# 如果看到了这样的警告，可以配置PATH：
# PATH=/System/Library/Frameworks/Python.framework/Versions/2.7/bin:$PATH
(lldb) command script import "/Users/kevinqian/.rustup/toolchains/1.36.0-x86_64-apple-darwin/lib/rustlib/etc/lldb_rust_formatters.py"
(lldb) type summary add --no-value --python-function lldb_rust_formatters.print_val -x ".*" --category Rust
(lldb) type category enable Rust
(lldb) target create "../deno/target/debug/deno"
Current executable set to '../deno/target/debug/deno' (x86_64).
(lldb) settings set -- target.run-args  "tests/http_bench.ts" "--allow-net"
(lldb) b op_start
(lldb) r
```

### V8选项

V8有很多内置的命令行选项。

```shell
# 列出V8所有的选项
$ deno --v8-flags=--help

# 使用多个选项的例子
$ deno --v8-flags=--expose-gc,--use-strict
```

这个特别有用：

```
--async-stack-trace
```

### 持续的性能分析

访问 [链接] 查看我们的性能分析(https://deno.land/benchmarks)

性能分析图表假设
https://github.com/denoland/benchmark_data/data.json 有
`BenchmarkData[]`类型，`BenchmarkData` 是这样定义的：

```ts
interface ExecTimeData {
  mean: number;
  stddev: number;
  user: number;
  system: number;
  min: number;
  max: number;
}

interface BenchmarkData {
  created_at: string;
  sha1: string;
  benchmark: {
    [key: string]: ExecTimeData;
  };
  binarySizeData: {
    [key: string]: number;
  };
  threadCountData: {
    [key: string]: number;
  };
  syscallCountData: {
    [key: string]: number;
  };
}
```