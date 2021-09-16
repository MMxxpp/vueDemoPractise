<template>
  <div id="app" class="wrapper">
<!--    exclude使detail不会一直保持数据不变，退出时自动更新-->
    <keep-alive exclude="detail">
      <router-view/>
    </keep-alive>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar";

export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
