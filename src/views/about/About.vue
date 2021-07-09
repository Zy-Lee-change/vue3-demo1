<template>
  <div class="about">
    <el-form
      :model="pswForm"
      :rules="rules"
      ref="pswReg1"
      label-width="80px"
      class="demo-ruleForm"
      style="width: 300px"
      @submit.prevent
    >
      <el-form-item label="旧密码" prop="oldPsw">
        <el-input v-model="pswForm.oldPsw"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPsw">
        <el-input v-model="pswForm.newPsw"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePsw">
        <el-input v-model="pswForm.rePsw"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitPsw1('pswReg1')">确 定</el-button>
    </el-form>
  </div>
</template>
<script>
import { reactive, onMounted, watch, getCurrentInstance } from "vue";
export default {
  methods: {
    submitPsw1(form) {
      this.$refs[form].validate((valid) => {
        console.log(valid);
        if (valid) {
          alert(111);
        } else {
          alert(222);
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  /**
   * 公共的方法可以放在这里还有一些公共的变量
   */
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    const checkRePsw = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入"));
      }
      if (value !== pswForm.newPsw) {
        callback(new Error("新密码需要一致！"));
      }
    };
    console.log(props, context);
    //这里的ref如果去掉的话，每次添加就不能再记住之前的值，就不能再成为一个响应式的变量，可以去掉ref试试变化
    // let ret = ref(1);
    let pswForm = reactive({});
    let rules = reactive({
      oldPsw: proxy.$general.validate.normal(true, "旧密码"),
      newPsw: proxy.$general.validate.normal(true, "新密码"),
      rePsw: [{ validator: checkRePsw, trigger: "blur" }],
    });
    let submitPsw = (form) => {
      proxy.$refs[form].validate((valid) => {
        console.log(valid);
        if (valid) {
          alert(111);
        } else {
          alert(222);
          console.log("error submit!!");
          return false;
        }
      });
    };

    //这里面可以放钩子
    onMounted(() => {
      console.log("欢迎使用计算器");
    });

    //这里可以放监听
    watch(pswForm, (value, oldvalue) => {
      console.log(
        `ret被修改了，之前是${oldvalue.oldPsw},现在是${value.oldPsw}`
      );
    });

    return {
      pswForm,
      rules,
      submitPsw,
    };
  },
};
</script>
<style lang="scss" scoped></style>
