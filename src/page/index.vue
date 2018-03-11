<template>
  <div>
    <Nav></Nav>
    <div class="line"></div>
    <router-view></router-view>
  </div>
</template>
<script>
 import Nav from '../components/navigation.vue'


export default {
  components:{Nav},
  data(){
    return {
        message :new Date().toLocaleString()
    }
  },
  created(){
    this.$api.get('login',null,response=>{
      console.log(response)
    },null)
  },
  methods:{
   goto_detail:function(){
     this.$router.push({name:'good_detail',params:{id:5,age:21}})
   }
  }
}
</script>
<style>
  .line{
    height: 5px;
  }
</style>
