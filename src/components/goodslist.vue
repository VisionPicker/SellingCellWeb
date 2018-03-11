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
        <div class="list" display="block">
            <div class="goodsplat" v-for="index in goodslist" v-bind:key="index.id">
        </div>
        </div>

</div>
</template>
<script>
export default {
  data:function(){
      return{
          goodslist:[
              {id:"1213123123",name:"java1"},
               {id:"xxx",name:"java1"},
                {id:"qeqqwe",name:"java1"},
                 {id:"adasd",name:"java1"}
                 , {id:"fdfdf",name:"java1"}
          ],
          options:[
              {value:"purchased",label:"已购买"},
              {value:"all",label:"全部商品"}
          ],
          value:"all",
          role:'customer' //通过vuex管理登录信息
      }
  },
  watch:{
      value:function(val){
          console.log("选择了"+this.value)
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
  .goodsplat{
    display: inline;
    float: left;
    border:0;
    border-radius:15px;
    height: 250px;
    width:350px;
    margin-bottom: 15px;
    margin-top:5px;
    margin-left:20px;
    background:  #f9fafc;
    
}
</style>
