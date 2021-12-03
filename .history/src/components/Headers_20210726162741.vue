<template>
  <div class="header pa w">
    <div class="page-name fl">{{ title }}</div>
    <div class="user fr t-center pr">
      <div class="user-icon h fl el-icon-s-custom"></div>
      <div class="user-icon h fl el-icon-arrow-down"></div>
      <ul class="pa user-slide">
        <li class="cursor" @click="personalMsgView = !personalMsgView">
          个人信息
        </li>
        <li class="cursor" @click="passwordView = !passwordView">更改密码</li>
        <li class="cursor">退出登录</li>
      </ul>
    </div>

    <el-dialog title="个人信息" v-model="personalMsgView">
      <el-descriptions title="" :column="2" border>
        <el-descriptions-item label="用户名">{{
          personalMsg.name
        }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{
          personalMsg.phone
        }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{
          personalMsg.email
        }}</el-descriptions-item>
        <el-descriptions-item label="生日">
          {{ personalMsg.birth }}
        </el-descriptions-item>
        <el-descriptions-item label="兴趣爱好">
          {{ personalMsg.favor }}
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">{{
          personalMsg.addr
        }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <el-dialog
      title="更改密码"
      v-model="passwordView"
      width="400px"
      @closed="passwordClose"
    >
      <el-form
        :model="pswForm"
        :rules="rules"
        ref="pswReg"
        label-width="80px"
        class="demo-ruleForm"
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
      </el-form>

      <!-- 
        插槽写法更新 template加v-slot 或者template加#slot名
       -->
      <template v-slot:footer>
        <el-button @click="passwordView = false">取 消</el-button>
        <el-button type="primary" @click="submitPsw">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  watch,
  toRefs,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useRoute } from "vue-router";
export default {
  name: "Headers",
  setup() {
    const checkRePsw = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入"));
      }
      if (value !== data_.pswForm.newPsw) {
        callback(new Error("新密码需要一致！"));
      }
    };
    const { proxy } = getCurrentInstance();
    /* ref可等同于vue2的this.$refs */
    let pswReg = ref(null);

    let title = ref("");
    let data_ = reactive({
      personalMsgView: false,
      personalMsg: {},
      passwordView: false,
      pswForm: {
        oldPsw: "",
        newPsw: "",
        rePsw: "",
      },
      rules: {
        oldPsw: proxy.$general.validate.normal(true, "旧密码"),
        newPsw: proxy.$general.validate.psw(true, [8, 16]),
        rePsw: [{ validator: checkRePsw, trigger: "blur" }],
      },
    });
    let route_ = useRoute();

    const passwordClose = () => {
      pswReg.value.resetFields();
    };
    const submitPsw = () => {
      let flag = true;
      pswReg.value.validate((valid) => {
        if (!valid) {
          flag = false;
          return false;
        }
      });
      if (!flag) return;
      data_.passwordView = false;
    };

    watch(
      () => route_.name,
      () => {
        console.log(route_.meta);
        title.value = route_.meta.name;
      }
    );
    onMounted(() => {
      data_.personalMsg = {
        name: "Ken",
        phone: "135********",
        email: "****@***.***",
        birth: "**** - ** - **",
        addr: "广东深圳*************",
        favor: "basketball，game",
      };
      console.log(proxy.$general);
    });
    return {
      ...toRefs(data_),
      pswReg,
      title,
      passwordClose,
      submitPsw,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/style/function.scss";
.header {
  height: px2(60);
  top: 0;
  left: 0;
  background-color: #fff;
  padding-left: px2(100);
  z-index: 10;
  box-shadow: 0 px2(4) px2(8) rgba(170, 170, 170, 0.3);
  .page-name {
    line-height: px2(60);
    font-size: px2(24);
  }
  .user {
    font-size: px2(24);
    padding-right: px2(20);
    .user-icon {
      height: px2(60);
      line-height: px2(60);
      margin-left: px2(15);
      transition: all 0.15s;
    }
    .user-slide {
      width: px2(130);
      line-height: px2(34);
      background-color: #fff;
      box-shadow: 0 px2(4) px2(8) rgba(0, 0, 0, 0.2);
      top: 100%;
      right: px2(20);
      font-size: px2(15);
      letter-spacing: px2(0.5);
      padding: px2(10) 0;
      transition: all 0.1s;
      transform: scaleY(0);
      opacity: 0.5;
      transform-origin: center top;
    }
    &:hover {
      .user-slide {
        transform: scaleY(1);
        opacity: 1;
      }
      .el-icon-arrow-down {
        transform: rotate(-180deg);
      }
    }
  }
}
</style>
