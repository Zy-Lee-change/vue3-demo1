<template>
  <div class="gantt-container">
    <div class="common-bg pr">
      <div class="gantt-header pr df">
        <div class="pr inline-cell event-name"><span>时间名称</span></div>
        <div class="pr inline-cell charge-man"><span>负责人</span></div>
        <div class="pr inline-cell start-time"><span>开始时间</span></div>
        <div class="pr inline-cell end-time"><span>结束时间</span></div>
      </div>

      <div class="date pa t-left" ref="dateScroller" @scroll="dateScroll">
        <div class="date-box dl pr h">
          <div class="time pa">2021-05</div>
          <div class="day dl">
            <p>1</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>2</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>3</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>4</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>5</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>6</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>7</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>8</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>9</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>10</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>3</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>3</p>
            <div class="line"></div>
          </div>
          <div class="day dl">
            <p>3</p>
            <div class="line"></div>
          </div>
        </div>
      </div>

      <div class="gantt-body pr">
        <div class="tip pf" v-show="tipShow" ref="pTip">
          <p>已做时间</p>
          <p>2021-05-01 ~ 2022-04-01</p>
        </div>
        <div class="item">
          <div class="first-level df">
            <div class="pr t-left inline-cell event-name">
              <span class="parent w">某某某某</span>
            </div>
            <div class="pr inline-cell charge-man"><span></span></div>
            <div class="pr inline-cell start-time"><span></span></div>
            <div class="pr inline-cell end-time"><span></span></div>
            <div class="pr inline-cell gantt pr"></div>
          </div>
          <div class="second-level df">
            <div class="pr t-left inline-cell event-name">
              <span class="child w">某某某某</span>
            </div>
            <div class="pr inline-cell charge-man"><span></span></div>
            <div class="pr inline-cell start-time"><span></span></div>
            <div class="pr inline-cell end-time"><span></span></div>
            <div class="pr inline-cell gantt pr">
              <div
                class="process pa cursor"
                style="width: 60px"
                :style="{ left: `${60 - scrollWidth}px` }"
                @mouseover="tipOver"
                @mousemove="tipMove"
                @mouseout="tipOut"
              ></div>
              <div
                class="process pa cursor"
                style="width: 300px"
                :style="{ left: `${300 - scrollWidth}px` }"
              ></div>
            </div>
          </div>
          <div class="second-level df">
            <div class="pr t-left inline-cell event-name">
              <span class="child w">某某某某</span>
            </div>
            <div class="pr inline-cell charge-man"><span></span></div>
            <div class="pr inline-cell start-time"><span></span></div>
            <div class="pr inline-cell end-time"><span></span></div>
            <div class="pr inline-cell gantt pr"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, getCurrentInstance, toRefs } from "vue";
export default {
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    console.log(props, context, proxy);
    const dateScroller = ref(null);
    const pTip = ref(null);
    let data_ = reactive({
      dateScroll: null, // 日期滚动带动任务滚动
      scrollWidth: 0, // 日期滚动的距离
      tipMove: null, // task tip
      tipOver: null,
      tipOut: null,
      tipShow: false,
    });
    data_.dateScroll = (e) => {
      console.log(e, dateScroller.value.scrollLeft);
      data_.scrollWidth = dateScroller.value.scrollLeft;
    };
    data_.tipOver = (e) => {
      console.log(e);
      data_.tipShow = true;
    };
    data_.tipMove = (e) => {
      console.log(e);
      pTip.value.style.top = e.clientY + 25 + "px";
      pTip.value.style.left = e.clientX + "px";
    };
    data_.tipOut = (e) => {
      console.log(e);
      data_.tipShow = false;
    };

    //这里面可以放钩子
    onMounted(() => {});

    return {
      ...toRefs(data_),
      dateScroller,
      pTip,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/style/function.scss";
.gantt-container {
  font-size: 0;
  white-space: nowrap;
  .inline-cell {
    &:first-child {
      width: 18%;
    }
    &:nth-child(2) {
      width: 7%;
    }
    &:nth-child(3),
    &:nth-child(4) {
      width: 10%;
    }
    &:nth-child(5) {
      /* width: 55%; */
    }
    &:not(.gatt) {
      border-right: 1px solid #eaeaea;
    }
  }
  .gantt-header {
    border-bottom: 1px solid #eaeaea;
    .inline-cell {
      height: px2(60);
      span {
        line-height: px2(20);
        color: #5c5f66;
        font-size: px2(16);
        @include pCenter;
      }
    }
  }
  .date {
    width: 55%;
    height: calc(100% + 17px);
    overflow-y: hidden;
    overflow-x: auto;
    font-size: 0;
    white-space: nowrap;
    top: 0;
    left: 45%;
    .date-box {
      padding-top: px2(36);
      .time {
        line-height: px2(24);
        font-size: px2(14);
        left: px2(12);
        top: px2(8);
      }
      .day {
        width: px2(60);
        height: 100%;
        p {
          line-height: px2(24);
          font-size: px2(13);
          text-align: center;
        }
        .line {
          height: 100%;
          border-right: 1px dashed #eaeaea;
        }
      }
    }
  }
  .gantt-body {
    width: calc(100% + 17px);
    max-height: px2(250);
    overflow-y: scroll;
    overflow-x: hidden;
    .tip {
      top: px2(-20);
      left: 0;
      font-size: px2(14);
      background-color: #fff;
      box-shadow: 0 0 px2(6) px2(2) rgba(0, 0, 0, 0.2);
      padding: px2(8) px2(20);
      z-index: 1;
      transform: translateX(-50%);
      p {
        &:first-child {
          line-height: px2(22);
        }
        &:last-child {
          line-height: px2(19);
          color: #999;
        }
      }
    }
    .first-level {
      .event-name .parent {
        padding-left: px2(20);
      }
    }
    .second-level {
      transition: all 0.3s;
      .event-name .child {
        padding-left: px2(40);
      }
      &:hover {
        background-color: rgba(218, 218, 218, 0.2);
      }
    }
    .gantt {
      max-width: 55%;
      flex-grow: 1; /*铺满剩余空间*/
      .process {
        height: px2(20);
        top: 50%;
        margin-top: px2(-10);
        background-color: #ccc;
        &:before,
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 1px;
          border-top: 2px dashed transparent;
          left: 0;
          transition: all 0.2s;
        }
        &:before {
          top: px2(-4);
        }
        &:after {
          bottom: px2(-4);
        }
        &:hover:before,
        &:hover:after {
          border-color: #ccc;
        }
      }
    }
    .inline-cell {
      height: px2(48);
      font-size: px2(15);
      span {
        line-height: px2(18);
        color: #3a3c41;
        @include pCenter;
      }
    }
  }
}
</style>
