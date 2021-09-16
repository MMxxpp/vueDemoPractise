<template>
    <div class="goodsList">
        <goods-list-item v-for="item in goods" :goods-item="item"/>
    </div>

</template>

<script>

import goodsListItem from "./goodsListItem";

export default {
  name: "goodsList",
  components:{
    goodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>


<style scoped>
  .goodsList{
    display: flex;
    /*父元素设置了wrap，允许换行*/
    flex-wrap: wrap;
    /*space-around*/
    /*弹性项目平均分布在该行上，两边留有一半的间隔空间。*/
    /*如果剩余空间为负或者只有一个弹性项，则该值等同于center。否则，弹性项目沿该行分布，*/
    /*且彼此间隔相等（比如是20px），同时首尾两边和弹性容器之间留有一半的间隔（1/2*20px=10px）。*/
    justify-content: space-around;
  }
</style>