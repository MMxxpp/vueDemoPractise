<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
  </scroll>
</div>
</template>

<script>

import scroll from "@/components/content/scroll/scroll";
import cartListItem from "@/views/cart/carChild/cartListItem";


import {mapGetters} from "vuex"

export default {
  name: "cartList",
  components:{
    scroll,
    cartListItem
  },
  computed:{
    ...mapGetters(["cartList"])
  },

  //解决了点击添加购物车的时候能实现刷新功能，在活跃时自动刷新
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  height: 100vh;
}

.content{
  margin-top: 50px;
  height: calc(100% - 50px - 49px - 40px);
  overflow: hidden;
}
</style>