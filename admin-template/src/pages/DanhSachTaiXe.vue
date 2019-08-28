<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-15">
        <md-button class="md-success" @click="active=true">Thêm</md-button>
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
                <md-table-cell md-label="CMND">{{ item.dr_card }}</md-table-cell>
                <!-- <md-table-cell md-label="Ảnh">
                  <img style="width:30px;height:60px" class="driver_avatar" :src="item.dr_avatar" />
                </md-table-cell>-->
                <md-table-cell md-label="Ngày sinh">{{ item.dr_card }}</md-table-cell>
                <md-table-cell md-label="Cấp bậc ">{{ item.dr_rank }}</md-table-cell>
                <md-table-cell md-label="Thao tác">
                  <md-button
                    class="md-raised edit_btn"
                    @click="editDialog = true;selectedRow = item"
                  >Sửa</md-button>
                  <md-button
                    class="md-raised delete_btn"
                    @click="activeDeleteDialog=true;selectedRow=item"
                  >Xóa</md-button>
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
            <md-input v-model="input.dr_name"></md-input>
          </md-field>
        </div>
        <div>
          <md-field>
            <label>Ngày sinh</label>
            <md-input v-model="input.dr_birthday"></md-input>
          </md-field>
        </div>
        <!-- <md-field>
          <label>Ảnh </label>
          <md-file v-model="fileImage" ref="file"  @md-change="onfileChange($event)" />
        </md-field>-->
        <div>
          <md-field>
            <label>Cấp bậc</label>
            <md-input v-model="input.dr_rank"></md-input>
          </md-field>
        </div>
        <div>
          <md-field>
            <label>CMND</label>
            <md-input v-model="input.dr_card"></md-input>
          </md-field>
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
export default {
  name: "driverPage",
  components: {},
  data() {
    return {
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
        dr_card: ""
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
      console.log(this.edit);
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
.md-dialog {
  min-width: 50%;
}
</style>
