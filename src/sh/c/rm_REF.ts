// 命令: 递归删除空文件
import { B } from "../../b/t";
import { 命令参数配置 } from "../a/t";
import 取区域 from "../../locale/mod";
import { 解析列表参数 } from "../a/mod";

const 参数配置1: 命令参数配置 = {
  可用选项: [["--显示"]],
};

async function 递归删除空文件(b: B, 参数1: Array<string>): Promise<number> {
  const 区 = 取区域();
  const 参数配置 = 区.翻译命令参数("递归删除空文件", 参数配置1);
  const 参数 = 解析列表参数(参数1, 参数配置);

  const 显示 = 参数.选项.includes("--显示");
  await b.递归删除空(参数.列表, false, true, 显示);

  return 0;
}

export default 递归删除空文件;
