// 命令: 复制
import { B } from "../../b/t";
import { 命令参数配置 } from "../a/t";
import 取区域 from "../../locale/mod";
import { 解析列表参数 } from "../a/mod";

const 参数配置1: 命令参数配置 = {
  可用选项: [["--递归"]],
};

async function 复制(b: B, 参数1: Array<string>): Promise<number> {
  const 区 = 取区域();
  const 参数配置 = 区.翻译命令参数("复制", 参数配置1);
  const 参数 = 解析列表参数(参数1, 参数配置);
  const 递归 = 参数.选项.includes("--递归");

  if (参数.列表.length < 1) {
    // 无事可做
    return 0;
  }
  if (参数.列表.length == 1) {
    // 只有一个参数无法复制, 至少两个 (从, 至)
    console.error(区.错.未知命令行参数(参数1));
    return 1;
  }
  const 从路径 = 参数.列表.slice(0, 参数.列表.length - 1);
  const 至路径 = 参数.列表[参数.列表.length - 1];

  await b.复制(从路径, 至路径, 递归);
  return 0;
}

export default 复制;
