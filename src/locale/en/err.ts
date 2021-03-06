import { 错误信息 } from "../t";

function 取区域(): 错误信息 {
  return {
    未知命令行参数(参数: Array<string>): string {
      return `ERROR! unknown command line arguments: ${参数.join(
        " "
      )}\nPlease try "nsh --help" to get help.`;
    },
    未知命令(参数: Array<string>): string {
      return `ERROR! unknown command: ${参数.join(" ")}`;
    },
    执行命令错误(参数: Array<string>, 码?: number): string {
      return `ERROR! execute command (${码}): ${参数.join(" ")}`;
    },
    无效退出码(参数: Array<string>): string {
      return `ERROR! invalid exit code: ${参数.join(" ")}`;
    },
    读文件(名: string): string {
      return `ERROR! read file: ${名}`;
    },
  };
}

export default 取区域;
