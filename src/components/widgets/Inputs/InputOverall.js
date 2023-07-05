import React from "react";
import { FormControl, Input, FormErrorMessage } from "@chakra-ui/react";

export default function InputOverall({
  errors,
  type,
  value,
  onChange,
  placeholder,
  name,
  defaultValue
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
      />
      {errors && (
        <>
          <FormErrorMessage>{errors}</FormErrorMessage>
        </>
      )}
    </FormControl>
  );
}
