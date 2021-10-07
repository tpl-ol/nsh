import { B } from "../b/t";
import 取区域 from "../locale/mod";
import { 取命令2 as 取命令 } from "./c/mod";

// 壳的执行入口
async function 主(b: B, 参数: Array<string>) {
  const 区 = 取区域();
  // TODO 改进命令行解析

  // 第一个参数为命令名称
  const 名 = 区.翻译命令(参数[0]);
  const 命令 = 取命令(名);
  if (命令 != null) {
    try {
      const 码 = await 命令(b, 参数.slice(1));
      if (码 != 0) {
        b.退出(码);
      }
    } catch (e) {
      console.error(`错误! 执行命令: ${参数.join(" ")}`);
      // 外层代码处理未知错误
      throw e;
    }
  } else {
    console.error(区.错.未知命令行参数(参数));
    b.退出(1);
  }
}

export default 主;
