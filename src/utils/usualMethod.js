/**
 * 常用方法
 */

// Object.prototype.toString.call(var) 能判断具体的类型
const type = (para) => {
  return Object.prototype.toString.call(para);
};

// 数组去重
const unique1 = (arr) => {
  return [...new Set(arr)];
};

const unique2 = (arr) => {
  var obj = {};
  return arr.filter((ele) => {
    if (!obj[ele]) {
      obj[ele] = true;
      return true;
    }
  });
};

const unique3 = (arr) => {
  var result = [];
  arr.forEach((ele) => {
    if (result.indexOf(ele) == -1) {
      result.push(ele);
    }
  });
  return result;
};

//去除连续的字符串
const uniqStr = (str) => {
  return str.replace(/(\w)\1+/g, "$1");
};

//深克隆（深克隆不考虑函数）
const deepClone = (obj, result_) => {
  let result = result_ || {};
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      if (typeof obj[prop] == "object" && obj[prop] !== null) {
        // 引用值(obj/array)且不为null
        if (Object.prototype.toString.call(obj[prop]) == "[object Object]") {
          // 对象
          result[prop] = {};
        } else {
          // 数组
          result[prop] = [];
        }
        deepClone(obj[prop], result[prop]);
      } else {
        // 原始值或func
        result[prop] = obj[prop];
      }
    }
  }
  return result;
};

// 找出字符串中第一次只出现一次的字母
const firstAppear = (str) => {
  let [obj, len] = [{}, str.length];
  for (let i = 0; i < len; i++) {
    if (obj[str[i]]) {
      obj[str[i]]++;
    } else {
      obj[str[i]] = 1;
    }
  }
  for (let prop in obj) {
    if (obj[prop] == 1) {
      return prop;
    }
  }
};

// 找到父节点，包括N级
const parentNodes = (ele, n) => {
  while (ele && n) {
    ele = ele.parentElement ? ele.parentElement : ele.parentNode;
    n--;
  }
  return ele;
};

// 下载 简单下载 仅需要url就可以下载的简单方式
const downloadSimple = (url, name) => {
  name = name || "download";
  if (url) {
    let a = document.createElement("a"); // 创建一个a节点插入的document
    let event = new MouseEvent("click"); // 模拟鼠标click点击事件
    a.download = name; // 设置a节点的download属性值
    a.href = url; // 将图片的src赋值给a节点的href
    a.target = "_blank";
    a.dispatchEvent(event); // 触发鼠标点击事件
  }
};

// 下载 下载图片
const downloadImage = (url, name) => {
  name = name || "download";
  let src = url;
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    let context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, img.width, img.height);
    canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
    canvas.toBlob((blob) => {
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = name;
      link.click();
    }, "image/jpeg");
  };
  img.setAttribute("crossOrigin", "Anonymous");
  img.src = src;
};

export {
  type,
  unique1,
  unique2,
  unique3,
  uniqStr,
  deepClone,
  firstAppear,
  parentNodes,
  downloadSimple,
  downloadImage,
};
