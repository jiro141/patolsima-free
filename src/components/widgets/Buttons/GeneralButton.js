import { Button } from "@chakra-ui/react";
import React from "react";

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
  style={{
    padding: '10px',
    margin: '30px 10px',
    color: 'white',
    backgroundColor: '#137797',
    borderRadius: '20px',
    border: '1px solid gray',
    cursor: 'pointer',
    width:'50%',
    display:"flex",
    justifyContent:'center',
    alignItems:'center'
  }}
 // onClick={handleClick}
>
<a style={{width:'100%',height:'100%'}} href={pdfContent}>{text}</a> 
</div>

   : type==='downloadOutline' ?
   <div
   style={{
     width: '50%',
     margin: '30px 10px',
     border: '1px solid #137797',
     color: '#137797',
     backgroundColor: 'none',
     padding: '10px',
     borderRadius: '20px',
     cursor: 'pointer',
     display:"flex",
     justifyContent:'center',
     alignItems:'center'
   }}
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
