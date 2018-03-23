<template>
<div>
    <el-row>
        <el-col :span="2"><div class="nav"></div></el-col>
        <el-col :span="20"><div class="nav bg-purple-light"> <el-button :plain=true icon="el-icon-back" v-on:click="goBack" border="0px">返回首页</el-button></div></el-col>
        <el-col :span="2"><div class="nav"></div></el-col>

    </el-row>
    <el-row>
        <el-col :span="2"><div class="grid-content"></div></el-col>
        <el-col :span="7" class="grid-content">
            <div class="grid-content bg-purple-light" >
                <div height="400" width="400">
                <img :src="goods.img" height="400" width="400" onerror="this.src='static/image/default.jpg'" />
                </div>
            </div>

        </el-col>
        <el-col :span="13" class="grid-content bg-purple-light">
            <div  class="title">
            <h3> <i v-if="(this.$store.state.role=='customer')&&this.goods.purchased" class="el-icon-success purchased_label">[已购买]  </i> {{goods.title}}</h3>
            </div>
            <div class="abstract">
                <h3>[摘要]</h3>
            <p word-break:break-all> {{goods.introduction}}
            </p>
            </div>
            <div >
                <span class="show-price">￥ {{goods.price}}</span><span class="show-sold_quantity">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已出售: {{goods.sold_quantity}} 件 </span><br/><br/>
            </div>
            <div v-if="this.$store.state.authorization&&(this.$store.state.role=='customer')"> 
                <el-input-number v-model="quantity" :min="1" :max="999" label="quantity"></el-input-number>
                <el-button type="primary" @click="addtoCart(quantity)">加入购物车</el-button>
            </div>
             <el-button icon="el-icon-delete" v-if="this.$store.state.authorization&&(this.$store.state.role=='seller')&&(goods.quantity==0)" @click="putoff">删除商品</el-button>
            <el-button icon="el-icon-edit" v-if="this.$store.state.authorization&&(this.$store.state.role=='seller')" type="primary" @click="edit">编辑商品</el-button>
           

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
</div>
</template>
<script>
export default {
    data:function(){
        return {
            goods:{
                goodsid:1,
                title:'标题',
                price: 0,
                introduction:'无 ',
                detail:'无 ',
                img:'',
                sold_quantity:0,
                purchased:false

            },
            quantity:1,
        }
    },
    mounted: function(){
        console.log('good detail')
        this.getGoodsDetail()
    },
    watch:{
        $route:function(){
            if(this.$route.name=='show')
            {
                this.getGoodsDetail()
            }
        }
    },
    methods:{
        getGoodsDetail:function(){
            this.$api.get('goods/info/'+this.$route.params.id,null,
                response=>{
                    this.goods=response.data
                },
                response=>{
                    if(response.code==4){
                        this.$message({
                        message:'此商品不存在或者已经下架!',
                        type:'error'
                        })
                    }
                    this.$router.push('/')//回到首页
                }
            )
                
        },
        goBack:function(){
           this.$router.push("/")

        }, 
        addtoCart:function(quantity){
            console.log("加入购物车:"+quantity)
            if(quantity>0){
                this.$api.post("/user/customer/shoppingcart/add",{goodsid:this.goods.goodsid,quantity:quantity},
                response=>{
                    this.$message({
                        message:"已加入购物车",
                        type:'success'
                    })
                },null)
            }
        },
        edit(){
            console.log("编辑商品信息")
            this.$router.push('/goods/modify/'+this.goods.goodsid)
        },
        putoff(){
            console.log(this.goods.goodsid)
            this.$confirm('确定删除当前商品吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$api.delete("user/seller/goods/putoff/"+this.goods.goodsid,null,
                    response=>{
                        this.$message({
                        type: 'success',
                        message: '删除商品成功!'})
                        },null)
                        this.$router.push("/")//返回到首页
            }).catch(() => {
                        this.$message({
                        type: 'success',
                        message: '取消删除商品!'})
                });
        }
    }
}
</script>
<style>
    .purchased_label{
        color:green;
        font-size:25px;
        font-weight: bold

    }
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
    .title{
        width:600px;
    }
    .abstract{
        width:600px;
        height:170px;
    }
    .show-price{
        font-size: 42px;
        color:#F56C6C;
        font-weight: bolder;
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
    min-height: 420px;
    min-width: 420px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .show-sold_quantity{
      font-size: 24px;
      font-weight: bolder;
  }
</style>


