<template>
    <div class="navbar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .navbar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 2px rgba(100,100,100,0.5);
    font-size: 18px;
    color: var(--color-text);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }

  .left, .right{
    width: 60px;

  }

  .center{
    flex: 1;
  }
</style>