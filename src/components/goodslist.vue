<template>
    <div>
        <el-select v-model="value" placeholder="全部商品" v-if="role=='customer'">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"  >
        </el-option>
        </el-select>
        <div class="clear" ></div> 
        <div class="goodsplat" v-for="index in goodslist" v-bind:key="index.goodsid">
            <div class="goodsplat-img">   <img :src="index.img" width="270" height="270" float="left" onerror="this.src='static/image/default.jpg'"></div>
            <div>
                <div class="list-price">￥{{index.price}}</div>
                <div class="list-sold" v-if="role=='seller'">
                    <el-button v-if="index.sold_quantity==0" class="putoff_button" icon="el-icon-delete" size="small" @click="putoff(index.goodsid,index.title)">下架</el-button>
                    <span v-else class="list_sold_quantity">已售{{index.sold_quantity}}件</span>
                </div>
                <div class="list-sold" v-if="role=='customer'&&index.purchased" >
                    <span class="el-icon-success purchased">已购买</span>
                </div>
                <div class="clear"></div>
                <div class="list-title"><router-link :to="{name:'show', params: { id: index.goodsid }}">{{index.title.slice(0,54)}}</router-link></div>



                
            </div>
        </div>
       

</div>
</template>
<script>
export default {
  data:function(){
      return{
          goodslist:[],
          options:[
              {value:"not_purchased",label:"未购买"},
              {value:"all",label:"全部商品"}
          ],
          value:"all",
          role:this.$store.state.role,//通过vuex管理登录信息
      }
  },
  created:function(){

  },
  mounted:function(){
      this.getAllGoods()
  },
  computed:{
      getRole:function(){
          return this.$store.state.role
      },
      getUser:function(){
          return this.$store.state.userid
      }
  },
  watch:{
      value:function(val){
          switch(val){
              case 'all':
                this.getAllGoods()
                break
              case 'not_purchased':
                this.getNotPurchasedGoods()
                break
              default:break
                
          }
          console.log("选择了"+this.value)
      },
      getRole:function(val){
          this.role=val
      },
      getUser:function(){
          console.log("登录角色变化，重新加载数据")
          this.getAllGoods()
      }

  },
  methods:{
    getAllGoods:function(){
      this.$api.get('goods/info/all',null,response=>{
          this.goodslist=response.data

      },null)

    },
    getNotPurchasedGoods(){
        this.$api.get('/user/customer/goods/list/not_purchased',null,
        response=>{
            this.goodslist=response.data
        },null)
    },
    getPurchasedGoods(){
        this.$api.get('/user/customer/goods/list/purchased',null,
        response=>{
            this.goodslist=response.data
        },null)
    },
    putoff(goodsid){
        console.log(goodsid)
        this.$confirm('确定删除选中当前商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$api.delete("user/seller/goods/putoff/"+goodsid,null,
                response=>{
                    this.$message({
                    type: 'success',
                    message: '删除商品成功!'})
                    console.log("删除成功")
                    this.getAllGoods()
                    },null)
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
    .clear{
       clear:both
    }
    .el-select{
        float: right;
        margin-right: 25px
    }
    .list{
        width:1060;
        margin-left: auto;
        margin-right:auto;
        background:  #1c1c1d;
    }
    .list-price{
        width:30%;
        margin-left:5%;
        float: left;
        font-size:26px;
        color:#F56C6C;
        font-weight: bolder
    }
    .putoff_button{
        float:right;
    }
    .list-sold{
        margin-right:5%;
        width:60%;
        float:right;
        font-size: 14px;
        font-weight:bold;
        text-align:center
    }
    .list-title{
        margin-left:5%;
        margin-right:5%;
        font-size:14px;
    }
    .list_sold_quantity{
        font-size: 18px;
        font-weight: normal;
        float: right;
    }
    .purchased{
        margin-top: 5px;
        color:green;
        font-size:18px;
        font-weight: bolder;
        float: right;
    }
  .goodsplat{
    display: inline;
    float: left;
    border:0;
    border-radius:15px;
    height: 370px;
    width:270px;
    margin-bottom: 15px;
    margin-top:10px;
    margin-left:25px;
    background:  #f9fafc;
    }
    .goodsplat-img{
        width: 270px;
        height: 270px;
    }
</style>
