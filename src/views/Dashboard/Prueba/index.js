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
    const mensajeAlerta = () => {
        Cliente.this.state
    }

    const CustomTab = ({ title, isActive }) => {
        return (
            <MotionTab
                margin="0 5px 0 5px"
                border="none"
                bg={isActive ? "#9BC5D3" : "#9BC5D3"}
                color={isActive ? "#FFFF" : "transpared"}
                borderRadius={isActive ? "40px" : "40%"}
                padding={isActive ? "20px 200px" : "15px"}
                fontSize={isActive ? "20px" : "0px"}
                width="50px"
                height="50px"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
            >
                {title}
            </MotionTab>
        );
    };
    return (
        <>
            <Tabs onChange={index => setActiveTab(index)}>
                <TabList display={'flex'} justifyContent={'center'} border={'none'} margin={'10% 10% 2% 15%'}>
                    <CustomTab title="Cliente" isActive={activeTab === 0} />
                    <CustomTab title="Médico" isActive={activeTab === 1} />
                    <CustomTab title="Muestra" isActive={activeTab === 2} />
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'40px'} borderRadius='20px' m={'10px 30px 100px 30px'} className="multistation-form">
                            <Cliente mensajeAlerta={mensajeAlerta} />
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'40px'} borderRadius='20px' m={'10px 30px 100px 30px'} className="multistation-form">
                            <Medico mensajeAlerta={mensajeAlerta} />
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)" padding={'40px'} borderRadius='20px' m={'10px 30px 100px 30px'} className="multistation-form">
                            <Muestra/>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs >
        </>
    );
}
export default Registro;
