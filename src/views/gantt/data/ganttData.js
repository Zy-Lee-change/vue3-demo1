/*
 * @Author: Ken
 * @Date: 2021-07-13 09:57:56
 * @LastEditTime: 2021-07-26 16:39:49
 * @Description:
 * @FilePath: \vue3-demo1\src\views\gantt\data\ganttData.js
 * Go Ring!
 */
export const Gantt = [
  {
    taskName: "时代峰峻",
    taskId: 1,
    children: [
      {
        task: "收到了借款方",
        tasker: "孙某某",
        startTime: 1597284761000,
        endTime: 1597457561000,
      },
      {
        task: "收到了借款方1",
        tasker: "陈某某",
        startTime: 1594606361000,
        endTime: 1594606361000,
      },
    ],
  },
  {
    taskName: "发光时代",
    taskId: 1,
    children: [
      {
        task: "箪食豆羹",
        tasker: "高某某",
        startTime: 1610676761000,
        endTime: 1611281561000,
      },
      {
        task: "丰收蛋糕豆腐干沙",
        tasker: "李某某",
        startTime: 1613959961000,
        endTime: 1614651161000,
      },
    ],
  },
];
