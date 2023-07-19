import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Muestra2 from "./Components/Muestra 2";
import ClienteCardPostInitial from "components/widgets/Cliente/ClienteCardPostInitial";
import MedicoCardPostInitial from "components/widgets/Medico/MedicoCardPostInitial";
import Muestra from "components/widgets/Estudio/Muestra";
import MainContext from "context/mainContext/MainContext";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";

function Registro() {
  const { activeTab, twoState, setTwoState, setActiveTab } = useContext(MainContext);
  const { estudioID } = useContext(ModoVisualizacionContext);

  const MotionTab = motion(Tab);

  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const [
    registroSeleccionadoCliente,
    setRegistroSeleccionadoCliente,
  ] = useState({
    ci: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono_celular: "",
    direccion: "",
    fecha_nacimiento: "",
    sexo: "",
  });
  const [resgistroSeleccionadoMedico, setRegistroSeleccionadoMedico] = useState(
    {
      nombres: "",
      apellidos: "",
      especialidad: "",
      email: "",
      telefono_celular: "",
    }
  );

  const CustomTab = React.memo(({ title, isActive, isDisabled = false }) => {

    return (
      <MotionTab
        style={{
          pointerEvents: isDisabled ? "none" : "auto",
          opacity: isDisabled ? 0.5 : 1,
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        margin="30px 5px 0 5px"
        border="none"
        bg={isActive ? "#9BC5D3" : "#9BC5D3"}
        color={isActive ? "#2b6cb0" : "transpared"}
        borderRadius={isActive ? "40px" : "45%"}
        padding={
          isActive
            ? { md: "5px 80px", sm: "5px 60px", lg: "20px 200px" }
            : { lg: "15px" }
        }
        fontSize={isActive ? "20px" : "0px"}
        width="50px"
        height="50px"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        isDisabled={isDisabled}
      >
        {title}
      </MotionTab>
    );
  });

  const CustomStudy2 = React.memo(({ title, isActive, activeTab, isDisabled = false }) => {
    return (
      <div >
        <MotionTab
          margin="30px 5px 0 5px"
          border="none"
          bg={isActive ? "#9BC5D3" : "#9BC5D3"}
          color={isActive ? "#FFFF" : "#2b6cb0"}
          borderRadius={isActive ? "40px" : "45%"}
          padding={
            isActive ? { sm: "5px 80px", lg: "20px 200px" } : { lg: "15px" }
          }
          fontSize={isActive ? "20px" : "30px"}
          width="50px"
          height="50px"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          isDisabled={isDisabled}
        >
          {isActive ? title : activeTab == 2 ? "+" : null}
        </MotionTab>
      </div>
    );
  });

  useEffect(() => {
    if (isMountedRef.current) {
      console.log(activeTab);
      setActiveTab(0);
    }

    return () => {
      setActiveTab(null);
      console.log(activeTab);
      isMountedRef.current = false;
    };
  }, []);

  return (
    <Box
      margin={{
        lg: "50px 0px 0px 30px",
        md: "60px 0px 0px 0px",
        sm: "30px 0px 10% 0px",
      }}
      padding={{ lg: "0 25px", md: "10px", sm: "0px 0 10% 0" }}
      backgroundColor={{ lg: "gray.100", md: "gray.100", sm: "none" }}
      borderTopLeftRadius={"20px"}
      backgroundSize="cover"
      backgroundPosition="center"
      overflowX="hidden"
      overflowY={"hidden"}
    >
      <Box backgroundSize="cover" backgroundPosition="center" height="auto">
        <Box
          margin={{ lg: "10px 0px 0 50px", md: "0px", sm: "0px 0px 0px 0px" }}
          width={{ lg: "90%", md: "100%", sm: "100%" }}
        >
          <Tabs>
            <TabList isDisabled display={"flex"} justifyContent={"center"} border={"none"}>
              <CustomTab
                title="Paciente"
                isActive={activeTab === 0}
                isDisabled={activeTab > 0}
              />
              <CustomTab
                title="Médico"
                isActive={activeTab === 1}
                isDisabled={activeTab != 1}
              />
              <CustomTab
                title="Estudio"
                isActive={activeTab === 2}
                isDisabled={activeTab != 2}
              />
              <CustomStudy2
                title="Estudio2"
                isActive={activeTab === 3}
                isDisabled={activeTab != 3}
              />
            </TabList>


            {activeTab === 0 && (
              <ClienteCardPostInitial
                registro={registroSeleccionadoCliente}
                setRegistro={setRegistroSeleccionadoCliente}
              />
            )}
            {activeTab === 1 && (
              <MedicoCardPostInitial
                registro={resgistroSeleccionadoMedico}
                setRegistro={setRegistroSeleccionadoMedico}
                twoState={twoState}
                setTwoState={setTwoState}
              />
            )}
            {activeTab === 2 && (
              <Box
                backgroundColor={"#FFFF"}
                boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
                padding={{ lg: "30px", sm: "15px" }}
                borderRadius="20px"
                m={{ lg: "1% 13% 5% 13%", sm: "2%" }}
              >
                <Muestra />
              </Box>
            )}
            {activeTab === 3 && (
              <Box
                backgroundColor={"#FFFF"}
                boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
                padding={{ lg: "30px", sm: "15px" }}
                borderRadius="20px"
                m={{ lg: "1% 13% 5% 13%", sm: "2%" }}
              >
                <Muestra2 />
              </Box>
            )}

          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}

export default Registro;