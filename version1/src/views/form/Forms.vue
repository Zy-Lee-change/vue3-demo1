<!--
 * @Author: Ken
 * @Date: 2021-07-28 14:34:46
 * @LastEditTime: 2021-07-28 18:02:30
 * @Description: 
 * @FilePath: \vue3-demo1\src\views\form\Form.vue
 * Go Ring!
-->
<template>
  <div class="form-box">
    <basic-form ref="basicComp" v-model:basic="basicForm"></basic-form>
    <main-form ref="mainComp" v-model:main="mainForm"></main-form>
    <final-form ref="finalComp" v-model:final="finalForm"></final-form>
    <div class="submit-btn">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, reactive, getCurrentInstance } from "vue";
import BasicForm from "./formComp/BasicForm";
import MainForm from "./formComp/MainForm";
import FinalForm from "./formComp/FinalForm";
export default {
  name: "forms",
  components: {
    BasicForm,
    MainForm,
    FinalForm,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let basicComp = ref();
    let mainComp = ref();
    let finalComp = ref();
    let formData = reactive({
      basicForm: {},
      mainForm: {},
      finalForm: {},
    });

    const mapArr = (data) => {
      let res = true;
      data.map((item) => {
        if (!item) {
          res = false;
          return false;
        }
      });
      return res;
    };

    const submit = () => {
      let data = {
        ...formData.basicForm,
        ...formData.mainForm,
        ...formData.finalForm,
      };
      try {
        Promise.all([
          basicComp.value.regForm(),
          mainComp.value.regForm(),
          finalComp.value.regForm(),
        ]).then((res) => {
          if (mapArr(res)) {
            proxy.$message.success("校验通过" + JSON.stringify(data));
          }
        });
      } catch (error) {
        return;
      }
    };

    const resetForm = () => {
      basicComp.value.resetForm();
      mainComp.value.resetForm();
      finalComp.value.resetForm();
    };

    return {
      ...toRefs(formData),
      submit,
      resetForm,
      basicComp,
      mainComp,
      finalComp,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/style/function.scss";
.form-box {
  width: 70%;
  padding: px2(40) px2(60);
  background-color: #fff;
  .submit-btn {
    text-align: center;
  }
}
</style>
