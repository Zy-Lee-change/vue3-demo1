<template>
  <div class="home wh pr">
    <img src="./../assets/images/home/bg.jpg" class="h common-img" alt="" />
    <div class="nav-box pa">
      <div class="nav-btn nav-btn1 dl cursor" @click="jumpTo('l1')"></div>
      <div class="nav-btn nav-btn2 dl cursor" @click="jumpTo('c1')"></div>
      <div class="nav-btn nav-btn3 dl cursor" @click="jumpTo('r1')"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    // 点击跳转子页面
    jumpTo(url) {
      // this.$router.replace({ name: url });
      this.$socket.emit("changeRoute", url);
    },
  },
  sockets: {
    // 链接成功
    connect(data) {
      console.log("connect：", data);
    },
    // 获取新的路由地址
    getRoute(data) {
      console.log("获取路由：", data);
      if (this.$route.name === data) {
        return false;
      }
      this.$router.replace({ name: data });
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/styles/common/functions.scss";
.nav-box {
  white-space: nowrap;
  font-size: 0;
  text-align: center;
  top: px2vw(376);
  left: 50%;
  transform: translateX(-50%);
  .nav-btn {
    width: px2vw(620);
    height: px2vw(620);
    margin: 0 px2vw(210);
  }
}
</style>
