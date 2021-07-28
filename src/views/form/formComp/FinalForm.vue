<!--
 * @Author: Ken
 * @Date: 2021-07-28 14:42:40
 * @LastEditTime: 2021-07-28 17:32:15
 * @Description: 
 * @FilePath: \vue3-demo1\src\views\form\formComp\FinalForm.vue
 * Go Ring!
-->
<template>
  <el-form :model="ruleForm" :rules="rule" ref="myForm" label-width="100px">
    <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        type="password"
        v-model="ruleForm.pass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        v-model="ruleForm.checkPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { ref, reactive, getCurrentInstance, watch } from "vue";
export default {
  name: "FinalForm",
  props: ["final"],
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    let myForm = ref();
    let ruleForm = reactive({
      type: [],
      resource: "",
      desc: "",
      pass: "",
      checkPass: "",
    });

    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    let rule = reactive({
      type: [
        {
          type: "array",
          required: true,
          message: "请至少选择一个活动性质",
          trigger: "change",
        },
      ],
      resource: proxy.$general.validate.normal(true, "特殊资源", "change"),
      desc: proxy.$general.validate.normal(true, "活动形式", "blur"),
      pass: proxy.$general.validate.normal(true, "密码", "blur"),
      checkPass: [{ required: true, validator: validatePass, trigger: "blur" }],
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
        context.emit("update:final", ruleForm);
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
