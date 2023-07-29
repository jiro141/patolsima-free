// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
import { BiAlignLeft, BiLogOut, BiSolidCog } from "react-icons/bi";

// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
import { BsListUl, BsGrid3X3GapFill, BsListTask } from "react-icons/bs";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink, useHistory } from "react-router-dom";
//cookies
import Cookies from "js-cookie";
import axios from "axios";
import { useContext } from "react";
import routes from "routes.js";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import { useState } from "react";
import { authApi } from "api/authApi";
import AuthContext from "context/authContext/AuthContext";
import { useEffect } from "react";
import { handleTokenRefresh } from "api/controllers/token";
import MainContext from "context/mainContext/MainContext";
import { useGroups } from "hooks/Groups/useGroups";
import { FaSearch } from "react-icons/fa";
import InputOverallSearch from "components/widgets/Inputs/InputOverallSearch";




export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const { getGroups, groups, loading } = useGroups();
  useEffect(() => {
    const getUsersGroups = async () => {
      getGroups();
    };
    getUsersGroups();
  }, []);
  const arrGroup = groups ? groups[0] : '';

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {

    window.localStorage.removeItem('access') // Elimina  de acceso
    window.localStorage.removeItem('refresh')
    window.localStorage.removeItem('newAcessToken')
    window.localStorage.removeItem('groups')
    //groups
    history.push("/Auth/SignIn");
  };


  async function handleTokenRefresh() {
    // Verificar si hay un token de acceso almacenado en el LocalStorage
    const access_token = localStorage.getItem("access");
    //   console.log(access_token);

    if (access_token) {
      // Obtener la fecha de expiración del token de acceso almacenada en el LocalStorage
      const expirationTime = localStorage.getItem("accessExpiration");

      if (expirationTime && Date.now() < Number(expirationTime)) {
        // El token de acceso todavía es válido, no es necesario hacer nada
        //   console.log("Token de acceso válido");
      } else {
        // El token de acceso ha expirado, intentar obtener un nuevo token de refresco
        //   console.log("Token de acceso expirado");

        const refresh_token = localStorage.getItem("refresh");

        if (refresh_token) {
          try {
            // Enviar una solicitud al endpoint '/token/refresh' para obtener un nuevo token de acceso
            const response = await axios.post("/token/refresh", {
              refresh_token,
            });
            console.log(response);

            const new_access_token = response.data.access_token;
            const new_refresh_token = response.data.refresh_token;

            // Guardar el nuevo token de acceso y el nuevo token de refresco en el LocalStorage
            localStorage.setItem("access", new_access_token);
            localStorage.setItem("refresh", new_refresh_token);

            // Calcular y guardar la nueva fecha de expiración del token de acceso en el LocalStorage
            const new_access_expiration =
              Date.now() + 2 * 60 * 60 * 1000; // Tiempo actual + 2 horas
            localStorage.setItem(
              "accessExpiration",
              new_access_expiration.toString()
            );

            console.log("Nuevo token de acceso obtenido");
          } catch (error) {
            console.error(
              "Error al obtener un nuevo token de acceso:",
              error
            );
          }
        } else {
          // console.error(
          //   "No se encontró el token de refresco en el LocalStorage"
          // );
        }
      }
    } else {
      console.error("No se encontró el token de acceso en el LocalStorage");
    }
  }
  useEffect(() => {
    //handleTokenRefresh()
    return () => {
    };
  }, []);



  //location para mostrar botones cuando deban mostrarse 
  const location = useLocation();
  // Chakra Color Mode
  let mainTeal = useColorModeValue("gray.700", "gray.700");
  let inputBg = useColorModeValue("#FFFF");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("#FFFF");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  //constex para cambian de visualizacion de tarjeta a lista
  //default tarjeta
  const { modoVisualizacion, cambiarModoVisualizacion } = useContext(ModoVisualizacionContext);
  const { setInformes, setFacturas, filteredFact, sethiddenInformessort, sethiddenFactssort, filteredInforme, setfilteredInforme } = useContext(MainContext)


  const cambiarModo = (nuevoModo) => {
    cambiarModoVisualizacion(nuevoModo);
  };

  if (secondary) {
    navbarIcon = "#FFFF";
    mainText = "#FFFF";
  }
  const settingsRef = React.useRef();
  const activeLisMode = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  const handleBusquedaChange = (event) => {
    const query = event.target.value;
    console.log(query)
    if (query.startsWith(" ")) return;
    sethiddenInformessort(false)
    sethiddenFactssort(false)
    filterFacts(query);
    if (query === '') {
      sethiddenFactssort(true)
      sethiddenInformessort(true)
    }
    //setBusqueda(query);

  };
  //const [filterInfor, setFilterInfor] = useState('');


  const handleBusquedaChangeInformes = (event) => {
    console.log('informe')
    setfilteredInforme(event.target.value);
    const query = event.target.value;
    console.log(query)
    if (query.startsWith(" ")) return;

    sethiddenInformessort(false)
    //filterInfor(query);
    if (query === '') {
      sethiddenInformessort(true)
    }
    //setBusqueda(query);

  };
  const handleBusquedaChangeInformesPatologo = (event) => {
    console.log('informe')
    //setfilteredInforme(event.target.value);
    const query = event.target.value;
    console.log(query)
    if (query.startsWith(" ")) return;

    //sethiddenInformessort(false)
    //filterInfor(query);
    if (query === '') {
      //sethiddenInformessort(true)
    }
    //setBusqueda(query);

  };
  // console.log(filteredInforme)
  const filterFacts = (searchTearm) => {
    if (location.pathname === "/admin/Facturacion") {
      let resultadoBusqueda = filteredFact.filter((elemento) => {
        if (
          elemento.cliente.razon_social
            .toLowerCase()
            .includes(searchTearm.toLowerCase()) ||
          elemento.cliente.ci_rif
            .toLowerCase()
            .includes(searchTearm.toLowerCase())
        ) {
          return elemento;
        }
      });
      setFacturas(resultadoBusqueda);
    } else {
      // console.log(filteredInforme)
      let resultadoBusqueda = filteredInforme.filter((elemento) => {
        if (
          elemento.estudio_tipo
            .toLowerCase()
            .includes(searchTearm.toLowerCase()) ||
          elemento.estudio_codigo
            .toLowerCase()
            .includes(searchTearm.toLowerCase())
        ) {
          return elemento;
        }
      });
      setInformes(resultadoBusqueda);
    }

  }

  const filterInfor = (searchTearm) => {
    //console.log(filteredInforme)
    /*  let resultadoBusqueda = filteredInforme.filter((elemento) => {
        if (
          elemento.estudio_patologo_name
            .toLowerCase()
            .includes(searchTearm.toLowerCase()) ||
            elemento.estudio_paciente_ci
            .toLowerCase()
            .includes(searchTearm.toLowerCase()) 
        ) {
          return elemento;
        }
      });
      setInformes(resultadoBusqueda);*/
  }
  return (
    <Flex
      pe={{ sm: "0px", md: "0px" }}
      w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 245px)" }}
      display={'flex'}

      justifyContent="space-between"

      alignItems={'center'}

    // gap={"5px"} ?param1=ordenId
    >
      {location.pathname === "/admin/Facturacion" || location.pathname === "/admin/InformeAdministracion"  || location.pathname === "/admin/RegistroPatologo" ? (
        <InputOverallSearch
          locale={location.pathname}
          onChangeInformes={handleBusquedaChangeInformes}
          onChangeFacturas={handleBusquedaChange}
          onChangeInformesP={handleBusquedaChangeInformesPatologo}
        />
      ) :
        <InputGroup
          visibility={'hidden'}
          cursor="pointer"
          bg={"none"}
          borderRadius="none"
          w={{
            sm: "200px",
            md: "400px",
          }}
          me={{ sm: "auto", md: "20px" }}
          _focus={{
            borderColor: { mainTeal },
          }}
          _active={{
            borderColor: { mainTeal },
          }}
        >
          <InputLeftElement
            children={
              <IconButton
                bg="inherit"
                borderRadius="inherit"
                _hover="none"
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
              ></IconButton>
            }
          />

        </InputGroup>}

    

      

     




      {<Box display={"flex"} justifyContent="flex-end">


        <Box
          backgroundColor={"#89bbcc"}
          padding={"2% 5% 2% 5%"}
          borderRadius={"20px"}
          display={"flex"}
          justifyContent={"space-between"}
        >

          <SidebarResponsive
            logoText={props.logoText}
            secondary={props.secondary}
            color={"#FFFF"}
            routes={routes}
            {...rest}
          />
          {
            <>

              <Button onClick={() => cambiarModo('lista')} background={modoVisualizacion !== 'tarjeta' ? "#89bbcc" : 'none'}>
                <BsListTask size="20px" color="#137797" />
              </Button>
              <Button onClick={() => cambiarModo('tarjeta')} background={modoVisualizacion === 'tarjeta' ? "#89bbcc" : 'none'}>
                <BsGrid3X3GapFill size="18px" color="#137797" />
              </Button>
            </>
          }
         
         
      {/* { arrGroup === "administracion" &&  <Button colorScheme="#89bbcc" 
      _hover={{ backgroundColor: "#EDF2F7" }}  >
         <a style={{display:'flex', alignItems:'center'}} href="https://patolsima-api-19f65176eefa.herokuapp.com/admin/login/?next=/admin/">
         <BiSolidCog
                size={"20px"}
                style={{ color: "#137798" }}
              />
          </a>
         
          </Button>} */}

          <Button onClick={handleLogout} colorScheme="#89bbcc"
            _hover={{ backgroundColor: "#EDF2F7" }} >
            <BiLogOut
              size={"20px"}
              style={{ color: "#137798" }}
            />
          </Button>


        </Box>
      </Box>}
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
