/*
 * @Author: Ken
 * @Date: 2021-07-28 15:00:24
 * @LastEditTime: 2021-07-28 15:22:39
 * @Description:
 * @FilePath: \vue3-demo1\src\router\form.js
 * Go Ring!
 */
import { shallowRef } from "vue";
const Forms = () =>
  import(/* webpackChunkName: "addressBook" */ "./../views/form/Forms.vue");
export default [
  {
    path: "forms",
    name: "forms",
    component: shallowRef(Forms),
    meta: {
      auth: "pass",
      name: "多表单校验",
      code: "INDEX_FORMS",
    },
  },
];
