<template>
  <div class="App">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import 'current-script-polyfill'
export default {};
</script>
<style>
@import "../src/layout/navbar.css";
</style>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:500&display=swap");
@import "../src/assets/scss/main";
.vdp-datepicker__calendar {
  width: 600px !important;
}

.el-range-separator {
  width: 20% !important;
}
.el-date-editor {
  width: 100% !important;
}
</style>

