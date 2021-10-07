import { B } from "../t";
import 取区域 from "./locale";
import { 运行 } from "./run";

function 命令行参数(): Array<string> {
  return process.argv.slice(1);
}

function 退出(码: number): void {
  process.exit(码);
}

// 导出此模块的接口
function 取接口(): B {
  return {
    退出,
    命令行参数,
    取区域,
    运行,
  };
}

export default 取接口;
