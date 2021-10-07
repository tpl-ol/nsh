import { 描述, 项, 运行, 成功运行, 应该, 应该相等 } from "./util.mjs";

// 用于测试版本命令
const 版本号 = "0.1.0-a1";

描述("测试工具自测", () => {
  项("运行 node --version", async () => {
    const 结果 = await 运行(["node", "--version"]);
    应该相等(结果.退出码, 0);
    应该相等(结果.输出.trim(), process.version);
    应该相等(结果.错误, "");
  });
  项("运行 npm --version", async () => {
    const 结果 = await 运行(["npm", "--version"]);
    应该相等(结果.退出码, 0);
  });
});

描述("命令入口 (bin)", () => {
  项("nsh --version", async () => {
    const 输出 = await 成功运行(["nsh", "--version"]);
    应该相等(输出.trim(), `nsh version ${版本号}`);
  });
  项("壳 --版本", async () => {
    const 输出 = await 成功运行(["壳", "--版本"]);
    应该相等(输出.trim(), `壳 版本 ${版本号}`);
  });
  项("ns test:version", async () => {
    const 输出 = await 成功运行(["ns", "test:version"]);
    应该(输出.includes("test:version"));
    应该(输出.includes("壳 --版本"));
    应该(输出.includes(`壳 版本 ${版本号}`));
  });
  项("壳依 test:version", async () => {
    const 输出 = await 成功运行(["壳依", "test:version"]);
    应该(输出.includes("test:version"));
    应该(输出.includes("壳 --版本"));
    应该(输出.includes(`壳 版本 ${版本号}`));
  });
});

// TODO
