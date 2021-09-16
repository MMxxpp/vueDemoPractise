<template>
  <div id="detail">
    <detailNav class="navColor" @itemsClick="itemsClick" ref="detailNav"></detailNav>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="conScroll">
      <detail-swiper :top-images="topImages">
      </detail-swiper>
      <detail-info :goods="goods"></detail-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detallInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :param-info="paramInfo" ref="params"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @cartClick="addCart"></detail-bottom-bar>
    <back-top class="backTop" @click.native="backClick" v-show="showIn"/>
    <toast message="hahaha"></toast>
  </div>
</template>

<script>
import detailNav from "./detailChild/detailNav"
import detailSwiper from "./detailChild/detailSwiper";
import detailInfo from "./detailChild/detailInfo";
import detailShopInfo from "./detailChild/detailShopInfo";
import detailGoodsInfo from "./detailChild/detailGoodsInfo";
import detailParamsInfo from "./detailChild/detailParamsInfo";
import scroll from "components/content/scroll/scroll"
import detailCommentInfo from "./detailChild/detailCommentInfo";
import goodsList from "../../components/content/Goods/goodsList";
import detailBottomBar from "@/views/detail/detailChild/detailBottomBar";
import toast from "@/components/common/toast/toast";


import {getDetailMessage,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
import {backTopMixin, itemsListenerMixin} from "../../common/mixin";
import {debounce} from "../../common/utils";
import {mapActions} from "vuex"


export default {
  name: "detail",
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detallInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],
      offsetTopYs:[],
      getTopYs:null,
      currentIndex:0
    }
  },

  components:{
    detailNav,
    detailSwiper,
    detailInfo,
    detailShopInfo,
    scroll,
    detailGoodsInfo,
    detailParamsInfo,
    detailCommentInfo,
    goodsList,
    detailBottomBar,
    toast
  },
  methods:{

    ...mapActions(["addToCart"]),
    imageLoad(){
      this.$refs.scroll.refresh()

      //图片完全加载完成后调用防抖动，导航栏跳转
      this.getTopYs()
    },
    itemsClick(index){
      // console.log(index);
      this.$refs.scroll.backTop(0,-this.offsetTopYs[index],100)
    },

    //监听滚动
    conScroll(position){
      // console.log(position);

      const positionY=-position.y;


      this.showIn=-(position.y)>1000;


      let length=this.offsetTopYs.length;
      for(let i=0;i<length-1;i++){
        if(this.currentIndex!=i && (positionY>=this.offsetTopYs[i]&&positionY<=this.offsetTopYs[i+1])){
          this.currentIndex=i;
          // console.log(this.currentIndex);
          this.$refs.detailNav.currentIndex=this.currentIndex
        }
      }

    },

    addCart(){
      //获取购物车需要的商品信息
      const product={}

      // console.log("加入购物车");
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.realPrice=this.goods.realPrice
      product.iid=this.iid


      // 通过mapActions对函数直接进行操作
      this.addToCart(product).then(res =>{
        console.log(res);
      })

      // this.$store.dispatch("addToCart",product).then(res =>{
      //   console.log(res);
      // })
      // console.log(this.$store.state.cartList.length);

    }

  },
  created() {
    // 动态获取iid
    this.iid = this.$route.params.iid

    //根据iid请求详细数据
    getDetailMessage(this.iid).then(res => {
      console.log(res);
      const data=res.result;

      this.topImages=data.itemInfo.topImages


      // 获取商品信息 将所有数据统一封装在goods，先去调用Goods函数
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      console.log(Goods)

      // 获取店铺信息
      this.shop=new Shop(data.shopInfo)

      //获取商品详情数据图片
      this.detallInfo = data.detailInfo

      //获取商品参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //获取评论信息
      if(data.rate.cRate!=0){
        this.commentInfo=data.rate.list[0]
      }


      //利用反抖动函数提升性能，当图片未完全加载完成时，都会延迟等待加载完后出现
      this.getTopYs=debounce(()=>{

        //每次调用的时候给一个空数组，使得它内部的数值在更新后能够重新计算，才不会出现导航栏颜色切换不准确
        this.offsetTopYs=[]
        this.offsetTopYs.push(0)
        this.offsetTopYs.push(this.$refs.params.$el.offsetTop)
        this.offsetTopYs.push(this.$refs.comment.$el.offsetTop)
        this.offsetTopYs.push(this.$refs.recommend.$el.offsetTop)
        //给offsetTopYs在赋值一个无比大的值，使得offsetTopYs的length值+1
        this.offsetTopYs.push(Number.MAX_VALUE)

      },50)
    })

    getRecommend().then(res => {
      console.log(res);
      this.recommend=res.data.list
    })
  },

  mixins:[itemsListenerMixin,backTopMixin],


  // 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
  // 当详情页时，home的goodslist不在刷新
  mounted() {

  },
  destroyed() {
    //不活跃时，items的imageLoad不在刷新
    this.$bus.$off("itemImageLoad",this.itemsListener)
  }

}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 88;
    background-color: #fff;

    height: 100vh;
  }

  .content{
    height: calc(100% - 44px - 58px);
  }

  .navColor{
    background-color: #fff;
  }
  .backTop{
    position: fixed;
    right: 5px;
    bottom: 50px;
  }

</style>