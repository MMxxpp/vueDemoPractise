<template>

  <div class="recommend">
    <div class="recommendItem" v-for="item in recommend">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendView",
  props:{
    recommend:{
      type:Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 15px 0 10px;
    font-size: 12px;
    /*box-shadow: 0 1px 5px rgba(100,100,100,.5);*/
    border-bottom: 10px solid #eee;
  }

  .recommendItem{
    flex: 1;
  }

  .recommendItem img{
    width: 80px;
    margin-bottom: 10px;
  }
</style>