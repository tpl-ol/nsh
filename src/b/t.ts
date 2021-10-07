import { 区域 } from "../locale/t";

// b 模块的接口, 用于抽象不同的运行环境
export interface B {
  // 以特定的状态码退出
  退出(码: number): void;

  // 获取命令行参数
  // 其中第一个参数是 js 文件名称, 可用于区分区域
  命令行参数(): Array<string>;

  // 根据命令行第一个参数获取区域
  取区域(参: string): 区域;

  // 执行外部命令, 返回进程退出码
  运行(参: Array<string>): Promise<number>;

  // 读取一个文本文件 (utf-8 编码)
  读文件(名: string): Promise<string>;

  // 用于交互模式
  初始化交互控制器(参数: Array<string>): 交互控制器;
}

export interface 交互控制器 {
  读命令(): Promise<string | undefined>;
  关闭(): void;
}
