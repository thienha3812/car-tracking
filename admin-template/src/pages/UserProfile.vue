<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-button class="md-success" @click="active=true">Thêm</md-button>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Danh sách tài xế</h4>
            <p class="category">Bảng hiện thị thông tin tài xế</p>
          </md-card-header>
          <md-card-content>
            <md-table v-model="drivers">
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                md-auto-select
                md-selectable="multiple"
              >
                <md-table-cell md-label="Tên tài xế ">{{ item.dr_name }}</md-table-cell>
                <md-table-cell md-label="Ảnh">
                  <img class="driver_avatar" :src="item.dr_avatar" />
                </md-table-cell>
                <md-table-cell md-label="Thao tác">
                  <md-button class="md-raised edit_btn">Sửa</md-button>
                  <md-button class="md-raised delete_btn" @click="activeDeleteDialog=true;selectedRow=item">Xóa</md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
     <md-dialog :md-active.sync="active">
      <md-dialog-title>Thêm thông tin xe</md-dialog-title>
      <md-content>
        <div>
          <md-field>
            <label>Tên tài xế</label>
            <md-input v-model="name"></md-input>
          </md-field>
        </div>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="active=false">Hủy</md-button>
        <md-button class="md-primary" @click="submit();active=false">Lưu</md-button>
      </md-dialog-actions>
    </md-dialog>
     <md-dialog-confirm
      :md-active.sync="activeDeleteDialog"
      md-title="Xóa?"
      md-content="Bạn có chắc chắn muốn xóa hay không?"
      md-confirm-text="Đồng ý"
      md-cancel-text="Hủy"
      @md-confirm="onConfirmDelete"
    />
  </div>
</template>

<script>
import { getAllDriver,insertDriver,deleteDriver } from "../api/driver";
export default {
  name: "driverPage",
  components: {},
  data() {
    return {
      drivers: [],
      active : false,
      name : "",
      selectedRow : {},
      activeDeleteDialog: false
    };
  },
  methods:{
    onConfirmDelete(){
      deleteDriver(this.selectedRow).then(result=>{
        this.getList()
      })
    },
    getList(){
      this.drivers = []
      getAllDriver().then(result=>{
        this.drivers = result.data
      })
    },
    submit(){
      insertDriver({dr_name : this.name}).then((result)=>{
         if(result.status===200){
           this.$message({type:"success",message:"Thêm thành công"})
         }
      }).then(()=>{
        this.getList()
      })
    }
  },
  mounted() {
    getAllDriver().then(result => {
      this.drivers = result.data;
    });
  }
};
</script>
<style lang="scss" scoped>
.driver_avatar {
  width: 100px !important;
}
.delete_btn {
  background: #ff5252 !important;
}
.edit_btn {
  background: #448aff !important;
}
</style>
