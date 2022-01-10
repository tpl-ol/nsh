// 命令: 删目录
import { B } from "../../b/t";
import 取区域 from "../../locale/mod";

async function 删目录(b: B, 参数: Array<string>): Promise<number> {
  //const 区 = 取区域();

  await b.删目录(参数);
  return 0;
}

export default 删目录;
