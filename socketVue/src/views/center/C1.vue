<template>
  <div class="wh pr">
    <img
      src="./../../assets/images/center/c1.png"
      class="h common-img"
      alt=""
    />
    <div class="video-box pa">
      <video :src="vSrc" class="wh" loop autoplay muted></video>
    </div>
  </div>
</template>
<script>
export default {
  name: "C1",
  props: [],
  data() {
    return {
      vSrc: "./static/video/center/center2.mp4",
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped type="text/scss" lang="scss">
@import "../../assets/styles/common/functions";
.video-box {
  width: px2vw(909);
  height: px2vw(526);
  right: px2vw(927);
  bottom: px2vw(410);
  video {
    object-fit: fill;
  }
}
</style>
