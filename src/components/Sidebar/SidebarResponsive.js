/*eslint-disable*/
import { HamburgerIcon } from "@chakra-ui/icons";
// chakra imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  Image,
  Grid,
  CircularProgress,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import IconBox from "components/Icons/IconBox";
import Logo from "assets/img/logo.png";
import { Separator } from "components/Separator/Separator";
import { SidebarHelp } from "components/Sidebar/SidebarHelp";
import Calendario from "./Calendario";
import Fecha from "./Fecha";
import Reloj from "./Reloj";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../../src/css/style.css";
import CardCambio from "components/widgets/Cards/CardCambio";
import { useFacturas } from "hooks/Facturas/useFacturas";
import { useContext } from "react";
import CardCambioSidebar from "components/widgets/Cards/CardCambioSidebar";
import { useGroups } from "hooks/Groups/useGroups";
import { useEffect } from "react";

function SidebarResponsive(props) {
  console.log(props.routes);
  const {
    getCambios,
    cambioDelDia,
  } = useFacturas();
  console.log(cambioDelDia);
  const { getGroups, groups, loading } = useGroups();
  useEffect(() => {
    const getUsersGroups = async () => {
      getGroups();
      getCambios();
    };
    getUsersGroups();
  }, []);
  const arrGroup = groups ? groups[0] : '';

  const adminRoutes = props.routes.filter(
    (route) => route.groupName === "administracion"
  );
  const patologiaRoutes = props.routes.filter(
    (route) => route.groupName === "patologia"
  );
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const createLinks = (routes) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("#89bbcc", "gray.700");
    const inactiveBg = useColorModeValue("transparet");
    const activeColor = useColorModeValue("#137798");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const colorIcon = useColorModeValue("gray.400");

    return patologiaRoutes.map((prop, key) => {
      if (prop.hide) {
        return null;
      }
      return (
        <>
          {
            <NavLink to={prop.layout + prop.path} key={prop.name}>
              {activeRoute(prop.layout + prop.path) === "active" ? (
                <Button
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg={activeBg}
                  mb={{
                    xl: "5px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  py="8px"
                  borderRadius="15px"
                  _hover="none"
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex>
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <IconBox
                        bg={"none"}
                        color={'#137798'}
                        h="30px"
                        w="30px"
                        me="12px"
                      >
                        {prop.icon}
                      </IconBox>
                    )}
                    <Text color={"#137798"} my="auto" fontSize="sm">
                      {prop.name}
                    </Text>
                  </Flex>
                </Button>
              ) : (
                <Button
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg="transparent"
                  mb={{
                    xl: "5px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  py="8px"
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  borderRadius="15px"
                  _hover="none"
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex>
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <IconBox
                        bg={inactiveBg}
                        color={colorIcon}
                        h="30px"
                        w="30px"
                        me="12px"
                      >
                        {prop.icon}
                      </IconBox>
                    )}
                    <Text color={inactiveColor} my="auto" fontSize="sm">
                      {prop.name}
                    </Text>
                  </Flex>
                </Button>
              )}
            </NavLink>
          }
        </>
      );
    });
  };
  const createLinksAdmin = (routes) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("#89bbcc", "gray.700");
    const inactiveBg = useColorModeValue("transparet");
    const activeColor = useColorModeValue("#137798", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const colorIcon = useColorModeValue("gray.400");

    return adminRoutes.map((prop, key) => {
      if (prop.hide) {
        return null;
      }

      return (
        <>
          {
            <NavLink to={prop.layout + prop.path} key={prop.name}>
              {activeRoute(prop.layout + prop.path) === "active" ? (
                <Button
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg={activeBg}
                  mb={{
                    xl: "5px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  py="8px"
                  borderRadius="15px"
                  _hover="none"
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex>
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <IconBox
                        bg={"none"}
                        color={activeColor}
                        h="30px"
                        w="30px"
                        me="12px"
                      >
                        {prop.icon}
                      </IconBox>
                    )}
                    <Text color={activeColor} my="auto" fontSize="sm">
                      {prop.name}
                    </Text>
                  </Flex>
                </Button>
              ) : (
                <Button
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg="transparent"
                  mb={{
                    xl: "5px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  py="8px"
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  borderRadius="15px"
                  _hover="none"
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex>
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <IconBox
                        bg={inactiveBg}
                        color={colorIcon}
                        h="30px"
                        w="30px"
                        me="12px"
                      >
                        {prop.icon}
                      </IconBox>
                    )}
                    <Text color={inactiveColor} my="auto" fontSize="sm">
                      {prop.name}
                    </Text>
                  </Flex>
                </Button>
              )}
            </NavLink>
          }
        </>
      );
    });
  };


  const { logoText, routes, ...rest } = props;

  const linksAdmin = <>{createLinksAdmin(routes)}</>;
  const linksPatology = <>{createLinks(routes)}</>;
  const activeBg = useColorModeValue("#89bbcc", "gray.700");
  const inactiveBg = useColorModeValue("transparet");
  const activeColor = useColorModeValue("#137798", "white");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");
  const colorIcon = useColorModeValue("gray.400");
  //  BRAND
  //  Chakra Color Mode
  let hamburgerColor = useColorModeValue("gray.500", "gray.200");
  if (props.secondary === true) {
    hamburgerColor = "white";
  }
  var brand = (
    <Box marginTop={'-10px'} maxW={"200px"}>
      <Box w="100%" h="5px" m="-15px 10px 130px 10px">
        <Box display={'flex'} justifyContent={'center'} w={'100%'} paddingRight={'10px'}>
          <Box w={'75%'}>
            <Link href="/admin/Home">
              <Image src={Logo} alt="Logo palmosima" />
            </Link>
            <Box textAlign={'center'} color={"#137797"} fontWeight="bold">
              <Box  >
                <Box>
                  <Box>
                    <Reloj />
                  </Box>
                  <Box  >
                    <Fecha />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              boxSize="initial"
              justifyContent="center"
              alignItems="center"
              bg={'#137797'}
              my={{
                xl: "5px",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="8px"
              borderRadius="15px"
            // w="100%"
            >
              <Text fontWeight={'bold'} my="auto" fontSize="md" color={'#FFFF'}>BCV: {cambioDelDia}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box margin={'50px 0 20px 0'}>
        {/* <Separator></Separator> */}
      </Box>
    </Box>
  );

  // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // Color variables
  return (
    <Flex
      display={{ sm: "flex", xl: "none" }}
      ref={mainPanel}
      alignItems="center"
    >
      <HamburgerIcon
        color={"#137797"}
        w="18px"
        h="18px"
        ref={btnRef}
        colorscheme="#137797"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={"left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          w="250px"
          maxW="250px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
        >
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="250px" px="1rem" overflow={'auto'} sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
            zIndex: 100
          }} >
            <Box maxW="100%" h="100vh" >
              <Box>{brand}</Box>
              <Stack direction="column" mb="40px">
                {loading ? (
                  <Box margin={"80px 0 20px 0"}>
                    <div className="centerLoader">
                      <CircularProgress value={20} size="30px" color="#137797" />
                    </div>
                  </Box>
                ) : (
                  <Box marginTop={'100px'}>
                    <Box pt={"10px"}>
                      <Box>
                        <Separator></Separator>
                      </Box>
                    </Box>
                    <Stack direction="column" >
                      <Box>
                        {arrGroup === "patologo"
                          ? linksPatology
                          : arrGroup === "administracion"
                            ? linksAdmin
                            : null}
                      </Box>
                      <Separator></Separator>
                    </Stack>
                  </Box>
                )}
              </Stack>
              <Box marginTop={"30px"}>
                <Calendario></Calendario>
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default SidebarResponsive;
