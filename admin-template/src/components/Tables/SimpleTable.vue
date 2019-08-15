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
        <md-table-cell md-label="Thao tác">
          <md-button class="md-raised edit_btn">Sửa</md-button>
          <md-button class="md-raised delete_btn" @click="active=true;selectedRecord=item">Xóa</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialogProp">
      <md-dialog-title>Thêm thông tin xe</md-dialog-title>
      <md-content>
        <div>
          <md-field>
            <label>Biển số</label>
            <md-input v-model="plate"></md-input>
          </md-field>
          <md-field>
            <label>IMEI Thiết bị</label>
            <md-input v-model="imei"></md-input>
          </md-field>
        </div>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="$emit('hideDialog', false)">Hủy</md-button>
        <md-button class="md-primary" @click="hideDiaLog()">Lưu</md-button>
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
import { getAllCar, insertCar, deleteCar } from "../../api/car";
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
      cars: [],
      currentCars: [],
      imei: "",
      plate: "",
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
        switch (searchContent.phanloai) {
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
            console.log(1);
            this.cars = [];
            this.cars = currentFilterForImeiDevice;
            break;
        }
      }
    });
  },
  methods: {
    searchUpdate(value) {
      console.log("123");
    },
    getList() {
      this.cars = [];
      var vm = this;
      getAllCar()
        .then(result => {
          this.cars = result.data;
          this.cars.forEach(function(value, index) {
            value.id = index + 1;
          });
          vm.currentCars = this.cars;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onConfirm() {
      deleteCar(this.selectedRecord)
        .then(result => {
          console.log(result);
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
      insertCar({ imei: this.imei, plate: this.plate }).then(result => {
        if (result.status === 200) {
          this.$message({
            message: "Thêm thành công",
            type: "success"
          });
          this.getList();
        } else {
          this.$message({
            message: "Xảy ra lỗi",
            type: "error"
          });
        }
      });
      this.$nextTick(() => {
        this.$emit("hideDialog", false);
      });
    }
  },
  mounted() {
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
</style>
