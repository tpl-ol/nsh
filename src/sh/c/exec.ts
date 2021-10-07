// 命令: 执行
// 执行外部命令
import { B } from "../../b/t";
import 取区域 from "../../locale/mod";

async function 执行(b: B, 参数: Array<string>): Promise<number> {
  if (参数.length < 1) {
    // 忽略空执行命令
    return 0;
  }

  const 区 = 取区域();
  try {
    const 码 = await b.运行(参数);
    if (码 != 0) {
      console.error(区.错.执行命令错误(参数, 码));
      return 码;
    }
  } catch (e) {
    console.error(区.错.执行命令错误(参数));
    // 外层代码处理错误
    throw e;
  }
  return 0;
}

export default 执行;
