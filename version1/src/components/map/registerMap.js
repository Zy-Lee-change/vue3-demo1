/*
 * @Author: your name
 * @Date: 2021-07-09 16:34:02
 * @LastEditTime: 2021-07-09 17:18:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\components\map\registerMap.js
 */
import * as echarts from "echarts";
import { ChinaMapGeoJson, ChinaMapOutline } from "./chinaMap";

/* 地图注册状态 */
let registerStatus = false;
/* 中国地图注册 */
const registerChinaMap = () => {
  if (registerStatus) return;
  echarts.registerMap("chinaMap", ChinaMapGeoJson);
  echarts.registerMap("chinaMapOutline", ChinaMapOutline);

  /* 注册成功 */
  registerStatus = true;
};
export { registerChinaMap };
