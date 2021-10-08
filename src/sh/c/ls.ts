// 命令: 列出
import { B } from "../../b/t";

// 列出一个目录
async function 列出目录(b: B, 路径: string): Promise<void> {
  const 列表 = await b.读目录(路径);
  if (列表.length > 0) {
    console.log(列表.join("\n"));
  }
}

async function 列出(b: B, 参数: Array<string>): Promise<number> {
  if (参数.length < 1) {
    // 列出当前目录
    await 列出目录(b, ".");
  } else {
    // 列出多个目录
    for (const 项 of 参数) {
      await 列出目录(b, 项);
    }
  }

  return 0;
}

export default 列出;
