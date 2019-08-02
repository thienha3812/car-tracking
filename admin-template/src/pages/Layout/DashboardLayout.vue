<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Bảng điều khiển</p>
      </sidebar-link>
      <sidebar-link to="/danh-sach-tai-xe">
        <md-icon>person</md-icon>
        <p>Danh sách tài xế</p>
      </sidebar-link>
      <sidebar-link to="/danh-sach-thiet-bi">
        <md-icon>content_paste</md-icon>
        <p>Danh sách thiết bị</p> 
      </sidebar-link>
      <sidebar-link to="/lich-su">
        <md-icon>train</md-icon>
        <p>Danh sách lịch trình</p>
      </sidebar-link>
      <!-- <sidebar-link to="/icons">
        <md-icon>brightness_3</md-icon>
        <p>Thiết bị đang hoạt động</p>
      </sidebar-link> -->
      <sidebar-link to="/ban-do">
        <md-icon>location_on</md-icon>
        <p>Bản đồ vị trí xe</p>
      </sidebar-link>
      <!-- <sidebar-link to="/notifications">
        <md-icon>history</md-icon>
        <p>Lịch sử hành trình</p>
      </sidebar-link> -->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
};
</script>
