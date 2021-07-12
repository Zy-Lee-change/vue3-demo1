<!--
 * @Author: your name
 * @Date: 2021-07-09 16:26:01
 * @LastEditTime: 2021-07-12 10:13:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\components\Map.vue
-->
<template>
  <div class="wh" ref="myMap"></div>
</template>
<script>
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { registerChinaMap } from "./map/registerMap";
import { chinaGeoCoordMap } from "./map/ProvincialCapital";
export default {
  props: {
    datas: null,
  },
  setup(props) {
    let { proxy } = getCurrentInstance();
    let myMap = ref(null);
    const zoomAndCenter = {
      zoom: 1.6,
      center: [109, 34.5],
      aspectScale: 0.8,
    };
    let mapChart = null;
    /* 创建线条连接 */
    const convertLineData = (data) => {
      const center = [109.279, 23.9499];
      const res = [];
      for (let i = 0; i < data.length; i++) {
        const dataItem = data[i];
        const fromCoord = chinaGeoCoordMap[dataItem[0].name];
        if (fromCoord && center) {
          res.push({
            coords: [center, fromCoord],
          });
        }
      }
      return res;
    };
    /* 创建图表 */
    const createSeries = () => {
      /* 连线 */
      const lineSeries = {
        type: "lines",
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: "arrow", //箭头图标
          symbolSize: 10, //图标大小
        },
        lineStyle: {
          color: "#51d8ff",
          width: 2, //尾迹线条宽度
          opacity: 1, //尾迹线条透明度
          curveness: 0.1, //尾迹线条曲直度
        },
        /* 创建连线数据 */
        data: convertLineData(props.datas),
      };

      /* 地图标记点 */
      const pointSeries = {
        type: "scatter",
        // type: "effectScatter",
        coordinateSystem: "geo",
        // zlevel: 2,
        label: {
          show: true,
          position: "bottom", //显示位置
          color: "rgb(11, 131, 243)",
          offset: [0, 5], //偏移设置
          formatter: function (params) {
            //圆环显示文字
            if (params.data.name == "广西省") {
              return "";
            }
            return params.data.name;
          },
          fontSize: 16,
        },
        // symbolSize: 60,
        data: props.datas.map(function (dataItem) {
          return {
            name: dataItem[0].name,
            value: chinaGeoCoordMap[dataItem[0].name].concat([
              dataItem[0].value,
            ]),
          };
        }),
      };

      return [pointSeries, lineSeries];
    };
    const series = createSeries();

    let mapOption = {
      geo: {
        silent: true,
        map: "chinaMap",
        ...zoomAndCenter,
        roam: false,
        show: true,
        itemStyle: {
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
              },
            ],
            shadowColor: "rgba(0, 56, 240, 1)",
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 4,
            globalCoord: false, // 缺省为 false
          },
          borderColor: "rgba(147, 235, 248, 1)",
          borderWidth: 1.5,
        },
      },
      series: series,
    };
    const init = () => {
      mapChart.setOption(mapOption);
    };

    /* 设置地图 */
    const setMapOption = () => {
      const seriesNew = createSeries();
      mapOption.series = seriesNew;
      mapChart.setOption(this.mapOption);
    };
    watch(
      () => props.datas,
      () => {
        setMapOption();
      }
    );
    onMounted(() => {
      console.log("-----------", myMap.value);
      mapChart = proxy.$echarts.init(myMap.value);
      registerChinaMap(); //注册地图
      init();
    });

    return {
      myMap,
    };
  },
};
</script>
