// 各个内置命令的实现
import type { 命令 } from "../t";
import 版本_ from "./_version";
import 帮助_ from "./_help";
import 壳_ from "./_sh";
import 交互_ from "./_repl";
import 依赖 from "./dep";
import 回显 from "./echo";
import 退出 from "./exit";
import 执行 from "./exec";
import 路径 from "./pwd";
import 去 from "./cd";
import 列出 from "./ls";
import 建目录 from "./mkdir";
import 删目录 from "./rmdir";
import 复制 from "./cp";
import 删除 from "./rm";
import 递归删除空文件 from "./rm_REF";
import 递归删除空目录 from "./rm_RED";

// 脚本及命令行均可执行的通用命令
const 命令表: Record<string, 命令> = {
  依赖,
  回显,
  退出,
  执行,
  路径,
  去,
  列出,
  建目录,
  删目录,
  复制,
  删除,
  递归删除空文件,
  递归删除空目录,
};

// 只有在命令行可以执行的特殊命令
const 命令表2: Record<string, 命令> = {
  "--版本": 版本_,
  "--帮助": 帮助_,
  "--壳": 壳_,
  "--交互": 交互_,
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
