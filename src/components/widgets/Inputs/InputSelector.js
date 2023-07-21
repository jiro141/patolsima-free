import React from "react";
import { FormControl, Select, FormErrorMessage } from "@chakra-ui/react";

export default function InputSelector({ errors, value, type, options, onChange }) {
  const getDisplayText = (value) => {
    switch (value) {
      case "BIOPSIA":
        return "Biopsia";
      case "CITOLOGIA_GINECOLOGICA":
        return "Citología ginecológica";
      case "CITOLOGIA_ESPECIAL":
        return "Citología especial";
      case "INMUNOSTOQUIMICA":
        return "Inmunostoquímica";
      default:
        return value;
    }
  };

  return (
    <FormControl isInvalid={errors} mb={3}>
      <Select color="gray.700" onChange={onChange} value={value} error={errors}>
        <option color="gray.700" hidden>
          {type}
        </option>
        {options.map((option, index) => (
          <option color="gray.700" key={index} value={option.value}>
            {getDisplayText(option.value)}
          </option>
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
