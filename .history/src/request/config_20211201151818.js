// 定义接口名称和服务器地址
let [serverUrl_, host_] = [
  process.env.NODE_ENV === "development" ? "" : "接口名称",
  process.env.NODE_ENV === "development" ? "" : "服务器地址",
];

/**
 * 域名-发布地址
 */
const HOST = host_;

/**
 * 上线服务器地址
 */
const SERVER_URL = HOST + serverUrl_;
