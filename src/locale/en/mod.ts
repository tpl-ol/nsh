import { 区域接口 } from "../t";
import { 版本号 } from "../../config";
import 取错误信息 from "./err";

const 命令翻译表: Record<string, string> = {
  "--version": "--版本",
  "--help": "--帮助",
  "--sh": "--壳",
  "--repl": "--交互",
  dep: "依赖",
  echo: "回显",
  exit: "退出",
  exec: "执行",
};

const 帮助信息 = `\
Usage: nsh --version
       nsh --help
       nsh --sh {FILE}
       ns ...

More document please see <https://github.com/tpl-ol/nsh>`;

const 欢迎信息 = `\
nsh (壳) version ${版本号}
  GPLv3 LICENSE, document please see <https://github.com/tpl-ol/nsh>`;

// en 实现
function 取区域(): 区域接口 {
  return {
    版本信息(): string {
      return `nsh version ${版本号}`;
    },
    帮助(): string {
      return 帮助信息;
    },

    翻译命令(原始: string): string {
      if (原始 in 命令翻译表) {
        return 命令翻译表[原始];
      }
      return 原始;
    },

    错: 取错误信息(),

    欢迎(): string {
      return 欢迎信息;
    },
  };
}

export default 取区域;
