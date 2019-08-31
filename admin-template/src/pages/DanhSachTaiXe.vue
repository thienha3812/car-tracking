<template>
  <div class="content">
    <div class="md-layout">      
      <div class="md-layout-item md-size-10" style="align-self:center">
        <!-- <md-button class="md-success" @click="active=true">Thêm</md-button> -->
        <button type="button" class="btn btn-success" @click="active=true">Thêm</button>
      </div>
      <div class="md-layout-item md-size-20">        
        <b-form-select v-model="searchContent.category" :options="optionsSearch"></b-form-select>
      </div>
      <div class="md-layout-item md-size-30" style="align-self:center">        
        <input v-model="searchContent.textSearch" @change="searchInputChange"  class="add_form" placeholder="Tìm kiếm" />
      </div>
      
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-content>
            <md-table v-model="drivers">
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                md-auto-select
                md-selectable="multiple"
              >
                <md-table-cell md-label="Tên">{{ item.dr_name }}</md-table-cell>               
                <md-table-cell md-label="Giới tính">{{item.dr_sex}}</md-table-cell>                
                <md-table-cell md-label="CMND">{{ item.dr_card }}</md-table-cell>
                <md-table-cell md-label="SĐT">{{ item.dr_phone }}</md-table-cell>
                <md-table-cell md-label="Cấp bậc ">{{ item.dr_rank }}</md-table-cell>
                <md-table-cell md-label="Đơn vị">{{ item.dr_unit }}</md-table-cell>
                <md-table-cell md-label="Thao tác">
                  <button type="button" title="Xem" class="btn btn-info">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    title="Sửa"
                    class="btn btn-primary ml-1 mr-1"
                    @click="editDialog = true;selectedRow = item"
                  >
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    title="Xóa"
                    class="btn btn-danger"
                    @click="activeDeleteDialog=true;selectedRow=item"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>                  
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div class="md-layout " style="justify-content:flex-end">
        <div class="md-layout-item md-size-70 ">
            
        </div>
    </div>
    <md-dialog :md-active.sync="active">
      <md-dialog-title class="text-center">Thêm Tài Xế</md-dialog-title>
      <md-content>
        <div>
          <input v-model="input.dr_name"  class="add_form" placeholder="Tên tài xế" />
        </div>
        <div>
          <Datepicker style="width:100%" v-model="input.dr_birthday" :language="vi"  placeholder="Ngày sinh"></Datepicker>
        </div>
        <div>
          <b-form-file placeholder="Ảnh đại diện" v-model="input.dr_avatar" drop-placeholder="Drop file here..."></b-form-file>
        </div>
       <div>
          <input v-model="input.dr_card" class="add_form" placeholder="CMND"/>
        </div>

        <div>
          <input v-model="input.dr_phone" class="add_form" placeholder="SĐT"/>
        </div>
        <div>
          <input v-model="input.dr_unit" class="add_form" placeholder="Đơn vị"/>
        </div>
        <div>
          <b-form-select v-model="input.dr_sex" :options="optionsSex"></b-form-select>
        </div>
        <div>
          <b-form-select v-model="input.dr_rank" :options="optionsLevel"></b-form-select>
        </div>
      </md-content>
      <md-dialog-actions>
        <b-button variant="danger" @click="active=false" class="mr-2"><i class="fa fa-times" aria-hidden="true"></i> Hủy</b-button>
        <b-button variant="success"  @click="add();active=false"><i class="fa fa-floppy-o" aria-hidden="true"></i> Lưu</b-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="editDialog">
      <md-dialog-title>Sửa thông tin xe</md-dialog-title>
      <md-content>
         <div>
          <input v-model="edit.dr_name" :placeholder="selectedRow.dr_name"  class="add_form" />
        </div>
        <div>
          <Datepicker style="width:100%" v-model="edit.dr_birthday" :language="vi"  :placeholder="parseDate(selectedRow.dr_birthday)"></Datepicker> </Datepicker>
        </div>
        <div>
          <b-form-file placeholder="Ảnh đại diện" v-model="edit.dr_avatar" drop-placeholder="Drop file here..."></b-form-file>
        </div>
       <div>
          <input v-model="edit.dr_card" class="add_form" :placeholder="selectedRow.dr_card" />
        </div>

        <div>
          <input v-model="edit.dr_phone" class="add_form" :placeholder="selectedRow.dr_phone" />
        </div>
        <div>
          <input v-model="edit.dr_unit" class="add_form" :placeholder="selectedRow.dr_unit" />
        </div>
        <div>
          <b-form-select v-model="edit.dr_sex" :options="optionsSex"></b-form-select>
        </div>
        <div>
          <b-form-select v-model="selectedRow.dr_rank" :options="optionsLevel"></b-form-select>
        </div>
      </md-content>
      <md-dialog-actions>        
        <b-button variant="danger" class="mr-2" @click="editDialog=false"><i class="fa fa-times " aria-hidden="true"></i> Hủy</b-button>
        <b-button variant="success" @click="update();editDialog=false"><i class="fa fa-floppy-o" aria-hidden="true"></i> Lưu</b-button>
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
import {
  getAllDriver,
  insertDriver,
  deleteDriver,
  updateDriver
} from "../api/driver";
import Datepicker from "vuejs-datepicker";
import { vi, en } from "vuejs-datepicker/dist/locale";
import * as $ from 'jquery';
export default {
  name: "driverPage",
  components: {
    Datepicker
  },
  data() {
    return {
      vi : vi,
      currentPage : 10,
      perPage : 10,
      optionsSearch:[
        { value: "name", text: "Theo tên" },
        { value : "card",text:"Theo CMND" }
      ],
      optionsLevel: [
        { value: null, text: "Cấp bậc" },
        { value : "Đại tá",text:"Đại tá" }
      ],

      optionsSex: [
        { value: null, text: "Giới tính" },
        { value: "Nam", text: "Nam" },        
        { value: "Nữ", text: "Nữ" },        
      ],
      searchContent: { textSearch: "", category: "name" },
      drivers: [],
      fileImage: "",
      edit: {
        dr_rank: "",
        dr_unit: "",
        dr_name: "",
        dr_birthday: "",
        dr_card: "",
        dr_sex : null,
        dr_avatar : "",
        dr_phone : "",
        dr_rank : null   
      },
      input: {
        dr_rank: "",
        dr_unit: "",
        dr_name: "",
        dr_birthday: "",
        dr_card: "",
        dr_sex : null,
        dr_avatar : "",
        dr_phone : "",
        dr_rank : null        
      },
      active: false,
      name: "",
      selectedRow: {},
      activeDeleteDialog: false,
      editDialog: false
    };
  },
  methods: {
    parseDate(time){
      let date = new Date(time).getDate()
      let month = new Date(time).getMonth()  + 1
      let year = new Date(time).getFullYear()
      return "Ngày" + " "+  date + "Tháng" + " "+ + month + "Năm" +" "+ year
    },
    searchInputChange() {
      if (this.searchContent.textSearch == "") {
        this.getList();
        return 
      }
      if (this.searchContent.category === "") {
        this.$message({
          type: "warning",
          message: "Bạn vui lòng chọn phân loại trước khi tìm kiếm!"
        });
        this.searchContent.textSearch = "";
      } else {
        switch (this.searchContent.category) {
          case "name":
            getAllDriver().then(result => {
              this.drivers = [];
              this.drivers = result.data.filter(
                x => x.dr_name == this.searchContent.textSearch
              );
            });
            break;
          case "card":
            getAllDriver().then(result => {
              this.drivers = [];
              this.drivers = result.data.filter(
                x => x.dr_card == this.searchContent.textSearch
              );
            });
            break;
        }
      }
    },
    onfileChange() {
      //
    },
    resetForm() {
      this.edit.dr_name = "";
      this.edit.dr_rank = "";
      this.edit.dr_birthday = "";
    },
    onConfirmDelete() {
      deleteDriver(this.selectedRow)
        .then(result => {
          if (result.status === 200) {
            this.$message({ type: "success", message: "Xoá thành công" });
          }
        })
        .then(() => {
          this.resetForm();
          this.getList();
        });
    },
    update() {      
      updateDriver({ ...this.edit, _id: this.selectedRow._id,dr_birthday : new Date(this.edit.dr_birthday).toISOString(), dr_rank : this.selectedRow.dr_rank })
        .then(result => {
          if (result.status === 200) {
            this.$message({ type: "success", message: "Sửa thành công" });
          }
        })
        .then(() => {
          this.resetForm();
          this.getList();
        });
    },
    getList() {
      this.drivers = [];
      getAllDriver().then(result => {
        console.log(result)
        this.drivers = result.data;
        console.log(this.drivers)
      });
    },
    add() {
      var fd = new FormData() 
      var date = null      
      if(this.input.dr_birthday ){
          date = new Date(this.input.dr_birthday).toISOString()     
      }
      fd.append("dr_avatar",this.input.dr_avatar)
      fd.append("dr_name",this.input.dr_name)
      fd.append("dr_card",this.input.dr_card)
      fd.append("dr_birthday",date)
      fd.append("dr_sex",this.input.dr_sex)
      fd.append("dr_phone",this.input.dr_phone)
      fd.append("dr_unit",this.input.dr_unit) 
      fd.append("dr_rank",this.input.dr_rank)      
      insertDriver(fd)        
        .then(result => {          
          if (result.status === 200) {
            this.$message({ type: "success", message: "Thêm thành công" });
            this.getList();
          }else{
            this.$message({ type: "error", message: "Vui lòng kiểm tra lại thông tin" });
          }
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
.add_form{
  border:1px solid #ced4da;
  border-radius:0.25rem;
  width : 100%;
  height:40px;
  line-height: 40px;
  padding : 0.375rem 1.75rem 0.375rem 0.75rem;
}
.driver_avatar {
  width: 100px !important;
}
.delete_btn {
  background: #ff5252 !important;
}
.edit_btn {
  background: #448aff !important;
}
.md-dialog {
  min-width: 50%;
}
</style>
<style module lang="scss">
    input {
      border:1px solid #ced4da;
      border-radius:0.25rem;
      width : 100%;
      height:40px;
      line-height: 40px;
      padding : 0.375rem 1.75rem 0.375rem 0.75rem;
    }
</style>
