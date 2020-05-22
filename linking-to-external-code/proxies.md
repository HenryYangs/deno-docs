## 代理

Deno支持在下载模块和 `fetch` API使用代理。

代理的配置是从环境变量 `HTTP_PROXY` 和 `HTTPS_PROXY` 中读取的。

在Windows中，如果没有找到环境变量，则返回到从注册表读取代理。
