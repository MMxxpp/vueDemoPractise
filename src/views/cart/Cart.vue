<template>
  <div>
    <nav-bar class="NavBar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-buttom-nav></cart-buttom-nav>
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar"
import cartList from "@/views/cart/carChild/cartList";
import cartButtomNav from "@/views/cart/carChild/cartButtomNav";


import {mapGetters} from "vuex"

export default {
  name: "Cart",
  components:{
    NavBar,
    cartList,
    cartButtomNav
  },
  computed:{
    // cartLength(){
    //   return this.$store.state.cartList.length;
    // }

    ...mapGetters(["cartLength"])
  }
}
</script>

<style scoped>
.NavBar{
  background-color: skyblue;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
}
</style>