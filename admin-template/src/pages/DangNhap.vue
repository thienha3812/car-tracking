<template>
  <div class="loginPage">
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-45">
        <md-card>
            <div class="md-layout">
              <div class="md-layout-item md-size-50" style="padding:15px">
            <div class="md-layout" style="flex-direction:column">
              <div class="md-layout-item">
                
                  <span class="title">Đăng nhập</span>
              </div>
              <div class="md-layout-item" style="margin-top:1em;display:flex">
                 <i class="fa fa-user icon"></i>
                <input class="form-login" v-model="user.username" type="text" placeholder="Tài khoản" />
              </div>
               <div class="md-layout-item" style="margin-top:1em;display:flex">
                 <i class="fa fa-key icon"></i>
                <input class="form-login" v-model="user.password" type="password" placeholder="Mật khẩu" />
              </div>
              <div class="md-layout-item" style="display:flex;justify-content:space-around">
                <div>
                   <md-card-actions>                  
                  <button @click="login" class="login_btn">Đăng nhập</button>
                </md-card-actions>
                </div>
                <div style="align-self:center">
                  <a class="forgot-password" href="#">Đăng ký mới</a>
                </div>
              </div>
            </div>
          </div>

              <div class="md-layout-item md-size-50 image-view" style="justify-content:center;display:flex">
                  <img style="width:70%;height:70%;align-self:center" src="../assets/img/iconLogo.jpg"/>
              </div>
            </div>             
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    login() {
      this.$store.dispatch("user/login", this.user).then(result => {
        if (result instanceof Error) {
          this.$message({ type: "error", message: "Đăng nhập thất bại!" });
        } else {
          this.$message({ type: "success", message: "Đăng nhập thành công!" });
          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 2000);
        }
      });
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Ubuntu&display=swap");
body {
  background: white !important;
}
</style>

<style lang="scss" scoped>
.loginPage{
  transform: translateY(50%);
}
.login_btn {
  background: #20A8D8 0% 0% no-repeat padding-box;
  font: Regular 20px/24px Roboto;
  letter-spacing: 0;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  width : 100px;
  font-size:14px !important;
  height: 40px;
  line-height:40px;
  outline : none;
  color: #FFFFFF;
  opacity: 1;
}
.login_btn:hover{
  cursor: pointer;
}
.form-login {
  font-family: "Roboto", sans-serif !important;  
  width: 100%;
  border: 1px solid #707070;  
  opacity: 0.3;
  color : black !important;
  font-size:16px;
  border-top-right-radius : 5px;
  border-bottom-right-radius : 5px;
}
.forgot-password{
  font-size:16px !important;
  color : #20A8D8 !important;
}
.title{
  font-size:22px;
  color : black;
  font-weight:500;
}
.icon {
  padding: 10px;
  background: #20A8D8  0% 0% no-repeat padding-box;
  color: white;
  min-width: 50px;
  text-align: center;
}
.image-view{
  background: #BBEDFF 0% 0% no-repeat padding-box;
}
</style>