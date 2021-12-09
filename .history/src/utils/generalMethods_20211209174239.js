/*
 * @Author: your name
 * @Date: 2021-07-09 14:17:43
 * @LastEditTime: 2021-09-17 14:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\utils\generalMethods.js
 */
import axios from "axios";
import "./../request/index";

/* 获取对象数组中指定key的最大或最小值 type：max或min  */
const getArrMaxMin = (type, data, keys) => {
  let res_ = null;
  if (type === "max") {
    res_ = Math.max.apply(
      Math,
      data.map((item) => {
        return item[keys];
      })
    );
  } else {
    res_ = Math.min.apply(
      Math,
      data.map((item) => {
        return item[keys];
      })
    );
  }

  return res_;
};

/**
 * axios请求接口
 * url：地址，params
 */
const get = () => {
  console.log("axios config", axios.defaults);
  axios.get();
};

export { getArrMaxMin, get };
