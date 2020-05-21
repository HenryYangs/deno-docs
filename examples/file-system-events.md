### 文件系统事件


轮询文件系统事件:

```ts
const watcher = Deno.watchFs("/");
for await (const event of watcher) {
  console.log(">>>> event", event);
  // { kind: "create", paths: [ "/foo.txt" ] }
}
```

请注意，事件执行顺序可能会因为操作系统的不同而不同。
这个特性依赖平台使用不同的系统调用：

- Linux: inotify
- macOS: FSEvents
- Windows: ReadDirectoryChangesW