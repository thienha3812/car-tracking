<template>
  <div>
    <md-table v-model="cars" :table-header-color="tableHeaderColor">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-auto-select
        md-selectable="multiple"
      >
        <md-table-cell md-label="Biển số xe ">{{ item.c_plate }}</md-table-cell>
        <md-table-cell md-label="Imei thiết bị">{{ item.d_IMEI }}</md-table-cell>
        <md-table-cell md-label="Tài xế đang lái" >{{item.driver[0].dr_name}}</md-table-cell>
        <md-table-cell md-label="Loại xe">
          <div v-for="i in item.category">
            
            <span>{{i.type}}</span>
          </div>
        </md-table-cell>
        <md-table-cell md-label="Năm sản xuất">{{item.manufacture}}</md-table-cell>
        <md-table-cell md-label="Thao tác">
          <button
            type="button"
            title="Sửa"
            class="btn btn-primary ml-1 mr-1"
            @click="editDialog=true;selectedRecord=item"
          >
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            title="Xóa"
            class="btn btn-danger"
            @click="active=true;selectedRecord=item"
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialogProp">
      <md-dialog-title>Thêm thông tin xe</md-dialog-title>
      <md-content>
        <div>
          <input v-model="input.c_plate" class="add_form" placeholder="Biển số xe" />
        </div>
        <div>
          <input v-model="input.c_IMEI" class="add_form" placeholder="IMEI thiết bị" />
        </div>
        <div>
          <input v-model="input.manufacture" class="add_form" placeholder="Năm sản xuất" />
        </div>
        <div>
          <b-form-select v-model="input.driver" :options="optionsDriver"></b-form-select>
        </div>
        <div>
          <b-form-select v-model="input.category" :options="optionsCategory"></b-form-select>
        </div>
      </md-content>
      <md-dialog-actions>
        <b-button variant="danger" class="mr-2" @click="$emit('hideDialog', false)">
          <i class="fa fa-times" aria-hidden="true"></i> Hủy
        </b-button>
        <b-button variant="success" @click="hideDiaLog()">
          <i class="fa fa-floppy-o" aria-hidden="true"></i> Lưu
        </b-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="editDialog" class="edit-dialog" >
      <md-dialog-title>Sửa thông tin xe</md-dialog-title>
      <md-content>
        <div>
          <b-form-group label="IMEI thiết bị: " label-cols-sm="3">
            <input class="add_form" v-model="edit.d_IMEI" :placeholder="selectedRecord.d_IMEI" />
          </b-form-group>
        </div>
        <div>
          <b-form-group label="Biển số xe: " label-cols-sm="3">
            <input class="add_form" v-model="edit.c_plate" :placeholder="selectedRecord.c_plate" />
          </b-form-group>
        </div>        
        <div>
          <b-form-group label="Năm sản xuất: " label-cols-sm="3">
            <input
              class="add_form"
              v-model="edit.manufacture"
              :placeholder="selectedRecord.manufacture"
            />
          </b-form-group>
        </div>
        <div>
          <b-form-group label="Tài xế lái: " label-cols-sm="3">
            <b-form-select v-model="edit.driver" :options="optionsDriver"></b-form-select>
          </b-form-group>
        </div>
        <div>
          <b-form-group label="Phân loại: " label-cols-sm="3">
            <b-form-select v-model="edit.category" :options="optionsCategory"></b-form-select>
          </b-form-group>
        </div>
      </md-content>
      <md-dialog-actions>
        <b-button variant="danger" class="mr-2" @click="editDialog=false">
          <i class="fa fa-times" aria-hidden="true"></i> Hủy
        </b-button>
        <b-button variant="success" @click="update();editDialog=false">
          <i class="fa fa-floppy-o" aria-hidden="true"></i> Lưu
        </b-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Xóa?"
      md-content="Bạn có chắc chắn muốn xóa hay không?"
      md-confirm-text="Đồng ý"
      md-cancel-text="Hủy"
      @md-confirm="onConfirm"
    />
  </div>
</template>

