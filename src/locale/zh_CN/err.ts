import { 错误信息 } from "../t";

function 取区域(): 错误信息 {
  return {
    未知命令行参数(参数: Array<string>): string {
      return `错误! 不能识别的命令行参数: ${参数.join(
        " "
      )}\n请尝试 "壳 --帮助" 获取帮助信息.`;
    },
    未知命令(参数: Array<string>): string {
      return `错误! 未知命令: ${参数.join(" ")}`;
    },
    执行命令错误(参数: Array<string>, 码?: number): string {
      return `错误! 执行命令 (${码}): ${参数.join(" ")}`;
    },
    无效退出码(参数: Array<string>): string {
      return `错误! 无效的退出码: ${参数.join(" ")}`;
    },
    读文件(名: string): string {
      return `错误! 读文件: ${名}`;
    },
  };
}

export default 取区域;
