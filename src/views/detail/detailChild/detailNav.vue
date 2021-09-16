<template>
  <NavBar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(items,index) in title" class="title-items"
      :class="{active:index===currentIndex}" @click="itemsClick(index)">{{items}}
      </div>
    </div>
  </NavBar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name: "detailNav",
  data(){
    return{
      title:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar
  },
  methods:{
    itemsClick(index){
      this.currentIndex=index;
      this.$emit("itemsClick",index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>

.title{
  font-size: 15px;
  display: flex;
}

.active{
  color: var(--color-high-text);
}

.title-items{

  flex: 1;
}

.back{
  margin-top: 5px;
}
</style>