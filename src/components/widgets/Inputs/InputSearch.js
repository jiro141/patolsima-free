import React from "react";
import {
    Text,
    Grid,
    Box,
    Input
} from '@chakra-ui/react';

export default function InputSearch({title,SearchValue,handleChange}) {
  return (
    <Box bg="none" py={4} mb={4}>
      <Grid templateColumns={"1fr 2fr"} maxW="container.lg">
        <Text
          margin={"auto"}
          fontWeight={"bold"}
          color="gray.500"
          fontSize={"24px"}
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
          placeholder="Buscar..."
          size="lg"
          value={SearchValue}
          onChange={handleChange}
        />
      </Grid>
    </Box>
  );
}
