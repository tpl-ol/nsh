import { spawn, ChildProcess } from "child_process";

// async
// 返回进程退出码
function 等待进程结束(进程: ChildProcess): Promise<number> {
  return new Promise((成功, 失败) => {
    进程.once("error", 失败);
    进程.once("close", 成功);
  });
}

// 运行外部命令, 返回退出码
export async function 运行(参: Array<string>): Promise<number> {
  const 进程 = spawn(参[0], 参.slice(1), {
    // 命令的标准输入输出复用本进程的
    stdio: "inherit",

    shell: true,
  });

  return await 等待进程结束(进程);
}
