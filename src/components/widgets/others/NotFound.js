import { Text } from '@chakra-ui/react'
import React from 'react'
import "../../../css/style.css";

export default function NotFound({desc}) {
  return (
    <div className="centerLoader" > 
<Text fontSize={"20px"} margin="15px 30px 30px 30px" color={"gray.600"}>
         {desc}
        </Text>
    </div>
  )
}
