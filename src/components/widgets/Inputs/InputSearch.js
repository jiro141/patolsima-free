import React from "react";
import {
    Text,
    Grid,
    Box,
    Input
} from '@chakra-ui/react';

export default function InputSearch({title,SearchValue,handleChange,type}) {
  return (
    <Box bg="none" py={4} mb={4} px={{lg:'20px',md:'20px',sm:'5px'}}>
      <Grid templateColumns={"1fr 2fr"}  >
        <Text
        mr={'6px'}
          //margin={"auto"}
          fontWeight={"bold"}
          color="gray.500"
          fontSize={{lg:"24px",sm:'15px',md:'24px'}}
        >
          {" "}
          {title}
        </Text>
        <Input
          focusBorderColor="transparent"
          border={"none"}
          borderRadius="none"
          borderBottom="1px solid"
          borderBottomColor={"gray.500"}
          fontSize={{lg:"20px",sm:'15px',md:'20px'}}
          placeholder={ "Buscar..." }
          size={{lg:"lg",sm:'sm'}}
          value={SearchValue}
          onChange={handleChange}
        />
      </Grid>
    </Box>
  );
}
