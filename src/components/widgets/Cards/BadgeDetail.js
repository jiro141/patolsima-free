import { Badge, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { SubTitlelight } from '../Texts'

export default function BadgeDetail({content,text,title}) {
  return (
   <Box alignItems={'flex-start'}  width={'40%'}>
    <SubTitlelight title={title} color={"#000"} />
    {content ? (
                  <Badge mr={'5px'} >
                    <Text style={{textAlign:'left'}}>
                      {text}
                    </Text>
                  </Badge>
                ) : (
                  <Badge>
                    <Text>Cargando</Text>
                  </Badge>
                )}
   </Box>
  )
}
