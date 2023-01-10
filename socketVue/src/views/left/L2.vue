<template>
  <div class="wh pr">
    <div class="wh pr" v-show="state === 1">
      <img
        src="./../../assets/images/left/l2.png"
        class="h common-img"
        alt=""
      />
      <div class="add pa cursor" @click="sendSocket(1)"></div>
      <div class="model-bg pa wh" v-if="taskDialog">
        <div class="select-box pa">
          <div class="input-box pr t-left">
            <p class="w cursor" @click="sendSocket(2)">历史告警挖掘</p>
            <i class="pa slide-icon" :class="{ ac: slides }"></i>
            <ul class="slide pa" v-show="slides">
              <li class="ac cursor" @click="sendSocket(2)">历史告警挖掘</li>
              <li>周期告警挖掘</li>
              <li>人工经验</li>
              <li>文本挖掘</li>
            </ul>
          </div>

          <div class="btn-box">
            <div class="btns dl cursor" @click="sendSocket(3)">确定</div>
            <div class="btns dl cursor">取消</div>
          </div>
        </div>
      </div>
      <div class="model-bg pa wh" v-show="fileDialog">
        <div class="file-box pa">
          <img
            src="./../../assets/images/left/l2-file-dialog.png"
            alt=""
            class="w"
          />
          <div
            class="file cursor pa"
            :class="{ ac: fileAc }"
            @click="fileActive"
            @dblclick="toAnalyse(0)"
          ></div>
          <div class="btn-file pa cursor" @click="toAnalyse(1)"></div>
        </div>
      </div>
    </div>

    <!-- 故障传播图 -->
    <div class="img-box pa h" v-show="state === 2">
      <img src="./../../assets/images/left/l5.png" class="h" alt="" />
      <div class="progress-bar pa" v-show="percentShow">
        <div class="progress-box pr">
          <div class="bar-bg h">
            <div class="bar h" :class="{ barS: percent > 0 }"></div>
          </div>
          <span class="pa percent t-right">{{ percent }}%</span>
        </div>
      </div>
      <div class="chart-box pa" ref="myChart">
        <relation :hasShow="state"></relation>
      </div>
    </div>

    <!-- 切换故障 -->
    <div
      class="tab-btn pa cursor"
      v-if="state === 2 || state === 3"
      @click="sendSocket(5)"
    >
      <div class="w50 h"></div>
      <div class="w50 h"></div>
    </div>

    <!-- 故障列表 -->
    <div class="wh pr" v-show="state === 3">
      <img
        src="./../../assets/images/left/l6.png"
        class="h common-img"
        alt=""
      />
      <div class="table-list pa">
        <table>
          <tbody>
            <tr v-for="item in tableData" v-bind:key="item.key">
              <td>{{ item.n1 }}</td>
              <td>{{ item.n2 }}</td>
              <td>{{ item.n3 }}</td>
              <td>{{ item.n4 }}</td>
              <td>{{ item.n5 }}</td>
              <td>删除</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
