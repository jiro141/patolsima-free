import React, { useState } from 'react';
import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Image
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Muestra from './Components/Muestra';
import Muestra2 from './Components/Muestra 2';
import ClienteCardPostInitial from 'components/widgets/Cliente/ClienteCardPostInitial';
import ClienteCardPut from 'components/widgets/Cliente/ClienteCardPut';
import MedicoCardPostInitial from 'components/widgets/Medico/MedicoCardPostInitial';
import MedicoCardPut from 'components/widgets/Medico/MedicoCardPut';

function Registro() {
    //activar o desactivar el tab
    const [activeTab, setActiveTab] = useState(0);
    //tabs para los nombres
    const MotionTab = motion(Tab);
    //alerta
    const [oneState, setOneState] = useState('post');
    const [twoState, setTwoState] = useState('post');
    //estado para el boton pase de loading... 
    const [isLoading, setIsloading] = useState(false);
    // Este es el estado que va a guardar los datos seleccionados del cliente (ojo hay que hacer uno distinto para paciente)
    // lo pasa por parametro a los dos dos componentes clienteCardPostInitial (setRegistroSeleccionadoCliente) y pasa (registroSeleccionadoCliente) al clienteCardPut 
    const [registroSeleccionadoCliente, setRegistroSeleccionadoCliente] = useState(
        {
            ci: "",
            nombres: "",
            apellidos: "",
            email: "",
            telefono_celular: "",
            direccion: "",
            fecha_nacimiento: "",
            sexo: ""
        }
    );
    const [resgistroSeleccionadoMedico, setRegistroSeleccionadoMedico] = useState(
        {
            nombres: "",
            apellidos: "",
            especialidad: "",
            email: "",
            telefono_celular: "",
        }
    );

    const CustomTab = ({ title, isActive, isDisabled = false }) => {
        return (
            <MotionTab
                margin="30px 5px 0 5px"
                border="none"
                bg={isActive ? "#9BC5D3" : "#9BC5D3"}
                color={isActive ? "#2b6cb0" : "transpared"}
                borderRadius={isActive ? "40px" : "45%"}
                padding={isActive ? { md: "5px 80px", sm: "5px 60px", lg: "20px 200px" } : { lg: "15px" }}
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
    };
    const CustomStudy2 = ({ title, isActive, activeTab }) => {
        const isDisabled = (activeTab === 2 || activeTab === 3) ? false : true;
        return (
            <MotionTab
                margin="30px 5px 0 5px"
                border="none"
                bg={isActive ? "#9BC5D3" : "#9BC5D3"}
                color={isActive ? "#FFFF" : "#2b6cb0"}
                borderRadius={isActive ? "40px" : "45%"}
                padding={isActive ? { sm: "5px 80px", lg: "20px 200px" } : { lg: "15px" }}
                fontSize={isActive ? "20px" : "30px"}
                width="50px"
                height="50px"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                isDisabled={isDisabled}
            >
                {isActive ? title : (activeTab == 2 ? "+" : null)}
            </MotionTab>
        );
    };

    return (
        <Box
            margin={{ lg: '50px 0px 0px 0px', md: "60px 0px 0px 0px", sm: '30px 0px 10% 0px' }}
            padding={{ lg: '0 25px', md: '10px', sm: '0px 0 10% 0' }}
            backgroundColor={{ lg: 'gray.100', md: 'gray.100', sm: 'none' }}
            // backgroundImage={Imagen}
            borderTopLeftRadius={'20px'}
            backgroundSize="cover"
            backgroundPosition="center"
            // overflowY="scroll"
            overflowX="hidden"
            maxH={{ lg: '50em', sm: '60em' }}
            // scrollPadding={'1px'}
            overflowY={'hidden'}

        >
            <Box
                backgroundSize="cover"
                backgroundPosition="center"
                height="auto">
                <Box
                    margin={{ lg: '10px 0px 0 50px', md: '0px', sm: '0px 0px 0px 0px' }}
                    width={{ lg: '90%', md: '100%', sm: '100%' }}>
                    <Tabs onChange={index => setActiveTab(index)}>
                        <TabList display={'flex'} justifyContent={'center'} border={'none'} >
                            <CustomTab title="Paciente" isActive={activeTab === 0} />
                            <CustomTab title="Médico" isActive={activeTab === 1} />
                            <CustomTab title="Estudio" isActive={activeTab === 2} />
                            <CustomStudy2 title="Estudio2" activeTab={activeTab} isActive={activeTab === 3} />
                        </TabList>
                        <TabPanels>
                            {/* {activeTab === 0 && ( */}
                            <TabPanel>
                                {oneState === 'post' && activeTab === 0 ?
                                    <ClienteCardPostInitial registro={registroSeleccionadoCliente} setRegistro={setRegistroSeleccionadoCliente} oneState={oneState} setOneState={setOneState} />
                                    :
                                    <ClienteCardPut registro={registroSeleccionadoCliente} setRegistro={setRegistroSeleccionadoCliente} oneState={oneState} setOneState={setOneState} />
                                }
                            </TabPanel>
                            {/* )} */}
                            {/* {activeTab === 1 && ( */}
                            <TabPanel>
                                {twoState === 'post' && activeTab === 1 ?
                                    <MedicoCardPostInitial registro={resgistroSeleccionadoMedico} setRegistro={setRegistroSeleccionadoMedico} twoState={twoState} setTwoState={setTwoState} />
                                    :
                                    <MedicoCardPut registro={resgistroSeleccionadoMedico} setRegistro={setRegistroSeleccionadoMedico} twoState={twoState} setTwoState={setTwoState} />}

                            </TabPanel>
                            {/* )} */}
                            {/* {activeTab === 2 && ( */}
                            <TabPanel>
                                <Box backgroundColor={"#FFFF"}
                                    boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
                                    padding={{ lg: '30px', sm: '15px' }}
                                    borderRadius='20px'
                                    m={{ lg: '1% 13% 5% 13%', sm: '2%' }} >
                                    <Muestra />
                                </Box>
                            </TabPanel>
                            {/* )} */}
                            {/* {activeTab === 3 && ( */}
                            <TabPanel>
                                <Box backgroundColor={"#FFFF"}
                                    boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
                                    padding={{ lg: '30px', sm: '15px' }}
                                    borderRadius='20px'
                                    m={{ lg: '1% 13% 5% 13%', sm: '2%' }} >
                                    <Muestra2 />
                                </Box>
                            </TabPanel>
                            {/* )} */}
                        </TabPanels>
                    </Tabs >
                </Box >
            </Box>
        </Box>
    );
}
export default Registro;
