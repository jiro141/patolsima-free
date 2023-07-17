import React from "react";
import "../../../css/style.css";
import { Box, Heading, IconButton, Text } from "@chakra-ui/react";

export default function RowCard({ headTitle, color, data, type, icon }) {
  return (
    <Box className="AlignRow" width={"100%"}>
      {type === "headPrincipal" ? (
        <>
          <Heading color={"#FFFF"} fontSize={"16px"}>
            {headTitle}
          </Heading>
          <IconButton isRound={true} size="md" icon={icon} />
        </>
      ) : (
        <>
          <Heading fontSize={"16px"}>{headTitle}</Heading>
          <Text textAlign={"right"} ml={2} fontSize={"14px"} color={color}>
            {data}
          </Text>
        </>
      )}
    </Box>
  );
}
