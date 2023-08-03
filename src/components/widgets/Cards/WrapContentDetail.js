import { Box } from '@chakra-ui/react'
import React from 'react'

export default function WrapContentDetail({children}) {
  return (
    <Box display={'flex'} justifyContent={'space-between'} width={'90%'}  my={'2%'}>
        {children}
    </Box>
  )
}
