import { Button } from '@chakra-ui/react'
import React from 'react'

export default function OutlineBtnModal({handleClick,text}) {
  return (
    <div>
         <Button
         margin={'10px'}
         border={'solid 2px'}
         color={'#137798'}
         borderColor={'#137798'}
         w={'80%'}
         background={'none'}
         borderRadius={'20px'}
          onClick={handleClick}
          padding={'17px'}
        >
            
          <p style={{fontSize:'15px',padding:'5px'}}>
          {text}
            </p>
        </Button>
    </div>
  )
}
