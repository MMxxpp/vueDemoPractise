<template>
  <div class="check" :class="{isCheck:isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckBtn",
  props:{
    isCheck:{
      type:Boolean,
      default(){
        return false
      }
    }
  }
}
</script>

<style scoped>

.check{
  border-radius: 50%;
  border:2px solid #aaa;
}

.isCheck{
  background-color: red;
  border:2px solid red;
}
</style>