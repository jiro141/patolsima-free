// import
import Dashboard from "views/Dashboard/Dashboard";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import Muestras from "views/Dashboard/Muestras"
import Prueba from "views/Dashboard/Prueba"

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
    icon: <StatsIcon color="inherit" />,
    component: Prueba,
    layout: "/admin",
  },
  {
    path: "/Muestras",
    name: "Muestras",
    icon: <CreditIcon color="inherit" />,
    component: Muestras,
    layout: "/admin",
  },
  
  {
    name: "Patólogia",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/SignUp",
        name: "SingUp",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
      {
        path: "/signin",
        name: "Sign In",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      
    ],
  },
];
export default dashRoutes;
