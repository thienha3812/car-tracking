<template>
  <div>
    <GmapMap :center="center" :zoom="7" style="width: 100%; height: 90vh">
      <gmap-marker
        v-for="(m,index) in list"
        :key="index"
        :position="m.location"
        infoText="Marker #1"
        @click="showDetailDialog = true;selectedIndex=index"
        :icon="{url:require('../assets/img/automobile (1).png')}"
      ></gmap-marker>
    </GmapMap>
    <md-speed-dial :class="topPosition" md-direction="top">
      <md-speed-dial-target class="md-primary">
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button @click="showDiaLog()" class="faq-button md-icon-button" title="Danh sách">
          <md-icon>directions</md-icon>
        </md-button>

        <md-button class="faq-button md-icon-button">
          <md-icon>streetview</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
    <div v-show="isShow" class="infor-dialog maps">
      <div @click="isShow=false" class="close_button" style="position:absolute;top:0;right:0">
        <md-icon>close</md-icon>
      </div>
      <div class="title" style="text-align:center">
        <h3>
          <b>Danh sách xe đang hoạt động</b>
        </h3>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Biển số</th>
            <th scope="col">Lịch trình</th>
            <th scope="col" style="width: 36%;">Hành động</th>
          </tr>
        </thead>
        <tbody v-for="(l,index) in list" :key="index">
          <tr>
            <th scope="row">{{ index + 1 }}</th>
            <td>{{l.car_information.c_plate}}</td>
            <td>Nha Trang - Đà Nẵng</td>
            <td>
              <span>
                <md-button class="primary" @click="showDetailDialog = true;selectedIndex=index">Chi tiết</md-button>
                <md-button class="danger" @click.stop.prevent="setCenter(l,$event)">Theo dõi</md-button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div
        class="list_item" v-for="(l,index) in list" :key="index"
        style="display:flex;justify-content:space-around;border-top:1px solid black;width:100%;justify-content:center"
      >
        <div style="display:flex;flex-direction:column">
          <span>
            <b>Biển số xe : {{ index + 1 }}</b>
            {{l.car_information.c_plate}}
          </span>
          <span style="display:flex">
            <md-button class="primary" @click="showDetailDialog = true;selectedIndex=index">Chi tiết</md-button>
            <md-button class="danger" @click.stop.prevent="setCenter(l,$event)">Theo dõi</md-button>
          </span>
        </div>
      </div> -->
    </div>
    <md-dialog md-fullscreen :md-active.sync="showDetailDialog">
      <div class="md-layout">
        <div class="md-size-80 md-layout-item" style="padding:0">
          <GmapMap
            v-if="selectedIndex!=null"
            :center="list[selectedIndex].location"
            :zoom="16"
            style="width: 100%; height: 100vh"
          >
            <gmap-marker
              v-if="selectedIndex!=null"
              :position="list[selectedIndex].location"
              :icon="{url:require('../assets/img/automobile (1).png')}"
            ></gmap-marker>
          </GmapMap>
        </div>
        <div class="md-layout-item">
          <div
            class="md-layout"
            style="background:#3399ff;color:white;border-radius:20px;margin-top:5%"
          >
            <div class="md-layout-item">
              <span style="height:30px;line-height:30px">Thông tin tài xế</span>
              <!-- <small v-if="selectedIndex!=null">Vận tốc hiện tại: {{list[selectedIndex].speed}} km/h</small> -->
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item" style="padding:0">
              <div class="md-layout">
                <div class="md-layout-item" style="padding:0">
                  <img src="../assets/img/driver-avatar.jpg" style="height:30px;width:30px" />
                </div>
              </div>
            </div>
            <div class="md-layout-item md-size-70">
              <div class="md-layout" style="display:flex">
                <div class="md-layout-item">Nguyễn Văn A</div>
                <div class="md-layout-item md-size-100">Ngày lái</div>
                <div class="md-layout-item md-size-100">Chức vụ</div>
              </div>
            </div>
          </div>
          <div
            class="md-layout"
            style="background:#3399ff;color:white;border-radius:20px;margin-top:5%"
          >
            <div class="md-layout-item">
              <span style="height:30px;line-height:30px">Thông tin xe</span>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <div class="md-layout" style="display:flex">
                <div class="md-layout-item md-size-100" style="padding:0">
                  <small v-if="selectedIndex!=null">
                    <b>Biển số:</b>
                    {{list[selectedIndex].car_information.c_plate}}
                  </small>
                </div>
                <div class="md-layout-item md-size-100" style="padding:0">
                  <small v-if="selectedIndex!=null">
                    <b>Vận tốc hiện tại:</b>
                    {{list[selectedIndex].speed}} km/h
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDetailDialog = false">Đóng</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { getAllCar } from "../api/car";
import io from "socket.io-client";
import GoogleMapsLoader from "google-maps";
import { join } from "path";
import axios from "../ultis/axios";
export default {
  name: "googleMapPage",
  data() {
    return {
      socket: io("http://117.2.128.107:5023"),
      location: new Object(),
      center: { lat: null, lng: null },
      topPosition: "md-bottom-left",
      isShow: false,
      list: [],
      showDetailDialog: false,
      selectedIndex: null
    };
  },
  mounted() {
    var vm = this;
    vm.center.lat = 12;
    vm.center.lng = 109;
    this.location.lng = 10;
    this.location.lat = 10;
    this.socket.on("connect", function() {
      vm.socket.emit("clientConnect");
    });
    this.socket.on("data", function(dataReive) {
      var data = JSON.parse(dataReive);
      console.log(data);
      data.location.lng = parseFloat(data.location.lng);
      data.location.lat = parseFloat(data.location.lat);
      vm.getPlace(data);
    });
  },
  methods: {
    getPlace(data) {
      let index = this.list.findIndex(function(x) {
        return x.car_information.d_IMEI == data.car_information.d_IMEI;
      });
      if (index < 0) {
        data.index = index; // Thêm vị tri cho object
        this.list.push(data);
      } else {
        this.list[index].location = data.location;
        this.list[index].speed = data.speed;
      }
    },
    setCenter(data, e) {
      this.center.lat = data.location.lat;
      this.center.lng = data.location.lng;
    },
    showDiaLog() {
      return (this.isShow = true);
    }
  },
  watch: {
    selectedIndex: function(newVal, oldVal) {
      console.log(newVal);
    }
  }
};
</script>
<style lang="scss" scoped>
.md-dialog {
  min-width: 100%;
  min-height: 90%;
}
.primary {
  background: #448aff !important;
  width: 10%;
}
.danger {
  background: #ff5252 !important;
  width: 10%;
}
.success {
  background: #00ff00 !important;
  width: 10%;
}
.md-speed-dial {
  margin: 0 24px 0 8px;
}
.md-button {
  display: flex;
  justify-content: center;
}
.md-speed-dial-target {
  height: 60px !important;
  width: 60px !important;
  position: absolute;
  i {
    height: 30px;
    width: 30px;
  }
}
.faq-button {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}
.infor-dialog {
  position: absolute;
  width: 600px;
  top: 0;
  right: 0;
  margin-top: 10%;
  background: #fff;
}
.close_button:hover {
  cursor: pointer;
}
.list_item:hover {
  cursor: pointer;
  background: #e6e6e6;
}
.title h3{
  font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0px;
    padding: 15px 0px;
}
.list_item{
  border-top: 1px solid #dee2e6 !important;
}
.close_button{
  padding:13px;
  border-left: 1px solid #dee2e6;
}
table{
  margin-bottom:0px;
}
</style>
