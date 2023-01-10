<template>
  <div class="wh" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { remFontSize } from "./../../../assets/js/remFontSize";
export default {
  name: "Chart6",
  props: [],
  data() {
    return {
      dataX: ["OTT", "自营视频", "在线游戏", "网络课堂", "在线办公"],
      dataY: [25, 18, 9, 5, 2],
      inter: undefined,
      myChart: undefined,
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
      let option = {
        title: {
          show: true,
          text: "宽带活跃度（8分）",
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
          axisTick: { show: false },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            align: "center",
            fontSize: remFontSize(12),
            color: "#d2d2d8",
            fontFamily: "HuaweiSans",
            interval: 0,
          },
        },
        yAxis: [
          {
            type: "value",
            max: 30,
            min: 0,
            lineHeight: 10,
            splitNumber: 3,
            boundaryGap: [0.2, 0.2],
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
            type: "bar",
            smooth: true,
            symbol: "circle", //折线节点为小圆点
            symbolSize: "0", //折线点大小
            lineStyle: {
              width: 2,
              type: "solid",
              color: "#32CD32", //折线的颜色
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#6a5fab",
              },
            },
          },
        ],
      };
      option && this.myChart.setOption(option);
      setTimeout(() => {
        this.myChart.resize();
        window.addEventListener("resize", () => {
          this.myChart.resize();
        });
      }, 300);
    },
  },
  created() {},
  mounted() {
    this.initChart();
  },
};
</script>
