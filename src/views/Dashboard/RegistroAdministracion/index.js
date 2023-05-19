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
import Muestra2 from './Components/Muestra 2';


function Registro() {
    //activar o desactivar el tab
    const [activeTab, setActiveTab] = useState(0);
    //tabs para los nombres
    const MotionTab = motion(Tab);
    //alerta
    const [oneState, setOneState] = useState(false);

    const CustomTab = ({ title, isActive, isDisabled = false }) => {
        return (
            <MotionTab
                margin="30px 5px 0 5px"
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
                {isActive ? title : (activeTab==2?"+":null)}
            </MotionTab>
        );
    };
    return (
        <Box
            margin={{lg:'50px 0px 0px 0px',sm:'60px 0px 10% 0px'}}
            padding={{lg:'0 10px', md:'10px',sm:'0px 0 10% 0'}}
            backgroundColor={'gray.100'}
            borderRadius={'20px'}
            backgroundSize="cover"
            backgroundPosition="center"
            height={'auto'}>
            <Box
                margin={{ lg: '10px 0px 0 50px', md: '0px', sm: '0px 0px 0px 0px' }}
                width={{ lg: '90%', md: '100%', sm: '100%' }}>
                <Tabs onChange={index => setActiveTab(index)}>
                    <TabList display={'flex'} justifyContent={'center'} border={'none'} >
                        <CustomTab title="Cliente" isActive={activeTab === 0} />
                        <CustomTab title="Médico" isActive={activeTab === 1}  />
                        <CustomTab title="Estudio" isActive={activeTab === 2}  />
                        <CustomStudy2 title="Estudio2" activeTab={activeTab} isActive={activeTab === 3} />
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Box backgroundColor={"#FFFF"} boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'30px'} borderRadius='20px' m={{lg:'1% 13% 5% 13%',sm:'2%'}} >
                                <Cliente oneState={oneState} setOneState={setOneState} />
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box backgroundColor={"#FFFF"} boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'30px'} borderRadius='20px' m={'1% 13% 5% 13%'}>
                                <Medico />
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box backgroundColor={"#FFFF"} boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'30px'} borderRadius='20px' m={'1% 13% 5% 13%'}>
                                <Muestra />
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box backgroundColor={"#FFFF"} boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'30px'} borderRadius='20px' m={'1% 13% 5% 13%'}>
                                <Muestra2/>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs >
            </Box >
        </Box>
    );
}
export default Registro;
