<template>
  <div class="wh" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { remFontSize } from "./../../../assets/js/remFontSize";
export default {
  name: "Chart4",
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
      for (let i = 0; i < 28; i++) {
        this.dataX.push(this.randomNum(50, 52));
        this.dataY.push(this.randomNum(50, 52));
      }
    },
    randomNum(min, max) {
      return Math.random() * (max - min) + min;
    },
    addData1() {
      this.dataX.push(this.randomNum(50, 52));
      this.dataY.push(this.randomNum(50, 52));
      this.dataX.shift();
      this.dataY.shift();
    },
    addData2() {
      this.dataX.push(this.randomNum(90, 100));
      this.dataY.push(this.randomNum(90, 100));
      this.dataX.shift();
      this.dataY.shift();
    },
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
      let option = {
        title: {
          show: true,
          text: "时延（ms）",
          // x: 'center',
          top: "5%",
          // bottom: '2%',
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
            max: 100,
            min: 0,
            lineHeight: 10,
            splitNumber: 2,
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
                if (value == 100) return 500 + "";
                if (value == 50) return 50 + "";
                if (value == 0) return 0 + "";
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
              color: "#ffb78d", //折线的颜色
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
      // setTimeout(() => {
      //     this.update()
      // }, 4000);
    },
    reset() {
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
    this.init();
  },
  mounted() {
    this.initChart();
  },
};
</script>
