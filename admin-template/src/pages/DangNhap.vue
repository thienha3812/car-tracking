<template>
  <div class="loginPage">
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-35">
        <md-card>
          <div class="md-layout" style="flex-direction:column">
            <div class="md-layout-item">
              <md-field>
                <label  class="title"><b>TÀI KHOẢN</b></label>
                <md-input v-model="user.username" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label class="title"><b>MẬT KHẨU</b></label>
                <md-input v-model="user.password" type="password"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item" style="display:flex;justify-content:center">
                <md-card-actions>
                    <md-button @click="login" class="login_btn">ĐĂNG NHẬP</md-button>            
                </md-card-actions>
            </div>
          </div>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name : "",
    data(){
        return  {
          user:{
            username : "",
            password : ""
          }
        }
    },
    mounted() {
        
    },
    methods :{
        login(){
            this.$store.dispatch("user/login",this.user).then((result)=>{
              if(result instanceof Error){
                this.$message({type:"error",message:"Đăng nhập thất bại!"})                
              }else{
                this.$message({type:"success",message:"Đăng nhập thành công!"})
                setTimeout(()=>{
                  this.$router.push("/dashboard")
                },2000)
              }
            })
        }
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');
body {
  background: white !important;
}

</style>
<style lang="scss" scoped>

.title{
    font-family: 'Ubuntu', sans-serif !important;
}
.login_btn{
    background: #065535 !important;
}
</style>