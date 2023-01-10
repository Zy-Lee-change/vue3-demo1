<template>
  <div class="wh" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { remFontSize } from "./../../../assets/js/remFontSize";
export default {
  name: "Chart7",
  props: [],
  data() {
    return {
      dataX: [
        "ONU\n弱光",
        "WIFI\n问题",
        "家庭\n网络连接",
        "PON\n链路误码",
        "弱光\n高风险",
        "PON\n链路频闪",
        "继纤\n高风险",
        "单频\nWIFI组网",
        "老旧\n光猫",
      ],
      dataY: [50, 25, 15, 10, 10, 10, 10, 10, 10],
      inter: undefined,
      myChart: undefined,
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    addData1() {
      this.dataY = [50, 25, 15, 10, 10, 10, 10, 10, 10];
    },
    addData2() {
      this.dataY = [170, 80, 40, 20, 15, 10, 0, 0, 0];
    },
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
      let option = {
        title: {
          show: true,
          text: "网络感知（6.5分）",
          // x: 180,
          top: "5%",
          left: "50%",
          right: "50%",
          textAlign: "center",
          textStyle: {
            fontFamily: "Microsoft YaHei",
            color: "#fff",
            fontSize: remFontSize(34),
            fontStyle: "normal",
            fontWeight: "normal",
          },
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
          splitLine: {
            show: true,
            lineStyle: {
              color: "#4f5463",
              width: 1,
              type: "dotted",
            },
          },
          axisTick: { show: false },
          axisLabel: {
            show: true,
            color: "#d2d2d8",
            //   align: "center",
            fontSize: remFontSize(12),
            // fontWeight: 'bolder',
            fontFamily: "HuaweiSans",
            interval: 0,
            //   rotate: 40,
          },
        },
        yAxis: [
          {
            type: "value",
            max: 180,
            min: 0,
            // lineHeight: 10,
            splitNumber: 3,
            minInterval: 60,
            // boundaryGap: [0,0,0],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#4f5463",
                width: 1,
                type: "solid",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#4f5463",
                width: 1,
                type: "dotted",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#d2d2d8",
                fontSize: remFontSize(12),
                fontWeight: "bolder",
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
              color: "#32CD32", //折线的颜色
            },
          },
        ],
      };
      this.addData1();
      option && this.myChart.setOption(option);
      this.myChart.resize();
      setTimeout(() => {
        window.addEventListener("resize", () => {
          this.myChart.resize();
        });
      }, 300);
    },
    reset() {
      this.addData1();
      this.myChart.setOption({
        title: {
          text: "网络感知（9.5分）",
        },
        xAxis: {
          data: this.dataX,
        },
        series: [
          {
            data: this.dataY,
            lineStyle: {
              width: 2,
              type: "solid",
              color: "#32CD32", //折线的颜色
            },
          },
        ],
      });
    },
    update() {
      this.addData2();
      this.myChart.setOption({
        title: {
          text: "网络感知（6.5分）",
        },
        xAxis: {
          data: this.dataX,
        },
        series: [
          {
            data: this.dataY,
            lineStyle: {
              width: 2,
              type: "solid",
              color: "#18e482", //折线的颜色
            },
          },
        ],
      });
    },
  },
  created() {},
  mounted() {
    this.initChart();
  },
};
</script>
