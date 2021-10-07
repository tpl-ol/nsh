import path from "path";
import { 区域 } from "../../locale/t";

export default function 取区域(参: string): 区域 {
  let 文件名 = path.basename(参);
  // 如果有后缀, 去除
  if (文件名.includes(".")) {
    文件名 = 文件名.slice(0, 文件名.lastIndexOf("."));
  }

  // 根据 _ 判断, 比如以 `_zh_CN` 或 `_en` 结尾
  if (文件名.endsWith("_zh_CN")) {
    return 区域.zh_CN;
  } else if (文件名.endsWith("_en")) {
    return 区域.en;
  }
  return 区域.未知;
}
