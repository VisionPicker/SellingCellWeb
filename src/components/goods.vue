<template>
<html>
    <header>商品详情</header>
    <h1>标题</h1>
    <h2>{{good.title}}</h2>
     <h1>摘要</h1>
    <h2>{{good.introduction}}</h2>
     <h1>价格</h1>
    <h2>{{good.price}}</h2>
     <h1>图片</h1>
    <h2>{{good.img}}</h2>
     <h1>图文详情</h1>
    <h2>{{good.detail}}</h2>
    <button v-on:click="goBack">goback</button>
    <span>{{$route.params.id}}</span>
</html>
</template>
<script>
export default {
    data:function(){
        return {
            good:{
                title:'喵喵喵',
            }
        }
    },
    created: function(){
        console.log('good detail')
        this.getGoodDetail()
    },
  methods:{
      getGoodDetail:function(){
          this.$api.get('goodInfo/'+this.$route.params.goodId,null,response=>{
             console.log(response)
             this.good=response.data
          },null)
      },
      goBack:function(){
          window.history.length>1
          ?this.$router.go(-1)
          :this.$router.push('/')

      }
  }
}
</script>

