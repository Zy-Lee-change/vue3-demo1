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
 * url：地址，params：请求参数
 */
const get = (url, params) => {
  console.log("axios config", axios.defaults);
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const post = (url, params) => {
  console.log("axios config", axios.defaults);
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// 时间格式化
const dateFormat = (fmt, time) => {
  let date = new Date(time);
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
};

export { getArrMaxMin, get, post, dateFormat };
