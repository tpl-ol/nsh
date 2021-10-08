// 命令: 去
import { B } from "../../b/t";
import 取区域 from "../../locale/mod";

async function 去(b: B, 参数: Array<string>): Promise<number> {
  const 区 = 取区域();

  switch (参数.length) {
    case 0:
      // 无参数则去主目录
      await b.设工作目录(await b.取主目录());
      break;
    case 1:
      // 有一个参数则取对应目录
      await b.设工作目录(参数[0]);
      break;
    default:
      // 多个参数是错误的
      console.error(区.错.未知命令行参数(参数));
      return 1;
  }
  return 0;
}

export default 去;
