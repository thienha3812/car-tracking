<template>
  <div class="content">
    <div class="md-layout d-flex flex-column">
      <div class="md-layout-item ">
        <div class="md-layout ">
          <div class="md-layout-item md-size-30" style="padding:0">
            <Datepicker
              :language="vi"
              v-model="selectedDate"
              placeholder="Chọn mốc thời gian"
            ></Datepicker>
          </div>
        </div>
      </div>
      <div class="md-layout-item ">
        <md-card>
          <md-card-content>
            <md-table v-model="cars">
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                md-auto-select
                md-selectable="multiple"
              >
                <md-table-cell md-label="IMEI">{{ item.d_IMEI }}</md-table-cell>
                <md-table-cell md-label="Thao tác">
                  <button
                    type="button"
                    title="Xem"
                    class="btn btn-info"
                    @click="showHistoryDialog(item)"
                  >
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    title="Xem"
                    class="btn btn-danger ml-2"
                    @click="$refs.fileInput1.click()"
                  >
                    <i class="fa fa-file" aria-hidden="true"></i>
                  </button>
                  <input
                    type="file"
                    ref="fileInput1"
                    @change="onFileChange($event)"
                    style="display:none;"
                  />
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <md-dialog class="mapDialog" md-fullscreen :md-active.sync="activeDialog">
      <div class="md-layout">
        <div class="md-layout-item md-size-80" style="padding:0">
          <!-- Vẽ đường -->
          <GmapMap
            :center="{ lat: latCenter, lng: lngCenter }"
            :zoom="14"
            style="width: 100%; height: 100vh"
          >
            <!-- <gmap-marker
              v-for="(m, index) in selectedRecord"
              :key="index"
              :icon="{ url: require('../assets/img/direction.png') }"
              :position="m"
            ></gmap-marker> -->
            <gmap-polyline
              :path="selectedRecord"
              :key="m.lng"
              :position="m"
              :options="{
                strokeOpacity: 0,
                icons: [
                  {
                    icon: square,
                    offset: '0',
                    repeat: '20px'
                  }
                ]
              }"
            ></gmap-polyline>
          </GmapMap>
        </div>
        <div class="md-layout-item" style="padding:0">
          <div class="md-layout" style="margin-top:10%"></div>
          <div
            class="md-layout"
            style="margin-top:10%;flex-direction:column;align-items:center"
          >
            <div class="md-layout-item">
              <h4>
                <b>Khoảng thời gian chạy</b>
              </h4>
            </div>
            <div class="md-layout-item">
              <el-time-picker
                is-range
                v-model="value1"
                @change="timeChange"
                range-separator="Đến"
                start-placeholder="Start time"
                end-placeholder="End time"
              ></el-time-picker>
            </div>
            <div class="md-layout-item">
              <b-button variant="danger" @click="activeDialog = false"
                >Đóng</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </md-dialog>
    <md-dialog
      v-if="recordFromFile.length > 0"
      class="mapDialog"
      md-fullscreen
      :md-active.sync="activeDialogFromFile"
    >
      <div class="md-layout">
        <div class="md-layout-item md-size-100" style="padding:0">
          <GmapMap
            :center="{ lat: recordFromFile[0].lat, lng: recordFromFile[0].lng }"
            :zoom="10"
            style="width: 100%; height: 100vh"
          >
            <gmap-marker
              v-for="(m, index) in recordFromFile"
              :key="index"
              :position="m"
            ></gmap-marker>
          </GmapMap>
        </div>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import { getLog } from "../api/log";
import Datepicker from "vuejs-datepicker";
import { vi, en } from "vuejs-datepicker/dist/locale";
import moment from "moment";
import axios from "axios";
import { distance } from "../ultis/distance.js";
function timeToSecond(hour, minute) {
  return (parseInt(hour) + parseInt(minute) / 60) * 3600;
}

