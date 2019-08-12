import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import Login from '@/pages/Login'
const routes = [
  {
    path: "/login",
    name : "Login",
    component : Login
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [     
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "danh-sach-tai-xe",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "danh-sach-thiet-bi",
        name: "Table List",
        component: TableList
      },
      {
        path: "lich-su",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "ban-do",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrad",
        component: UpgradeToPRO
      }
    ]
  }
];

export default routes;
