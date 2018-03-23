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
    this.$api.setResponseInterceptor(response => {
    console.log("intercept response")
    //当返回结果是没有登录的时候
    if(!response.data.success&&response.data.code==1){
        this.$store.commit('clearUser')
        this.$localstore.clear()
        this.$message({
          message:"尚未登录或登录超时，请重新登录",
          type:"error"
        })
        this.$router.push("/")
    }
    //当返回的结果是没有权限的时候，防止越权访问
    if(!response.data.success&&response.data.code==2){
       this.$message({
          message:"没有访问权限",
          type:"error"
        })
    }
    console.log(response.data.success)
    return response
    },error=>{
    return Promise.reject(error);
    })
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
