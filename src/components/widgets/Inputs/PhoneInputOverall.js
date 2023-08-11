import React from 'react'
import ReactCountryFlag from 'react-country-flag';
import { FormControl, Input, FormErrorMessage, Text, Box, useBreakpointValue } from "@chakra-ui/react";
import { useState } from 'react';
import { BsChevronCompactDown } from 'react-icons/bs';
import { ChevronDownIcon } from '@chakra-ui/icons';
import "../../../css/style.css";
import { COUNTRY_CODE } from 'mocks';



export default function PhoneInputOverall({ value, errors, onChange, placeholder, name, countryCode, setCountryCode, numberCode, setNumberCode, defaultValue }) {
  const [selectFlag, setselectFlag] = useState(false)
  const handleCountrySelected = (countryCode, countryCallingCode) => {
    setCountryCode(countryCode)
    setNumberCode(countryCallingCode)
    setselectFlag(!selectFlag)
  }
   // Utilizar breakpoints para ajustar los estilos en pantallas pequeñas
   const isSmallScreen = useBreakpointValue({ base: true, sm: false });

  return (
    <Box  >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}  >
        <Box width={{sm:'20%',lg:'30%',md:'20%'}}  onClick={() => setselectFlag(!selectFlag)}
      
        _hover={{

          color: "black",
          cursor: "pointer",
        }} backgroundColor={'#EDF2F7'} className='chakra-input-style' display={'flex'} justifyContent={'space-between'}  alignItems={'center'} paddingRight={{lg:'10px',sm:'0px',md:'0px'}}  >
          <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{
              width: '1rem',
              height: '1rem',
              marginLeft: '0px',
            }}
          />
          <Box display={{lg:'flex',sm:'flex',md:'flex'}} justifyContent={'space-between'} alignItems={'center'} px={'0px'} >
            <Text display={{sm:'none',md:'flex',lg:'flex'}} style={{ color: '#2d3748',fontSize:'13px' }} >+{numberCode}</Text>
            
            <ChevronDownIcon  fontSize={'13.5px'} marginRight={'5px'} />
          </Box>
        </Box>

        <Box width={{sm:'80%',lg:'70%'}} >
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
          {/*errors && (
            <>
              <span>{errors}</span>
            </>
          )*/}

        </Box>
        {selectFlag &&
          <Box
            // marginTop={'32%'}
            width={{ lg: '40%', md: '40%', sm: '40%' }}
          
            bottom={{lg:'-15%',md:'-60px',sm:'-18%'}}
            left={{sm:'8%',lg:'50%',md:'50%'}}
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
                        //marginRight: '1%',
                      }}
                    />
                    <Box >
                    <Text  className="option-text">
                      +{x.countryCallingCode} {''}
                    </Text>
                    </Box>
                    

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
