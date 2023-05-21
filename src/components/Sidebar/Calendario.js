import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../css/style.css';

export function Calendario() {
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

  return (
    <div>
      <Calendar
        value={date}
        onChange={setDate}
        formatShortWeekday={formatShortWeekday}
        formatMonthYear={formatMonthYear}
        prev2Label={null}
        next2Label={null}
        tileDisabled={tileDisabled}
      />
    </div>
  );
}

export default Calendario;
