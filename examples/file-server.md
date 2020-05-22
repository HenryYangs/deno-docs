## 文件服务

下面的代码会启动一个本地目录的HTTP服务器。

```shell
deno install --allow-net --allow-read https://deno.land/std/http/file_server.ts
```

跑一下：

```shell
$ file_server .
Downloading https://deno.land/std/http/file_server.ts...
[...]
HTTP server listening on http://0.0.0.0:4500/
```

无论任何时候你想升级到最新的版本：

```shell
$ file_server --reload
```
