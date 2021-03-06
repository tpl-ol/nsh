import { 区域接口 } from "../t";
import { 命令参数配置 } from "../../sh/a/t";
import { 版本号 } from "../../config";
import 取错误信息 from "./err";

const 帮助信息 = `\
用法: 壳 --版本
      壳 --帮助
      壳 --壳 {文件}
      壳依 ...

更多文档请见 <https://github.com/tpl-ol/nsh>`;

const 欢迎信息 = `\
壳 (nsh) 版本 ${版本号}
  GPLv3 许可证, 文档请见 <https://github.com/tpl-ol/nsh>`;

// zh_CN 实现
function 取区域(): 区域接口 {
  return {
    版本信息(): string {
      return `壳 版本 ${版本号}`;
    },
    帮助(): string {
      return 帮助信息;
    },

    翻译命令(原始: string): string {
      // 无需翻译
      return 原始;
    },
    翻译命令参数(命令: string, 原始: 命令参数配置): 命令参数配置 {
      // 无需翻译
      return 原始;
    },

    错: 取错误信息(),

    欢迎(): string {
      return 欢迎信息;
    },
  };
}

export default 取区域;
