/*
 * @Author: Ken
 * @Date: 2021-07-08 12:27:03
 * @LastEditTime: 2021-10-21 11:55:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\utils\utils.js
 */
import generalVariable from "./generalVariable";
import * as echarts from "echarts";
import * as generalMethods from "./generalMethods";
export default {
  install: (Vue) => {
    Vue.config.globalProperties.$vars = generalVariable;
    Vue.config.globalProperties.$echarts = echarts;
    Vue.config.globalProperties.$funs = generalMethods;
  },
};
