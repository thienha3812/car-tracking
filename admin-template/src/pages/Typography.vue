<template>
  <div class="content">
    
    <div class="md-layout">
      <div class="md-layout-item">
        <Datepicker
          :language="vi"
          :selected="onSelected"
          v-model="selectedDate"
          calendar-button
          calendar-button-icon="fa fa-calendar"
        ></Datepicker>
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Lịch sử hành trình</h4>
            <p class="category">Thông tin chi tiết lịch sử hành trình của xe</p>
          </md-card-header>
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
                  <md-button
                    class="md-raised delete_btn"
                    @click="activeDialog=true;selectedRecord=item.location;currentM=item.location"
                  >Xem chặng</md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <md-dialog class="mapDialog"  :md-active.sync="activeDialog">
      <div class="md-layout">
        <div class="md-layout-item md-size-80" style="padding:0">
          <GmapMap
            :center="{lat:latCenter, lng:lngCenter}"
            :zoom="14"
            style="width: 100%; height: 100vh"
          >
            <gmap-marker v-for="(m,index) in selectedRecord" :key="index" :position="m"></gmap-marker>
          </GmapMap>
        </div>
        <div class="md-layout-item" style="padding:0">
           <div class="md-layout" style="margin-top:10%">
             
           </div>
          <div class="md-layout" style="margin-top:10%;flex-direction:column;align-items:center">
            <div class="md-layout-item">
              <h3><b>Khoảng thời gian chạy</b></h3>
             </div>
              <div class="md-layout-item">
                  <el-time-picker
                    is-range                   
                     v-model="value1"
                     @change="timeChange"
                    range-separator="Đến"
                    start-placeholder="Start time"
                    end-placeholder="End time">
                  </el-time-picker>
                </div>
                <div class="md-layout-item">
                    <md-button style="background: #ff5252 !important;" @click="activeDialog=false">Đóng</md-button>
                </div>         
          </div>         
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
import VueClockPicker from '@pencilpix/vue2-clock-picker';
import * as $ from 'jquery'

function timeToSecond(hour,minute){
	return (parseInt(hour) + parseInt(minute)/60)*3600
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
      en: en,
      cars: [],
      endTime : false,
      activeDialog: false,
      selectedRecord: [],
      latCenter: null,
      lngCenter: null,
      zoom: 14,
      isSetted: false,
      m: [],
      value1: [],
      valueTime :[new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      currentM: [],
    };
  },
  methods: {
    onSelected() {},
    startToTimeChange(e) {
      console.log(e);
    },
    timeChange() {
      var start = timeToSecond(new Date(this.value1[0]).getHours(),new Date(this.value1[0]).getMinutes())
      var end = timeToSecond(new Date(this.value1[1]).getHours(),new Date(this.value1[1]).getMinutes())
      var a = this.currentM.filter(x=>{          
          let currentTime = timeToSecond(x.hour,x.minute)
          if(currentTime >= start && currentTime <= end){
            return x
          }
      })
      this.selectedRecord = []
      this.selectedRecord = a
    }
  },
  computed: {
    endChange: function() {}
  },
  watch: {
    activeDialog : function(newVal,onVal){
      if(newVal == true){
        this.currentM = this.selectedRecord
        var length = this.selectedRecord.length
        this.latCenter = this.selectedRecord[0].lat
         this.lngCenter = this.selectedRecord[0].lng
        this.value1 = [new Date(this.selectedRecord[0].year, this.selectedRecord[0].month, this.selectedRecord[0].date, this.selectedRecord[0].hour, this.selectedRecord[0].minute), new Date(this.selectedRecord[length-1].year, this.selectedRecord[length-1].month, this.selectedRecord[length-1].date, this.selectedRecord[length-1].hour, this.selectedRecord[length-1].minute)]
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
  min-height: 768px;
}
.vdp-datepicker {
  .vdp-datepicker__calendar {
    div {
      width: 600px;
    }
  }
}

</style>
