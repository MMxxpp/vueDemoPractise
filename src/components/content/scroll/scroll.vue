<template>
<!--  ref主要是为了防止其他地方的类名相同时引用错误，做个标识-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "scroll",
  data(){
    return{
      scroll:null,
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 使得scroll中的按钮可点击
      click:true,
      //         获取滚动位置scroll：
// 获取滚动位置，则需要将betterscroll的属性probetype设置3,当 probeType 为1的时候，
//       会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
//       当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
//       如果没有设置该值，其默认值为 0，即不派发 scroll 事件
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,

    //   会检测 scroller 内部 DOM 变化，自动调用 refresh 方法重新计算来保证滚动的正确性。
    // 它会额外增加一些性能开销，如果你能明确地知道 scroller 内部 DOM 的变化时机并手动调用 refresh 重新计算，
    // 你可以把该选项设置为 false。
      observeDOM:true
    });

    //监听滚动位置，将位置传出去
    if (this.probeType==2 || this.probeType==3){
      this.scroll.on("scroll",(position) => {
        this.$emit("scroll",position)
      })
    }


    // 监听滚动到底部
    if (this.pullUpLoad){
      this.scroll.on("pullingUp",()=>{
        this.$emit("pullingUp")
        // console.log("下拉加载更多");
      })
    }


    // this.scroll.scrollTo();
  },
  methods:{
    // 定义一个函数使得点击按钮回到最开头的界面
    backTop(x,y,time){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      //this.scroll &&加上这个防止refresh找不到
      // console.log("....");
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y:0
    }
  }
}
</script>

<style scoped>

</style>