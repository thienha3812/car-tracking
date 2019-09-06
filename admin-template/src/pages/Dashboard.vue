<template>
  <div class="content">
    <div class="md-layout">
      <div class="row" style="width: 100%; max-width: 100%;margin: 0px;">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><i class="fa fa-line-chart" aria-hidden="true"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Số xe đang hoạt động</span>
              <span class="info-box-number">{{deviceOnline}}<small> xe</small></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-green"><i class="fa fa-car" aria-hidden="true"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Tổng số xe</span>
              <span class="info-box-number">{{numberCar}}<small> xe</small></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->

        <!-- fix for small devices only -->
        <div class="clearfix visible-sm-block"></div>

        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-yellow"><i class="fa fa-users" aria-hidden="true"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Tổng số tài xế</span>
              <span class="info-box-number">{{numberDriver}}<small> tài xế</small></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <!-- <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">New Members</span>
              <span class="info-box-number">2,000</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getAllCar } from '../api/car'
import { getAllDriver} from '../api/driver'
import {getDeviceOnline} from '../api/device'
export default {
  name : "Dashboard",
  data () {
    return { 
      numberDriver : null,
      numberCar : null,
      deviceOnline : null
    }
  },
  mounted() {
    getAllCar().then((result)=>{
      this.numberCar  = result.data.length  
    })
    getAllDriver().then((result)=>{
      this.numberDriver  = result.data.length  
    })
    getDeviceOnline().then((result)=>{
      this.deviceOnline = result.data.length
    })
  },
}
</script>
<style>
.info-box-icon {
  border-top-left-radius: 2px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 2px;
  display: block;
  float: left;
  height: 90px;
  width: 90px;
  text-align: center;
  font-size: 45px;
  line-height: 90px;
  background: rgba(0,0,0,0.2);
  color: #fff !important;
}
.info-box {
  display: block;
  min-height: 90px;
  background: #fff;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  border-radius: 2px;
  margin-bottom: 15px;
}
.info-box-content {
    padding: 10px 15px;
    margin-left: 90px;
}
.info-box-text {
  text-transform: uppercase;
  display: block;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info-box-number {
  display: block;
  font-weight: bold;
  font-size: 18px;
}
.info-box small {
  font-size: 14px;
}
.bg-green{
  background-color: #00a65a !important;
}
.bg-aqua{
    background-color: #00c0ef !important;
}
.bg-yellow{
    background-color: #f39c12 !important;
}
</style>