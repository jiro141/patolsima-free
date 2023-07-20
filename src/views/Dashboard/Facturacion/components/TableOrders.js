import { Box, Heading, Table, Tbody, Td, Thead, Tr } from '@chakra-ui/react'
import { TH } from 'components/widgets/Tables'
import { thValuesFacturasSimples } from 'mocks'
import React from 'react'
import { Link } from 'react-router-dom'

export  function TableOrders_Pendientes({children}) {
  return (
   <div>
   <Heading
            size="md"
          >
            Ordenes pendientes
          </Heading>
          <Box
            boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
            backgroundColor={"#FFFF"} 
            borderRadius="20px"
            mt={'25px'}
            mb={'20px'}
            p={'6px'}
            width={"100%"}
            height={'auto'}
           
           // m={"20px 30px 30px 20px"}
           // backgroundColor={"#FFFF"}
           // boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
            //py={'25px'}
            px={'10px'}
          py={"25px"}
           
          
            >
            <Box 
            overflow={'auto'}
            minH={"280px"}
           maxH={"280px"}
           sx={{
            "&::-webkit-scrollbar": {
              width: "6px",
              height:"6px",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}>
              <Table >
                <Thead style={{width:'100%'}}>
                 <TH thData={thValuesFacturasSimples} />
                </Thead>
               {children}
              </Table>
            </Box>
          </Box>
   </div>
  )
}

export  function TableOrders_Confirmadas({children}) {
    return (
     <div>
     <Heading
              size="md"
            >
              Ordenes pendientes
            </Heading>
            <Box
              boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
              backgroundColor={"#FFFF"} 
              borderRadius="20px"
              mt={'25px'}
              mb={'20px'}
              p={'6px'}
              width={"100%"}
              height={'auto'}

              px={'10px'}
            py={"25px"}
             
            
              >
              <Box 
              overflow={'auto'}
              minH={"280px"}
             maxH={"280px"}
             sx={{
              "&::-webkit-scrollbar": {
                width: "6px",
                height:"6px",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}>
                <Table >
                  <Thead style={{width:'100%'}}>
                   <TH thData={thValuesFacturasSimples} />
                  </Thead>
                 {children}
                </Table>
              </Box>
            </Box>
     </div>
    )
  }
