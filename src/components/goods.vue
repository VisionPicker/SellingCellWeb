<template>
<div>
    <el-row>
        <el-col :span="2"><div class="nav"></div></el-col>
        <el-col :span="20"><div class="nav bg-purple-light"> <el-button :plain=true icon="el-icon-back" v-on:click="goBack" border="0px">返回</el-button></div></el-col>
        <el-col :span="2"><div class="nav"></div></el-col>

    </el-row>
    <el-row>
        <el-col :span="2"><div class="grid-content"></div></el-col>
        <el-col :span="7" class="grid-content">
            <div class="grid-content bg-purple-light" >
                <img :src="goods.img"/>
            </div>

        </el-col>
        <el-col :span="13" class="grid-content bg-purple-light">
            <h1>   {{goods.title}} </h1>
            <span>&nbsp;</span>
            <div class="abstract">
                <h3>[摘要]</h3>
            <p word-break:break-all> {{goods.introduction}}
            </p>
            </div>
            <div class="price">
                <h1>￥ {{goods.price}}</h1>
            </div>
            <div v-if="loginInfo.authentication&&(loginInfo.role=='customer')"> 
                <el-input-number v-model="quantity" :min="1" :max="999" label="quantity"></el-input-number>
                <el-button type="primary" @click="addtoCart">加入购物车</el-button>
            </div>
            <el-button v-if="loginInfo.authentication&&(loginInfo.role=='seller')" type="primary" @click="edit">编辑商品</el-button>

        </el-col>
        <el-col :span="2"><div class="grid-content "></div></el-col>
    </el-row>
    <el-row>
        <el-col :span="2"><div class="grid-content"></div></el-col>
        <el-col :span="20"><div class="grid-content bg-purple-light">
                <div class="detail">
                    <h3>[商品详情]</h3>
                    <p>{{goods.detail}}</p>
                </div>
            </div>
        </el-col>
        <el-col :span="2"><div class="grid-content "></div></el-col>
    </el-row>
    <button v-on:click="goBack">goback</button>
    <span>{{$route.params.id}}</span>
</div>
</template>
<script>
export default {
    data:function(){
        return {
            goods:{
                id:1,
                title:'离散数学结构',
                price:86.8,
                introduction:'这是一本书',
                detail:'这是一本书，非常非常非常非常重要的书非常非常非常非常重要的书非常非常非常非常重要的书非常非常非常非常重要的书非常非常非常非常重要的书非常非常非常非常重要的书非常非常非常非常重要的书',
                img:'/static/image/default.jpg'

            },
            quantity:1,
            loginInfo:{
                authentication:true,
                role:'customer',

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

        }, 
        addtoCart(){
            console.log("加入购物车")
        },
        edit(){
            console.log("编辑商品信息")
        }
    }
}
</script>
<style>
    .nav{
        min-height: 20px;
    }
    .detail{
        padding: 10px;
        margin-left:10%;
        margin-right:10%;
        width: 80%;
        height: auto;
    }
    .abstract{
        width:500px;
        height:140px;
    }
    .price{
        color:#F56C6C;
    }
 .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 0px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #f9fafc;
  }
  .grid-content {
    min-height: 410px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>


