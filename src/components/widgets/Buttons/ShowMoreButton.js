import React from 'react'
import {
    Button,
} from '@chakra-ui/react';

export default function ShowMoreButton({handleClick}) {
  return (
    <Button
                borderRadius={'20px'}
                padding={'10px 60px'}
                marginTop='20px'
                bgColor={'#89bbcc'}
                color='#ffff'
                onClick={handleClick}>
                Ver más
                </Button>

  )
}
