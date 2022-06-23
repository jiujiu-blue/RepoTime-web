<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
// 入口组件
export default {
  name: 'App',
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }
 
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  mounted() {
    console.log('当前用户：', this.$store.state.user)
  }
}
</script>

<style lang="scss">
  #app {
    height: 100vh;
  }
</style>
