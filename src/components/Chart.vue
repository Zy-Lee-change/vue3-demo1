<!--
 * @Author: your name
 * @Date: 2021-07-09 11:35:35
 * @LastEditTime: 2021-07-26 16:00:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\components\Chart.vue
-->
<template>
  <div class="wh" ref="chartSet"></div>
</template>
<script>
import { ref, getCurrentInstance, onMounted } from "vue";
export default {
  props: {
    chartData: null,
  },
  setup(props) {
    let { proxy } = getCurrentInstance();
    let chartSet = ref(null);
    const drawChart = () => {
      // let optionData = props.chartData;
      // let sum_ = proxy.$funs.arrSum(optionData.series[0].data);
      // for (let i = 0, iLen = optionData.xAxis[0].data.length; i < iLen; i++) {
      //   optionData.series[1].data.push(
      //     ((optionData.series[0].data[i] / sum_) * 100).toFixed(2)
      //   );
      // }
      let echart_ = proxy.$echarts.init(chartSet.value);
      // let echart_ = proxy.$echarts.init(document.getElementById("aa"));
      echart_.setOption(props.chartData);

      window.addEventListener("resize", () => {
        echart_.resize();
      });
    };
    onMounted(() => {
      // console.log(props);
      drawChart();
    });
    return {
      chartSet,
    };
  },
};
</script>
