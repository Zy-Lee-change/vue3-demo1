import router from ".";
import store from "../store";

store.dispatch("CHECK_LOGIN");
router.beforeEach((from, to, next) => {
  console.log(store.state);
  if (to.name === "login") {
    next();
    return false;
  }
});