// import { graph } from "./chartData/l5";
import graph from "./chartData/graph";
import * as echarts from "echarts";
import tableData from "./tableData";
import Relation from "./../../components/Relation";
export default {
  name: "L2",
  props: [],
  data() {
    return {
      slides: false, // 新增任务弹窗的下拉
      taskDialog: false, // 新增任务弹窗
      fileDialog: false, // 选择文件弹窗
      fileAc: false, // 文件夹选中状态
      state: 1, // 显示模块的步骤
      graph: JSON.parse(JSON.stringify(graph)),
      graphData: {
        node: [],
        link: [],
      },
      graphInd: 1,
      graphInter: null,
      chartOption: null, // 关系图的option
      tableData: tableData,
      firstUpdate: true, // 本页是否为第一次加载,判断是否需要重绘关系图
      percent: 0,
      percentInterVal: null,
      percentShow: false,
    };
  },
  components: { Relation },
  computed: {},
  sockets: {
    l2state(data) {
      if (typeof data === "object") {
        this.redrawLink(data.id);
        return false;
      }
      switch (data) {
        case 1: // 打开新增任务弹窗
          this.showTask();
          break;
        case 2: // 任务弹窗下拉切换
          this.changeSlide();
          break;
        case 3: // 打开选择文件弹窗
          this.showFile();
          break;
        case 4: // 跳转到故障传播图
          this.toLinkChart();
          break;
        case 5:
          this.changeState();
          break;
      }
    },
  },
  watch: {
    state(val) {
      // if (oldVal === 2) {
      //   // 从步骤2跳出，销毁关系图
      //   this.myChart.clear();
      // }
      if (val === 2) {
        if (this.firstUpdate) {
          this.percentShow = true;
          this.percentInterVal = setInterval(() => {
            this.percent++;
            if (this.percent === 100) {
              setTimeout(() => {
                this.percentShow = false;
                this.firstUpdate = false;
              }, 500);
              clearInterval(this.percentInterVal);
              this.percentInterVal = null;
            }
          }, 200);
          // setTimeout(() => {
          //   this.iniChart();
          // }, 100);
        }
      }
    },
  },
  methods: {
    // 发送socket
    sendSocket(i) {
      this.$socket.emit("l2state", i);
    },
    fileActive() {
      this.fileAc = !this.fileAc;
    },
    // 绘制关系图
    iniChart() {
      this.myChart = echarts.init(this.$refs.myChart);
      this.graph.nodes.map((item) => {
        item.symbolSize = 10;
      });
      this.chartOption = {
        tooltip: {
          show: false,
        },
        legend: [
          {
            show: false,
            data: this.graph.categories.map(function (a) {
              return a.name;
            }),
          },
        ],
        series: [
          {
            name: "Les Miserables",
            type: "graph",
            layout: "force",
            // data: this.graphData.node,
            // links: this.graphData.link,
            data: this.graph.nodes,
            links: this.graph.links,
            categories: this.graph.categories,
            edgeSymbol: ["none", "arrow"],
            roam: true,
            zoom: 1.4,
            force: {
              repulsion: 100,
              layoutAnimation: false,
              edgeLength: [30, 110],
            },
            label: {
              position: "right",
              color: "#fff",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            scaleLimit: {
              // min: 0.4,
              // max: 2,
            },
            lineStyle: {
              color: "source",
              curveness: 0.1,
              width: 1,
            },
            animationDelay: (idx) => {
              if (this.firstUpdate) {
                return idx * 4;
              }
            },
          },
        ],
      };

      // if (this.firstUpdate) {
      //   this.chartOption.series[0].animationDelay = function (idx) {
      //     // 越往后的数据延迟越大
      //     return idx * 4;
      //   };
      // }

      this.myChart.setOption(this.chartOption);

      // this.graphInter = setTimeout(() => {
      //   this.graphData.node = this.graphData.node.concat(
      //     this.graph.nodesArr[this.graphInd]
      //   );
      //   this.graphData.link = this.graphData.link.concat(
      //     this.graph.linksArr[this.graphInd]
      //   );
      //   this.chartOption.series[0].data = this.graphData.node;
      //   this.chartOption.series[0].links = this.graphData.link;
      //   this.myChart.setOption(this.chartOption);
      //   this.graphInd++;
      //   if (this.graphInd > 6) {
      //     clearInterval(this.graphInter);
      //     this.graphInter = null;
      //   }
      // }, 4000);

      this.firstUpdate = false;
      this.myChart.on("click", (e) => {
        this.$socket.emit("l2state", { id: e.data.id });
      });
    },
    // 接受socket重绘图标
    redrawLink(id) {
      this.graph.nodes.map((item) => {
        item.symbolSize = 10;
        item.fixed = true;
      });
      this.graph.links.map((item) => {
        if (item.target === id || item.source === id) {
          item.lineStyle = {
            color: "source",
            curveness: 0.1,
            width: 4,
          };
          item.lable = {
            show: true,
          };
        } else {
          delete item.lineStyle;
        }
      });

      this.myChart.setOption(this.chartOption);
    },
    // 打开新增任务弹窗
    showTask() {
      this.taskDialog = true;
    },
    // 切换任务下拉
    changeSlide() {
      this.slides = !this.slides;
    },
    // 打开选择文件弹窗
    showFile() {
      this.fileDialog = true;
    },
    // 改变步骤
    toAnalyse(i) {
      // 文件夹没选中不改变步骤
      if (i && !this.fileAc) {
        return false;
      }
      this.sendSocket(4);
    },
    // 跳转到故障
    toLinkChart() {
      this.state = 2;
    },
    // changeState
    changeState() {
      this.state = this.state === 3 ? 2 : 3;
    },
    deteleObject(obj) {
      var uniques = [];
      var stringify = {};
      for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function (a, b) {
          return Number(a) - Number(b);
        });
        var str = "";
        for (var j = 0; j < keys.length; j++) {
          str += JSON.stringify(keys[j]);
          str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!Object.prototype.hasOwnProperty.call(stringify, str)) {
          uniques.push(obj[i]);
          stringify[str] = true;
        }
      }
      // uniques = uniques;
      return uniques;
    },
  },
  created() {
    this.graphData = {
      node: this.graph.nodesArr[0],
      link: this.graph.linksArr[0],
    };
  },
  mounted() {},
};
</script>
<style scoped type="text/scss" lang="scss">
@import "../../assets/styles/common/functions";
* {
  user-select: none;
}
.add {
  width: px2vw(206);
  height: px2vw(60);
  background-image: url("../../assets/images/left/l2-btn.png");
  background-size: 100% 100%;
  right: px2vw(219);
  top: px2vw(556);
  transition: all 0.2s;
  &:active {
    box-shadow: 0 0 px2vw(16) px2vw(8) rgba(0, 0, 0, 0.3) inset;
  }
}
.model-bg {
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;

  .select-box {
    width: px2vw(1186);
    height: px2vw(398);
    background-image: url("../../assets/images/left/l2-select.png");
    background-size: 100%;
    left: 50%;
    margin-left: px2vw(-592.5);
    top: px2vw(422);
    padding-top: px2vw(112);
    color: #fff;
    font-size: px2vw(30);
    .input-box {
      width: px2vw(751);
      margin-left: px2vw(218);
      p {
        height: px2vw(65);
        line-height: px2vw(65);
        border: 1px solid #a0aed5;
        padding-left: px2vw(42);
        background-color: #8d93a1;
        border-radius: px2vw(8);
      }
      .slide-icon {
        width: px2vw(26);
        height: px2vw(16);
        background-image: url("../../assets/images/left/l2-select-icon.png");
        background-size: 100% 100%;
        top: 50%;
        right: px2vw(25);
        margin-top: px2vw(-8);
        transition: all 0.2s;
        transform: rotate(-180deg);
        &.ac {
          transform: rotate(0deg);
        }
      }
      .slide {
        width: 100%;
        top: 104%;
        box-shadow: 0 0 px2vw(8) px2vw(4) rgba(0, 0, 0, 0.2);
        background-color: #8d93a1;
        border-radius: px2vw(8);
        padding: px2vw(8) 0;
        animation: toHeight 0.2s linear;
        overflow: hidden;
        li {
          line-height: px2vw(80);
          padding-left: px2vw(42);
          &.ac {
            background-color: #838999;
          }
        }
        @keyframes toHeight {
          from {
            height: px2vw(0);
          }
          to {
            height: px2vw(336);
          }
        }
      }
    }

    .btn-box {
      margin-top: px2vw(50);
      .btns {
        line-height: px2vw(64);
        padding: 0 px2vw(36);
        font-size: px2vw(30);
        border: 1px solid #677c9f;
        border-radius: px2vw(6);
        margin: 0 px2vw(25);
        letter-spacing: px2vw(4);
        &:first-child {
          background-color: #677c9f;
        }
      }
    }
  }

  .file-box {
    width: px2vw(2354);
    left: 50%;
    margin-left: px2vw(-1177);
    top: px2vw(381);

    .file {
      width: px2vw(258);
      height: px2vw(337);
      background-image: url("../../assets/images/left/l2-file.png");
      background-size: 100% 100%;
      top: px2vw(259);
      left: px2vw(436);
      border: 1px solid #fff;
      transition: all 0.2s;
      &.ac,
      &:hover {
        border: 1px solid #98d0ff;
        background-color: #cce8ff;
      }
    }

    .btn-file {
      width: px2vw(216);
      height: px2vw(60);
      bottom: px2vw(32);
      right: px2vw(291);
    }
  }
}
.img-box {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  .progress-bar {
    width: px2vw(3170);
    height: px2vw(28);
    top: px2vw(402);
    left: px2vw(561);
    .progress-box {
      width: px2vw(3070);
      height: 100%;
      padding: px2vw(6) px2vw(14);
      border: 1px solid #343539;
      .bar-bg {
        border-radius: px2vw(10);
        background-color: #343539;
        overflow: hidden;
        .bar {
          width: 0;
          background-color: #93cd78;
          transition: all 20s linear;
          &.barS {
            width: 100%;
          }
        }
      }
      .percent {
        width: px2vw(100);
        font-size: px2vw(28);
        line-height: px2vw(28);
        top: 0;
        right: px2vw(-100);
        color: #fff;
      }
    }
  }
  .chart-box {
    width: px2vw(3170);
    height: px2vw(1650);
    top: px2vw(435);
    left: px2vw(561);
  }
}
.tab-btn {
  width: px2vw(684);
  height: px2vw(92);
  display: flex;
  justify-content: center;
  top: px2vw(307);
  left: px2vw(494);
  z-index: 1;
}
.table-list {
  width: px2vw(3023);
  height: px2vw(1020);
  left: px2vw(667);
  top: px2vw(1108);
  overflow-y: auto;
  table {
    td {
      height: px2vw(102);
      text-align: left;
      color: rgba(255, 255, 255, 0.9);
      font-size: px2vw(30);
      padding-left: px2vw(70);
    }
    td:first-child {
      width: px2vw(897);
    }
    td:nth-child(2) {
      width: px2vw(404);
    }
    td:nth-child(3) {
      width: px2vw(699);
    }
    td:nth-child(4) {
      width: px2vw(437);
    }
    td:nth-child(5) {
      width: px2vw(305);
    }
  }
}
</style>
