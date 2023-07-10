import React from 'react'
import {
    Button,
    CloseButton,
    Text,
} from '@chakra-ui/react';
import '../../../css/style.css'
import { useState } from 'react';
import { formatDate } from "helpers";
import Calendar from "react-calendar";




export default function InputCalendar({value,onChange,setOpenCalendar,onOpenCalendar}) {

  const handleClick=()=>{
    setOpenCalendar(true)
  }

 const handleCloseCalendar=()=>{
  setOpenCalendar(false)
 }
  return (
    <div className='wrapCalendarInput'>
     <div
     onClick={handleClick}
      className="custom-div"
    >
     
      <Text> {formatDate(value)} </Text>
    </div>

     {onOpenCalendar && <div style={{marginTop:'8%',width:'80%',zIndex:1, }}>
      <div className="wrapbtnClose">
      <Button
                            borderRadius={'100%'}
                            colorScheme="blue"
                            size="30px"
                            bgColor={'#137797'}
                            color='#ffff'
                            onClick={handleCloseCalendar}
                            >
                             <CloseButton size='sm' />
                        </Button>
      </div>

      <Calendar onChange={onChange} value={value}
      locale="ES"
      />
          </div>}
     </div>
  )
}
