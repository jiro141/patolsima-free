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
import axios from "axios";
import { useContext } from "react";
import routes from "routes.js";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import AuthContext from "context/authContext/AuthContext";
import { useEffect } from "react";
import MainContext from "context/mainContext/MainContext";
import { useGroups } from "hooks/Groups/useGroups";
import debounce from "just-debounce-it";
import InputOverallSearch from "components/widgets/Inputs/InputOverallSearch";
import { useSearchMuestras } from "hooks/MuestrasPatologo/useSearchMuestras";
import { useCallback } from "react";



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
  const {  setFacturas, filteredFact, sethiddenInformessort, sethiddenFactssort, filteredInforme, setfilteredInforme,filteredInformeP, setInformesp,sethiddenInformessortp, setEnableSearch,searchMuestra, setsearchMuestra,informesListp, setInformeslistp,sethiddenInformeslistpsort,filteredInformelistp,setfilteredInformelistp,informesp
  } = useContext(MainContext)

const {getMuestrasBySearch}=useSearchMuestras({search:searchMuestra})

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

  const debouncedGetMuestras = useCallback(
    debounce(async(searchMuestra) => {
   
      if (searchMuestra === "") {
      
        setsearchMuestra("");

      } if (searchMuestra.length > 0) {
       const res= getMuestrasBySearch({searchMuestra})
       console.log(res);
      }
       setsearchMuestra('');

    }, 500),
    []
  );

  const handleBusquedaChangeInformes = (event) => {
    setfilteredInforme(event.target.value);
    const query = event.target.value;
    console.log(query)
    if (query.startsWith(" ")) return;
    sethiddenInformessort(false)
    if (query === '') {
      sethiddenInformessort(true)
    }
  };
  const handleBusquedaChangeInformesList = (event) => {
    const query = event.target.value;
    filterInforlistPatologo(query)
    sethiddenInformeslistpsort(false)
    if (query === '') {
      sethiddenInformeslistpsort(true)
    }

  };

  const handleBusquedaChangeInformesPatologo = (event) => {
    const query = event.target.value;
 
    if (query.startsWith(" ")) return;
    
    setsearchMuestra(query)
    filterInforPatologo(query)
    sethiddenInformessortp(false)
    setEnableSearch(true)
    if (query === '') {
      sethiddenInformessortp(true)
      
    }
    
  };

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
     /* let resultadoBusqueda = filteredInforme.filter((elemento) => {
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
      setInformes(resultadoBusqueda);*/
    }

  }

  const filterInforPatologo = (searchTearm) => {
    console.log( filteredInformeP);
  
     let resultadoBusqueda = filteredInformeP.filter((elemento) => {
        if (
          elemento?.paciente?.nombres
            .toLowerCase()
            .includes(searchTearm.toLowerCase()) ||
          elemento.paciente?.apellidos
            .toLowerCase()
            .includes(searchTearm.toLowerCase())||
            elemento.codigo
              .toLowerCase()
              .includes(searchTearm.toLowerCase())
              ||
            elemento?.medico_tratante?.nombres
              .toLowerCase()
              .includes(searchTearm.toLowerCase())
        ) {
          return elemento;
        }
      });
    setInformesp(resultadoBusqueda);
    

  }

  const filterInforlistPatologo = (searchTearm) => {
    console.log(filteredInformelistp);
    let resultadoBusqueda = filteredInformelistp.filter((elemento) => {
        if (
          elemento?.estudio_codigo
            .toLowerCase()
            .includes(searchTearm.toLowerCase()) ||
         
            elemento?.estudio_paciente_name
              .toLowerCase()
              .includes(searchTearm.toLowerCase())
              ||
            elemento?.estudio_patologo_name
              .toLowerCase()
              .includes(searchTearm.toLowerCase())
        ) {
          return elemento;
        }
      });
      setInformeslistp(resultadoBusqueda);
    

  }
useEffect(() => {
  setInformeslistp([])
  setfilteredInformelistp([])
  return () => {
    sethiddenInformessortp(true)
    sethiddenInformeslistpsort(true)
  }
}, [location])

 
  return (
    <Flex
      pe={{ sm: "0px", md: "0px" }}
      w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 245px)" }}
      display={'flex'}

      justifyContent="space-between"

      alignItems={'center'}

    // gap={"5px"} ?param1=ordenId
    >
      {location.pathname === "/admin/Facturacion" || location.pathname === "/admin/InformeAdministracion"  || location.pathname === "/admin/RegistroPatologo" || location.pathname === "/admin/Informe" ? (
        <InputOverallSearch
          locale={location.pathname}
          onChangeInformes={handleBusquedaChangeInformes}
          onChangeFacturas={handleBusquedaChange}
          onChangeInformesP={handleBusquedaChangeInformesPatologo}
          onChangelistInformesP={handleBusquedaChangeInformesList}
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

              <Button display={{lg:'flex',md:'flex',sm:'none'}} onClick={() => cambiarModo('lista')} background={modoVisualizacion !== 'tarjeta' ? "#89bbcc" : 'none'}>
                <BsListTask size="20px" color="#137797" />
              </Button>
              <Button display={{lg:'flex',md:'flex',sm:'none'}} onClick={() => cambiarModo('tarjeta')} background={modoVisualizacion === 'tarjeta' ? "#89bbcc" : 'none'}>
                <BsGrid3X3GapFill size="18px" color="#137797" />
              </Button>
            </>
          }
         
         
    

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
