<!--
 * @Author: your name
 * @Date: 2021-07-05 12:27:27
 * @LastEditTime: 2021-09-17 12:28:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\views\home\Home.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-07-05 12:27:27
 * @LastEditTime: 2021-07-12 11:13:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\views\Home.vue
-->
<template>
  <div class="home df">
    <div class="common-bg pr bar-box">
      <p class="title w pa">周转率</p>
      <Chart :chart-data="barData"></Chart>
    </div>
    <div class="common-bg pr pie-box">
      <p class="title w pa">年龄比例</p>
      <Chart :chart-data="pieData"></Chart>
    </div>
    <div class="common-bg pr w detail-box">
      <p class="title w pa">进度</p>
      <div class="wh df progress-box t-center">
        <div class="item">
          <h5>未完成</h5>
          <p>1234</p>
        </div>
        <div class="item">
          <h5>已完成</h5>
          <p>1234</p>
        </div>
        <div class="item">
          <h5>延迟</h5>
          <p>1234</p>
        </div>
        <div class="item">
          <h5>完成已延期</h5>
          <p>1234</p>
        </div>
      </div>
    </div>
    <div class="common-bg pr w map-box">
      <china-map :datas="mapData"></china-map>
    </div>
    <div class="common-bg table-box w">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="currentRowChange"
        width="100%"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="date" label="日期" width="120">
        </el-table-column>
        <el-table-column property="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column property="address" label="地址"> </el-table-column>
      </el-table>

      <div class="pagination-box">
        <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="$vars.pageSizes"
          :page-size="$vars.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableTotal"
        >
        </el-pagination>
        <!-- <el-pagination
          :page-sizes="$vars.pageSizes"
          :page-size="$vars.pageSize"
          v-model:currentPage="currentPage"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableTotal"
          background
        >
        </el-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent, onMounted } from "vue";
