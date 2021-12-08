import router from ".";
import store from "../store";

store.dispatch("CHECK_LOGIN");
router.beforeEach((from, to, next) => {});
