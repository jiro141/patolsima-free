import { Button } from "@chakra-ui/react";
import React from "react";
import '../../../css/style.css'

export default function GeneralButton({ type, text, handleClick,pdfContent }) {
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
      ) 
      : type==='download' ?
      <div
  className="btnPrint"
 // onClick={handleClick}
>
<a style={{width:'100%',height:'100%',textAlign:'center'}} href={pdfContent}>{text}</a> 
</div>

   : type==='downloadOutline' ?
   <div
   className="btnPrintOutline"
   onClick={handleClick}
 >
   {text}
 </div>
           
        
      : (
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
