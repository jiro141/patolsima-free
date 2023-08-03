import React from 'react'
import {
  Button, Text,
} from '@chakra-ui/react';

export default function ShowMoreButton({ handleClick }) {
  return (
    <Button
    //boxSize={{lg:'3rem',sm:'2rem', md:'3rem'}}
      borderRadius={'20px'}
      paddingX={{lg:'60px', sm:'40px',md:'60px'}}
      // marginTop='20px'
      bgColor={'#89bbcc'}
      color='#ffff'
      onClick={handleClick}>
        <Text fontSize={{sm:'0.8rem',lg:'1rem',md:'1rem'}} >
        Ver más
        </Text>
      
    </Button>

  )
}
