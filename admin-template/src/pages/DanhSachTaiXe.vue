<template>
  <div class="content">
    <div class="md-layout">
      <md-card-header data-background-color="green">
        <h4 class="title">Danh sách tài xế</h4>
      </md-card-header>
      <div class="md-layout-item md-size-15">
        <!-- <md-button class="md-success" @click="active=true">Thêm</md-button> -->
        <button type="button" class="btn btn-success" @click="active=true">Thêm</button>
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
          <md-select v-model="searchContent.category">
            <md-option value="name">Theo tên</md-option>
            <md-option value="card">Theo CMND</md-option>
          </md-select>
        </md-field>
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
                <md-table-cell md-label="Tuổi"></md-table-cell>
                <md-table-cell md-label="Giới tính"></md-table-cell>
                <md-table-cell md-label="Năm sinh">{{ item.dr_card }}</md-table-cell>
                <md-table-cell md-label="CMND">{{ item.dr_card }}</md-table-cell>
                <md-table-cell md-label="SĐT"></md-table-cell>
                <md-table-cell md-label="Cấp bậc ">{{ item.dr_rank }}</md-table-cell>
                <md-table-cell md-label="Đơn vị"></md-table-cell>
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
                  <!-- <md-button class="md-raised edit_btn" @click="editDialog = true;selectedRow = item">
                                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </md-button>-->
                  <!-- <md-button class="md-raised delete_btn" @click="activeDeleteDialog=true;selectedRow=item">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                  </md-button>-->
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
          <input v-model="input.dr_name"  class="add_form" placeholder="Tên tài xế" />
        </div>
        <div>
          <Datepicker class="mt-2" style="width:100%" v-model="input.dr_birthday" :language="vi"  placeholder="Ngày sinh"></Datepicker>
        </div>
        <div class="mt-2">
          <b-form-file placeholder="Ảnh đại diện" v-model="input.dr_avatar" drop-placeholder="Drop file here..."></b-form-file>
        </div>
        <div class="mt-2">
          <input class="add_form" placeholder="CMND"/>
        </div>

        <div class="mt-2">
          <input  class="add_form" placeholder="SĐT"/>
        </div>
        <div class="mt-2">
          <input  class="add_form" placeholder="Đơn vị"/>
        </div>
        <div class="mt-2">
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </div>
        <div class="mt-2">
          <b-form-select v-model="selected1" :options="options1"></b-form-select>
        </div>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="active=false">Hủy</md-button>
        <md-button class="md-primary" @click="submit();active=false">Lưu</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="editDialog">
      <md-dialog-title>Sửa thông tin xe</md-dialog-title>
      <md-content>
        <div>
          <md-field>
            <label>Tên tài xế</label>
            <md-input v-model="edit.dr_name" :placeholder="selectedRow.dr_name"></md-input>
          </md-field>
        </div>
        <div>
          <md-field>
            <label>Ngày sinh</label>
            <md-input v-model="edit.dr_birthday" :placeholder="selectedRow.dr_birthday"></md-input>
          </md-field>
        </div>
        <div>
          <md-field>
            <label>Cấp bậc</label>
            <md-input v-model="edit.dr_rank" :placeholder="selectedRow.dr_rank"></md-input>
          </md-field>
        </div>
        <div>
          <md-field>
            <label>CMNDc</label>
            <md-input v-model="edit.dr_card" :placeholder="selectedRow.dr_rank"></md-input>
          </md-field>
        </div>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="editDialog=false">Hủy</md-button>
        <md-button class="md-primary" @click="update();editDialog=false">Lưu</md-button>
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
      selected1: null,
      options1: [
        { value: null, text: "Cấp bậc" },
        
      ],
      selected: null,
      options: [
        { value: null, text: "Giới tính" },
        { value: "Nam", text: "Nam" },        
        { value: "Nữ", text: "Nữ" },        
      ],
      searchContent: { textSearch: "", category: "" },
      drivers: [],
      fileImage: "",
      edit: {
        dr_rank: "",
        dr_name: "",
        dr_birthday: "",
        dr_card: ""
      },
      input: {
        dr_rank: "",
        dr_name: "",
        dr_birthday: "",
        dr_card: "",
        dr_sex : "",
        dr_avatar : "",
        dr_unit : ""
      },
      active: false,
      name: "",
      selectedRow: {},
      activeDeleteDialog: false,
      editDialog: false
    };
  },
  methods: {
    searchInputChange() {
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
            this.$message({ type: "success", message: "Sửa thành công" });
          }
        })
        .then(() => {
          this.resetForm();
          this.getList();
        });
    },
    update() {
      updateDriver({ ...this.edit, _id: this.selectedRow._id })
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
    submit() {
      insertDriver(this.input)
        .then(result => {
          if (result.status === 200) {
            this.$message({ type: "success", message: "Thêm thành công" });
          }
        })
        .then(() => {
          this.getList();
        });
    }
  },
  mounted() {
    console.log($("input"))
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
