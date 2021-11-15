/*
 * @Author: Ken
 * @Date: 2021-07-08 11:16:30
 * @LastEditTime: 2021-09-09 15:19:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\utils\generalTool.js
 */
/* 常用表单校验规则 */
export default {
  /* 分页size */
  pageSize: 10,
  /* 分页码数 */
  pageSizes: [10, 15, 20, 25, 30, 50],
  /* 弹窗点击阴影层是否能关闭 */
  dialogClick: false,
  /**
   * 常用校验规则
   * require：是否必填，length：文本字数限制，trigger：触发方式，label：错误提示的label
   */
  validate: {
    normal: (require, label, trigger, length) => {
      let res = [];
      const triggerName = trigger || "blur";
      if (length) {
        res.push({
          min: length[0],
          max: length[1],
          message: label + "的长度为" + length[0] + "到" + length[1] + "个字符",
          trigger: triggerName,
        });
      }
      if (require) {
        res.push({
          required: require,
          message: triggerName === "blur" ? "请输入" + label : "请选择" + label,
          trigger: triggerName,
        });
      }
      return res;
    },
    phone: (require, label) => {
      let res = [];
      var result = [
        { min: 11, max: 11, message: "请输入11位" + label, trigger: "blur" },
        {
          pattern:
            /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
          message: "请输入正确的" + label,
          trigger: "blur",
        },
      ];
      if (require) {
        result.push({
          required: true,
          message: "请输入" + label,
          trigger: "blur",
        });
      }
      return res;
    },
    email: (require) => {
      let res = [
        {
          pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
          message: "请输入正确的邮箱",
          trigger: "blur",
        },
      ];
      if (require) {
        res.push({ required: true, message: "请输入邮箱", trigger: "blur" });
      }
      return res;
    },
    IP: (require) => {
      let res = [
        {
          pattern:
            /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
          message: "请输入正确的IP",
          trigger: "blur",
        },
      ];
      if (require) {
        res.push({ required: true, message: "请输入IP", trigger: "blur" });
      }
      return res;
    },
    MAC: (require) => {
      let res = [
        {
          pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
          message: "请输入正确的MAC地址",
          trigger: "blur",
        },
      ];
      if (require) {
        res.push({
          required: true,
          message: "请输入MAC地址",
          trigger: "blur",
        });
      }
      return res;
    },
    URL: (require, label) => {
      let names = label || "URL";
      let res = [
        {
          pattern:
            /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
          message: "请输入正确的" + names,
          trigger: "blur",
        },
      ];
      if (require) {
        res.push({
          required: true,
          message: "请输入" + names,
          trigger: "blur",
        });
      }
      return res;
    },
    psw: (require, length) => {
      let res = [
        {
          min: length[0],
          max: length[1],
          message: `密码的长度为${length[0]}到${length[1]}个字符`,
          trigger: ["blur", "change"],
        },
        {
          pattern: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
          // pattern: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[/w/s[[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]+|[·！#￥（——）：；“”‘、，|《。》？、【】[\]]+])/,
          message: "请输入正确的密码（必须包含大小写英文和数字）",
          trigger: "blur",
        },
      ];
      if (require) {
        res.push({
          required: true,
          message: "请输入密码",
          trigger: ["blur", "change"],
        });
      }
      return res;
    },
  },
};
