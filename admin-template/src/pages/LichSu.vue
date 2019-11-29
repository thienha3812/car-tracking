<template>
  <div class="content">
    <div class="md-layout d-flex flex-column">
      <div class="md-layout-item ">
        <div class="md-layout ">
          <div class="md-layout-item md-size-30" style="padding:0">
            <Datepicker
              :language="vi"
              :selected="onSelected"
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
                    @click="
                      activeDialog = true;
                      selectedRecord = item.location;
                      currentM = item.location;
                    "
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
          <GmapMap
            :center="{ lat: latCenter, lng: lngCenter }"
            :zoom="14"
            style="width: 100%; height: 100vh"
          >
            <gmap-marker
              v-for="(m, index) in selectedRecord"
              :key="index"
              :icon="markerOptions"
              :position="m"
            ></gmap-marker>
          </GmapMap>
        </div>
        <div class="md-layout-item" style="padding:0">
          <div class="md-layout" style="margin-top:10%"></div>
          <div
            class="md-layout"
            style="margin-top:10%;flex-direction:column;align-items:center"
          >
            <div class="md-layout-item">
              <h3>
                <b>Khoảng thời gian chạy</b>
              </h3>
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
              <b-button variant="danger" @click="activeDialog=false">Đóng</b-button>              
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
              :icon="markerOptions"
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
import { version } from "punycode";
import VueClockPicker from "@pencilpix/vue2-clock-picker";
import * as $ from "jquery";
import * as fs from "fs";
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
      currentM: [],
      markerOptions: {        
        size: { width: 60, height: 90, f: "px", b: "px" },
        scaledSize: { width: 30, height: 45, f: "px", b: "px" }
      }
    };
  },
  methods: {
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
          let speed = gps[6];
          if (status == 1) {
            vm.recordFromFile.push({ lat: lat, lng: lng, time: time });
          }
        }
      };
      this.activeDialogFromFile = true;
      r.readAsText(files[0]);
    },
    onSelected() {},
    startToTimeChange(e) {
      console.log(e);
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
  computed: {
    endChange: function() {}
  },
  watch: {
    activeDialog: function(newVal, onVal) {
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
    selectedDate: function(newVal, oldVal) {
      let data = moment(newVal)
        .format("M D YYYY")
        .split(" ");
      let year = data["2"];
      let month = data["0"];
      let date = data["1"];
      getLog({ year, month, date }).then(result => {
        this.cars = result.data;
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
