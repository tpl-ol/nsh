// 命令: 路径
import { B } from "../../b/t";

async function 路径(b: B, 参数: Array<string>): Promise<number> {
  const 工作目录 = await b.取工作目录();
  console.log(工作目录);

  return 0;
}

export default 路径;
