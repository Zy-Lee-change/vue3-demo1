/*
 * @Author: your name
 * @Date: 2021-07-09 14:17:43
 * @LastEditTime: 2021-07-26 16:24:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\utils\generalMethods.js
 */
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

export { getArrMaxMin };
