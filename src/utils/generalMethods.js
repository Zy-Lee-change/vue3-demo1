/*
 * @Author: your name
 * @Date: 2021-07-09 14:17:43
 * @LastEditTime: 2021-07-09 14:31:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\utils\generalMethods.js
 */
/* 计算数组总和 */
const arrSum = (data) => {
  let sum_ = data.reduce((prev, cur) => {
    return prev + cur;
  });
  return sum_;
};

export { arrSum };
