<!--
 * @Author: Ken
 * @Date: 2021-07-28 14:40:12
 * @LastEditTime: 2021-07-28 17:18:33
 * @Description: 
 * @FilePath: \vue3-demo1\src\views\form\formComp\mainForm.vue
 * Go Ring!
-->
<template>
  <el-form :model="ruleForm" :rules="rule" ref="myForm" label-width="100px">
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            placeholder="选择时间"
            v-model="ruleForm.date2"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
  </el-form>
</template>
<script>
import { ref, reactive, getCurrentInstance, watch } from "vue";
export default {
  name: "MainForm",
  props: ["main"],
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    let myForm = ref();
    let ruleForm = reactive({
      date1: "",
      date2: "",
      delivery: true,
    });
    let rule = reactive({
      date1: proxy.$vars.validate.normal(true, "活动日期", "change"),
      date2: proxy.$vars.validate.normal(true, "活动时间", "change"),
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
        context.emit("update:main", ruleForm);
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
