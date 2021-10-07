// 各个内置命令的实现
import type { 命令 } from "../t";
import 版本_ from "./_version";
import 帮助_ from "./_help";
import 壳_ from "./_sh";
import 依赖 from "./dep";
import 回显 from "./echo";
import 退出 from "./exit";
import 执行 from "./exec";

// 脚本及命令行均可执行的通用命令
const 命令表: Record<string, 命令> = {
  依赖,
  回显,
  退出,
  执行,
};

// 只有在命令行可以执行的特殊命令
const 命令表2: Record<string, 命令> = {
  "--版本": 版本_,
  "--帮助": 帮助_,
  "--壳": 壳_,
};

function 取命令(名: string): 命令 | undefined {
  const 结果 = 命令表[名];
  if (结果 != null) {
    return 结果;
  }
}

export function 取命令2(名: string): 命令 | undefined {
  const 结果 = 命令表2[名];
  if (结果 != null) {
    return 结果;
  }
  return 取命令(名);
}

export default 取命令;
