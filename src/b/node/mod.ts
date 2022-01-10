import { B } from "../t";
import 取区域 from "./locale";
import { 运行 } from "./run";
import 初始化交互控制器 from "./repl";
import { 读文件, 读目录, 建目录, 删目录, 复制, 删除, 递归删除空 } from "./file";
import { 取工作目录, 设工作目录, 取主目录, 绝对路径, 拼接路径 } from "./path";

async function 命令行参数(): Promise<Array<string>> {
  return process.argv.slice(1);
}

async function 退出(码: number): Promise<void> {
  process.exit(码);
}

// 导出此模块的接口
function 取接口(): B {
  return {
    退出,
    命令行参数,
    取区域,
    运行,

    读文件,
    读目录,

    初始化交互控制器,

    取工作目录,
    设工作目录,
    取主目录,
    绝对路径,
    拼接路径,

    建目录,
    删目录,
    复制,
    删除,
    递归删除空,
  };
}

export default 取接口;
