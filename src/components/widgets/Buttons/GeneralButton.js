import { Button, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import '../../../css/style.css'

export default function GeneralButton({ type, text, handleClick,pdfContent,disabled,label }) {
  return (
    <>
      {type === "outline" ? (
        <Button
        size="auto"
        width={'auto'}
          marginX={{lg:"10px",md:'10px',sm:'10px'}}
          marginY={"30px"}
          border={"solid"}
          color={"#137797"}
          borderColor={"#137797"}
          background={"none"}
          padding={{lg:"10px",md:'10px',sm:'10px'}}
          borderRadius={"20px"}
          onClick={handleClick}
        >
           <Text fontSize={{sm:'0.9rem',lg:'1rem',md:'1rem'}} >
           {text}
        </Text>
          
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
           
        
      :  type ==='withTooltip'?
    
      <Tooltip label={label}>
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
              // _hover={{ bg: '#C4DCE5', color: 'white' }}
               disabled={ disabled ? true : false}
             >
                {text}
             </Button>
     
             </Tooltip>:
 <Button
 size="auto"
 padding={{lg:"10px",md:'10px',sm:'10px'}}
 marginX={{lg:"10px",md:'10px',sm:'10px'}}
   marginY={"30px"}
   color={"whiteAlpha.900"}
   borderColor={"gray.400"}
   background={"#137797"}
   borderRadius={"20px"}
   onClick={handleClick}
  // _hover={{ bg: '#C4DCE5', color: 'white' }}
   disabled={ disabled ? true : false}
 >
   <Text fontSize={{sm:'0.9rem',lg:'1rem',md:'1rem'}} >
           {text}
        </Text>
 </Button>

    }
    </>
  );
}
