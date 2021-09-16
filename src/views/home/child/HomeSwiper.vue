<template>
  <swiper class="top">
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageItemLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>

import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  data(){
    return {
      isLoad:false
    }
  },
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imageItemLoad(){
      // console.log("---");
      // 第一次开始刷新时就将事件一次传过去，优化性能不需要防抖动
      if(!this.isLoad){
        this.$emit("swiperLoad")
        this.isLoad=true
      }
    }

  }
}
</script>

<style scoped>

/*.top{*/
/*  padding-top: 44px;*/
/*}*/
</style>