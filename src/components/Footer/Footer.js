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
      justifyContent="space-between"
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
        {" entra al mundo digital"}
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "15px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="#">
            {"Desarrollo Web"}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="#">
            {"Diseño Gráfrico"}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link
            color="gray.400"
            href="#"
          >
            {"Marketing Digital"}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color="gray.400"
            href="#"
          >
            {"Emprendimiento"}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
