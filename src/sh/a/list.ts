// 解析列表参数
// 比如: 删除 --递归 a b
import { 命令参数配置 } from "./t";

export interface 列表参数解析结果 {
  选项: Array<string>;
  列表: Array<string>;
}

export function 解析列表参数(
  参数: Array<string>,
  配置: 命令参数配置
): 列表参数解析结果 {
  // TODO 正确处理 -- 和 - 参数

  const 结果: 列表参数解析结果 = {
    选项: [],
    列表: [],
  };

  // 构建参数映射
  const 可能参数: Map<string, string> = new Map();
  for (const 一种参数 of 配置.可用选项) {
    for (const 一个 of 一种参数) {
      可能参数.set(一个, 一种参数[0]);
    }
  }

  // 遇到 -- 则后续参数都不作为选项
  const 参数结束符 = "--";

  // 处理每个参数
  let 结束 = false;
  for (const 一个 of 参数) {
    if (结束) {
      结果.列表.push(一个);
    } else {
      const 尝试 = 可能参数.get(一个);
      if (尝试 != null) {
        结果.选项.push(尝试);
      } else {
        结果.列表.push(一个);
      }
    }
  }

  return 结果;
}
