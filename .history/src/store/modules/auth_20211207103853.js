import router from "../../router";
const state = {
  name: "",
  menu: [],
  nav: [],
  page: {
    INDEX: true,
    INDEX_HOME: true,
    INDEX_GANTT: true,
    INDEX_FORMS: true,
  },
};
const mutations = {
  Operation(state) {
    console.log(state, router);
  },
};
// function filterRoute(route) {}

export default {};
