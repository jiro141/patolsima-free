import { Button } from '@chakra-ui/react'
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
    w={'80%'}
    background={'none'}
    borderRadius={'10px'}
    onClick={handleClick}>
    {title}
    </Button>
  )
}
