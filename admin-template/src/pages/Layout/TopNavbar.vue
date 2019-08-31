<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h5>{{ $route.name }}</h5>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>    
            <li class="md-list-item">
              <a
                href="javascript:void(0)"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <i class="material-icons">apps</i>                   
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">                     
                      <li><a href="#">Thông tin tài khoản</a></li>
                      <li><a href="#">Thiết lập tài khoản</a></li>
                      <li><a href="javascript:void(0)" @click="logout" style="color:red !important">Đăng xuất</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>            
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data() {
    return {
      selectedEmployee: null,
      employees: [
      
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logout(){
      this.$store.dispatch("user/logout").then(()=>{
        this.$router.push("/login")
      })
    }
  }
};
</script>

<style lang="css"></style>
