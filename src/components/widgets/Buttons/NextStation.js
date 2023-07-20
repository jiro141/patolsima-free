import React, { useContext } from 'react';
import { Box, Button, FormLabel } from '@chakra-ui/react';
import { BsFillArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
import MainContext from 'context/mainContext/MainContext';

export const NextStation = () => {
  const { activeTab, setActiveTab } = useContext(MainContext);

  const handleIncrement = () => {
    setActiveTab(activeTab + 1);
  };

  const handleDeincrement = () => {
    setActiveTab(activeTab - 1);
  };

  return (
    <Box display={'flex'} justifyContent={activeTab !== 0 ? 'space-between' : 'end'}>
      {activeTab !== 0 && (
        <Box
          color='#ffff'
          onClick={handleDeincrement}
          cursor='pointer'
          _hover={{ opacity: 0.8 }}
        >
          <BsArrowLeftCircleFill size={'25px'} color='#137797' />

        </Box>
      )}
      {activeTab < 3 && (
        <Box
          color='#ffff'
          onClick={handleIncrement}
          cursor='pointer'
          _hover={{ opacity: 0.8 }}
        >
          <BsFillArrowRightCircleFill size={'25px'} color='#137797' />
        </Box>
      )
      }
    </Box>
  );
};
