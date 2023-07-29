import React from 'react'
import ReactCountryFlag from 'react-country-flag';
import { FormControl, Input, FormErrorMessage, Text, Box } from "@chakra-ui/react";
import { useState } from 'react';
import { BsChevronCompactDown } from 'react-icons/bs';
import { ChevronDownIcon } from '@chakra-ui/icons';
import "../../../css/style.css";
import { COUNTRY_CODE } from 'mocks';

export default function PhoneInputOverall({value,errors,onChange,placeholder,name,countryCode, setCountryCode,numberCode, setNumberCode,defaultValue}) {
    const [selectFlag, setselectFlag] = useState(false)
    const handleCountrySelected=(countryCode, countryCallingCode)=>{
        setCountryCode(countryCode)
        setNumberCode(countryCallingCode)
        setselectFlag(!selectFlag)
    }
  return (
    <Box >
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}   >
         <Box onClick={()=>setselectFlag(!selectFlag)} _hover={{
       
        color: "black",
        cursor: "pointer",
      }} backgroundColor={'#EDF2F7'} className='chakra-input-style'  display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={'2px'} zIndex={100}>
         <ReactCountryFlag
                    countryCode={countryCode}
                    svg
                    style={{
                      width: '1.2em',
                      height: '1.2em',

                       marginLeft: '4px',
                    }}
                  />
<Box    display={'flex'}justifyContent={'space-between'} alignItems={'center'}  p={'5px'}>
<p style={{color:'#2d3748',}} >+{numberCode}</p>
<ChevronDownIcon fontSize={'15px'} marginRight={'5px'} />

</Box>
         </Box>
      
     <Box style={{marginLeft:'1px'}} >
    
     <Input
      //style={{marginLeft:'0px', outline:'none'}}
         isRequired
         placeholder={placeholder}
         type={'number'}
         name={name}
         value={value}
         defaultValue={defaultValue}
         onChange={onChange}
       />
        {errors && (
          <>
            <span>{errors}</span>
          </>
        )}
   
     </Box>
    {selectFlag &&
         <Box
         // marginTop={'32%'}
          width={{ lg: '40%', md: '40%', sm: '40%' }}
          zIndex={999} /* Set a higher value for zIndex */
         bottom={'-60px'}
          position="absolute" /* Set the position to "absolute" */
        > 
         <ul 
         className="options"
         >
      {COUNTRY_CODE.map(function (x) {
        return (
          <li
            className="option"
            onClick={() => handleCountrySelected(x.countryCode, x.countryCallingCode)}
          >
            <ReactCountryFlag
              countryCode={x.countryCode}
              svg
              style={{
                width: '1.2em',
                height: '1.2em',

                // marginRight: '3%',
              }}
            />
            <span className="option-text">
              +{x.countryCallingCode} {''}
            </span>

            <span className="option-text">{x.countryNameEn}</span>
          </li>
        );
      })}
    </ul>
        </Box>
    }
    
    </Box>
   
   
   </Box>
  )
}
