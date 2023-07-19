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




export default function InputCalendar({ value, onChange, setOpenCalendar, onOpenCalendar }) {
  const [date, setDate] = useState(new Date());

  const formatShortWeekday = (locale, date) => {
    return date.toLocaleDateString(locale, { weekday: 'short' }).charAt(0);
  }

  const formatMonthYear = (locale, date) => {
    return date.toLocaleDateString(locale, { month: 'long' });
  }

  const tileDisabled = ({ activeStartDate, date, view }) => {
    // Deshabilitar todos los días que no pertenecen al mes actual
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
      <div
        onClick={handleClick}
        className="custom-div"
      >

        <Text> {formatDate(value)} </Text>
      </div>

      {onOpenCalendar && <Box marginTop={'8%'} width={{lg: '80%',md:'50%',sm:'50%'}} zIndex={1}>
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
          // onChange={setDate}
          formatShortWeekday={formatShortWeekday}
          formatMonthYear={formatMonthYear}
          prev2Label={null}
          next2Label={null}
          tileDisabled={tileDisabled}
        />
      </Box>}
    </div>
  )
}
