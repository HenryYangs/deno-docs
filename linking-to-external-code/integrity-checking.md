## 完整性检查和lock文件

Deno可以使用一个很小的JSON文件来存储并且检查模块子资源完整性。使用 `--lock=lock.json` 来允许并指定lock文件检查。如果要更新或者新建lock文件，可以使用 `--lock=lock.json --lock-write` 。
