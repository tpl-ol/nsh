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