export default {
  components: {
    Datepicker
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      square: {
        path: "M -2,-2 2,-2 2,2 -2,2 z",
        strokeColor: "#00000000",
        fillColor: "#2980b9",
        fillOpacity: 1,
        scale: 1
      },
      selectedDate: "",
      vi: vi,
      activeDialogFromFile: false,
      recordFromFile: [],
      en: en,
      cars: [],
      endTime: false,
      activeDialog: false,
      selectedRecord: [],
      latCenter: null,
      lngCenter: null,
      zoom: 14,
      isSetted: false,
      m: [],
      value1: [],
      valueTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      currentM: []
    };
  },
  methods: {
    async showHistoryDialog(item) {
      // Format các điểm để hiện thị tại đây
      var currentLocationArray = [];
      /////////////
      var tempX = [];
      var previos = undefined;
      item.location.forEach(loc => {
        if (previos != undefined) {
          var rz = distance(previos.lat, previos.lng, loc.lat, loc.lng, "K");
          var currentDate = moment(
            `${loc.year}-${loc.month}-${loc.date} ${loc.hour}:${loc.minute}:${loc.second}`
          );
          var previousDate = moment(
            `${previos.year}-${previos.month}-${previos.date} ${previos.hour}:${previos.minute}:${previos.second}`
          );
          var diffTime = currentDate.diff(previousDate, "seconds");
          // if (diffTime < 10) diffTime = 10;
          // console.log(
          //   `${minAcceptedDistance} - ${(maxAcceptedDistance / 10) *
          //     diffTime} : ${rz}`
          // );
          // console.log(`${rz} | ${diffTime}`);
          // if (previosSpeed != undefined) {
          //   console.log(previosSpeed * diffTime);
          // }
          if ((rz > 0.005 && diffTime < 15) || rz < 0.002) {
            // console.log("OK");
          } else {
            tempX.push(loc);
            previos = loc;
          }

          // if (
          //   (rz > minAcceptedDistance &&
          //     rz < (maxAcceptedDistance / 10) * diffTime) ||
          //   (rz > minAcceptedDistance && rz < maxAcceptedDistance)
          // ) {
          //   tempX.push(loc);
          //   console.log(rz);
          // }
        } else {
          previos = loc;
        }
      });
      ////////////
      var timesRequest = Math.ceil(tempX.length / 100);
      for (let val = 0; val < timesRequest; val++) {
        let formatArray = tempX
          .slice(val * 100, val * 100 + 100)
          .map(x => {
            return x.lat + "," + x.lng;
          })
          .join("|");
        let request = await axios.get(
          `https://roads.googleapis.com/v1/snapToRoads?path=${formatArray}&interpolate=true&key=AIzaSyDjc2vgeLo3K-Ts3fDUzhgczsqOqHNjou8`
        );
        currentLocationArray = [
          ...currentLocationArray,
          ...request.data.snappedPoints.map(x => {
            return { lat: x.location.latitude, lng: x.location.longitude };
          })
        ];
      }

      this.activeDialog = true;
      this.selectedRecord = currentLocationArray;
      this.currentM = item.location;
    },
    onFileChange(e) {
      var vm = this;
      var files = e.target.files || e.dataTransfer.files;
      var r = new FileReader();
      r.onload = function(result) {
        var listData = result.currentTarget.result.toString().split("\n");
        for (var i = 0; i < listData.length; i++) {
          let gps = listData[i].split(",");
          let status = gps[1];
          let time = gps[2];
          let lat = parseFloat(gps[3]);
          let lng = parseFloat(gps[4]);
          if (status == 1) {
            vm.recordFromFile.push({ lat: lat, lng: lng, time: time });
          }
        }
      };
      this.activeDialogFromFile = true;
      r.readAsText(files[0]);
    },
    timeChange() {
      var start = timeToSecond(
        new Date(this.value1[0]).getHours(),
        new Date(this.value1[0]).getMinutes()
      );
      var end = timeToSecond(
        new Date(this.value1[1]).getHours(),
        new Date(this.value1[1]).getMinutes()
      );
      var a = this.currentM.filter(x => {
        let currentTime = timeToSecond(x.hour, x.minute);
        if (currentTime >= start && currentTime <= end) {
          return x;
        }
      });
      this.selectedRecord = []; // Reset mảng về mặc định
      this.selectedRecord = a;
    }
  },
  computed: {},
  watch: {
    activeDialog: function(newVal) {
      if (newVal == true) {
        this.currentM = this.selectedRecord;
        var length = this.selectedRecord.length;
        this.latCenter = this.selectedRecord[0].lat;
        this.lngCenter = this.selectedRecord[0].lng;
        this.value1 = [
          new Date(
            this.selectedRecord[0].year,
            this.selectedRecord[0].month,
            this.selectedRecord[0].date,
            this.selectedRecord[0].hour,
            this.selectedRecord[0].minute
          ),
          new Date(
            this.selectedRecord[length - 1].year,
            this.selectedRecord[length - 1].month,
            this.selectedRecord[length - 1].date,
            this.selectedRecord[length - 1].hour,
            this.selectedRecord[length - 1].minute
          )
        ];
      }
    },
    selectedDate: function(newVal) {
      let data = moment(newVal)
        .format("M D YYYY")
        .split(" ");
      let year = data["2"];
      let month = data["0"];
      let date = data["1"];

      getLog({ year, month, date })
        .then(result => {
          // console.log(result.data[0].location)
          var array = [];
          // console.log(result.data[0].location.slice(0,99))
          result.data[0].location.slice(0, 99).forEach(x => {
            array.push(x.lat + "," + x.lng);
          });
          // console.log(array.join('|'))

          this.cars = result.data;
        })
        .catch(() => {
          console.log(`Không có lịch sử tại thời điểm ${newVal}`);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.md-dialog {
  min-width: 100%;
  min-height: auto;
}
.vdp-datepicker {
  .vdp-datepicker__calendar {
    div {
      width: 600px;
    }
  }
}
</style>
