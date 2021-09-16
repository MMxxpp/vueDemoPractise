<template>
    <div id="home">
        <NavBar class="nav">
          <div slot="center">游戏商城</div>
        </NavBar>
      <tab-control class="tab-bar-item"
                   ref="tabControl1"
                   :title="['流行','精选','新款']"
                   @itemClick="itemClick" v-show="isFixedTab"></tab-control>
      <scroll class="content" ref="scroll" :probeType="3"
              @scroll="contentScroll" :pullUpLoad="true"
      @pullingUp="loadMore">
        <HomeSwiper :banner="banner" @swiperLoad="swiperLoad"></HomeSwiper>
        <recommend-view :recommend="recommend"></recommend-view>
        <feature-view></feature-view>
        <tab-control ref="tabControl2"
                     :title="['流行','精选','新款']"
                     @itemClick="itemClick"></tab-control>
        <goods-list :goods="showMess"></goods-list>
      </scroll>
<!--      .native监听原生组件，可以用来点击生成事件-->
      <back-top class="backTop" @click.native="backClick" v-show="showIn"></back-top>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl";
import goodsList from "components/content/Goods/goodsList";
import scroll from "components/content/scroll/scroll";


import HomeSwiper from "./child/HomeSwiper";
import recommendView from "./child/recommendView";
import featureView from "./child/featureView"


import {homeData,getGoodsMessage} from "../../network/home";
import {backTopMixin, itemsListenerMixin} from "../../common/mixin";

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    recommendView,
    featureView,
    TabControl,
    goodsList,
    scroll
  },

  data(){
    return {
      // result:[]
      banner:[],
      recommend:[],
      goods:{
        "pop":{page:0,list:[]},
        "new":{page:0,list:[]},
        "sell":{page:0,list:[]}
      },
      currentType:"pop",
      tabOffSetTop:0,
      // 刚开始不吸顶
      isFixedTab:false,
      saveY:0
    }

  },
  computed:{
    showMess(){
      return this.goods[this.currentType].list
    }
  },

  // 页面活跃时
  activated(){
    // 将saveY的数值复制，然后回到原来位置
    this.$refs.scroll.backTop(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },

  // 混入
  mixins:[itemsListenerMixin,backTopMixin],

  //野蛮退出时
  deactivated(){
    // 退出首页时，记录当前位置
    this.saveY=this.$refs.scroll.getScrollY()

    //不活跃时，items的imageLoad不在刷新
    this.$bus.$off("itemImageLoad",this.itemsListener)
  },


  //组件创建完后立刻发送请求
  created() {
    //调用方法-请求多数据
    this.homeData()
    //请求商品数据
    this.getGoodsMessage("pop")
    this.getGoodsMessage("new")
    this.getGoodsMessage("sell")


    // 组件一旦创建完成，立刻监听图片更新事件
    // 创建一个$bus的Vue实例
    // this.$bus.$on("itemImageLoad",() =>{
    //   // console.log("----");
    //   // 上拉/下拉加载后图片能迅速更新不会造成卡顿
    //   this.$refs.scroll.refresh()
    // })

  },

  mounted() {

  },

  methods:{

    homeData() {
      homeData().then(res =>{
        console.log(res);
        // 将请求到的数据保存在result中已免函数执行完后数据消失
        // this.result=res;
        this.banner=res.data.banner.list;
        this.recommend=res.data.recommend.list

      })
    },
    getGoodsMessage(type){
      // 在已有页数的基础上加一
      const page=this.goods[type].page+1;
      getGoodsMessage(type,page).then(res => {
        // console.log(res);
        // 将数据push进去goods中的对象list中去
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page+=1;
        // 每次数据加载完成后上拉或者下拉需要调用finishPullUp或finishPullDown来结束这些动作
        this.$refs.scroll.finishPullUp()
      })

    },

    //点击tabClick切换界面事件
    itemClick(index){
      // console.log(index)
      switch (index){
        case 0:
          this.currentType="pop"
          console.log("0")
              break
        case 1:
          this.currentType="new"
          console.log("1")
              break
        case 2:
          this.currentType="sell"
          console.log("2")
              break
      }

      //当我们点击任意一个tabcontrol时他们的currentIndex都能保持一致
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },

    contentScroll(position){
      // console.log(position);
      this.showIn=-(position.y)>1000

      // 判断tabcontrol是否需要吸顶（即position:fixd）
      this.isFixedTab=-(position.y)>this.tabOffSetTop
      // console.log("返回值为："+this.isFixedTab)
    },

    loadMore(){
      console.log("下拉加载更多");
      this.getGoodsMessage(this.currentType)
      // refresh(): 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      // 非下拉加载触发页面的数据更新（dom更新），如果不调用refresh方法重新计算，
      // 则‘content’的高度会保持dom更新之前的状态，最终导致滚动错乱
      this.$refs.scroll.refresh()
    },

    swiperLoad(){
      // 所有组件都有属性$el：用于获取组件中的元素
      // 因为homeSwiper四张图片调了四次，但是我们需要掉一次
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffSetTop=this.$refs.tabControl2.$el.offsetTop
    }

  }

}
</script>

<style scoped>
#home{
  position: relative;
  /*100vh表示占示图层100%的比例*/
  height: 100vh;
}
.nav{
  background-color: var(--color-tint);
}
.tab-bar-item{
/*  这是一个结合了 position:relative 和 position:fixed */
/*两种定位功能于一体的特殊定位，适用于一些特殊场景。*/
  position: relative;
  z-index: 11;
  top: 44px;
}
.content{
  /*height: 300px;*/
  /*通过定位使content长度确定*/
  position: absolute;
  top: 44px;
  /*top: 0;*/
  left: 0;
  right: 0;
  bottom: 49px;
  /*overflow: hidden;*/

}

.backTop{
  position: fixed;
  right: 5px;
  bottom: 50px;
}

</style>
