<template>
  <div class="wh" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { remFontSize } from "./../../../assets/js/remFontSize";
export default {
  name: "Chart9",
  props: [],
  data() {
    return {
      dataRar1: [
        { name: "业务宣传\n7.6", max: 10 },
        { name: "咨询投诉\n6.2", max: 10 },
        { name: "故障维修\n9.6", max: 10 },
        { name: "装机服务\n7.1", max: 10 },
        { name: "业务办理\n7.4", max: 10 },
      ],
      dataRar2: [
        { name: "业务宣传\n7.6", max: 10 },
        { name: "咨询投诉\n6.2", max: 10 },
        { name: "故障维修\n6.5", max: 10 },
        { name: "装机服务\n7.1", max: 10 },
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
          show: true,
          text: "服务质量（8.3分）",
          textAlign: "center",
          textStyle: {
            fontFamily: "Microsoft YaHei",
            color: "#fff",
            fontSize: remFontSize(34),
            fontStyle: "normal",
            fontWeight: "normal",
          },
          top: "5%",
          left: "50%",
          right: "50%",
        },
        radar: {
          indicator: this.dataRar1,
          radius: "55%",
          center: ["50%", "65%"],
          nameGap: 8,
          name: {
            // (圆外的标签)雷达图每个指示器名称的配置项。
            show: true,
            x: "center",
            textAlign: "center",
            textStyle: {
              color: "#d2d2d8",
              fontSize: remFontSize(12),
              fontFamily: "Microsoft YaHei",
            },
          },
          axisLine: {
            show: false,
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
              color: "#838ead",
              opacity: 0.4,
            },
            lineStyle: {
              color: "#838ead",
              type: "dashed",
            },
            itemStyle: {
              color: "transparent",
            },
            data: [
              {
                value: [7.6, 6.2, 9.6, 7.1, 7.4],
              },
            ],
          },
        ],
      };
      option && this.myChart.setOption(option);
      this.myChart.resize();
      setTimeout(() => {
        window.addEventListener("resize", () => {
          this.myChart.resize();
        });
      }, 300);
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
                value: [7.6, 6.2, 9.6, 7.1, 7.4],
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
                value: [7.6, 6.2, 6.5, 7.1, 7.4],
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
