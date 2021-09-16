<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"


export default {
  name: "detailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    SwiperItem,
    Swiper
  }
}
</script>

<style scoped>
.detail-swiper{
  margin-top: 44px;
  height: 400px;

}

</style>