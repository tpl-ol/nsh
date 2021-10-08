import { B } from "./b/t";
import { 未知错误退出码 } from "./config";
import { 是node } from "./b/check";
import node取接口 from "./b/node/mod";
import { 设区域 } from "./locale/mod";
import 主 from "./sh/mod";

async function 主入口(b: B, 壳依: boolean = false): Promise<void> {
  const 参数 = await b.命令行参数();
  设区域(await b.取区域(参数[0]));

  if (壳依) {
    // `壳依 XXX` 命令相当于 `壳 依赖`
    await 主(b, ["依赖"].concat(参数.slice(1)));
  } else {
    await 主(b, 参数.slice(1));
  }
}

function node入口(壳依: boolean = false) {
  const b = node取接口();
  // 执行异步函数并处理错误
  主入口(b, 壳依)
    .then(() => {
      // 执行成功, 没有错误
      b.退出(0);
    })
    .catch((错) => {
      console.error(错);
      b.退出(未知错误退出码);
    });
}

// 运行环境检测
function 入口(壳依: boolean = false) {
  if (是node()) {
    node入口(壳依);
  } else {
    throw new Error("没实现");
  }
}

// nsh
export function 入口壳() {
  入口();
}

// ns
export function 入口壳依() {
  入口(true);
}
