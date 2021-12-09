<template>
  <div class="login-bg wh pr">
    <div class="form-box pa">
      <el-form :model="ruleForm" :rules="rule" ref="myForm" label-width="60px">
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
          <el-input
            type="password"
            v-model="ruleForm.psw"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="resetForm">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  getCurrentInstance,
  computed,
  defineComponent,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  mounted() {
    setTimeout(() => {
      console.log(this.$fun.get());
    }, 1000);
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const router_ = useRouter();
    let myForm = ref();
    let ruleForm = reactive({
      name: "",
      psw: "",
    });

    let rule = reactive({
      name: proxy.$general.validate.normal(true, "账号", "blur"),
      psw: proxy.$general.validate.normal(true, "密码", "blur"),
    });
    const onSubmit = () => {
      myForm.value.validate((valid) => {
        if (valid) {
          store.commit("SET_TOKEN", JSON.stringify(ruleForm));
          console.log(router_, store.getters.GET_TOKEN);
          store.dispatch("Operation", () => {
            router_.replace({ name: "home" });
          });
        }
      });
    };

    const token = ref(computed(() => store.getters.GET_TOKEN));
    console.log(token.value);

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
});
</script>

<style lang="scss" scoped>
@import "../assets/style/function";
.login-bg {
  background-color: blue;
  .form-box {
    width: px2(320);
    height: px2(240);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: px2(40) px2(20) 0;
    background-color: #fff;
  }
}
</style>
