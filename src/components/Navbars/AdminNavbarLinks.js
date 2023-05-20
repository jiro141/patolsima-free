// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
import { BiLogOut } from "react-icons/bi";

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
import { BsListUl, BsGrid3X3GapFill } from "react-icons/bs";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import routes from "routes.js";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import { useState } from "react";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  const location = useLocation();

  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("#FFFF");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("#FFFF");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  const { modoVisualizacion, cambiarModoVisualizacion } = useContext(ModoVisualizacionContext);
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
  return (
    <Flex
      pe={{ sm: "0px", md: "0px" }}
      w={{ sm: "100%", md: "auto" }}
      margin={{ sm: "0 10px", md: "auto" }}
      justifyContent="space-between"
    // gap={"5px"}
    >
      {location.pathname !== "/admin/RegistroAdministracion"  ? (
         <InputGroup
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
         <Input
           fontSize="xs"
           py="11px"
           color={mainText}
           placeholder="Buscar..."
           border={"none"}
           background={"none"}
           borderRadius={"none"}
           borderBottom={"solid 1px"}
         />
       </InputGroup>
       ):
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
       <Input
         fontSize="xs"
         py="11px"
         color={mainText}
         placeholder="Buscar..."
         border={"none"}
         background={"none"}
         borderRadius={"none"}
         borderBottom={"solid 1px"}
       />
     </InputGroup>}
     
      {location.pathname !== "/admin/RegistroAdministracion" && location.pathname !== "/admin/Home" ? (
        <Box marginLeft={'-30%'} display={{ base: "none", md: "block" }}>
          <Button onClick={() => cambiarModo('lista')} background={modoVisualizacion!=='tarjeta'? "#89bbcc": 'none'}>
            <BsListUl size="30px" color="#137797" />
          </Button>
          <Button onClick={() => cambiarModo('tarjeta')} background={modoVisualizacion==='tarjeta'? "#89bbcc": 'none'}>
            <BsGrid3X3GapFill size="25px" color="#137797" />
          </Button>
        </Box>
      ) : null}


      <Box display={"flex"} justifyContent="">
        <Box
          backgroundColor={"#89bbcc"}
          padding={"5% 8%"}
          borderRadius={"15px"}
          m={"auto 30px"}
        >
          <Menu>
            <MenuButton>
              <BellIcon color={"#137798"} w="18px" h="18px" />
            </MenuButton>
            <MenuList p="16px 8px">
              <Flex flexDirection="column">
                <MenuItem borderRadius="none" mb="10px">
                  <ItemContent
                    time="13 minutes ago"
                    info="from Alicia"
                    boldInfo="New Message"
                    aName="Alicia"
                    aSrc={avatar1}
                  />
                </MenuItem>
                <MenuItem borderRadius="none" mb="10px">
                  <ItemContent
                    time="2 days ago"
                    info="by Josh Henry"
                    boldInfo="New Album"
                    aName="Josh Henry"
                    aSrc={avatar2}
                  />
                </MenuItem>
                <MenuItem borderRadius="none">
                  <ItemContent
                    time="3 days ago"
                    info="Payment succesfully completed!"
                    boldInfo=""
                    aName="Kara"
                    aSrc={avatar3}
                  />
                </MenuItem>
              </Flex>
            </MenuList>
          </Menu>
        </Box>

        <Box
          backgroundColor={"#89bbcc"}
          padding={"2% 5% 2% 5%"}
          borderRadius={"20px"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          {/* <NavLink to="#">
            <Button
              ms="0px"
              px="0px"
              me={{ sm: "2px", md: "16px" }}
              color={"#FFFF"}
              variant="transparent-with-icon"
              rightIcon={
                document.documentElement.dir ? (
                  ""
                ) : (
                  <ProfileIcon color={"#FFFF"} w="22px" h="22px" me="0px" />
                )
              }
              leftIcon={
                document.documentElement.dir ? (
                  <ProfileIcon color={"#FFFF"} w="22px" h="22px" me="0px" />
                ) : (
                  ""
                )
              }
            ></Button>
          </NavLink> */}
          <SidebarResponsive
            logoText={props.logoText}
            secondary={props.secondary}
            color={"#FFFF"}
            routes={routes}
            {...rest}
          />
          <SettingsIcon
            cursor="pointer"
            // m={"auto 5px auto 10px"}
            m={{
              sm: "auto 5px auto 10px",
              md: "auto 5px auto 10px",
            }}
            ref={settingsRef}
            onClick={props.onOpen}
            color={"#137798"}
            w="18px"
            h="18px"
          />
          <Box >
            <Button _hover={{ bg: "none" }} borderRadius={"13px"} background={'none'} padding={'0px'}>
              <BiLogOut
                size={"20px"}
                // strokeWidth={1}
                style={{ color: "#137798" }}
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
