/*
 * @Author: Ken
 * @Date: 2021-07-28 15:00:24
 * @LastEditTime: 2021-07-28 15:22:39
 * @Description:
 * @FilePath: \vue3-demo1\src\router\form.js
 * Go Ring!
 */
const Form = () =>
  import(/* webpackChunkName: "addressBook" */ "./../views/form/Form.vue");
export default [
  {
    path: "form",
    name: "form",
    component: Form,
    meta: {
      auth: "pass",
      name: "多表单校验",
      code: "INDEX_FORM",
    },
  },
];
