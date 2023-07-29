import { Box } from '@chakra-ui/react'
import React from 'react'

export default function Container({children}) {
  return (
    <Box
    margin={{
      lg: "50px 0px 0px 30px",
      md: "60px 0px 0px 0px",
      sm: "30px 0px 10% 0px",
    }}
    w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 235px)" }}
    height={'auto'}
    padding={{ lg: "0 25px 50px 25px", md: "10px", sm: "0px 0 10% 0"  }}
    backgroundColor={"gray.100"}
    borderRadius={"20px"}
    backgroundSize="cover"
    backgroundPosition="center"
    overflowY="hidden"
    overflowX={{ lg: "hidden", sm: "auto" }}
  // maxH={'40em'}
  > 
  {children}
  </Box>
  )
}
