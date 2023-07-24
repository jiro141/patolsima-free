import React, { useContext } from 'react';
import { Box, Button, FormLabel } from '@chakra-ui/react';
import { BsFillArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
import MainContext from 'context/mainContext/MainContext';

export const NextStation = ({errors}) => {
  const { activeTab, setActiveTab,pacienteID } = useContext(MainContext);
 

  const handleIncrement = () => {
    console.log(errors);
    if(errors){
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(errors)){
      setActiveTab(activeTab + 1);
    }     
    }else{
      setActiveTab(activeTab + 1);
    }
    
  };

  const handleDeincrement = () => {
    setActiveTab(activeTab - 1);
  };

  return (
    <Box display={'flex'} justifyContent={activeTab !== 0 ? 'space-between' : 'end'}>
      {/*activeTab !== 0 && (
        <Box
          color='#ffff'
          onClick={handleDeincrement}
          cursor='pointer'
          _hover={{ opacity: 0.8 }}
        >
          <BsArrowLeftCircleFill size={'25px'} color='#137797'  137797/>

        </Box>
      )*/}
      
        <Box
          color='#ffff'
          onClick={handleIncrement}
          cursor='pointer'
          _hover={{ opacity: 0.8 }}
        >
          <BsFillArrowRightCircleFill size={'25px'} color={'#137797'} />
        </Box>
      
      
    </Box>
  );
};

export const BackStation = () => {
  const { activeTab, setActiveTab,pacienteID } = useContext(MainContext);

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
          <BsArrowLeftCircleFill size={'25px'} color={'#137797' } />

        </Box>
      )}
    
    </Box>
  );
};
