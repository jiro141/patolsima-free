import React from "react";
import { Flex } from "@chakra-ui/react";

export function Separator(props) {
  const { variant, children, ...rest } = props;
  return (
    <Flex
      h="1px"
      w="100%"
      bg="#b5b5b5"
      {...rest}
    >
      {children}
    </Flex>
  );
}
