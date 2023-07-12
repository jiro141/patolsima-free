import { Button } from "@chakra-ui/react";
import React from "react";

export default function GeneralButton({ type, text, handleClick }) {
  return (
    <>
      {type === "outline" ? (
        <Button
        size="auto"
        width={'auto'}
          marginX={"10px"}
          marginY={"30px"}
          border={"solid"}
          color={"#137797"}
          borderColor={"#137797"}
          background={"none"}
          padding={'10px'}
          borderRadius={"20px"}
          onClick={handleClick}
        >
          {text}
        </Button>
      ) : (
        <Button
        size="auto"
        padding={'10px'}
          marginX={"10px"}
          marginY={"30px"}
          color={"whiteAlpha.900"}
          borderColor={"gray.400"}
          background={"#137797"}
          borderRadius={"20px"}
          onClick={handleClick}
        >
           {text}
        </Button>
      )}
    </>
  );
}
