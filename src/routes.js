// import
import Dashboard from "views/Dashboard/Dashboard";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import RegistroPatologo from "views/Dashboard/RegistroPatologo"
import RegistroAdministradcion from "views/Dashboard/RegistroAdministracion"
import Facturacion from "views/Dashboard/Facturacion"
import Informe from "views/Dashboard/InformePatologo";
import InformeAdministracion from "views/Dashboard/InformeAdministracion"
import RegistroPatologoLista from "views/Dashboard/RegistroPatologo/ModoLista";
import { BsReceiptCutoff, BsFillClipboardPlusFill } from "react-icons/bs";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/RegistroAdministracion",
    name: "Registro",
    icon: <HomeIcon color="inherit" />,
    component: RegistroAdministradcion,
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
    path: "/InformeAdministracion",
    name: "Informe",
    icon: <BsFillClipboardPlusFill color="inherit" />,
    secondaryNavbar: true,
    component: InformeAdministracion,
    layout: "/admin",
  },
  {
    name: "Patólogia",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/RegistroPatologo",
        name: "Registro",
        icon: <HomeIcon color="inherit" />,
        component: RegistroPatologo,
        layout: "/admin",
      },
      {
        path: "/Informe",
        name: "Informe",
        icon: <BsFillClipboardPlusFill color="inherit" />,
        secondaryNavbar: true,
        component: Informe,
        layout: "/admin",
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
    path: "/Home",
    component: Dashboard,
    layout: "/admin",
    hide: true
  },
  {
    path: "/signup",
    component: SignUp,
    layout: "/auth",
    hide: true
  },
];
export default dashRoutes;
