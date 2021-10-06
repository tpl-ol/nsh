// 测试工具集 (node.js)
import assert from "assert/strict";
import { StringDecoder } from "string_decoder";
import { spawn } from "child_process";

// mocha
export function 描述(名, 内容) {
  describe(名, 内容);
}

export function 项(名, 测试) {
  it(名, 测试);
}

// 断言工具集
export function 应该(值) {
  assert(值);
}

export function 应该相等(值1, 值2) {
  assert.equal(值1, 值2);
}

export function 应该不相等(值1, 值2) {
  assert.notEqual(值1, 值2);
}

// async
function 等待进程结束(进程) {
  return new Promise((成功, 失败) => {
    进程.once("error", 失败);
    进程.once("close", 成功);
  });
}

function 输出解码器() {
  const 解码器 = new StringDecoder("utf8");
  const 文本 = [];
  return {
    写(数据) {
      文本.push(解码器.write(数据));
    },
    结束() {
      文本.push(解码器.end());
      return 文本.join("");
    },
  };
}

// 运行一个程序 (child_process), 获取标准输出, 标准错误输出, 退出状态码
export async function 运行(参数) {
  const 标准输出 = 输出解码器();
  const 标准错误 = 输出解码器();

  // 保存进程输出的数据, 转为文本
  const 进程 = spawn(参数[0], 参数.slice(1), {
    // TODO BUG
    shell: true,
  });
  进程.stdout.on("data", (数据) => {
    标准输出.写(数据);
  });
  进程.stderr.on("data", (数据) => {
    标准错误.写(数据);
  });

  const 退出码 = await 等待进程结束(进程);
  return {
    退出码,
    输出: 标准输出.结束(),
    错误: 标准错误.结束(),
  };
}
