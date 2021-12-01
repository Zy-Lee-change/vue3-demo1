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

/**
 * 获取地址 - 开发模式下启用代理（需要跨域的情况下）
 */
const BASE_SERVER = process.env.NODE_ENV === "development" ? "" : SERVER_URL;

/**
 * 开发模式下的代理配置
 */
export const ENV_BASE = process.env.BASE_API || "";
