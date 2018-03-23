<template>
  <div>

        <el-row>
            <el-col :span="3"><div class="nav"></div></el-col>
            <el-col :span="18">
                <div class="nav bg-purple-light">
                     <h2>我的购物车</h2>
                    <hr/>
                    <el-table
                    header-row-class-name="item-header"
                    :data="items"
                    style="width: 100%"
                    empty-text="购物车还没有东西~">
                        <el-table-column
                            label="商品"
                            min-width="50%">
                              <template slot-scope="scope">
                                  <div class="little-img">
                                    <img width="200" height="200" :src="scope.row.img"/>
                                  </div>
                                  <div class="simple-title">
                                      <router-link :to="{name:'show', params: { id: scope.row.goodsid }}">{{scope.row.title}}</router-link>
                                  </div>
                                  
                            </template>
                            
                        </el-table-column>
                        <el-table-column 
                            label="单价"
                            min-width="30%"
                            >
                            <template slot-scope="scope">
                                <span class="item-price">￥ {{scope.row.price}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="数量"
                            min-width="20%">
                             <template slot-scope="scope">
                                <div class="quantity-edit">
                                    <el-input
                                    v-model.number="goods_quantity[scope.row.goodsid]" @change="handleInput(scope.row)">
                                        <el-button slot="prepend" @click="decreaseQuantity(scope.row)"><i class="el-icon-minus"></i></el-button>
                                        <el-button slot="append" @click="addQuantity(scope.row)"><i class="el-icon-plus"></i></el-button>
                                    </el-input>
                                </div>
                            </template>
                        </el-table-column>
                         <el-table-column
                            label=" "
                            min-width="10%">
                             <template slot-scope="scope">
                                 <div class="quantity-edit">
                                  <el-button type="text" @click="deleteGoods(scope.row)"><i class="el-icon-delete quantity-edit"></i></el-button>
                                  </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="total">总计：￥ {{total}}</div>
                    <div class="order-button">
                    <el-button @click="goBack">退出</el-button>
                    <el-button type="danger" @click="balance">结算</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="3"><div class="nav"></div></el-col>
        </el-row>
    
  </div>
</template>
<script>
export default {
  data:function(){
      return{
          items:[],
          goods_quantity:{},
      }
  },
  created:function(){

  },
  mounted:function(){
      this.getShoppingcartItems()
  },
  computed:{
      total:function(){
          var total=0
          for(var item of this.items){
              total=item.quantity*item.price+total
          }
          return total.toFixed(2);//保留到0.01
      }
  },
  methods:{
      getShoppingcartItems:function(){
          this.$api.post("user/customer/shoppingcart/show",null,response=>{
              this.items=response.data
              for(var item of this.items){
                  this.$set(this.goods_quantity,item.goodsid,item.quantity)//vue中在利用对象进行监听的时候，需要利用用到Vue.set
            }
          },null)
      },
      changeAfter(goodsid,quantity){
          console.log("商品号:"+goodsid+" 数量："+quantity)
      },
      balance(){
          this.$confirm('确定购买当前商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.$api.post("user/customer/shoppingcart/balance",null,response=>{
              this.items=[]
              this.$message({
                  message:"下单成功，快去看看吧~",
                  type:"success"
              })
          },null)
          }).catch(() => {
            });
      },
      goBack(){
          window.history.length>1
            ?this.$router.go(-1)
            :this.$router.push('/')
      },
      deleteGoods(goods){
        console.log(goods.goodsid)
        this.$confirm('确定删除选中当前商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$api.delete("user/customer/shoppingcart/remove/"+goods.goodsid,null,
                response=>{
                    this.$message({
                    type: 'success',
                    message: '删除商品成功!'})
                    console.log("删除成功")
                    this.getShoppingcartItems()
                    },null)
          }).catch(() => {
            });
      },
      handleInput(goods){
          //传入的是数据行
          var goodsid=String(goods.goodsid)
          var quantity=parseInt(this.goods_quantity[goodsid])
          if(!Number.isInteger(quantity)||quantity>999||quantity<1){
              this.goods_quantity[goodsid]=goods.quantity //当数据非法的时候需要输入老的数据
          }else{
              //调用更新
              this.updateQuantity(goods.goodsid,quantity,response=>{
                  goods.quantity=quantity
              },response=>{
                  this.goods_quantity[goodsid]=goods.quantity //当更新出现问题后，需要赋值旧值
              })
          }

      },
      addQuantity(goods){
          var goodsid=String(goods.goodsid)
         var oldvalue=this.goods_quantity[goodsid]
          if(oldvalue<999){
              goods.quantity=oldvalue+1
              //调用更新
              this.updateQuantity(goods.goodsid,goods.quantity,response=>{
                  this.goods_quantity[goodsid]++;
              },response=>{
                  goods.goodsid=oldvalue;
              })

          }
          
      },
      decreaseQuantity(goods){
           var goodsid=String(goods.goodsid)
           var oldvalue=this.goods_quantity[goodsid]
          if(oldvalue>1){
              goods.quantity=oldvalue-1
              //调用更新
              this.updateQuantity(goods.goodsid,goods.quantity,response=>{
                  this.goods_quantity[goodsid]--;
              },response=>{
                  goods.goodsid=oldvalue;
              })
          }
         
      },
      updateQuantity(goodsid,quantity,success,failure){
          var cartitem={goodsid:goodsid,quantity:quantity}
          this.$api.post("user/customer/shoppingcart/modify",cartitem,success,failure)
      }

  }
}
</script>
<style lang="css">
    .nav{
        min-height: 20px;
    }
    .little-img{
        width: auto;
        height: auto;
        float: left;
    }
    .simple-title{
        padding: 15px;
         max-width: 220px;
        height: auto;
        float: left;
        font-size: 16px;
    }
    .item-price{
        font-size:32px;
        font-weight: bolder;
        line-height: 36px;
        color:#F56C6C;
    }
    .item-header{
        font-size: 20px;
        color: black;
        height: 40px;
        line-height: 30px;
    }
    .quantity-edit{
        font-size: 24px;
    }
    .order-button{
        text-align: right;
    }
    .total{
        margin-top:20px;
        font-size:28px;
        font-weight: bold;
        line-height: 36px;
        height: 40px;
        text-align: right;
        padding: 20px;
    }

</style>


