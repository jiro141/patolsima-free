import React, { useState } from 'react';
import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Cliente from './Components/Cliente';
import Medico from './Components/Medico';
import Muestra from './Components/Muestra';


function Registro() {
    //activar o desactivar el tab
    const [activeTab, setActiveTab] = useState(0);
    //tabs para los nombres
    const MotionTab = motion(Tab);
    //alerta
    const [oneState, setOneState] = useState(false);

    const CustomTab = ({ title, isActive, isDisabled = false }) => {
        console.log(title, isDisabled);
        return (
            <MotionTab
                margin="40px 5px 0 5px"
                border="none"
                bg={isActive ? "#9BC5D3" : "#9BC5D3"}
                color={isActive ? "#FFFF" : "transpared"}
                borderRadius={isActive ? "40px" : "45%"}
                padding={isActive ? { sm: "5px 80px", lg: "20px 200px" } : { lg: "15px" }}
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
    return (
        <Box
            margin={'60px 0px 0px 0px'}
            backgroundColor={'gray.100'}
            borderRadius={'20px'}
            backgroundSize="cover"
            backgroundPosition="center"
            height={{ lg: '800px', md: "900px", sm: "800px" }}>
            <Box
                margin={{ lg: '10px 0px 0 50px', md: '0px', sm: '0px 0px 0px -55px' }}
                width={{ lg: '90%', md: '100%', sm: '130%' }}>
                <Tabs onChange={index => setActiveTab(index)}>
                    <TabList display={'flex'} justifyContent={'center'} border={'none'} >
                        <CustomTab title="Cliente" isActive={activeTab === 0} />
                        <CustomTab title="Médico" isActive={activeTab === 1} isDisabled={!oneState} />
                        <CustomTab title="Muestra" isActive={activeTab === 2} isDisabled={!oneState} />
                        <CustomTab title="Muestra" isActive={activeTab === 3} isDisabled={!oneState} />
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Box backgroundColor={"#FFFF"} boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'30px'} borderRadius='20px' m={'10px 30px 100px 30px'} className="multistation-form">
                                <Cliente oneState={oneState} setOneState={setOneState} />
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box backgroundColor={"#FFFF"} boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'40px'} borderRadius='20px' m={'10px 30px 100px 30px'} className="multistation-form">
                                <Medico />
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box backgroundColor={"#FFFF"} boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'40px'} borderRadius='20px' m={'10px 30px 100px 30px'} className="multistation-form">
                                <Muestra />
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs >
            </Box >
        </Box>
    );
}
export default Registro;
