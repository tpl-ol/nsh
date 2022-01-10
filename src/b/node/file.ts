import path from "path";
import fs from "fs/promises";

export async function 读文件(名: string): Promise<string> {
  let 文件;
  try {
    文件 = await fs.open(名, "r");
    return await 文件.readFile({
      encoding: "utf-8",
    });
  } finally {
    await 文件?.close();
  }
}

export async function 读目录(路径: string): Promise<Array<string>> {
  return await fs.readdir(路径);
}

export async function 建目录(
  路径: Array<string>,
  确: boolean = false
): Promise<void> {
  for (const 一个 of 路径) {
    await fs.mkdir(一个, {
      recursive: 确,
    });
  }
}

export async function 删目录(路径: Array<string>): Promise<void> {
  for (const 一个 of 路径) {
    await fs.rmdir(一个);
  }
}

export async function 复制(
  从路径: Array<string>,
  至路径: string,
  递归: boolean = false
): Promise<void> {
  // 如果目标是目录
  let 目 = false;
  try {
    const 状态 = await fs.stat(至路径);
    目 = 状态.isDirectory();
  } catch (e) {
    // 忽略错误 (路径不存在)
  }

  for (const 一个 of 从路径) {
    const 目标路径 = 目 ? path.join(至路径, path.basename(一个)) : 至路径;
    await fs.cp(一个, 目标路径, {
      recursive: 递归,
    });
  }
}

export async function 删除(
  路径: Array<string>,
  递归: boolean = false
): Promise<void> {
  for (const 一个 of 路径) {
    await fs.rm(一个, {
      recursive: 递归,
    });
  }
}

// 递归遍历目录, 后序遍历 (先遍历所有下级)
async function 找(
  路径: string,
  回调: (路径: string) => Promise<void>
): Promise<void> {
  // 非函数递归

  interface 栈项 {
    路径: string;
    // 剩余的下级目录
    下级: Array<string>;
  }

  async function 处理目录(路径: string): Promise<栈项> {
    const 列表 = await fs.readdir(路径, { withFileTypes: true });
    const 项: 栈项 = {
      路径,
      下级: [],
    };
    for (const 一个 of 列表) {
      const 下级路径 = path.join(路径, 一个.name);
      if (一个.isDirectory()) {
        项.下级.push(下级路径);
      } else {
        await 回调(下级路径);
      }
    }
    return 项;
  }

  const 栈: Array<栈项> = [];
  // 根目录
  栈.push(await 处理目录(路径));

  while (栈.length > 0) {
    const 栈顶 = 栈.pop();
    if (栈顶 != null) {
      if (栈顶.下级.length > 0) {
        栈.push(栈顶);

        // 处理一个目录
        const 首个 = 栈顶.下级.shift();
        if (首个 != null) {
          栈.push(await 处理目录(首个));
        }
      } else {
        // 下级处理完毕, 处理自己
        await 回调(栈顶.路径);
      }
    }
  }
}

export async function 递归删除空(
  路径: Array<string>,
  目录: boolean = false,
  文件: boolean = false,
  显示: boolean = false
): Promise<void> {
  async function 检查文件(路径: string): Promise<void> {
    const 状态 = await fs.stat(路径);

    function 打印() {
      if (显示) {
        console.log(路径);
      }
    }

    if (状态.isDirectory()) {
      if (目录) {
        const 下级 = await fs.readdir(路径);
        // 空目录
        if (下级.length < 1) {
          打印();

          // 删除
          await fs.rmdir(路径);
        }
      }
    } else if (文件 && 状态.size < 1) {
      打印();

      await fs.rm(路径);
    }

    if (!目录 && !文件) {
      打印();
    }
  }

  for (const 一个 of 路径) {
    const 状态 = await fs.stat(一个);
    if (状态.isDirectory()) {
      await 找(一个, 检查文件);
    } else {
      await 检查文件(一个);
    }
  }
}
