<template>
  <div id="app" class="root-layer">
    <Nav></Nav>
    <div class="line"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './components/navigation.vue'
export default {
  name: 'App',
  components:{Nav},
  data(){
    return {
    }
  },
  created(){
  
  },
  methods:{
  }
}
</script>

<style lang="scss">
	@import "./style/style";
  .line{
    height: 5px;
  }
  .root-layer{
    width: 1500px;
  }
</style>
