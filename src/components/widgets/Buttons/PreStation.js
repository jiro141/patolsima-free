import React, { useContext } from 'react';
import { Box, Button, FormLabel } from '@chakra-ui/react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import MainContext from 'context/mainContext/MainContext';

export const PreStation = () => {
  const { activeTab, setActiveTab } = useContext(MainContext);

  const handleDeincrement = () => {
    setActiveTab(activeTab - 1);
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'end'}
      color='#ffff'
      onClick={handleDeincrement}
      cursor='pointer'
      _hover={{ opacity: 0.8 }}
      // marginBottom={'-20px'}
    >
      <FormLabel color={'black'}>Siguiente etapa</FormLabel>
      <BsFillArrowRightCircleFill size={'25px'} color='#137797' />
    </Box>

  );
};
