/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function Footer(props) {
  // const linkTeal = useColorModeValue("teal.400", "red.200");=
  return (
    <Flex
      fontSize={'15px'}
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="center"
      padding={'1px'}
      marginBottom={'-60px'}
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "15px", xl: "0px" }}
      >
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as="span">
          {"Desarrollado por "}
        </Text>
        <Link
          // color={linkTeal}
          color="#137797"
          href="https://detipcompany.com/"
          target="_blank"
        >
          {"Agencia Detip,"}
        </Link>
        {" entra al mundo digital."}
      </Text>
    </Flex>
  );
}
