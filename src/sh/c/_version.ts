// 命令: --版本
import { B } from "../../b/t";
import 取区域 from "../../locale/mod";

async function 版本(b: B, 参数: Array<string>): Promise<number> {
  const 区 = 取区域();
  console.log(区.版本信息());

  return 0;
}

export default 版本;
