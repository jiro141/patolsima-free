// import
import Dashboard from "views/Dashboard/Dashboard";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import Registro from "views/Dashboard/Registro"
import Muestras from "views/Dashboard/Muestras"

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/Registro",
    name: "Registro",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Registro,
    layout: "/admin",
  },
  {
    path: "/Muestras",
    name: "Muestras",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: Muestras,
    layout: "/admin",
  },
  
  {
    name: "Patólogia",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/SignUp",
        name: "SingUp",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      
    ],
  },
];
export default dashRoutes;
