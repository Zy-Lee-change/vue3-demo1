import * as _ from "underscore";
// 关系图数据
// node:{id:string}
// link:{source:string,target:string}
function getLevelData(data, cores_) {
  // const data = {
  //   nodes: [],
  //   links: [],
  // }

  // 解构
  const { nodes, links } = data;
  // 查找树根
  const sourceList = _.uniq(_.pluck(links, "source"));
  const targetList = _.uniq(_.pluck(links, "target"));
  const coreList = _.difference(sourceList, targetList);
  console.log("center list:", coreList);

  // 时间轴， 分层显示数据
  // time item: nodes links
  const dataTimeline = [];
  // 已经处理过的节点
  const truesNode = [];

  // step1 建立中间点
  //   const cores = ["p1", "p2"];
  const cores = cores_;

  // 查找节点是否有作为起点

  // step 2 遍历节点列表拆分层次
  function graphLevel(points) {
    // 查找中心节点列表
    let coreTemp = _.filter(nodes, (item) => {
      const inCore = _.find(points, { id: item.id });
      return inCore;
    });
    // 过滤已经处理过的节点
    coreTemp = _.difference(coreTemp, truesNode);
    // 查找从当前中心点发散出去的连线
    const lines = _.filter(links, (link) => {
      return _.find(coreTemp, (cItem) => {
        return cItem.id === link.source;
      });
    });

    // 将当前层级数据添加到时间轴中
    dataTimeline.push({
      nodes: coreTemp,
      lines: lines,
    });
    // 查找下一层的节点
    const nextCores = [];
    // 遍历关联的连线目标点
    lines.map((line) => {
      // 查找该线条的目标节点
      const targetP = _.find(nodes, (item) => {
        return line.target === item.id;
      });
      if (!targetP) return;
      // 目标节点是否在已经处理过的列表中
      const inTruest = _.find(truesNode, { id: targetP.id });
      if (!inTruest) {
        nextCores.push(targetP);
      }
    });
    if (nextCores.length) {
      graphLevel(nextCores);
    }
  }

  graphLevel(cores);
  return dataTimeline;
}

export { getLevelData };

console.log(this.graph.links.length);
let partA = this.graph.links.slice(0, 400);
let partB = this.graph.links.slice(400, 800);
let partC = this.graph.links.slice(800, 1200);
let partD = this.graph.links.slice(1200, 1600);
let partE = this.graph.links.slice(1600, 2000);
let partF = this.graph.links.slice(2000, 2400);
let partG = this.graph.links.slice(2400);
let [arrA, arrB, arrC, arrD, arrE, arrF, arrG] = [[], [], [], [], [], [], []];
// console.log(partA, partB, partC, partD, partE, partF, partG);
partA.map((item) => {
  arrA.push(item.source);
  arrA.push(item.target);
});
partB.map((item) => {
  arrB.push(item.source);
  arrB.push(item.target);
});
partC.map((item) => {
  arrC.push(item.source);
  arrC.push(item.target);
});
partD.map((item) => {
  arrD.push(item.source);
  arrD.push(item.target);
});
partE.map((item) => {
  arrE.push(item.source);
  arrE.push(item.target);
});
partF.map((item) => {
  arrF.push(item.source);
  arrF.push(item.target);
});
partG.map((item) => {
  arrG.push(item.source);
  arrG.push(item.target);
});
arrA = this.unique(arrA);
arrB = this.unique(arrB);
arrC = this.unique(arrC);
arrD = this.unique(arrD);
arrE = this.unique(arrE);
arrF = this.unique(arrF);
arrG = this.unique(arrG);
// console.log(arrA, arrB, arrC, arrD, arrE, arrF, arrG);
let a = [];
a = a.concat(arrA, arrB);
a = this.unique(a); // 202
let sourceA = a.slice(141);
a = a.concat(arrC);
a = this.unique(a); // 275
let sourceB = a.slice(202);
a = a.concat(arrD);
a = this.unique(a); // 348
let sourceC = a.slice(275);
a = a.concat(arrE);
a = this.unique(a); // 424
let sourceD = a.slice(348);
a = a.concat(arrF);
a = this.unique(a); // 453
let sourceE = a.slice(424);
a = a.concat(arrG);
a = this.unique(a); // 453
let sourceF = a.slice(453);
let aa = [];
sourceF.map((items) => {
  let res = this.graph.nodes.filter((item) => {
    if (item.name === items) {
      return item;
    }
  });
  aa = aa.concat(res);
});

console.log(JSON.stringify(partG));
