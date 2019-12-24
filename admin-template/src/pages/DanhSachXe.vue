<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-10" style="align-self:center">        
        <button type="button" class="btn btn-success" @click="showDialog=true">Thêm</button>
      </div>
      <div class="md-layout-item md-size-20">         
        <b-form-select v-model="searchContent.category" :options="optionsSearch"></b-form-select>
      </div>
      <div class="md-layout-item md-size-30" style="align-self:center">                
        <input v-model="searchContent.textSearch" @change="searchInputChange" placeholder="Tìm kiếm" class="add_form"/>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          
          <md-card-content>
            <car-table
              @hideDialog="hideDialog"
              :showDialog.sync="showDialog"
              :searchContent.sync="searchContent"
              table-header-color="green"
            ></car-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import CarTable from '../components/Tables/SimpleTable';

export default {
  components: {
    CarTable
  },
  data() {
    return {
      showDialog: false,
      optionsSearch : [
        {value : "plate_number", text : "Biển số xe"},
        {value : "imei_device", text : "Imei thiết bị"},
      ],
      active: true,      
      searchContent : {textSearch : "",category : "plate_number"}
    };
  },
  methods: {
    hideDialog(value) {
      this.showDialog = value;
    },
    searchInputChange() {      
      if(this.searchContent.category === ""){
        this.$message({type:"warning",message:"Bạn vui lòng chọn phân loại trước khi tìm kiếm!"})
        this.searchContent.textSearch = ''
      }else{        
        this.$bus.$emit('searchUpdate',this.searchContent)
      }
    }
  }
};
</script>
