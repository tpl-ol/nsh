import { B } from "./b/t";
import { 未知错误退出码 } from "./config";
import { 是node } from "./b/check";
import node取接口 from "./b/node/mod";
import { 设区域 } from "./locale/mod";
import 主 from "./sh/mod";

function 主入口(b: B, 参数: Array<string>) {
  // 异步处理 (执行 async) 及错误处理
  主(b, 参数)
    .then(() => {
      // 执行成功, 没有错误
      b.退出(0);
    })
    .catch((错) => {
      console.error(错);
      b.退出(未知错误退出码);
    });
}

// nsh
export function 入口壳() {
  if (是node()) {
    const b = node取接口();
    const 参数 = b.命令行参数();
    设区域(b.取区域(参数[0]));

    主入口(b, 参数.slice(1));
  } else {
    throw new Error("没实现");
  }
}

// ns
export function 入口壳依() {
  if (是node()) {
    const b = node取接口();
    const 参数 = b.命令行参数();
    设区域(b.取区域(参数[0]));

    // `壳依 XXX` 命令相当于 `壳 依赖`
    主入口(b, ["依赖"].concat(参数.slice(1)));
  } else {
    throw new Error("没实现");
  }
}
