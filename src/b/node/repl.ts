import readline from "readline";

import { 交互控制器 } from "../t";

function 初始化交互控制器(): 交互控制器 {
  const 读行 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const 提示符 = "> ";

  // async
  function 读命令(): Promise<string | undefined> {
    return new Promise((成功, 失败) => {
      function 关闭时() {
        失败(new Error("读命令已关闭"));
      }

      读行.once("close", 关闭时);

      读行.question(提示符, (文本) => {
        读行.removeListener("close", 关闭时);

        成功(文本);
      });
    });
  }

  return {
    读命令,

    关闭() {
      读行.close();
    },
  };
}

export default 初始化交互控制器;
