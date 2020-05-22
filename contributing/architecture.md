## 内部细节

### Deno and Linux 对比

|                       **Linux** | **Deno**                         |
| ------------------------------: | :------------------------------- |
|                进程（Processes） | Web Workers                      |
|              系统调用（Syscalls) | Ops                              |
|                   文件描述符 (fd) | [资源id (rid)](#resources)       |
|              调度器（Scheduler） | Tokio                            |
| 用户控件: libc++ / glib / boost | https://deno.land/std/           |
|                 /proc/\$\$/stat | [Deno.metrics()](#metrics)       |
|                       man pages | deno types                       |

#### 资源（resources）

资源（又称 `rid` ）是Deno版的文件描述符。他们是指向打开的文件、sockets和其它内容的整型数字。它可以查询系统中有多少打开的资源，这在测试是很有用。

```ts
const { resources, close } = Deno;
console.log(resources());
// { 0: "stdin", 1: "stdout", 2: "stderr" }
close(0);
console.log(resources());
// { 1: "stdout", 2: "stderr" }
```

#### 指标（Metrics）

指标是Deno内部各种统计的计数器。

```shell
> console.table(Deno.metrics())
┌──────────────────┬────────┐
│     (index)      │ Values │
├──────────────────┼────────┤
│  opsDispatched   │   9    │
│   opsCompleted   │   9    │
│ bytesSentControl │  504   │
│  bytesSentData   │   0    │
│  bytesReceived   │  856   │
└──────────────────┴────────┘
```

### 架构示意图

![架构示意图](https://deno.land/images/schematic_v0.2.png)
