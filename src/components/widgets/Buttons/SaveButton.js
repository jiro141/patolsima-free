import React from 'react'
import {
  Button,
} from '@chakra-ui/react';


export default function SaveButton({ handleSubmit, isLoading }) {
  return (
    <Button
      // marginBottom={'-1%'}
      type='submit'
      paddingX={'20px'}
      borderRadius={'20px'}
      bgColor={'#137797'}
      color='#ffff'
      onClick={handleSubmit}
      isLoading={isLoading}
      loadingText="Guardando..."
    >
      Guardar
    </Button>
  )
}
