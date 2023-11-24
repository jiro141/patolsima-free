import React from 'react'
import {
  Box,
  Button,
  CloseButton,
  Text,
} from '@chakra-ui/react';
import '../../../css/style.css'
import { useState } from 'react';
import { formatDate } from "helpers";
import Calendar from "react-calendar";
import { useBreakpointValue } from '@chakra-ui/react';


export default function InputCalendar({ onChangeI, onChangeF, v, value, onChange, setOpenCalendar, onOpenCalendar }) {
//  console.log(value,'final');
 
  const formatShortWeekday = (locale, date) => {
    return date.toLocaleDateString(locale, { weekday: 'short' }).charAt(0);
  }

  const formatMonthYear = (locale, date) => {
    return date.toLocaleDateString(locale, { month: 'long' });
  }

  const tileDisabled = ({ activeStartDate, date, view }) => {
    if (view === 'month') {
      const currentMonth = activeStartDate.getMonth();
      return date.getMonth() !== currentMonth;
    }
    return false;
  };

  const handleClick = () => {
    setOpenCalendar(true)
  }

  const handleCloseCalendar = () => {
    setOpenCalendar(false)
  }


  return (
    <div className='wrapCalendarInput'>
      <div onClick={handleClick} className="custom-div">
        <Text> {formatDate(value)} </Text>
      </div>

      {onOpenCalendar && (
        <Box
          marginTop={'3%'}
          width={v ? { lg: '100%', md: '100%', sm: '100%' } : { lg: '80%', md: '60%', sm: '80%' }}
          zIndex={1000000} /* Set a higher value for zIndex */
          position="absolute" /* Set the position to "absolute" */
          backgroundColor="white" /* Add a solid background color */
          boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
          borderRadius={'20px'} /* Optional: Add a shadow effect */
        >
          <Box width={'95%'} position={'absolute'} display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'} mt={'3%'}>
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
          </Box>

          <Calendar
            zIndex={1000}
            onChange={onChangeF ? onChangeF : (onChangeI ? onChangeI : onChange)}
            value={value}
            locale="ES"
            formatShortWeekday={formatShortWeekday}
            formatMonthYear={formatMonthYear}
            prev2Label={null}
            next2Label={null}
            tileDisabled={tileDisabled}
          />

        </Box>
      )}
    </div>
  )
}
