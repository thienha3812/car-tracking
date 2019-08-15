<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-15">
        <md-button class="md-success" @click="showDialog=true">Thêm</md-button>
      </div>
      <div class="md-layout-item md-size-30">
        <md-field>
          <label>Tìm kiếm</label>
          <md-input v-model="searchContent.textSearch" @change="searchInputChange"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-20">
         <md-field>
          <label for="phanloai">Phân loại</label>
          <md-select v-model="searchContent.phanloai" >
            <md-option value="plate_number">Biển số xe</md-option>
            <md-option value="imei_device">Imei thiết bị</md-option>      
          </md-select>
        </md-field>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Danh sách thiết bị</h4>
            <p class="category">Bảng hiện thị thông tin thiết bị</p>
          </md-card-header>
          <md-card-content>
            <simple-table
              @hideDialog="hideDialog"
              :showDialog.sync="showDialog"
              :searchContent.sync="searchContent"
              table-header-color="green"
            ></simple-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleTable } from "@/components";

export default {
  components: {
    SimpleTable
  },
  data() {
    return {
      showDialog: false,
      active: true,      
      searchContent : {textSearch : "",phanloai : ""}
    };
  },
  methods: {
    hideDialog(value) {
      this.showDialog = value;
    },
    searchInputChange() {      
      if(this.searchContent.phanloai === ""){
        this.$message({type:"warning",message:"Bạn vui lòng chọn phân loại trước khi tìm kiếm!"})
        this.searchContent.textSearch = ''
      }else{        
        this.$bus.$emit('searchUpdate',this.searchContent)
      }
    }
  }
};
</script>
