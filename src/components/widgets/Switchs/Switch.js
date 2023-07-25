import { FormControl, Switch,FormLabel } from "@chakra-ui/react";
import React from "react";

export default function Switch_({ id, name, checked, onChange, label }) {
  return (
    <FormControl display="flex" alignItems="center">
      <Switch
        id={id}
        color={"#137797"}
        me="10px"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <FormLabel htmlFor={id} mb="0" ms="1" fontWeight="normal" fontSize={'15px'}>
        {label}
      </FormLabel>
    </FormControl>
  );
}
