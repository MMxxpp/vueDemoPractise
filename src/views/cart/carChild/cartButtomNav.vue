<template>
<div class="bu-cart">
  <div class="check-btn">
    <check-btn class="checkB" :isCheck="isCheck" @click.native="checkAllClick"></check-btn>
    <span>全选</span>
  </div>

  <div class="countNum">
    <span>合计：{{totalPrice}}</span>
  </div>

  <div class="calculate">
    <span>去计算：{{calLength}}</span>
  </div>
</div>
</template>

<script>

import CheckBtn from "@/components/content/checkButton/CheckBtn";
import {mapGetters} from "vuex"


export default {
  name: "cartButtomNav",
  components:{
    CheckBtn
  },

  methods:{
    checkAllClick(){
      if(this.isCheck){
        this.cartList.forEach(item => item.checked=false)
      }else {
        this.cartList.forEach(item => item.checked=true)
      }
    }

  },
  computed:{

    ...mapGetters(["cartList"]),
    totalPrice(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((previousValue, item) => {
        return previousValue+item.realPrice*item.count
      },0)
    },
    calLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isCheck(){
      if(this.cartList.length===0) return false
      return !(this.cartList.filter(item => !item.checked).length)
    }
  }
}
</script>

<style scoped>

.bu-cart{
  width: 100%;
  position: fixed;
  bottom: 47px;
  background-color: #eee;
  height: 40px;
  line-height: 40px;
  display: flex;
}

.check-btn{
  width: 70px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.checkB{
  height: 22px;
  width: 22px;
  line-height: 22px;
  margin-right: 5px;
}

.countNum{
  margin-left: 20px;
  flex: 1;
}

.calculate{
  width: 90px;
  background-color: skyblue;

}
</style>