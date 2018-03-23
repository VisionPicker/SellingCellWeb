<template>
  <div>
    <el-row>
        <el-col :span="2"><div class="nav"></div></el-col>
        <el-col :span="20"><div class="nav bg-purple-light"> <h2>发布商品</h2></div></el-col>
        <el-col :span="2"><div class="nav"></div></el-col>

    </el-row>
    <el-row>
        <el-col :span="2"><div class="min-height"></div></el-col>
        <el-col :span="7" class="min-height bg-purple-light" >
            <div class=" bg-purple-light" >
                <el-upload
                class="avatar-uploader"
                action="api/user/seller/images/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                v-bind:disabled="not_upload"
                >
                <img v-if="showImage" :src="showImage" class="avatar" >
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span>点击上传商品图片，图片大小不超过1MB</span>
            </div>
        </el-col>
        
        <el-col :span="13" class="bg-purple-light  text-content min-height">
            <span class="label">[标题]</span><br/>
            <div class="abstract_auto">
            <el-input
            type="textarea"
            placeholder="请输入标题"
            :minlength=2
            :maxlength=80
            :rows=4
            v-model="goods.title">
            </el-input>
            </div>
            <div class="abstract_auto">
                <span class="label">[摘要]</span><br/>
            <el-input
             :minlength=2
            :maxlength=140
            :rows=5
            type="textarea"
            placeholder="请输入摘要"
            v-model="goods.introduction">
            </el-input>
            </div>
            <span class="label">[商品图片]</span><span>（每个商品只有一张图片，以最后选择的方式上传的图片为最新）</span><br/>
                <el-radio-group v-model="method" @change="changeMethod">
                    <el-radio label="upload">本地上传</el-radio>
                    <el-radio label="address">图片地址</el-radio>
                </el-radio-group>
                <br/>
                <el-alert
                    title="本地上传模式下，点击左侧图标上传商品图片"
                    type="error"
                    v-if="method=='upload'"
                    class="address"
                    :closable="false"
                    >
                </el-alert>
                <div>
                <el-input class="address"
                :minlength=2
                :maxlength=1000
                v-model="netImage"
                placeholder="请输入网络图片地址，长度<200，如要上传本地图片请选择本地上传模式"
                v-if="method=='address'">
                </el-input>
                </div>
                <span class="label">[价格]</span><br/>
                <span class="price">￥</span>
                 <el-input
                 type="number"
                 v-model="goods.price"
                 min="0"
                 class="number"
                 >
            </el-input>
             <div class="bg-purple-light">
                <div class="abstract_auto ">
                    <span class="label">[商品详情]</span><br/>
                    <el-input
                    :minlength=2
                    :maxlength=1000
                    :rows=20
                    type="textarea"
                    placeholder="请输入商品详情正文"
                    v-model="goods.detail">
                    </el-input>
                </div>
            </div>
            <br/>
             <el-button plain @click="cancel">取消</el-button>
            <el-button v-if="this.$route.name=='puton'" type="primary" plain @click="publish">完发布成</el-button>
            <el-button v-if="this.$route.name=='modify'" type="primary" plain @click="modify">完成编辑</el-button>
        </el-col>
        <el-col :span="2"><div class="min-height"></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    data:function(){
         return {
            goods:{
                goodsid:-1,
                title:'',
                price:0.0,
                introduction:'',
                detail:'',
                img:'',

            },
            showImage:'',//用于展示的地址
            method:"upload",//默认本地上传
            not_upload:false,
            netImage:''
         }

    },
    mounted:function(){
        var goodsid=this.$route.params.id
        if(this.$route.name=='modify'&&goodsid){
            console.log('参数')
            this.$api.get("goods/info/"+goodsid,null,
            response=>{
                this.goods=response.data
                this.showImage=response.data.img
                this.method='address'
                this.not_upload=true
                this.netImage=response.data.img

            },null)

        }
    },
    watch:{
        netImage:function(value){
            this.showImage=value
            this.goods.img=value
        },
       method:function(value){
            if(value=='upload'){
                this.netImage=''
            }
        }
    },
    created:function(){

    },
    methods: {
        handleAvatarSuccess(res, file) {
            if(res.success===true){
                this.goods.img=res.data.image//上传成功后在服务器上的名称
                this.showImage = URL.createObjectURL(file.raw);
            }else{
                if(res.code==1){
                    this.$message({
                        message:"尚未登录或登录超时,请重新登录！",
                        type:"error"
                    })
                    this.$store.commit("clearUser")
                    this.$localstore.clear()
                    this.$router.push("/")
                }else{
                    this.$message.error("图片上传失败！")
                }
               
            }
           
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG= file.type === 'image/png';
            const isLt1M = file.size / 1024 / 1024 < 1;

            if (!(isJPG||isPNG)) {
            this.$message.error('上传图片只能是 PNG或JPG 格式!');
            }
            if (!isLt1M) {
            this.$message.error('上传图片大小不能超过 1MB!');
            }
            return (isJPG||isPNG) && isLt1M;
        },
        goBack:function(){
            window.history.length>1
            ?this.$router.go(-1)
            :this.$router.push('/')

        }, 
        changeMethod:function(value){
            console.log("选择的按钮"+value)
            if(value=='upload'){
                this.not_upload=false;
            }else{
                this.not_upload=true;
            }
        },
        cancel:function(){
            this.goBack()
        },
        testGoodsValid(){
            if(this.goods.title==null||this.goods.title.length<2||this.goods.introduction.length>80){
                return false
            }
            if(this.goods.introduction==null||this.goods.introduction.length<2||this.goods.introduction.length>140){
                return false
            }
            if(this.goods.detail==null||this.goods.detail.length<2||this.goods.detail.length>1000){
                return false
            }
            if(this.goods.price==null||this.goods.price<0||this.goods.price>1000000000){
                return false
            }
            return true
        },
        modify:function(){
            if(!this.not_upload){
                this.goods.img="/images/show/"+this.goods.img //当通过本地上传的方式，需要加上路径
            }
            if(!this.testGoodsValid()){
                this.$message({
                    message:"输入的商品的信息有误，请重新检查",
                    type:"info"
                })
                return
            }
            this.$api.post('user/seller/goods/modify',this.goods,response=>{
                console.log('修改商品成功')
                this.$message({
                         message:'修改商品成功!',
                         type:'success'
                     })
                this.$router.push('/goods/show/'+response.data.goodsid)
            },null)
        },
        publish:function(){
            if(!this.not_upload){
                this.goods.img="/images/show/"+this.goods.img //当通过本地上传的方式，需要加上路径
            }
            if(this.goods.goodsid==-1){
                 this.$api.post("user/seller/goods/puton/",this.goods,response=>{
                     console.log('发布商品成功')
                     this.$message({
                         message:'发布商品成功!',
                         type:'success'
                     })
                     this.$router.push('/goods/show/'+response.data.goodsid)
                 },response=>{
                     if(response.code==1){
                        this.$message({
                         message:'登录认证超时失效，请重新登录系统',
                         type:'error',
                         })
                        this.$localstore.clear()
                        this.$store.commit('clearUser')
                        this.$router.push('/')//返回到首页
                     }else{
                         this.$message({
                             message:'发布商品出现错误',
                             type:'error'
                         })
                     }
                     
                    
                 })
            }//发布商品的时候，没有id的信息,分成两个方法了

        },
       

    }
  
}
</script>
<style>
    .detail_edit{
        padding: 10px;
        margin-left:10%;
        margin-right:10%;
        width: 80%;
        height: auto;
    }
    .number{
        width:100px
    }
    .label{
        font-size:  1.17em;
        font-weight: bold;
    }
    .address{
        width:600px
    }

    .text-content{
        line-height: 30px
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
    .abstract_auto{
        width:600px;
        height:auto;
    }
    .price{
        font-size:1.7em;
        color:#F56C6C;
        line-height: 40px;
        font-weight: bold;
        
      
    }
    .min-height{
        min-height:1000px;
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
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size:100px;
    color: #8c939d;
    width: 400px;
    height: 400px;
    line-height: 400px;
    text-align: center;
  }
  .avatar {
    width: 400px;
    height: 400px;
    display: block;
  }
</style>


