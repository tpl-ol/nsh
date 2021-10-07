import { 区域, 区域接口 } from "./t";
import en from "./en/mod";
import zh_CN from "./zh_CN/mod";

// 保存内部设置的区域
const 内部 = {
  // 默认区域
  区: zh_CN(),
};

export function 设区域(区: 区域) {
  switch (区) {
    case 区域.zh_CN:
      内部.区 = zh_CN();
      break;
    case 区域.en:
      内部.区 = en();
      break;
    default:
      throw new Error(`无效的区域 ${区}`);
  }
}

// 使用设置的区域
function 取区域(): 区域接口 {
  return 内部.区;
}

export default 取区域;
