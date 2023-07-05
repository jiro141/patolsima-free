import React from 'react'
import {
    Button,
} from '@chakra-ui/react';


export default function SaveButton({handleSubmit,isLoading}) {
  return (
    <Button
    type='submit'
    marginLeft={{ lg: '38em', md: '80%', sm: '70%' }}
    marginBottom={{ lg: '-4.5em', md: '-15%', sm: '-30%' }}
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
