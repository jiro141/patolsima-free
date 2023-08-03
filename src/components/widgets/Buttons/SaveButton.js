import React from 'react';
import { Button, Text } from '@chakra-ui/react';

const SaveButton = ({ handleSubmit, handleFinish, isLoading,type }) => {
  const handleClick = (event) => {
    event.preventDefault(); // Evita el envío del formulario
    // Primero, ejecutamos la función handleSubmit
    if (typeof handleSubmit === 'function') {
      handleSubmit();
    }

    // Luego, ejecutamos la función handleFinish
    if (typeof handleFinish === 'function') {
      handleFinish();
    }
  };

  return (
    <Button
      // marginBottom={'-1%'}
      type='button' // Usa 'button' en lugar de 'submit'
      paddingX={{lg:'60px', sm:'40px',md:'60px'}}
      borderRadius={'20px'}
      bgColor={'#137797'}
      color='#ffff'
      onClick={handleClick}
      isLoading={isLoading}
      marginLeft={{sm:'7px'}}
     // _hover={{ bg: 'blue.500', color: 'white' }}
      loadingText="Guardando..."
    >
    <Text fontSize={{sm:'0.8rem',lg:'1rem',md:'1rem'}} >
        Guardar
        </Text>
    </Button>
  );
};

export default SaveButton;
