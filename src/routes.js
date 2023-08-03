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
 const categorias = {
  administracion: [
    {
      groupName:"administracion",
      path: "/RegistroAdministracion",
      name: "Registro",
      icon: <HomeIcon color="inherit" />,
      component: RegistroAdministradcion,
      layout: "/admin",
      type:'admin'
    },
    {
      groupName:"administracion",
      path: "/Facturacion",
      name: "Facturación",
      icon: <BsReceiptCutoff color="inherit" />,
      component: Facturacion,
      layout: "/admin",
    },
    {
      groupName:"administracion",
      path: "/InformeAdministracion",
      name: "Informe",
      icon: <BsFillClipboardPlusFill color="inherit" />,
      secondaryNavbar: true,
      component: InformeAdministracion,
      layout: "/admin",
    },
    // ...otros componentes de la categoría "administracion"...
  ],
  patologia: [
    {
      groupName:"patologia",
      path: "/RegistroPatologo",
      name: "Pendientes",
      icon: <DocumentIcon color="inherit" />,
      component: RegistroPatologo,
      layout: "/admin",
    },
    {
      groupName:"patologia",
      path: "/Informe",
      name: "Informe",
      icon: <BsFillClipboardPlusFill color="inherit" />,
      secondaryNavbar: true,
      component: Informe,
      layout: "/admin",
    },
    // ...otros componentes de la categoría "patologia"...
  ],
  // ...otras categorías...
};


export const dashRoutesAdministracion = [
  ...categorias.administracion,
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
export const dashRoutesPatologo = [
  ...categorias.patologia,
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
var dashRoutes = [
  

    ...categorias.administracion,
  
  ...categorias.patologia,
 
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
