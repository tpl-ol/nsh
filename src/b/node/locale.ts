import path from "path";
import { 区域 } from "../../locale/t";

export default async function 取区域(参: string): Promise<区域> {
  let 文件名 = path.basename(参);
  // 如果有后缀, 去除
  if (文件名.includes(".")) {
    文件名 = 文件名.slice(0, 文件名.lastIndexOf("."));
  }

  // 1. (Windows) 根据 _ 判断, 比如以 `_zh_CN` 或 `_en` 结尾
  // 2. (Linux) 直接按文件名判断
  if (文件名.endsWith("_zh_CN") || 文件名 == "壳" || 文件名 == "壳依") {
    return 区域.zh_CN;
  } else if (文件名.endsWith("_en") || 文件名 == "nsh" || 文件名 == "ns") {
    return 区域.en;
  }
  // 此处曾有一个错误
  console.error(`警告: 获取区域失败: ${参}`);
  return 区域.未知;
}
