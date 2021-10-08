// 命令: --交互
import { B } from "../../b/t";
import 取区域 from "../../locale/mod";
import 取命令 from "./mod";

async function 交互(b: B, 参数: Array<string>): Promise<number> {
  const 控制器 = await b.初始化交互控制器(参数);

  const 区 = 取区域();
  console.log(区.欢迎());

  while (true) {
    let 行 = await 控制器.读命令();
    if (行 == null) {
      // 退出
      break;
    }

    // 处理注释 #
    if (行.includes("#")) {
      // # 字符直到行尾都是注释
      行 = 行.slice(0, 行.indexOf("#"));
    }
    // 忽略空行
    行 = 行.trim();
    if (行.length < 1) {
      continue;
    }
    // 简单按空格切分命令行参数
    // TODO 改成完整的语法解析
    const 参数 = 行
      .split(" ")
      .map((x) => x.trim())
      .filter((x) => x.length > 0);

    const 名 = 区.翻译命令(参数[0]);
    const 命令 = 取命令(名);
    if (命令 != null) {
      try {
        const 码 = await 命令(b, 参数.slice(1));
        // TODO 返回码错误处理
        // if (码 != 0) {
        // }
      } catch (e) {
        console.error(`错误! 执行命令: ${参数.join(" ")}`);
        // 交互式模式, 出错尽量不要退出
        console.error(e);
      }
    } else {
      console.error(区.错.未知命令(参数));
    }
  }
  return 0;
}

export default 交互;
