// 命令: 依赖
// 运行 npm scripts (npm run XXX)
import { B } from "../../b/t";
import 取区域 from "../../locale/mod";

async function 依赖(b: B, 参数: Array<string>): Promise<number> {
  const 区 = 取区域();

  for (const i of 参数) {
    const 命令 = ["npm", "run", i];
    try {
      const 码 = await b.运行(命令);
      if (码 != 0) {
        console.error(区.错.执行命令错误(命令, 码));
        // 如果执行错误, 不再继续执行下一条, 立即退出
        return 码;
      }
    } catch (e) {
      console.error(区.错.执行命令错误(命令));
      // 外层代码处理错误
      throw e;
    }
  }
  return 0;
}

export default 依赖;
