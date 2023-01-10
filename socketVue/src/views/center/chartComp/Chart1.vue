<template>
  <div class="wh" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { remFontSize } from "./../../../assets/js/remFontSize";

export default {
  name: "Chart1",
  props: [],
  data() {
    return {
      dataX: "",
      dataY: "",
      inter: undefined,
      myChart: undefined,
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    init() {
      this.dataX = [];
      this.dataY = [];
      let now = Date.now();
      for (let i = 0; i < 28; i++) {
        this.dataX.push(now - i * 1000);
        this.dataY.push(this.randomNum(-25.5, -25));
      }
    },
    randomNum(min, max) {
      return Math.random() * (max - min) + min;
    },
    addData1() {
      this.dataX.push(Date.now());
      this.dataY.push(this.randomNum(-25.5, -25));
      this.dataX.shift();
      this.dataY.shift();
    },
    addData2() {
      this.dataX.push(Date.now());
      this.dataY.push(this.randomNum(-30.5, -30));
      this.dataX.shift();
      this.dataY.shift();
    },
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
      let option = {
        title: {
          show: true,
          text: "光功率（dBM）",
          textAlign: "center",
          textStyle: {
            fontFamily: "Microsoft YaHei",
            color: "#fff",
            fontSize: remFontSize(34),
            fontStyle: "normal",
            fontWeight: "normal",
          },
          top: "5%",
          // bottom: '2%',
          left: "50%",
          right: "50%",
        },
        xAxis: {
          type: "category",
          data: this.dataX,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#4f5463",
              width: 1,
              type: "normal",
            },
          },
          axisTick: { show: false },
          splitLine: {
            show: true,
            interval: 3,
            lineStyle: {
              color: "#4f5463",
              width: 1,
              type: "dotted",
            },
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: [
          {
            type: "value",
            max: -20,
            min: -35,
            // lineHeight: 10,
            splitNumber: 3,
            // boundaryGap: [0.2, 0.2],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#4f5463",
                width: 1,
                type: "solid",
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#d2d2d8",
                fontSize: remFontSize(12),
                fontWeight: "bolder",
              },
              formatter: function (value) {
                if (value === -35) return "";
                if (value === -20) return "";
                return value;
              },
            },
          },
        ],
        grid: {
          top: "27%",
          left: "8%",
          right: "8%",
          bottom: "15%",
        },
        series: [
          {
            data: this.dataY,
            type: "line",
            smooth: true,
            symbol: "circle", //折线节点为小圆点
            symbolSize: "0", //折线点大小
            lineStyle: {
              width: 2,
              type: "solid",
              color: "#CE0630", //折线的颜色
            },
            // areaStyle: {
            //     color: {
            //         type: 'linear',
            //         x: 0,
            //         y: 0,
            //         x2: 0,
            //         y2: 1,
            //         colorStops: [{
            //             offset: 0, color: 'rgba(58,132,255, 0.5)' // 0% 处的颜色
            //         }, {
            //             offset: 1, color: 'rgba(58,132,255, 0)' // 100% 处的颜色
            //         }],
            //         global: false // 缺省为 false
            //     }
            // }
          },
        ],
      };
      option && this.myChart.setOption(option);
      this.inter = setInterval(() => {
        this.addData1();
        this.myChart.setOption({
          xAxis: {
            data: this.dataX,
          },
          series: [
            {
              data: this.dataY,
            },
          ],
        });
        this.myChart.resize();
      }, 500);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
    reset() {
      // this.myChart.clear()
      // this.myChart = echarts.init(this.dom)
      this.inter && clearInterval(this.inter);
      this.inter = undefined;
      this.inter = setInterval(() => {
        this.addData1();
        this.myChart.setOption({
          xAxis: {
            data: this.dataX,
          },
          series: [
            {
              data: this.dataY,
            },
          ],
        });
      }, 500);
    },
    update() {
      // this.myChart.clear()
      // this.myChart = echarts.init(this.dom)
      this.inter && clearInterval(this.inter);
      this.inter = undefined;
      this.inter = setInterval(() => {
        this.addData2();
        this.myChart.setOption({
          xAxis: {
            data: this.dataX,
          },
          series: [
            {
              data: this.dataY,
            },
          ],
        });
      }, 500);
    },
  },
  created() {
    if (this.bufferStr === "1" && this.isFirst) {
      this.init(this.bufferStr);
      return false;
    }
    this.init();
  },
  mounted() {
    this.initChart();
  },
};
</script>

<style scoped type="text/scss" lang="scss"></style>
