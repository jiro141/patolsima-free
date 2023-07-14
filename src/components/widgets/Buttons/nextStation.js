import React, { useContext } from 'react';
import { Button, FormLabel, Box, Text } from '@chakra-ui/react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import MainContext from 'context/mainContext/MainContext';

export const NextStation = () => {
    const { activeTab, setActiveTab } = useContext(MainContext);

    const handleIncrement = () => {
        setActiveTab(activeTab + 1);
    };

    return (
        <Box
            display={'flex'}
            justifyContent={'end'}
            marginBottom={'-20px'}>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignContent={'center'}>
                <FormLabel marginRight={'7px'}>Saltar Etapa</FormLabel>
                <div
                    style={{ alignItems: 'center'}}
                    onClick={handleIncrement}
                >
                    <BsFillArrowRightCircleFill color="#137797" size={'30px'} />
                </div>
            </Box>
        </Box>
    );
};
