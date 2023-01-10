<template>
  <div class="chart-container" ref="chartBox"></div>
</template>

<script>
import * as d3 from "d3";
// import relation_data from "./data/graph";
import { getGraph } from "./newGraph";
import * as _ from "underscore";
// import { loadCSVData } from "./data/csvParse";
export default {
  name: "relation",
  props: ["hasShow"],
  data() {
    return {
      /* 图表数据 */
      data: null,
      /* svg */
      svg: null,
      /* 显示动画定时 */
      showInterval: -1,
      /* 力向模拟 */
      simulation: null,
      // 连线方法
      linkFun: null,
      /* 拖动偏移 */
      dragGroup: null,
      dragFun: null,
      dragTrans: { x: 0, y: 0 },
      dragStart: { x: 0, y: 0 },
      /* 缩放偏移 */
      scaleGroup: null,
      zoomFun: null,
      /* 缩放比例 */
      scaleTrans: 1,
      /* 节点 */
      nodeGroup: null,
      nodes: null,
      /* 节点名称 */
      labelGroup: null,
      labels: null,
      /* 线条 */
      lineGroup: null,
      lines: null,
      // 当前展示的节点
      showNodes: [],
      // 选中节点的关联线条
      sellinks: [],
      // 当前展示的线条
      showLines: [],
      // 判断是否已经加载动画
      firstEnter: false,
    };
  },
  watch: {
    hasShow(val) {
      if (!this.firstEnter && val === 2) {
        this.firstEnter = true;
        this.initChart();
      }
    },
  },
  mounted() {
    // 加载csv数据-进行节点解析处理
    // loadCSVData();

    this.data = getGraph();
    // this.data.links = [];
    // this.data.nodes = [];
  },
  destroyed() {
    // 清除定时显示
    clearInterval(this.showInterval);
    // 清除仿真立场和交互事件
    if (this.simulation) {
      this.simulation.on("tick", null);
      this.simulation.stop();
      this.simulation = null;
    }
    if (this.nodes) {
      this.nodes.on("click", null);
      this.nodes.on("mouseover", null);
      this.nodes.on("mouseleave", null);
      this.nodes = null;
    }
    if (this.dragFun) {
      this.dragFun.on("start", null);
      this.dragFun.on("drag", null);
      this.dragFun = null;
    }
    if (this.zoomFun) {
      this.zoomFun.on("zoom", null);
      this.dragFun = null;
    }
  },

  methods: {
    initChart() {
      const dom = this.$refs.chartBox;
      const { width, height } = dom.getBoundingClientRect();
      const { data } = this;

      // svg
      this.svg = d3.select(dom).append("svg");
      this.svg.attr("viewBox", [-width / 2, -height / 2, width, height]);
      this.svg.style("width", width + "px");
      this.svg.style("height", height + "px");
      // 创建箭头
      const defs = this.svg.append("defs");
      const arrowMk = defs
        .append("marker")
        .attr("id", "arrow")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 12)
        .attr("markerHeight", 12)
        .attr("viewBox", "0 0 12 12")
        .attr("refX", 20)
        .attr("refY", 6)
        .attr("orient", "auto");
      const arrPath = "M4,4 L10,6 L4,8 L4,6 L4,4";
      arrowMk.append("path").attr("d", arrPath).attr("fill", "#F00");
      // 创建图标
      this.createIcon(defs, "./static/imgs/icon_1.png", "icon_1");
      this.createIcon(defs, "./static/imgs/icon_2.png", "icon_2");
      this.createIcon(defs, "./static/imgs/icon_3.png", "icon_3");

      // 创建连线
      const linkFun = d3.forceLink(data.links);
      linkFun.id((d) => d.id);
      this.linkFun = linkFun;
      // 创建力场
      this.simulation = d3.forceSimulation().nodes(data.nodes);
      //   this.simulation = d3.layout.force();
      // 仿真模型
      const forceFun = d3.forceManyBody();
      forceFun.strength(-300);

      // 设置属性
      this.simulation
        .force("link", linkFun)
        .force("charge", forceFun)
        .force("center", d3.forceCenter)
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .alpha(2)
        .alphaDecay(0.5)
        .velocityDecay(0.2)
        .on("tick", this.ticked);
      // 创建供拖动的组合
      this.dragGroup = this.svg.append("g");
      //定义拖拽函数
      // this.dragFun = d3.behavior.drag().on("drag", this.dragmove);
      this.dragFun = d3
        .drag()
        .on("start", this.dragstart)
        .on("drag", this.dragmove);
      this.svg.call(this.dragFun);
      // 定义缩放对象
      this.scaleGroup = this.dragGroup.append("g");
      // 定义缩放函数
      const zoomFun = d3.zoom().on("zoom", (z) => {
        this.scaleTrans = z.transform.k;
        // this.scaleGroup.attr("transform", z.transform);
        this.scaleGroup.attr("transform", `scale(${z.transform.k})`);
        this.scaleTrans < 1 ? (this.scaleTrans = 1) : 1;

        // 定义图标的缩放
        const s = 24 / this.scaleTrans;
        this.svg.selectAll("pattern").attr("width", s).attr("height", s);
        this.svg.selectAll("image").attr("width", s).attr("height", s);

        // 缩放后重新定义
        this.ticked();
      });
      this.zoomFun = zoomFun;
      this.svg.call(zoomFun);

      // 创建显示的节点和线条
      // 线条
      this.lineGroup = this.scaleGroup
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0);
      this.lines = this.lineGroup
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .attr("stroke", (d) => {
          return d.cross ? "#7a007e" : "#371cff";
        });
      // 节点
      this.nodeGroup = this.scaleGroup
        .append("g")
        .attr("stroke", "transparent")
        .attr("fill", () => {
          return "transparent";
        })
        .attr("stroke-width", 1.5);
      this.nodes = this.nodeGroup
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 12)
        .attr("fill", (d) => {
          switch (d.type) {
            case "bts":
              return "url(#icon_3)";
            case "pow":
              return "url(#icon_2)";
            case "trans":
              return "url(#icon_1)";
            default:
              return "";
          }
        })
        // 鼠标移入 显示名称
        .on("mouseover", (d, i) => {
          if (!i.visible) return;
          this.data.nodes.map((item) => (item.labelShow = false));
          i.labelShow = true;
          this.ticked();
        })
        // 鼠标离开,隐藏名称
        .on("mouseleave", (d, i) => {
          if (!i.visible) return;
          i.labelShow = false;
          this.ticked();
        })
        // 选中高亮线条
        .on("click", (el, d) => {
          // 清空历史选中
          this.sellinks = [];
          // 遍历所有节点进行选中
          _.map(this.data.links, (item) => {
            if (item.source == d || item.target == d) {
              this.sellinks.push(item.id);
            }
          });
          console.log("high lines:", this.sellinks);
          // 通知svg刷新
          this.ticked();
        });
      // 名称
      this.labelGroup = this.scaleGroup.append("g").attr("fill", "transparent");
      this.labels = this.labelGroup
        .selectAll("text")
        .data(data.nodes)
        .enter()
        .append("text")
        .text((d) => d.name);
      this.showInterval = setInterval(this.frameShow, 700);
    },
    /* 创建图标 */
    createIcon(defs_, url_, id_) {
      const icon_1 = defs_
        .append("pattern")
        .attr("id", id_)
        .attr("x", 0)
        .attr("y", 0)
        // .attr("width", 169)
        // .attr("height", 169);
        .attr("width", 24)
        .attr("height", 24);
      icon_1
        .append("image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 24)
        .attr("height", 24)
        .attr("xlink:href", url_);
    },
    dragmove(d) {
      this.dragTrans.x += d.dx;
      this.dragTrans.y += d.dy;
      this.dragGroup.attr(
        "transform",
        `translate(${this.dragTrans.x},${this.dragTrans.y})`
      );
    },
    // 琢帧显示
    frameShow() {
      if (!this.data.frames.length) return;
      const frame = this.data.frames.shift();
      // 添加到显示列表中
      this.showNodes = this.showNodes.concat(frame.nodeIDS);
      this.showLines = this.showLines.concat(frame.lineIDS);
      // 设置显示隐藏
      this.data.nodes.map((item) => {
        item.visible = _.find(this.showNodes, (nItem) => {
          return nItem == item.id;
        })
          ? true
          : false;
      });
      this.data.links.map((item) => {
        item.visible = _.find(this.showLines, (nItem) => {
          return nItem == item.id;
        })
          ? true
          : false;
      });
      this.ticked();
    },
    lineLength(sVec, tVec) {
      const x = Math.abs(sVec.x - tVec.x);
      const y = Math.abs(sVec.y - tVec.y);
      return Math.sqrt(x * x + y * y);
    },
    ticked() {
      this.nodes
        .attr("fill-opacity", (d) => {
          return d.visible ? 1 : 0;
        })
        .attr("stroke-opacity", (d) => {
          return d.visible ? 1 : 0;
        })
        .attr("r", () => {
          return 12 / this.scaleTrans;
        })
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
      this.labels
        // .attr("fill", (d) => {
        //   // return d.visible ? "#FFF" : "transparent";
        //   return d.labelShow ? "#FFF" : "transparent";
        // })
        .style("display", (d) => {
          // return d.visible ? "#FFF" : "transparent";
          return d.labelShow ? "block" : "none";
        })
        .style("font-size", () => {
          return 14 / this.scaleTrans;
        })
        .attr("x", (d) => {
          return d.x + 20 / this.scaleTrans;
        })
        .attr("y", (d) => d.y);
      this.lines
        .attr("stroke-width", (d) => {
          let w = 1;
          if (this.sellinks.indexOf(d.id) != -1) {
            w = 3;
          }
          return w / this.scaleTrans;
        })
        .attr("stroke-opacity", (d) => {
          if (d.visible) {
            let op = 0.5;
            if (this.sellinks.indexOf(d.id) != -1) {
              op = 1;
            }
            return op;
          }
          return 0;
        })
        .attr("marker-end", (d) => {
          return d.visible ? "url(#arrow)" : "";
        })
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
    },
  },
};
</script>

<style>
.chart-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.chart-container svg circle {
  cursor: pointer;
}
.chart-container svg line {
  /* stroke-dasharray: 1000 0;
  stroke-width: 2;
  stroke: #f00; */
  transition: stroke-opacity 0.5s linear;
  /* stroke-width: 1; */
  /* transition: stroke-dasharray 0.5s linear; */
}
.chart-container svg text {
  fill: white;
  dominant-baseline: central;
  user-select: none;
  pointer-events: none;
  font-size: 14px;
}
</style>
