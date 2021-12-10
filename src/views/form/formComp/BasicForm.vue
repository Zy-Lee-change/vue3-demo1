<!--
 * @Author: Ken
 * @Date: 2021-07-28 14:39:57
 * @LastEditTime: 2021-07-28 17:19:19
 * @Description: 
 * @FilePath: \vue3-demo1\src\views\form\formComp\basicForm.vue
 * Go Ring!
-->
<template>
  <el-form :model="ruleForm" :rules="rule" ref="myForm" label-width="100px">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select
        v-model="ruleForm.region"
        placeholder="请选择活动区域"
        clearable
      >
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
import { ref, reactive, getCurrentInstance, watch } from "vue";
export default {
  name: "BasicForm",
  props: ["basic"],
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    let myForm = ref();
    let ruleForm = reactive({
      name: "",
      region: "",
    });
    let rule = reactive({
      name: proxy.$vars.validate.normal(true, "活动名称", "blur", [3, 8]),
      region: proxy.$vars.validate.normal(true, "活动区域", "change"),
    });

    const regForm = () => {
      let res_;
      myForm.value.validate((valid) => {
        res_ = valid;
      });
      return res_;
    };

    const resetForm = () => {
      myForm.value.resetFields();
    };

    watch(
      () => ruleForm,
      (state, prevState) => {
        console.log("deep ", state.type, prevState);
        context.emit("update:basic", ruleForm);
      },
      { deep: true }
    );

    return {
      resetForm,
      myForm,
      regForm,
      ruleForm,
      rule,
    };
  },
};
</script>
