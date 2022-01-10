export interface 命令参数配置 {
  // 比如: [
  //   ["-确", "-p"],
  //   ["--递归", "-r"],
  // ]
  可用选项: Array<Array<string>>;
}
