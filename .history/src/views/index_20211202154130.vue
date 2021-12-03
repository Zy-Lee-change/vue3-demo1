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

<style></style>
