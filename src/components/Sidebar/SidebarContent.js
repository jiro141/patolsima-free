import {
  Box,
  Button,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Grid,
  CircularProgress,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import IconBox from "components/Icons/IconBox";
import Logo from "assets/img/logo.png";
import { Separator } from "components/Separator/Separator";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Reloj } from "components/Sidebar/Reloj";
import { Fecha } from "components/Sidebar/Fecha";
import { Calendario } from "components/Sidebar/Calendario";
import { useGroups } from "hooks/Groups/useGroups";
import { useEffect } from "react";
import "../../../src/css/style.css";
import CardCambio from "components/widgets/Cards/CardCambio";
import { useFacturas } from "hooks/Facturas/useFacturas";
import { useContext } from "react";
import CardCambioSidebar from "components/widgets/Cards/CardCambioSidebar";
// CardCambioSidebar

const SidebarContent = ({ logoText, routes }) => {
  const {
    getCambios,
    cambioDelDia,
  } = useFacturas();

  const { getGroups, groups, loading } = useGroups();
  useEffect(() => {
    const getUsersGroups = async () => {
      getGroups();
      getCambios();
    };
    getUsersGroups();
  }, []);

  const arrGroup = groups ? groups[0] : '';

  const adminRoutes = routes.filter(
    (route) => route.groupName === "administracion"
  );
  const patologiaRoutes = routes.filter(
    (route) => route.groupName === "patologia"
  );
  let location = useLocation();
  console.log(cambioDelDia);

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
  const createLinksAll = (routes) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("#89bbcc", "gray.700");
    const inactiveBg = useColorModeValue("transparet");
    const activeColor = useColorModeValue("#137798", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const colorIcon = useColorModeValue("gray.400");

    return routes.map((prop, key) => {
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

  const linksAdmin = <>{createLinksAdmin(routes)}</>;
  const linksPatology = <>{createLinks(routes)}</>;
  const linksAll = <>{createLinksAll(routes)}</>;
  const activeBg = useColorModeValue("#89bbcc", "gray.700");
  const inactiveBg = useColorModeValue("transparet");
  const activeColor = useColorModeValue("#137798", "white");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");
  const colorIcon = useColorModeValue("gray.400");

  return (
    <Box marginTop={'-10px'} maxW={"200px"}>
      <Box w="100%" h="5px" m="-15px 10px 130px 10px">
        <Box display={'flex'} justifyContent={'center'} w={'100%'} paddingRight={'20px'}>
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
      {loading ? (
        <Box margin={"80px 0 20px 0"}>
          <Separator></Separator>
          <div className="centerLoader">
            <CircularProgress value={20} size="30px" color="#137797" />
          </div>
        </Box>
      ) : (
        <>
          <Box pt={"10px"} mb="5px">
            <Box margin={"100px 0 20px 0"}>
              <Separator></Separator>
             {/* <Text marginTop={"10px"} marginLeft={"13px"}>
                {arrGroup === "administracion"
                  ? `Administración`
                  : arrGroup === "patologo"
                    ? "Patologia"
                    : ""}
              </Text>*/}
            </Box>
          </Box>
          <Stack direction="column" mb="40px">
            <Box>
              {arrGroup === "patologo"
                ? linksPatology
                : arrGroup === "administracion"
                  ? linksAdmin
                  : linksAll}
              <Separator></Separator>
            </Box>
          </Stack>
        </>
      )}
      <Box marginTop={'-25px'}>
        <Calendario />
      </Box>
    </Box>
  );
};

export default SidebarContent;