<script>
import { getAllCar, insertCar, deleteCar, updateCar } from "../../api/car";
import { getAllCategory } from "../../api/category";
import { getAllDriver } from "../../api/driver";
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    searchContent: {
      type: Object
    }
  },
  data() {
    return {
      selected: [],
      editDialog: false,
      edit: {
        d_IMEI: "",
        c_plate: "",
        category: null,
        manufacture: "",
        driver : null
      },
      optionsCategory: [{ value: "null", text: "Chọn loại xe" }],
      optionsDriver: [{ value: "null", text: "Chọn tài xế" }],
      cars: [],
      currentCars: [],
      input: {
        c_plate: "",
        c_IMEI: "",
        category: null,
        manufacture: "",
        driver : null
      },
      active: false,
      selectedRecord: {}
    };
  },
  created() {
    var vm = this;
    this.$bus.$on("searchUpdate", searchContent => {
      if (searchContent.textSearch == "") {
        this.getList();
      }
      if (this.cars.length > 0) {
        switch (searchContent.category) {
          case "plate_number":
            let currentFilterForPlateNumber = this.currentCars.filter(x => {
              return x.c_plate == searchContent.textSearch;
            });
            this.cars = [];
            this.cars = currentFilterForPlateNumber;
            break;
          case "imei_device":
            let currentFilterForImeiDevice = this.currentCars.filter(x => {
              return x.d_IMEI == searchContent.textSearch;
            });
            this.cars = [];
            this.cars = currentFilterForImeiDevice;
            break;
        }
      }
    });
  },
  methods: {
    resetInput() {
      this.input = {
        c_plate: "",
        c_IMEI: "",
        category: null,
        manufacture: "",
        driver : null
      };
    },
    resetEdit() {
      this.edit = {
        c_plate: "",
        c_IMEI: "",
        category: null,
        manufacture: "",
        driver : null
      };
    },
    update() {      
      updateCar({ ...this.edit, _id: this.selectedRecord._id }).then(result => {
        if (result instanceof Error) {
          this.$message({
            message: "Xảy ra lỗi!",
            type: "error"
          });
        } else {
          this.$message({
            message: "Sửa thành công!",
            type: "success"
          });
          this.getList();
          this.resetEdit();
        }
      });
    },
    searchUpdate(value) {
      console.log("123");
    },
    getList() {
      this.cars = [];
      var vm = this;
      getAllCar()
        .then(result => {
          console.log(result)
          this.cars = result.data;
          this.cars.forEach(function(value, index) {
            value.id = index + 1;
          });
          vm.currentCars = this.cars;
        })
        .catch(err => {});
    },
    onConfirm() {
      deleteCar(this.selectedRecord)
        .then(result => {
          if (result instanceof Error) {
            this.$message({
              message: "Bạn không có quyền sử dụng chức năng này!",
              type: "error"
            });
          } else {
            this.$message({
              message: "Xóa thành công",
              type: "success"
            });
          }
        })
        .then(() => {
          this.getList();
        });
    },
    hideDiaLog() {
      if(this.input.driver != null && this.input.category != null){
        insertCar(this.input).then(result => {
        if (result.status === 200) {
          this.$message({
            message: "Thêm thành công",
            type: "success"
          });
          this.getList();
          this.resetInput();
        } else {
          this.$message({
            message: "Thông tin nhập vào đã tồn tại !",
            type: "error"
          });
        }
      });
      this.$nextTick(() => {
        this.$emit("hideDialog", false);
      });
      }else{
         this.$message({
            message: "Vui lòng nhập đủ thông tin !",
            type: "error"
          });
      }
    }
  },
  mounted() {
    getAllDriver().then(result => {      
      result.data.forEach(x => {
        this.optionsDriver.push({ value: x._id, text: x.dr_name + "-CMND: " + x.dr_card });
      });
      
    });
    getAllCategory().then(result => {
      result.data.forEach(x => {
        this.optionsCategory.push({ value: x._id, text: x.type });
      });
    });
    this.getList();
  },
  computed: {
    showDialogProp: {
      get() {
        return this.showDialog;
      },
      set() {
        return !this.showDialog;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.md-dialog {
  max-width: 732px;
  min-width: 400px;
}
.delete_btn {
  background: #ff5252 !important;
}
.edit_btn {
  background: #448aff !important;
}
.edit-dialog {
  width: 35%;
}
</style>
