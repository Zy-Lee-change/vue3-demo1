<template>
  <div class="svg-box"></div>
</template>

<script>
import { reactive, toRefs, defineComponent, onMounted } from "vue";
import * as d3 from "d3";
import graphData from "./../utils/graphData";
export default defineComponent({
  setup() {
    const state = reactive({
      count: 0,
      graph: graphData,
    });

    const drawForce = () => {
      let [width, height, imgW, imgH, radius] = [1360, 760, 40, 40, 50];

      let svg = d3
        .select(".svg-box")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      let simulation = d3.forceSimulation().nodes(this.graphData.nodes);
    };

    onMounted(() => {
      console.log(state.graph);
      drawForce();
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.svg-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
