import React from "react";
import { FormControl, Input, FormErrorMessage, Text } from "@chakra-ui/react";

import '../../../css/style.css'
export default function InputOverall({
  errors,
  type,
  value,
  onChange,
  placeholder,
  name,
  defaultValue,
  

}) {

  
  return (
    <FormControl isInvalid={errors} mb={3}>
      
    <Input
     defaultValue={defaultValue ? defaultValue : ''}
       isRequired
       placeholder={placeholder}
       type={type === "ci" ? "number" : "text"}
       name={name}
       value={value}
       onChange={onChange}
       //onClick={handleClick}
     />
      {errors && (
        <>
          <FormErrorMessage>{errors}</FormErrorMessage>
        </>
      )}
    </FormControl>
  );
}
