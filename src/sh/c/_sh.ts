// 命令: --壳
import { B } from "../../b/t";
import 取区域 from "../../locale/mod";
import 取命令 from "./mod";

// TODO 改成完整的语法解析
async function 执行脚本(b: B, 文本: string): Promise<number> {
  const 区 = 取区域();

  // 逐行执行
  for (let i of 文本.split("\n")) {
    // 处理注释 #
    if (i.includes("#")) {
      // # 字符直到行尾都是注释
      i = i.slice(0, i.indexOf("#"));
    }
    // 忽略空行
    i = i.trim();
    if (i.length < 1) {
      continue;
    }

    // 简单按空格切分命令行参数
    const 参数 = i
      .split(" ")
      .map((x) => x.trim())
      .filter((x) => x.length > 0);

    const 名 = 区.翻译命令(参数[0]);
    const 命令 = 取命令(名);
    if (命令 != null) {
      try {
        const 码 = await 命令(b, 参数.slice(1));
        if (码 != 0) {
          // 遇到错误不再继续执行
          return 码;
        }
      } catch (e) {
        console.error(`错误! 执行命令: ${参数.join(" ")}`);
        // 外层代码处理未知错误
        throw e;
      }
    } else {
      console.error(区.错.未知命令(参数));
      // 遇到错误不再继续执行
      return 1;
    }
  }
  // 全部执行成功
  return 0;
}

async function 壳(b: B, 参数: Array<string>): Promise<number> {
  const 区 = 取区域();

  if (参数.length != 1) {
    const 命令 = await b.命令行参数();
    console.error(区.错.未知命令行参数(命令));
    return 1;
  }

  const 文件 = 参数[0];
  let 脚本: string;
  try {
    脚本 = await b.读文件(文件);
  } catch (e) {
    console.error(区.错.读文件(文件));
    // 外层代码处理错误
    throw e;
  }

  if (脚本 != null) {
    return await 执行脚本(b, 脚本);
  }
  return 0;
}

export default 壳;
