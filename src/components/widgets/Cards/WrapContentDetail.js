import { Box } from '@chakra-ui/react'
import React from 'react'

export default function WrapContentDetail({children}) {
  return (
    <Box display={'flex'} flexDirection={{sm:'column', lg:'row',md:'row'}} justifyContent={'space-between'} width={{lg:'90%',md:'90%',sm:'100%'}}  my={'2%'}>
        {children}
    </Box>
  )
}
