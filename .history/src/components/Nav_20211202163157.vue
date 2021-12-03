<!--
 * @Author: Ken
 * @Date: 2021-07-06 11:37:39
 * @LastEditTime: 2021-07-28 15:30:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\components\Nav.vue
-->
<template>
  <div class="nav h t-center pr">
    <div class="logo">
      <img src="" alt="" class="w" />
    </div>
    <div
      class="nav-tab cursor"
      @click="routeChange('home')"
      :class="{ ac: navName === 'home' }"
    >
      <i class="el-icon-s-home"></i>
    </div>
    <div
      class="nav-tab cursor"
      @click="routeChange('gantt')"
      :class="{ ac: navName === 'gantt' }"
    >
      <i class="el-icon-s-promotion"></i>
    </div>
    <div
      class="nav-tab cursor"
      @click="routeChange('form')"
      :class="{ ac: navName === 'form' }"
    >
      <i class="el-icon-s-order"></i>
    </div>
    <div
      class="nav-tab cursor"
      @click="routeChange('force')"
      :class="{ ac: navName === 'force' }"
    >
      <i class="el-icon-s-platform"></i>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, getCurrentInstance, watch } from "vue";
/* 使用router方法，也可使用以前默认的方法 */
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Nav",
  setup() {
    /* setup函数里的this与vue2的this指向不同，需要使用getCurrentInstance() */
    let navName = ref("");
    let homeData = reactive({
      name: 1,
      val: 2,
    });
    let route_ = useRoute();
    const router_ = useRouter();
    const routeChange = (val) => {
      router_.push({ name: val });
    };
    watch(
      () => route_.name,
      (val) => {
        navName.value = val;
      }
    );
    onMounted(() => {
      navName.value = route_.name;
    });
    return {
      navName,
      homeData,
      routeChange,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/style/function.scss";
.nav {
  width: px2(80);
  background-color: #49a4ff;
  color: #fff;
  font-size: px2(36);
  z-index: 11;
  .logo {
    height: px2(80);
  }
  .nav-tab {
    height: px2(80);
    line-height: px2(80);
    border-bottom: 2px solid transparent;
    transition: all 0.3s;
    &.ac,
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
