import { Button, Text } from '@chakra-ui/react'
import React from 'react'

export default function GreyButton({handleClick,title}) {
  return (
    <Button
   // margin={'10px'}
   // marginBottom={'5px'}
    //marginTop={'-20%'}
    border={'solid 2px'}
    color={'gray.400'}
    borderColor={'gray.400'}
    w={'100%'}
    background={'none'}
    borderRadius={'10px'}
    onClick={handleClick}>
      <Text fontSize={{sm:'0.8rem',lg:'1rem',md:'1rem'}} >
      {title}
        </Text>
    
    </Button>
  )
}
