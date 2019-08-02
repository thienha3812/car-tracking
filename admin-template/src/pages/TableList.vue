<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-button class="md-success" @click="showDialog=true">Thêm</md-button>
      </div>
    </div>
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Danh sách thiết bị </h4> 
            <p class="category">Bảng hiện thị thông tin thiết bị</p>
          </md-card-header>
          <md-card-content>
            <simple-table @hideDialog="hideDialog" :showDialog.sync="showDialog" table-header-color="green"></simple-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleTable, OrderedTable } from "@/components";

export default {
  components: {
    OrderedTable,
    SimpleTable
  },
  data(){
    return{
      showDialog : false,
      active:true
    }
  },
  methods:{
    hideDialog(value){
      this.showDialog = value
    }
  }
};
</script>
