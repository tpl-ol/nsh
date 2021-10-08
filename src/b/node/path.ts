import path from "path";
import os from "os";

export async function 取工作目录(): Promise<string> {
  return await 绝对路径(process.cwd());
}

export async function 设工作目录(路径: string): Promise<void> {
  process.chdir(路径);
}

export async function 取主目录(): Promise<string> {
  return os.homedir();
}

export async function 绝对路径(路径: string): Promise<string> {
  return path.resolve(路径);
}

export async function 拼接路径(路径: Array<string>): Promise<string> {
  return path.join(...路径);
}
