<template>
<div class="toast"  v-show="show">
  <span>{{message}}</span>
</div>
</template>

<script>
export default {
  name: "toast",
  props:{
    message:{
      type:String,
      default(){
        return ""
      }
    },
    show:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
/*translate() 方法从其当前位置移动元素（根据为 X 轴和 Y 轴指定的参数）。*/
  transform: translate(-50%,-50%);
  padding: 5px 10px;
  color: #fff;
  background-color: rgba(0,0,0,.5);
}
</style>