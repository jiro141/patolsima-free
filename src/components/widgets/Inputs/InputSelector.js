import React from "react";
import { FormControl, Select, FormErrorMessage } from "@chakra-ui/react";

export default function InputSelector({
  errors,
  value,
  type,
  options,
  onChange,
}) {
    
    
  return (
    <FormControl isInvalid={errors} mb={3}>
      <Select color="gray.400" onChange={onChange} value={value} error={errors}>
        <option hidden>{type}</option>
        {options.map((option, index) => (
        <option key={index} value={option.value}>{option.value}</option>
      ))}
      </Select>
      {errors && (
        <>
          <FormErrorMessage>{errors}</FormErrorMessage>
        </>
      )}
      
    </FormControl>
  );
} 
