<template>
  <div class="loginPage">
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-35">
        <md-card>
          <div class="md-layout" style="flex-direction:column">
            <div class="md-layout-item">
              <md-field>
                <label  class="title"><b>TÀI KHOẢN</b></label>
                <md-input></md-input>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label class="title"><b>MẬT KHẨU</b></label>
                <md-input type="password"></md-input>
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

        }
    },
    mounted() {
        
    },
    methods :{
        login(){
            
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