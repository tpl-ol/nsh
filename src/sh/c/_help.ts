// 命令: --帮助
import { B } from "../../b/t";
import 取区域 from "../../locale/mod";

async function 帮助(b: B, 参数: Array<string>): Promise<number> {
  const 区 = 取区域();
  console.log(区.帮助());

  return 0;
}

export default 帮助;
