<!--
 * @Author: your name
 * @Date: 2021-07-05 12:27:27
 * @LastEditTime: 2021-07-28 17:38:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\App.vue
-->
<template>
  <navs class="nav-hover"></navs>
  <headers></headers>
  <div class="container h">
    <router-view />
  </div>
</template>

<script>
/* 引入需要用到的vue方法属性 */
import { onMounted, defineComponent } from "vue";
import Navs from "@/components/Nav";
import Headers from "@/components/Headers";
export default defineComponent({
  components: {
    Navs,
    Headers,
  },
  mounted() {
    console.log(this.$store);
  },
  /* 组合式API setup函数 */
  setup() {
    onMounted(() => {});
    return {};
  },
});
</script>

<style lang="scss" type="text/scss" scoped>
@import "./assets/style/function.scss";
::v-global(#app) {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: Arial, "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  padding: px2(80) px2(20) px2(20);
  margin-left: px2(80);
  background-color: #f3f3f3;
  overflow-y: auto;
}
.nav-hover {
  float: left;
}
</style>
