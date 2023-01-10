<template>
  <div class="wh" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { remFontSize } from "./../../../assets/js/remFontSize";
export default {
  name: "Chart10",
  props: [],
  data() {
    return {
      dataRar1: [
        { name: "业务宣传\n7.6", max: 10 },
        { name: "咨询投诉\n6.2", max: 10 },
        { name: "故障维修\n9.6", max: 10 },
        { name: "业务办理\n7.4", max: 10 },
      ],
      dataRar2: [
        { name: "业务宣传\n7.6", max: 10 },
        { name: "咨询投诉\n6.2", max: 10 },
        { name: "故障维修\n6.5", max: 10 },
        { name: "业务办理\n7.4", max: 10 },
      ],
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
          show: false,
          text: "服务质量（8.3分）",
          textAlign: "center",
          textStyle: {
            fontFamily: "Microsoft YaHei",
            color: "#fff",
            fontSize: remFontSize(34),
            fontStyle: "normal",
            fontWeight: "normal",
          },
          top: "20%",
          bottom: "20%",
          left: "50%",
          right: "50%",
        },
        radar: {
          indicator: this.dataRar1,
          radius: "60%",
          center: ["50%", "51%"],
          nameGap: 10,
          name: {
            // (圆外的标签)雷达图每个指示器名称的配置项。
            show: false,
            textStyle: {
              textAlign: "center",
              color: "#A9A9A9",
              fontSize: remFontSize(14),
              fontFamily: "HuaweiSans",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#343538",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#343538",
            },
          },
          splitArea: {
            show: false,
          },
        },
        series: [
          {
            type: "radar",
            areaStyle: {
              color: "#4dc4ed",
              opacity: 0.23,
            },
            itemStyle: {
              color: "transparent",
            },
            lineStyle: {
              color: "#4dc4ed",
            },
            data: [
              {
                value: [8, 8.3, 9.5, 8.9],
              },
            ],
          },
        ],
      };
      option && this.myChart.setOption(option);
      this.myChart.resize();
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
    reset() {
      this.myChart.setOption({
        title: {
          text: "服务质量（8.3分）",
        },
        radar: {
          indicator: this.dataRar1,
        },
        series: [
          {
            data: [
              {
                value: [8, 8.3, 9.5, 8.9],
              },
            ],
          },
        ],
      });
    },
    update() {
      this.myChart.setOption({
        title: {
          text: "服务质量（7分）",
        },
        radar: {
          indicator: this.dataRar2,
        },
        series: [
          {
            data: [
              {
                value: [8, 7, 6.5, 5.5],
              },
            ],
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
