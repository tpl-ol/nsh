// 支持的区域 (语言列表)
export enum 区域 {
  // 未知
  未知 = 0,

  // 简体中文 (中国)
  zh_CN = 1,

  // 英文
  en = 2,
}

// 区域模块的接口, 用于抽象不同的区域
export interface 区域接口 {
  // 基本输出信息
  版本信息(): string;
  帮助(): string;

  翻译命令(原始: string): string;

  错: 错误信息;

  // 交互模式的欢迎信息
  欢迎(): string;
}

// 各种错误信息的集合
export interface 错误信息 {
  未知命令行参数(参数: Array<string>): string;
  未知命令(参数: Array<string>): string;
  执行命令错误(参数: Array<string>, 码?: number): string;
  无效退出码(参数: Array<string>): string;
  读文件(名: string): string;
}
