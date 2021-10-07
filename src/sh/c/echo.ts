// 命令: 回显
import { B } from "../../b/t";

async function 回显(b: B, 参数: Array<string>): Promise<number> {
  console.log(参数.join(" "));

  return 0;
}

export default 回显;
