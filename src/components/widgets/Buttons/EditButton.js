import { Button } from "@chakra-ui/react";
import React from "react";
import { BsFillFileCheckFill, BsFillPencilFill } from "react-icons/bs";

export default function EditButton({ handleClick,marginLeft }) {
  return (
    <Button
    marginLeft={marginLeft}
      borderRadius={"10px"}
      colorScheme="blue"
      bgColor={"#137797"}
      color="#ffff"
      size="sm"
      onClick={handleClick}
    >
      <BsFillPencilFill size={16} />
    </Button>
  );
}

export const CheckButton = ({ handleClick }) => {
 return(
    <Button
    borderRadius={"10px"}
    colorScheme="blue"
    bgColor={"#137797"}
    color="#ffff"
    size="sm"
    onClick={handleClick}
  >
    <BsFillFileCheckFill size={20} />
  </Button>
 )
};
