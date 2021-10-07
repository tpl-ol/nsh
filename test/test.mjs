import { 描述, 项, 运行, 成功运行, 应该, 应该相等 } from "./util.mjs";

// 用于测试版本命令
const 版本号 = "0.1.0-a2";

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

描述("基本命令", () => {
  描述("帮助_", () => {
    项("壳 --帮助", async () => {
      const 输出 = await 成功运行(["壳", "--帮助"]);
      应该(输出.includes("用法:"));
      应该(输出.includes("壳 --帮助"));
    });
    项("nsh --help", async () => {
      const 输出 = await 成功运行(["nsh", "--help"]);
      应该(输出.includes("Usage:"));
      应该(输出.includes("nsh --help"));
    });
  });

  描述("回显", () => {
    项("回显 测试 666", async () => {
      const 输出 = await 成功运行(["壳", "回显", "测试", "666"]);
      应该相等(输出.trim(), "测试 666");
    });
    项("空回显: 回显", async () => {
      const 输出 = await 成功运行(["壳", "回显"]);
      应该相等(输出.trim(), "");
    });
    项("echo test", async () => {
      const 输出 = await 成功运行(["nsh", "echo", "test"]);
      应该相等(输出.trim(), "test");
    });
  });

  描述("退出", () => {
    项("默认退出码为 0: 退出", async () => {
      const 结果 = await 运行(["壳", "退出"]);
      应该相等(结果.退出码, 0);
    });
    项("指定退出码: 退出 6", async () => {
      const 结果 = await 运行(["壳", "退出", "6"]);
      应该相等(结果.退出码, 6);
    });
    项("exit", async () => {
      await 成功运行(["nsh", "exit"]);
    });
  });

  描述("执行", () => {
    项("壳 执行 壳 --版本", async () => {
      const 输出 = await 成功运行(["壳", "执行", "壳", "--版本"]);
      应该相等(输出.trim(), `壳 版本 ${版本号}`);
    });
    项("nsh exec node --version", async () => {
      const 输出 = await 成功运行(["nsh", "exec", "node", "--version"]);
      应该相等(输出.trim(), process.version);
    });
  });
});

描述("壳依", () => {
  项("连续执行多个脚本", async () => {
    const 输出 = await 成功运行(["壳依", "test:version", "test:壳依"]);
    应该(输出.includes("test:version"));
    应该(输出.includes("壳 --版本"));
    应该(输出.includes("test:壳依"));
    应该(输出.includes("壳依 test:version"));
  });
  项("执行 0 个脚本", async () => {
    await 成功运行(["壳依"]);
  });
  项("遇到错误则停止不继续执行", async () => {
    const 结果 = await 运行(["壳依", "666", "test:壳依"]);
    应该(结果.退出码 != 0);
    应该(结果.错误.includes("npm ERR!"));
    应该(结果.错误.includes("错误! 执行命令"));
    应该(!结果.输出.includes("test:壳依"));
  });

  项("壳 依赖 test:version", async () => {
    const 输出 = await 成功运行(["壳", "依赖", "test:version"]);
    应该(输出.includes("test:version"));
    应该(输出.includes("壳 --版本"));
    应该(输出.includes(`壳 版本 ${版本号}`));
  });
  项("nsh dep test:version", async () => {
    const 输出 = await 成功运行(["nsh", "dep", "test:version"]);
    应该(输出.includes("test:version"));
    应该(输出.includes("壳 --版本"));
    应该(输出.includes(`壳 版本 ${版本号}`));
  });
});
