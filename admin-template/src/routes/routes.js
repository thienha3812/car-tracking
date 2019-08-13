import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import DanhSachTaiXe from "@/pages/DanhSachTaiXe.vue";
import DanhSachThietBi from "@/pages/DanhSachThietBi.vue";
import LichSu from "@/pages/LichSu.vue";
import BanDo from "@/pages/BanDo.vue";

import DangNhap from '@/pages/DangNhap'
const routes = [
  {
    path: "/login",
    name : "Login",
    component : DangNhap
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [     
      {
        path: "dashboard",
        name: "Bảng điều khiển",
        component: Dashboard
      },
      {
        path: "danh-sach-tai-xe",
        name: "Danh sách tài xế",
        component: DanhSachTaiXe
      },
      {
        path: "danh-sach-thiet-bi",
        name: "Danh sách thiết bị",
        component: DanhSachThietBi
      },
      {
        path: "lich-su",
        name: "Lịch sử",
        component: LichSu
      },    
      {
        path: "ban-do",
        name: "Bản đồ",
        meta: {
          hideFooter: true
        },
        component: BanDo
      },        
    ]
  }
];

export default routes;
