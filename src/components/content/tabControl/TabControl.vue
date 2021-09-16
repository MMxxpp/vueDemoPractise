<template>
<div class="tab-control">
  <div class="tab-bar-item" v-for="(item,index) in title"
  :class="{active:index===currentIndex}" @click="tabClick(index)">
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    title:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    tabClick(index){
        this.currentIndex=index;
        this.$emit("itemClick",index)
    }
  }
}
</script>

<style scoped>
    .tab-control{
      display: flex;
      text-align: center;
      font-size: 15px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      z-index: 5;
    }

    .tab-bar-item{
      flex: 1;
    }

    .tab-bar-item span{
      padding:5px;
    }
    .active{
      color: var(--color-high-text);
    }
    .active span{
      border-bottom: #ff5777 2px solid;
    }
</style>