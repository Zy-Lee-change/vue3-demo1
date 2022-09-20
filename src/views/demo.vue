<template>
  <div class="demo">{{ ind }}</div>
  <comp-one
    :msg="oneMsg"
    @one="changeOne"
    @two="changeOne"
    v-model:three="threeVal"
  ></comp-one>
  <div class="a1">
    <div class="a2">
      <div class="a3">
        <div class="a4" ref="a4"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CompOne from "./setupScript/CompOne.vue";
import { type, uniqStr, firstAppear, parentNodes } from "../utils/usualMethod";
import { onMounted, ref } from "vue";
let ind = ref(1);
console.log(type(true));
console.log(uniqStr("aabbccddefgghhai"));
console.log(firstAppear("aabbccddefgghhai"));

let oneMsg = ref("comp-one");
let a4 = ref();
let threeVal = ref({
  a: "comp-three",
  b: "comp-three1",
});
const changeOne = (val) => {
  oneMsg.value = val ?? "111";
  threeVal.value = {
    a: "comp-three-1",
    b: "comp-three1-1",
  };
};
setTimeout(() => {
  ind.value = 2;
}, 2000);

onMounted(() => {
  console.log(a4);
  console.log(parentNodes(a4.value, 3));
});
</script>
