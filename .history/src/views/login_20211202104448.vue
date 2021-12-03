<template>
  <div class="login-bg pr">
    <div class="form-box">
      <el-form :model="ruleForm" :rules="rule" ref="myForm" label-width="100px">
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
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
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
export default {
  setup() {
    const proxy = getCurrentInstance();
    let myForm = ref();
    let ruleForm = reactive({
      name: "",
      region: "",
    });
    let rule = reactive({
      name: proxy.$general.validate.normal(true, "活动名称", "blur", [3, 8]),
      region: proxy.$general.validate.normal(true, "活动区域", "change"),
    });
  },
};
</script>

<style></style>
