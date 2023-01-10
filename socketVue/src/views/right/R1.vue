<template>
  <div class="wh pr">
    <!-- 步骤一 -->
    <video
      :src="videoSrc[0]"
      autoplay
      muted
      v-show="!state"
      ref="v0"
      @ended="state = 1"
      class="video"
    ></video>
    <video
      :src="videoSrc[1]"
      loop
      muted
      v-show="state === 1"
      ref="v1"
      class="video"
    ></video>

    <!-- 步骤二 -->
    <video
      :src="videoSrc[2]"
      muted
      v-show="state === 2"
      ref="v2"
      class="video"
    ></video>

    <!-- 步骤三 -->
    <video
      :src="videoSrc[3]"
      muted
      v-show="state === 3"
      @ended="state = 4"
      ref="v3"
      class="video"
    ></video>
    <video
      :src="videoSrc[4]"
      loop
      muted
      v-show="state === 4"
      ref="v4"
      class="video"
    ></video>

    <div class="btn-box pa">
      <div class="btn btn-home dl" @click="backHome"></div>
      <div
        class="btn dl"
        @click="videoPlay"
        :class="{ 'btn-pause': played, 'btn-play': !played }"
      ></div>
      <div
        class="btn btn-prev dl"
        @click="changeState('prev')"
        v-if="state > 1"
      ></div>
      <div
        class="btn btn-next dl"
        @click="changeState('next')"
        v-if="state < 3"
      ></div>
      <div class="btn btn-back dl" @click="toReplay"></div>
    </div>

    <div class="video-model pa h" v-show="videoModel">
      <video :src="modelSrc" muted autoplay class="h" ref="mv"></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "R1",
  props: [],
  data() {
    return {
      // 0 为第一次进场动画
      // 1 为第一次进场动画结束后的循环状态
      // 2 为点击下一步展现的动画
      // 3 为再点击下一步展现的出场动画
      // 4 为楼上动画结束后需循环部分
      state: 0, // 记录视频步骤
      videoSrc: [
        "./static/video/right/cn/2b_1tween.mp4",
        "./static/video/right/cn/2b_1.mp4",
        "./static/video/right/cn/2b_2stop.mp4",
        "./static/video/right/cn/2b_3tween.mp4",
        "./static/video/right/cn/2b_3.mp4",
      ], // 视频路径
      played: true,
      videoModel: false, // 四种状态结果视频展示
      modelArr: [
        "./static/video/right/cn/2b_4_1stop.mp4",
        "./static/video/right/cn/2b_4_2stop.mp4",
        "./static/video/right/cn/2b_4_3stop.mp4",
        "./static/video/right/cn/2b_4_4stop.mp4",
      ],
      modelSrc: "", // 弹窗视频地址
      modelInd: 0, // 视频结论 index
    };
  },
  sockets: {
    // 链接成功
    connect(data) {
      console.log("connect：", data);
      // this.$socket.emit("connect");
    },
    // 视频播放暂停
    videoPlay(data) {
      console.log("视频暂停播放：", data);
      this.played = data;
      let dom_ = "v" + this.state;
      if (this.played) {
        this.$refs[dom_].play();
      } else {
        this.$refs[dom_].pause();
      }
    },
    // 视频步骤
    changeState(data) {
      console.log("改变视频步骤：", data, this.state);
      if (
        typeof data === "object" &&
        Object.prototype.hasOwnProperty.call(data, "model") &&
        this.state > 2
      ) {
        this.modelSrc = this.modelArr[data.model];
        this.videoModel = true;
        return false;
      }
      this.videoModel = false;
      if (
        typeof data === "object" &&
        Object.prototype.hasOwnProperty.call(data, "state")
      ) {
        this.state = data.state;
        return false;
      }
      if (data === "prev") {
        if (this.state <= 1) {
          return false;
        }
        this.state = this.state > 2 ? 2 : 0;
      } else if (data === "next") {
        if (this.state === 3) {
          return false;
        }
        this.state = this.state > 1 ? 3 : 2;
      }
    },
    // 视频重置
    replay(data) {
      console.log("video replay:", data);
      this.state = this.state > 0 ? 1 : 0;
    },
  },
  components: {},
  computed: {},
  watch: {
    // 监听视频步骤的变化
    state(newVal, oldVal) {
      let dom_o = "v" + oldVal;
      // 播放下一个视频
      this.videoEnd(newVal);
      // 重置上一个视频的状态
      setTimeout(() => {
        this.$refs[dom_o].currentTime = 0;
        this.$refs[dom_o].pause();
      }, 300);
    },
  },
  methods: {
    // 返回首页
    backHome() {
      this.$socket.emit("changeRoute", "home");
    },
    // 视频操作，切换循环或者点击上下步按钮
    videoEnd(i) {
      let dom_ = "v" + i;
      this.state = i;
      this.$refs[dom_].currentTime = 0;
      this.$refs[dom_].play();
    },
    // 暂停或播放视频
    videoPlay() {
      this.$socket.emit("videoPlay", !this.played);
    },
    // 改变播放的步骤
    changeState(type) {
      this.$socket.emit("changeState", type);
    },
    // 第三段视频
    showModel() {
      this.videoModel = !this.videoModel;
      if (this.videoModel) {
        this.$refs.mv.play();
      } else {
        this.$refs.mv.currentTime = 0;
        this.$refs.mv.pause();
      }
    },
    // 视频重播
    toReplay() {
      this.$socket.emit("replay", "replay");
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped type="text/scss" lang="scss">
@mixin boxCenterTop {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.video {
  height: 100%;
  @include boxCenterTop;
}
.video-model {
  @include boxCenterTop;
  z-index: 10;
}
.btn-box {
  z-index: 20;
}
</style>