import Chart from "@/components/Chart";
import ChinaMap from "@/components/ChinaMap";
import { barOption } from "./chartOption/Bar.js";
export default defineComponent({
  name: "Home",
  components: {
    Chart,
    ChinaMap,
  },
  setup() {
    let data_ = reactive({
      barData: barOption,
      pieData: null,
      mapData: null,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      tableTotal: 400,
      currentPage: 1,
      currentRow: null,
      currentRowChange: null,
      value1: "",
    });
    const getPieData = (val) => {
      let chartData = val;
      let [color, arrName, arrValue, sum, pieSeries, lineYAxis] = [
        ["#6d9de0", "#49d896", "#f5d03a", "#f5853a", "#f5503a"],
        [],
        [],
        0,
        [],
        [],
      ];

      // 数据处理
      chartData.forEach((v) => {
        arrName.push(v.name);
        arrValue.push(v.value);
        sum += v.value;
      });

      // 图表option整理
      chartData.forEach((v, i) => {
        let chartnewData = chartData.slice(0, i);

        let newValue = chartnewData.reduce((a, b) => {
          return a + b.value;
        }, 0);
        v.startAngle = (newValue / sum) * 360;
        pieSeries.push({
          name: "学历",
          type: "pie",
          clockwise: false,
          hoverAnimation: false,
          radius: [75 - i * 15 + "%", 68 - i * 15 + "%"],
          center: ["40%", "50%"],
          label: {
            show: false,
          },
          startAngle: v.startAngle + 90,
          data: [
            {
              value: v.value,
              name: v.name,
            },
            {
              value: sum - v.value,
              name: "",
              itemStyle: {
                color: "rgba(0,0,0,0)",
              },
            },
          ],
        });
        pieSeries.push({
          name: "",
          type: "pie",
          silent: true,
          z: 1,
          clockwise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [75 - i * 15 + "%", 68 - i * 15 + "%"],
          // radius: ['50%', '70%'],
          center: ["40%", "50%"],
          label: {
            show: false,
          },
          data: [
            {
              value: sum,
              itemStyle: {
                color: "#e8f4ff", //圆环颜色
              },
            },
            {
              value: 0,
              name: "",
              itemStyle: {
                color: "red",
              },
            },
          ],
        });
        v.percent = ((v.value / sum) * 100).toFixed(0) + "%";
        lineYAxis.push({
          value: i,
          textStyle: {
            rich: {
              circle: {
                color: color[i],
                padding: [0, 5],
              },
            },
          },
        });
      });

      let option = {
        color: color,
        legend: {
          itemWidth: 14,
          itemHeight: 8,
          show: true,
          // icon: "circle",
          // top: "center",
          left: "65%",
          top: "center",
          formatter: (name) => {
            return (
              // {name|' + item.name + '}
              "{name|" +
              name +
              "} {percent|" +
              chartData.find((item) => {
                return item.name == name;
              }).percent +
              "}"
            );
          },
          textStyle: {
            color: "#beceff", //元字颜色
            fontSize: 14,
            rich: {
              name: {
                color: "#a6acba",
                fontSize: 14,
              },
              percent: {
                color: "#113061",
                fontSize: 14,
              },
            },
          },
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            data: lineYAxis,
          },
        ],
        xAxis: [
          {
            show: false,
          },
        ],
        series: pieSeries,
      };
      return option;
    };

    data_.barData.series[0].data = [
      709, 1999, 709, 2299, 3299, 2299, 1999, 2999, 1999, 709, 1999, 709,
    ];
    data_.barData.series[1].data = [
      709, 1999, 709, 2299, 3299, 2299, 1999, 2999, 1999, 709, 1999, 709,
    ];
    let PieData_ = [
      {
        name: "20岁以下",
        value: 20,
      },
      {
        name: "20-40岁",
        value: 30,
      },
      {
        name: "40-60岁",
        value: 30,
      },
      {
        name: "60-80岁",
        value: 10,
      },
      {
        name: "80岁以上",
        value: 10,
      },
    ];
    data_.pieData = getPieData(PieData_);

    data_.mapData = [
      [
        {
          name: "重庆市",
          value: 0,
        },
      ],
      [
        {
          name: "广东省",
          value: 0,
        },
      ],
      [
        {
          name: "浙江省",
          value: 0,
        },
      ],
      [
        {
          name: "上海市",
          value: 0,
        },
      ],
      [
        {
          name: "江西省",
          value: 0,
        },
      ],
      [
        {
          name: "江苏省",
          value: 0,
        },
      ],
      [
        {
          name: "云南省",
          value: 0,
        },
      ],
      [
        {
          name: "福建省",
          value: 0,
        },
      ],
      [
        {
          name: "湖南省",
          value: 0,
        },
      ],
      [
        {
          name: "海南省",
          value: 0,
        },
      ],
      [
        {
          name: "贵州省",
          value: 0,
        },
      ],
      [
        {
          name: "四川省",
          value: 0,
        },
      ],
      [
        {
          name: "湖北省",
          value: 0,
        },
      ],
      [
        {
          name: "安徽省",
          value: 0,
        },
      ],
      [
        {
          name: "广西省",
          value: 0,
        },
      ],
    ];

    data_.currentRowChange = (val) => {
      data_.currentRow = val;
    };
    onMounted(() => {});

    return {
      ...toRefs(data_),
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./../../assets/style/function.scss";
.home {
  justify-content: space-between;
  flex-wrap: wrap;
  .common-bg {
    margin-bottom: px2(15);
    padding-top: px2(50);
    .title {
      height: px2(50);
      line-height: px2(50);
      font-size: px2(18);
      top: 0;
      left: 0;
      padding-left: px2(15);
    }
  }
  .bar-box,
  .pie-box {
    width: 49%;
    height: px2(420);
  }
  .progress-box {
    justify-content: space-around;
    flex-wrap: nowrap;
    padding: px2(30);
    .item {
      width: px2(164);
      border-radius: px2(6);
      padding: px2(10) 0;
      color: #fff;
      h5 {
        font-size: px2(20);
        line-height: px2(38);
      }
      p {
        font-size: px2(17);
        line-height: px2(24);
      }
      &:first-child {
        background-color: cornflowerblue;
      }
      &:nth-child(2) {
        background-color: rgb(10, 197, 19);
      }
      &:nth-child(3) {
        background-color: orange;
      }
      &:last-child {
        background-color: orangered;
      }
    }
  }
  .map-box {
    height: px2(800);
    color: rgb(11, 131, 243);
  }
}
</style>
