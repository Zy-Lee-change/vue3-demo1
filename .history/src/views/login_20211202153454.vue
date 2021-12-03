<template>
  <div class="login-bg pr">
    <div class="form-box">
      <el-form :model="ruleForm" :rules="rule" ref="myForm" label-width="100px">
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
          <el-input v-model="ruleForm.psw" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="resetForm">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const proxy = getCurrentInstance();
    const Router = useRouter();
    let myForm = ref();
    let ruleForm = reactive({
      name: "",
      psw: "",
    });
    let rule = reactive({
      name: proxy.$general.validate.normal(true, "请输入账号", "blur"),
      psw: proxy.$general.validate.normal(true, "请输入密码", "blur"),
    });
    console.log(proxy.$general);
    const onSubmit = () => {
      myForm.value.validate((valid) => {
        if (valid) {
          Router.replace({ name: "home" });
        }
      });
    };

    const resetForm = () => {
      myForm.value.resetFields();
    };

    return {
      myForm,
      ruleForm,
      rule,
      onSubmit,
      resetForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-bg {
  background-color: blue;
}
</style>
