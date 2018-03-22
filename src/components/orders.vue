<template>
  <div>
       <el-row>
            <el-col :span="3"><div class="nav"></div></el-col>
            <el-col :span="18">
                <div class="nav bg-purple-light">
                 
                  <h2>我的订单</h2>
                  <hr/>
                  <div  v-for="order in orders" v-bind:key="order.orderid">
                    <el-table
                    header-row-class-name="orders-item-header"
                    :data="order.list"
                    style="width: 100%"
                    empty-text="还没有购买过东西，快去看看有什么好东西吧~">
                        <el-table-column
                            :label="'订单编号: '+order.orderid"
                            min-width="45%">
                              <template slot-scope="scope">
                                  <div class="orders-little-img">
                                     <el-tooltip placement="right" content="此页面的图片和标题都属于交易快照，点击链接进入查看实时商品信息">
                                      <img width="100" height="100" :src="scope.row.img"/>
                                     </el-tooltip>
                                  </div>
                                  <div class="orders-simple-title">
                                      <router-link :to="{name:'show', params: { id: scope.row.goodsid }}">{{scope.row.title}}</router-link>
                                  </div>
                                  
                            </template>
                            
                        </el-table-column>
                        <el-table-column 
                            label=""
                            min-width="15%"
                            >
                            <template slot-scope="scope">
                                <span class="orders-item-price">￥ {{scope.row.price}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label=""
                            min-width="15%">
                             <template slot-scope="scope">
                                <div class="orders-item-price">
                                    <span>{{scope.row.quantity}}</span>
                                </div>
                            </template>
                        </el-table-column>
                         <el-table-column
                            label=" "
                            min-width="25%">
                             <template slot-scope="scope">
                                 <div class="orders-item-price">
                                   <span class="orders-item-price">￥{{scope.row.total}}</span>
                                  </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="orders-date">日期： {{transformDate(order.ordered_time)}}</div>
                    <div class="orders-total">总计：￥ {{order.total}}</div>
                    
                    <hr/>
                  </div>
                </div>
            </el-col>
            <el-col :span="3"><div class="nav"></div></el-col>
        </el-row>
    
  </div>
</template>
<script>
export default {
  data(){
    return{
      orders:[]
    }
  },
  created(){

  },
  mounted(){
    this.$api.get("user/customer/orders",null,
    response=>{
      this.orders=response.data
  
    },null)
  },
  methods:{
    transformDate(ldate){
      var date=new Date(ldate).toLocaleString()
      return date
    }
  }
}
</script>
<style>
 .nav{
        min-height: 20px;
    }
    .orders-little-img{
        width: auto;
        height: auto;
        float: left;
    }
    .orders-simple-title{
        padding: 10px;
         max-width: 350px;
        height: auto;
        float: left;
        font-size: 14px;
    }
    .orders-item-price{
        font-size:18px;
        line-height: 36px;
        text-align: right;
        width: auto;
    }
    .orders-item-header{
        font-size: 16px;
        color: black;
        height: 40px;
    }
    .orders-quantity-edit{
        font-size: 18px;
    }
    .orders-total{
        font-size:20px;
        font-weight: bold;
        height: 40px;
        text-align: right;
        padding: 10px;
    }
    .orders-date{
      font-size: 16px;
      font-weight: bold;
      color:black;
    }
</style>

