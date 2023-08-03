import { Box } from '@chakra-ui/react'
import React from 'react'
import { CiCircleChevRight } from 'react-icons/ci'

export function ArrowButton({handleIncrement}) {
  return (
    <Box display={'flex'}  position={'absolute'} right={'-25px'} top={'50px'}>
   
    
      <Box
        color='#ffff'
        onClick={handleIncrement}
        cursor='pointer'
        _hover={{ opacity: 0.8}}
        
      >
        <CiCircleChevRight size={'50px'} color={'#137797'} />
      </Box>
    
    
  </Box>
  )
}
