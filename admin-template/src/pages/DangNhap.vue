<template>
  <div class="app flex-row align-items-center">
    <div class="container">
        <div class="justify-content-center row">
            <div class="col-md-4">
                <div class="card-group">
                    <div class="p-2 card">
                        <div class="card-body">
                            <div class="">
                                <h1>Đăng nhập</h1>
                                <p class="text-muted">Đăng nhập bằng tài khoản được cung cấp</p>
                                <div class="mb-3 input-group">                                   
                                    <input placeholder="Tài khoản" @keypress.enter="login" v-model="user.username" autocomplete="username" type="text" >
                                </div>
                                <div class="mb-4 input-group d-flex">                                    
                                    <input placeholder="Mật khẩu"  @keypress.enter="login" v-model="user.password" autocomplete="current-password" type="password" >
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <button @click="login" class="p-2 btn btn-primary">Đăng nhập</button>
                                    </div>
                                    <!-- <div class="text-right col-6">
                                        <button class="px-0 btn btn-link">Quên mật khẩu?</button>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
          }, 500);
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
<style>
.app.flex-row.align-items-center {
  height: 100vh;
  display: flex;
  min-height: 100vh;
  align-items: center!important;
  flex-direction: row!important;
  background-color: #e4e5e6;
}
.app.flex-row.align-items-center h1{
    font-size: 28px;
}
.app.flex-row.align-items-center input{
  background-image: none
}
.app.flex-row.align-items-center .text-right.col-6 button{
  text-decoration: none;
}
.app.flex-row.align-items-center .text-right.col-6 button:hover{
  text-decoration: none;
  color: #333
}
.justify-content-center.row{
    width: 100%;
    max-width: 100%;
}
</style>