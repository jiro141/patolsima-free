// import
import Dashboard from "views/Dashboard/Dashboard";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import Muestras from "views/Dashboard/Muestras"
import Prueba from "views/Dashboard/Prueba"
import Facturacion from "views/Dashboard/Facturacion"
import { BsReceiptCutoff, BsFillClipboardHeartFill } from "react-icons/bs";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/RegistroAdministradcion",
    name: "Registro",
    icon: <HomeIcon color="inherit" />,
    component: Prueba,
    layout: "/admin",
  },
  {
    path: "/MuestrasPatologo",
    name: "Registro",
    icon: <HomeIcon color="inherit" />,
    component: Muestras,
    layout: "/admin",
  },
  {
    path: "/Facturacion",
    name: "Facturación",
    icon: <BsReceiptCutoff color="inherit" />,
    component: Facturacion,
    layout: "/admin",
  },
  
  {
    name: "Patólogia",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/Informe",
        name: "Informe",
        icon: <BsFillClipboardHeartFill color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
      
      
    ],
  },
  {
    path: "/signin",
    component: SignIn,
    layout: "/auth",
    hide: true
  },
  {
    path: "/dashboard",
    component: Dashboard,
    layout: "/admin",
    hide: true
  }
];
export default dashRoutes;
