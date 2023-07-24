import React from 'react';
import { Button } from '@chakra-ui/react';

const SaveButton = ({ handleSubmit, handleFinish, isLoading }) => {
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
      paddingX={'60px'}
      borderRadius={'20px'}
      bgColor={'#137797'}
      color='#ffff'
      onClick={handleClick}
      isLoading={isLoading}
      loadingText="Guardando..."
    >
      Guardar
    </Button>
  );
};

export default SaveButton;
