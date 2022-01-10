// 命令: 删除
import { B } from "../../b/t";
import { 命令参数配置 } from "../a/t";
import 取区域 from "../../locale/mod";
import { 解析列表参数 } from "../a/mod";

const 参数配置1: 命令参数配置 = {
  可用选项: [["--递归"]],
};

async function 删除(b: B, 参数1: Array<string>): Promise<number> {
  const 区 = 取区域();
  const 参数配置 = 区.翻译命令参数("删除", 参数配置1);
  const 参数 = 解析列表参数(参数1, 参数配置);
  const 递归 = 参数.选项.includes("--递归");

  await b.删除(参数.列表, 递归);
  return 0;
}

export default 删除;
