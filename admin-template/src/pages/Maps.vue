<template>
  <div>
    <GmapMap :center="center"  :zoom="10" style="width: 100%; height: 90vh">
      <gmap-marker
        v-for="(m,index) in list"
        :key = "index"
        :position="m.location"
        :icon = "{url:require('../assets/img/automobile (1).png')}"
      ></gmap-marker>
    </GmapMap>
    <md-speed-dial :class="topPosition" md-direction="top">
      <md-speed-dial-target class="md-primary">
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button @click="showDiaLog()" class="faq-button md-icon-button">
          <md-icon>directions</md-icon>
        </md-button>

        <md-button class="faq-button md-icon-button">
          <md-icon>streetview</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
    <div v-show="isShow" class="infor-dialog">
      <div @click="isShow=false" class="close_button" style="position:absolute;top:0;right:0">
        <md-icon>close</md-icon>
      </div>
      <div style="text-align:center">
        <h3>Danh sách xe đang hoạt động</h3>
      </div>
      <div
        @click="setCenter(l)"
        class="list_item"
        v-for="(l,index) in list"
        :key="index"
        style="display:flex;justify-content:space-around;border-top:1px solid black;padding:10px"
      >
        <div style="display:flex;flex-direction:column">
          <span style="font-size:20px">Xe đi gặp đối tác</span>
          <span style="font-size:15px">{{l.formatted_address}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllCar } from "../api/car";
import io from "socket.io-client";
import GoogleMapsLoader from "google-maps";
import { join } from "path";
import  axios from '../ultis/axios'
export default {
  name: "googleMapPage",
  data() {
    return {
      socket: io("http://localhost:5555"),
      location: new Object(),
      center: { lat: 0, lng: 0 },
      m: [],
      topPosition: 'md-bottom-left',
      isShow : false  ,
      list : []  
    };
  },
  mounted() {
    var vm = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      vm.center.lat = position.coords.latitude;
      vm.center.lng = position.coords.longitude;
    });
    this.location.lng = 10;
    this.location.lat = 10;
    this.socket.on("connect", function() {
      vm.socket.emit("clientConnect");
    });
    this.socket.on("data", function(dataReive) {
      var data = JSON.parse(dataReive)
      data.location.lng = parseFloat(data.location.lng)
      data.location.lat = parseFloat(data.location.lat)
      vm.getPlace(data)
    });
  },
  methods:{
    getPlace(data){
       axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.location.lat},${data.location.lng}&key=AIzaSyCHPOumhdmQXsMPf7lPaitwMkAjGI2p8AU`).then((result)=>{
         console.log(result.data.results[0].formatted_address)
         data.formatted_address = result.data.results[0].formatted_address
         let index = this._.findIndex(this.list,function(x){ // Lấy vị trí của Object trong mảng
            return x.car_information.d_IMEI = data.car_information.d_IMEI
         })
         console.log(index)
         if(index<0){
           this.list.push(data)
         }else{
           this.list[index].location = data.location
           this.list[index].formatted_address = result.data.results[0].formatted_address
           console.log(this.list)
         }
       })
    }
    ,
    setCenter(data){
      console.log(data)
      this.center.lat = data.location.lat
      this.center.lng = data.location.lng
    },
    showDiaLog(){
      console.log(this.isShow)
      return this.isShow = true
    }
  }
};
</script>
<style lang="scss" scoped>
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
  width: 400px;
  top: 0;
  right: 0;
  margin-top: 10%;
  background: #fff;
}
.close_button:hover {
  cursor: pointer;
}
.list_item:hover{
  cursor: pointer;
  background: #e6e6e6;
}
</style>
