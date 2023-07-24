import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Titlelight } from '../Texts'

export default function CardCambio({ cambioDelDia }) {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 240px)" }}
    >
      <Box width={"auto"} marginBottom={'-20px'} backgroundColor="#137797"
        // borderTopLeftRadius={"20px"}
        // borderBottomLeftRadius={"20px"}
        textAlign={"center"}
        padding="10px" >

        <Titlelight title={`Dolar BCV: ${cambioDelDia}`} color={'#FFF'} />
      </Box>
    </Box>
  )
}
