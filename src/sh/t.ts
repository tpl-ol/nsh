// 一条命令的抽象
import { B } from "../b/t";

// 返回值: 0 为成功, 否则失败
// async
export type 命令 = (b: B, 参数: Array<string>) => Promise<number>;
