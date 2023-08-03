import { Button, Text } from '@chakra-ui/react'
import React from 'react'

export default function OutlineBtnModal({handleClick,text}) {
  return (
    <div>
         <Button
         marginTop={'15px'}
         border={'solid 2px'}
         color={'#137798'}
         borderColor={'#137798'}
         w={'100%'}
         background={'none'}
         borderRadius={'20px'}
          onClick={handleClick}
          padding={'17px'}
        >
            
            <Text fontSize={{sm:'0.8rem',lg:'1rem',md:'1rem'}} >
      {text}
        </Text>
        </Button>
    </div>
  )
}
