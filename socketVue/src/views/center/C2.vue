<template>
  <div class="wh c2 a-fadein" @click="testUpdate">
    <div class="left">
      <img
        src="./../../assets/images/center/wenzi1.png"
        alt=""
        class="text"
        v-show="!tShow"
      />
      <img
        src="./../../assets/images/center/wenzi2.png"
        alt=""
        class="text"
        v-show="tShow"
      />
      <div class="chart-box pr">
        <img
          src="./../../assets/images/center/pie.png"
          class="wh"
          alt=""
          v-show="!pShow"
        />
        <img
          src="./../../assets/images/center/pie1.png"
          class="wh"
          alt=""
          v-show="pShow"
        />
        <div class="radar pa">
          <Chart10 ref="c10" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="box">
        <Chart1 ref="c1" :bufferStr="bufferStr" :isFirst="firstEnter" />
      </div>
      <div class="box">
        <Chart2 ref="c2" :bufferStr="bufferStr" :isFirst="firstEnter" />
      </div>
      <div class="box">
        <Chart3 ref="c3" :bufferStr="bufferStr" :isFirst="firstEnter" />
      </div>
      <div class="box">
        <Chart4 ref="c4" :bufferStr="bufferStr" :isFirst="firstEnter" />
      </div>
      <div class="box">
        <Chart5 ref="c5" :bufferStr="bufferStr" :isFirst="firstEnter" />
      </div>
      <div class="box">
        <Chart6 ref="c6" />
      </div>
      <div class="box">
        <Chart7 ref="c7" />
      </div>
      <div class="box">
        <p class="ep-title">体验感知（{{ isUpdate ? "8.9" : "5.5" }}分）</p>
        <img
          src="./../../assets/images/center/5.png"
          alt=""
          v-show="!isUpdate"
          class="ep"
        />
        <img
          src="./../../assets/images/center/6.png"
          alt=""
          v-show="isUpdate"
          class="ep"
        />
      </div>
      <div class="box">
        <Chart9 ref="c9" />
      </div>
    </div>
  </div>
</template>
<script>
import Chart1 from "./chartComp/Chart1";
import Chart2 from "./chartComp/Chart2";
import Chart3 from "./chartComp/Chart3";
import Chart4 from "./chartComp/Chart4";
import Chart5 from "./chartComp/Chart5";
import Chart6 from "./chartComp/Chart6";
import Chart7 from "./chartComp/Chart7";
import Chart9 from "./chartComp/Chart9";
import Chart10 from "./chartComp/Chart10";
export default {
  name: "C2",
  props: [],
  data() {
    return {
      isUpdate: true,
      tShow: true, // 综合得分延迟显示
      pShow: true, // 综合得分饼图更新圆圈数据
      bufferStr: "0", // 光纤盒的状态
      firstEnter: true,
    };
  },
  components: {
    Chart1,
    Chart2,
    Chart3,
    Chart4,
    Chart5,
    Chart6,
    Chart7,
    Chart9,
    Chart10,
  },
  sockets: {
    // 链接成功
    connect(data) {
      console.log("connect：", data);
    },
    // 监听HPC
    hpc(data) {
      console.log("hpc", data);
      /*
       * 监听串口发送的数据
       * 1 为质差高风险
       * 2 为高满意
       */
      // 更新显示状态
      let bufferData = escape(data.data)
        .toLocaleLowerCase()
        .replace(/%u/gi, "\\u");
      console.log(bufferData, "======");
      let bufferStr_ = bufferData.charAt(bufferData.length - 1);
      if (bufferStr_ === this.bufferStr) {
        return false;
      }
      this.bufferStr = bufferStr_;
      this.isUpdate = this.bufferStr === "0";
      let timer = this.firstEnter ? 0 : 1000;
      let timer1 = this.firstEnter ? 0 : 2000;
      // 综合得分底下的饼图延迟更新
      if (this.isUpdate) {
        // 高满意时刷新文字
        setTimeout(() => {
          this.pShow = true;
          this.$refs["c10"].reset();
        }, timer);
        setTimeout(() => {
          this.tShow = true;
        }, timer1);
      } else {
        // 质差高风险时刷新文字
        setTimeout(() => {
          this.pShow = false;
          this.$refs["c10"].update();
        }, timer);
        setTimeout(() => {
          this.tShow = false;
        }, timer1);
      }
      this.firstEnter = false;
      // 右边所有图标更新数据
      for (let i = 1; i < 10; i++) {
        if (i !== 6 && i !== 8) {
          let dom_ = "c" + i;
          if (this.isUpdate) {
            this.$refs[dom_].reset();
          } else {
            this.$refs[dom_].update();
          }
        }
      }
    },
  },
  computed: {},
  watch: {},
  methods: {
    testUpdate() {
      if (!this.isUpdate) {
        this.$socket.emit("hpc", { data: "\u0000" });
      } else {
        this.$socket.emit("hpc", { data: "\u0001" });
      }
    },
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.firstEnter = false;
    }, 400);
  },
};
</script>

<style scoped type="text/scss" lang="scss">
@import "../../assets/styles/common/functions";
.c2 {
  background-image: url("../../assets/images/center/c2bg.jpg");
  background-size: 100% 100%;
  display: flex;
  justify-content: left;
  padding-left: px2vw(447);
  padding-top: px2vw(574);
  color: #fff;
  animation-delay: 0.5s;
  .left {
    width: px2vw(894);
    height: px2vw(1458);
    .text {
      width: px2vw(641);
      margin-top: px2vw(46);
      margin-left: px2vw(50);
    }
    .chart-box {
      width: px2vw(787);
      height: px2vw(501);
      margin-top: px2vw(80);
      .radar {
        width: px2vw(500);
        height: px2vw(500);
        left: 50%;
        top: 50%;
        margin-left: px2vw(-250);
        margin-top: px2vw(-250);
      }
    }
  }
  .right {
    width: px2vw(2299);
    height: px2vw(1458);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: px2vw(74);
    padding-bottom: px2vw(10);
    .box {
      width: px2vw(682);
      height: px2vw(393);
      margin: 0 px2vw(19) 0 px2vw(23);
      .ep {
        width: px2vw(617);
        margin: 0 auto;
      }
      .ep-title {
        line-height: px2vw(34);
        font-size: px2vw(34);
        margin-top: px2vw(40);
        margin-bottom: px2vw(48);
      }
    }
  }
}
.test-btn {
  width: px2vw(100);
  height: px2vw(100);
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>
