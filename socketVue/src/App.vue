<template>
  <div id="app" class="w pa">
    <router-view />
    <div class="btn-box pa" v-if="nav.show">
      <div class="btn btn-home dl" @click="changeRouter('home')"></div>
      <div
        class="btn btn-prev dl"
        @click="changeRouter('prev')"
        v-if="nav.ind > 0"
      ></div>
      <div
        class="btn btn-next dl"
        @click="changeRouter('next')"
        v-if="nav.ind < nav.arr.length - 1"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: {
        show: false,
        url: {
          c: [1, 2, 3],
          l: [1, 2, 3],
        },
        type: "", // 属于控制哪个部分的页面
        ind: 0, // 导航的所在位置
        arr: [], // 导航数组集
      },
    };
  },
  watch: {
    // 监听路由变化
    $route() {
      this.getRouteMsg();
    },
  },
  created() {
    // 非首页或右侧视频页，页面刷新时需要获取当前路由标识
    if (this.$route.name !== "home" || this.$route.name !== "r1") {
      let ind_ = Number(this.$route.name.slice(1));
      this.nav.ind = ind_ - 1;
    }
    this.getRouteMsg();
  },
  mounted() {
    setTimeout(() => {
      this.$socket.emit("test", 1);
    }, 3000);
    document.onkeydown = (e) => {
      console.log(e.key, e.keyCode);
      switch (e.key) {
        case "Insert":
          // 45 播放
          this.$socket.emit("videoPlay", true);
          break;
        case "Pause":
          // 19 暂停
          this.$socket.emit("videoPlay", false);
          break;
        case "p":
          // 80 重播
          this.$socket.emit("replay", "replay");
          break;
        case "Home":
          // 36 首页
          this.$socket.emit("changeRoute", "home");
          break;
        case "PageUp":
        case "ArrowUp":
        case "ArrowLeft":
          // 33 38 37 上一页
          if (this.$route.name === "home") {
            return false;
          }
          if (this.$route.name === "r1") {
            this.$socket.emit("changeState", "prev");
          } else {
            this.changeRouter("prev");
          }
          break;
        case "PageDown":
        case "ArrowDown":
        case "ArrowRight":
          // 34 40 39 下一页
          if (this.$route.name === "home") {
            return false;
          }
          if (this.$route.name === "r1") {
            this.$socket.emit("changeState", "next");
          } else {
            this.changeRouter("next");
          }
          break;
        case "q":
          // 81 左边图标子页面 第1页
          this.$socket.emit("changeRoute", "l1");
          break;
        case "w":
          // 87 左边图标子页面 第2页
          this.$socket.emit("changeRoute", "l2");
          break;
        case "r":
          // 82 左边图标子页面 第3页
          this.$socket.emit("changeRoute", "l3");
          break;
        case "t":
          // 84 中间图标子页面 第1页
          this.$socket.emit("changeRoute", "c1");
          break;
        case "y":
          // 89 中间图标子页面 第2页
          this.$socket.emit("changeRoute", "c2");
          break;
        case "u":
          // 85 中间图标子页面 第3页
          this.$socket.emit("changeRoute", "c3");
          break;
        case "i":
          // 73 右侧图标页面
          this.$socket.emit("changeRoute", "r1");
          break;
        case "d":
          // 68 右侧图标页面 第3段视频 第1个弹窗
          this.$socket.emit("changeState", { model: 0 });
          break;
        case "f":
          // 70 右侧图标页面 第3段视频 第2个弹窗
          this.$socket.emit("changeState", { model: 1 });
          break;
        case "g":
          // 71 右侧图标页面 第3段视频 第3个弹窗
          this.$socket.emit("changeState", { model: 2 });
          break;
        case "h":
          // 72 右侧图标页面 第3段视频 第4个弹窗
          this.$socket.emit("changeState", { model: 3 });
          break;
        case "z":
          this.$socket.emit("l2state", 1);
          break;
        case "x":
          this.$socket.emit("l2state", 3);
          break;
        case "v":
          this.$socket.emit("l2state", 4);
          break;
        case "b":
          this.$socket.emit("l2state", 5);
          break;
        case "n":
          this.$socket.emit("hpc", { data: "\u0001" });
          break;
        case "m":
          this.$socket.emit("hpc", { data: "\u0000" });
          break;
      }
    };
  },
  methods: {
    // 获取路由信息
    getRouteMsg() {
      // home的时候重置
      if (this.$route.name === "home" || this.$route.name === "r1") {
        this.nav.ind = 0;
        this.nav.show = false;
        return false;
      }
      this.nav.show = true;
      this.nav.type = this.$route.meta.pId;
      this.nav.arr = this.nav.url[this.nav.type];
      let ind_ = Number(this.$route.name.slice(1));
      this.nav.ind = ind_ - 1;
    },
    // 导航跳转路由 type prev为上一个
    changeRouter(type) {
      if (
        (!this.nav.ind && type === "prev") ||
        (this.nav.ind === this.nav.arr.length - 1 && type === "next")
      ) {
        return false;
      }
      if (type === "prev") {
        this.nav.ind--;
      } else if (type === "next") {
        this.nav.ind++;
      }
      let routeName =
        type === "home" ? type : this.nav.type + this.nav.arr[this.nav.ind];

      this.$socket.emit("changeRoute", routeName);
    },
  },
  sockets: {
    // 链接成功
    connect(data) {
      console.log("connect：", data);
    },
    changeRoute(data) {
      console.log("更改路由：", data);
    },
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

<style lang="scss" scoped>
@import "assets/styles/common/functions";
#app {
  height: px2vw(2160);
  text-align: center;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
@media only screen and (min-aspect-ratio: 1920/1070) {
  #app {
    transform: translateY(-50%) scale(0.9);
  }
}
</style>
