<template>
  <div>
    <div class="block">
    <template>
      <el-carousel :interval="3000" arrow="always" height="200px">
        <el-carousel-item v-for="item in recommendation" :key="item.id">
          <img :src="item.img" width="1500" height="200"/>
        </el-carousel-item>
      </el-carousel>
    </template>
  </div>
    <el-menu
      default-active="index"
      mode="horizontal"
      background-color="#303133"
      text-color="#909399"
      active-text-color="#C0C4CC"
      @select="handleSelect"
      >
      <el-menu-item index="index"><i class="el-icon-tickets"></i>商品浏览</el-menu-item>
      <el-menu-item index="cart" v-if="this.$store.state.authorization&&(this.$store.state.role=='customer')">
        <i class="el-icon-goods"></i>购物车
      </el-menu-item>
      <el-submenu index="customer_account" v-if="this.$store.state.authorization&&(this.$store.state.role=='customer')">
          <template slot="title" >账号[ {{this.$store.state.username}} ]</template>
          <el-menu-item index="orders" >订单</el-menu-item>
          <el-menu-item index="logout">注销</el-menu-item>
      </el-submenu>
      <el-menu-item index="puton" v-if="this.$store.state.authorization&&(this.$store.state.role=='seller')">
         <i class="el-icon-circle-plus-outline"></i>发布商品
      </el-menu-item>
      <el-submenu index="seller_account" v-if="this.$store.state.authorization&&(this.$store.state.role=='seller')">
          <template slot="title" >账号[ {{this.$store.state.username}} ]</template>
          <el-menu-item index="logout">
            注销
          </el-menu-item>
      </el-submenu>
      <el-menu-item index="login" v-if="!this.$store.state.authorization">登录</el-menu-item>
    </el-menu>

    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input v-model="login_params.name" placeholder="用户名"></el-input>
      <span>&nbsp;</span>
      <el-input type="password" v-model="login_params.password" placeholder="密码" ></el-input>
      <el-alert
          title="用户名或密码错误"
          type="error"
          v-if="error_show"
          :closable="false"
          :center="true"
          show-icon>
        </el-alert>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </span>
    </el-dialog>
        
  </div>
</template>
<script>
export default {
  created:function(){
    this.loginInfo=this.$localstore.fetch()
  },
  //mounted方法是在vm.el属性替换el时，页面还未挂载
  mounted:function(){
    
  },
  data:function (){
    return{
      activeIndex:'index',
      loginInfo:{},
      error_show:false,//展示提示信息的框
      recommendation:[
        {name:'算法导论',title:'你也许看不懂，但是你需要',id:3,img:"./static/image/title.jpg"},
      ],
       dialogVisible: false,
       login_params:{
         name:'',
         password:''
       }
    }
  },

  watch:{
    dialogVisible:function(val){
      if(this.dialogVisible==false){
        this.login_params.name=null
        this.login_params.password=null
      }
    },
    login_params:{
      handler(oldValue,newValue){
        this.error_show=false;
      },
      deep:true
    },
    loginInfo:{
      handler(newLoginInfo){
        //出现变化的时候更新login信息和本地存储
        console.log('loginInfo出现变化')
        this.$store.commit('setUser',this.loginInfo)
        this.$localstore.save(this.loginInfo)      
      },
      deep:true
    }
  },

  methods:{
    openLoginDialog:function() {
      this.dialogVisible=true
    },
   handleClose:function(done) {
    //防止vue报错，找不到该方法，其实不需要 
    },
    login:function(){
      console.log('用户名:'+this.login_params.name)
      console.log('密码:'+this.login_params.password)
      var md5_password=this.$md5(this.login_params.password)
      this.$api.post("login",{username:this.login_params.name,password:md5_password},response=>{    
        console.log('登录成功')  
        console.log('用户名:'+response.data.username)
        console.log('角色'+response.data.role)
        this.dialogVisible=false;
      this.loginInfo.authorization=true
      this.loginInfo.role=response.data.role
      this.loginInfo.userid=response.data.userid
      this.loginInfo.username=response.data.username
      this.$store.commit('setUser',this.loginInfo)
      this.$localstore.save(this.loginInfo)   
      this.error_show=false;
      },response=>{
        this.error_show=true;
      })
      
    },
    logout:function(){
      console.log("注销")
      this.$api.post('/user/logout',null,response=>{
        this.$store.commit('clearUser')
        this.$localstore.clear()//删除本地缓存
        this.$router.push("/")
      },response=>{
        this.$store.commit('clearUser')
        this.$localstore.clear()//删除本地缓存
        this.$router.push("/")
      })
      
    },
    handleSelect:function(index,indexPath){
      console.log("导航栏选择: "+index)
      switch(index){
        case 'index' :
          this.$router.push('/allgoods')
          break
        case 'orders':
          this.$router.push('/orders')
          break
        case 'puton':
          this.$router.push('/goods/puton')
          break
        case 'logout': 
          this.logout()
          break
        case 'login':
          this.openLoginDialog()
          break
        case 'cart':
          this.$router.push('/shoppingcart')
        default:break
      }
    },
    
    showCart:function(){
      //展示购物车
      console.log("展示购物车")
    },
  }
}
</script>
<style >
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 1.0;
    line-height:200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #909399;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #606266;
  }
  
  
</style>


