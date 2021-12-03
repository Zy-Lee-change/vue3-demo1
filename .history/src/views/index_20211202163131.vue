<template>
  <navs class="nav-hover"></navs>
  <headers></headers>
  <div class="container h">
    <router-view />
  </div>
</template>

<script>
import Navs from "@/components/Nav";
import Headers from "@/components/Headers";
export default {
  components: {
    Navs,
    Headers,
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: px2(80) px2(20) px2(20);
  margin-left: px2(80);
  background-color: #f3f3f3;
  overflow-y: auto;
}
.nav-hover {
  float: left;
}
</style>
