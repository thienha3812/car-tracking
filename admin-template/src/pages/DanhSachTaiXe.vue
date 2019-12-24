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
                  <button type="button" title="Xem" class="btn btn-info" @click="viewDialog=true;selectedRow=item;">
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
    <md-dialog :md-active.sync="viewDialog" v-if="selectedRow">
      <md-dialog-title>Xem thông tin tài xế</md-dialog-title>
      <md-content>
        <div class="md-layout">
          <div class="md-layout-item  md-size-35">
              <img :src="selectedRow.dr_avatar" />
          </div>
          <div class="md-layout-item md-size-20 ">
              <div>Họ tên</div>
              <div>Ngày sinh</div>
              <div>Giới tính</div>
              <div>Cmnd</div>
              <div>Sđt</div>
              <div>Đơn vị</div>
              <div>Chức vụ</div>
          </div>
          <div class="md-layout-item ">
              <div>{{selectedRow.dr_name}}</div>
              <div>{{parseDate(selectedRow.dr_birthday)}}</div>
              <div>{{selectedRow.dr_sex}}</div>
              <div>{{selectedRow.dr_card}}</div>
              <div>{{selectedRow.dr_phone}}</div>
              <div>{{selectedRow.dr_unit}}</div>
              <div>{{selectedRow.dr_rank}}</div>
          </div>
        </div>
      </md-content>
      <md-dialog-actions>        
        <b-button variant="danger" class="mr-2" @click="viewDialog=false"><i class="fa fa-times " aria-hidden="true"></i> Hủy</b-button>        
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="editDialog" class="edit-dialog">
      <md-dialog-title>Sửa thông tin tài xế</md-dialog-title>
      <md-content>
         <div>
           <b-form-group label="Tên tài xế: " label-cols-sm="2">
            <input v-model="edit.dr_name" :placeholder="selectedRow.dr_name"  class="add_form" />
           </b-form-group>
        </div>
        <div>
          <b-form-group label="Ngày sinh: " label-cols-sm="2">
          <Datepicker style="width:100%" v-model="edit.dr_birthday" :language="vi"  :placeholder="parseDate(selectedRow.dr_birthday)"></Datepicker> </Datepicker>
          </b-form-group>
        </div>
        <div>
          <b-form-group label="Ảnh đại diện: " label-cols-sm="2">
            <b-form-file placeholder="Ảnh đại diện" v-model="edit.dr_avatar" drop-placeholder="Drop file here..."></b-form-file>
          </b-form-group>
        </div>
       <div>
          <b-form-group label="CMND: " label-cols-sm="2">
            <input v-model="edit.dr_card" class="add_form" :placeholder="selectedRow.dr_card" />
          </b-form-group>
        </div>

        <div>
          <b-form-group label="CMND: " label-cols-sm="2">
          <input v-model="edit.dr_phone" class="add_form" :placeholder="selectedRow.dr_phone" />
          </b-form-group>
        </div>
        <div>
          <b-form-group label="Đơn vị: " label-cols-sm="2">
            <input v-model="edit.dr_unit" class="add_form" :placeholder="selectedRow.dr_unit" />
          </b-form-group>
        </div>
        <div>
          <b-form-group label="Giới tính: " label-cols-sm="2">
            <b-form-select v-model="selectedRow.dr_sex" :options="optionsSex"></b-form-select>
          </b-form-group>
        </div>
        <div>
          <b-form-group label="Cấp bậc: " label-cols-sm="2">
            <b-form-select v-model="selectedRow.dr_rank" :options="optionsLevel"></b-form-select>
          </b-form-group>
        </div>
      </md-content>
      <md-dialog-actions>        
        <b-button variant="danger" class="mr-2" @click="editDialog=false"><i class="fa fa-times " aria-hidden="true"></i> Hủy</b-button>
        <b-button variant="success" @click="update();editDialog=false"><i class="fa fa-floppy-o" aria-hidden="true"></i> Lưu</b-button>
      </md-dialog-actions>
    </md-dialog>    
     <b-modal v-model="activeDeleteDialog" hide-footer>    
    <div class="d-block text-center">
      <h4>Bạn có muốn xoá không!</h4>
    </div>
    <div class="d-flex justify-content-end">
      <b-button variant="danger" @click="activeDeleteDialog=false" class="mr-1">Huỷ</b-button>
     <b-button variant="success" @click="onConfirmDelete">Đồng ý</b-button>
    </div>
  </b-modal>
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
      viewDialog : false,
      currentPage : 10,
      perPage : 10,
      optionsSearch:[
        { value: "name", text: "Theo tên" },
        { value : "card",text:"Theo CMND" }
      ],
      optionsLevel: [
        { value: null, text: "Cấp bậc" },
        { value : "Thiếu uý",text:"Thiếu uý" },
        { value : "Trung uý",text:"Trung uý" },
        { value : "Thượng uý",text:"Thượng uý" },
        { value : "Đại uý",text:"Đại uý" },
        { value : "Thiếu tá",text:"Thiếu tá" },
        { value : "Trung tá",text:"Trung tá" },
        { value : "Thượng tá",text:"Thượng tá" },
        { value : "Đại tá",text:"Đại tá" },
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
        dr_rank : null,
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
    resetInput(){
      this.input = {
        dr_rank: "",
        dr_unit: "",
        dr_name: "",
        dr_birthday: "",
        dr_card: "",
        dr_avatar : "",
        dr_phone : "",
        dr_rank : null,
        dr_sex : null,        
      }
    },
    parseDate(time){    
      let date = new Date(time).getDate()
      let month = new Date(time).getMonth()  + 1
      let year = new Date(time).getFullYear()
      return "Ngày" + " "+  date + " Tháng" + " "+ + month + " Năm" +" "+ year
    },
    resetForm(){
      this.edit = {
        dr_rank: "" ,
        dr_unit: "",
        dr_name: "",
        dr_birthday: "",
        dr_card: "",
        dr_avatar : "",
        dr_phone : "",
        dr_rank : null,
        dr_sex : null,
      }
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
    onConfirmDelete() {
      deleteDriver(this.selectedRow)
        .then(result => {
          if (result.status === 200) {
            this.$message({ type: "success", message: "Xoá thành công" });
          }
        })
        .then(() => {
          this.resetForm();
          this.activeDeleteDialog = false;
          this.getList();
        });
    },
    update() {                
      updateDriver({ ...this.edit, _id: this.selectedRow._id,dr_birthday : new Date(this.edit.dr_birthday || this.selectedRow.dr_birthday).toISOString() || '', dr_rank : this.selectedRow.dr_rank,dr_sex : this.selectedRow.dr_sex})
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
        this.drivers = result.data;        
      });
    },
    add() {
      var fd = new FormData() 
      var date = null            
      if(this.input.dr_birthday ){
          date = new Date(this.input.dr_birthday).toISOString()     
      }
      if(!this.input.dr_avatar || !this.input.dr_name  || !this.input.dr_card || !date && !this.input.dr_sex || !this.input.dr_phone || !this.input.dr_unit || !this.input.dr_rank){
        this.$message({ type: "error", message: "Vui lòng nhập đầy đủ thông tin" });
        return
      }
      fd.append("dr_avatar",this.input.dr_avatar )
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
            this.resetInput()
          }else{
            this.$message({ type: "error", message: "Vui lòng kiểm tra lại thông tin" });
          }
        })        
    }
  },
  mounted() {    
    getAllDriver().then(result => {
      this.drivers = result.data;
      console.log(this.drivers)
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
  max-height: fit-content;
}
.edit-dialog{
  min-height: 100% !important;
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
