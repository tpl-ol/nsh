import { 区域 } from "../locale/t";

// b 模块的接口, 用于抽象不同的运行环境
// 注意所有操作都是异步的 (async)
export interface B {
  // 以特定的状态码退出
  退出(码: number): Promise<void>;

  // 获取命令行参数
  // 其中第一个参数是 js 文件名称, 可用于区分区域
  命令行参数(): Promise<Array<string>>;

  // 根据命令行第一个参数获取区域
  取区域(参: string): Promise<区域>;

  // 执行外部命令, 返回进程退出码
  运行(参: Array<string>): Promise<number>;

  // 读取一个文本文件 (utf-8 编码)
  读文件(名: string): Promise<string>;
  // 列出目录
  读目录(路径: string): Promise<Array<string>>;

  // 用于交互模式
  初始化交互控制器(参数: Array<string>): Promise<交互控制器>;

  // 路径操作
  取工作目录(): Promise<string>;
  设工作目录(路径: string): Promise<void>;
  取主目录(): Promise<string>;
  // 解析路径
  绝对路径(路径: string): Promise<string>;
  拼接路径(路径: Array<string>): Promise<string>;

  // 文件操作
  建目录(路径: Array<string>, 确: boolean): Promise<void>;
  删目录(路径: Array<string>): Promise<void>;
  复制(从路径: Array<string>, 至路径: string, 递归: boolean): Promise<void>;
  删除(路径: Array<string>, 递归: boolean): Promise<void>;
  递归删除空(
    路径: Array<string>,
    目录: boolean,
    文件: boolean,
    显示: boolean
  ): Promise<void>;
}

export interface 交互控制器 {
  读命令(): Promise<string | undefined>;
  关闭(): Promise<void>;
}
