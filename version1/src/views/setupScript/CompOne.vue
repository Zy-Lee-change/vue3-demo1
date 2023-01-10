<template>
  <h1 @click="h1click">{{ msg }}</h1>
  <h2 @click="h2click">{{ props.msg }}</h2>
  <el-input :value="three.a"></el-input>
  <el-input :value="three.b"></el-input>
</template>

<script setup>
// import { watch } from "vue";
const props = defineProps({
  msg: {
    type: String,
    default: "",
  },
  three: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["one", "two", "update:three"]);
const h1click = () => {
  emit("one", "new-one");
};
const h2click = () => {
  emit("two", "new-two");
};

// watch(
//   () => props.three,
//   (val) => {
//     emit("update:three", val);
//   },
//   { deep: true }
// );
</script>

<style lang="scss" scoped></style>
