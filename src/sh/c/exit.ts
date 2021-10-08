// 命令: 退出
import { B } from "../../b/t";
import 取区域 from "../../locale/mod";

async function 退出(b: B, 参数: Array<string>): Promise<number> {
  switch (参数.length) {
    case 0:
      await b.退出(0);
      break;
    case 1:
      {
        const 退出码 = Number.parseInt(参数[0]);
        if (退出码 >= 0 && 退出码 < 256) {
          await b.退出(退出码);
        }
      }
      break;
  }

  const 区 = 取区域();
  console.error(区.错.无效退出码(参数));
  return 1;
}

export default 退出;
