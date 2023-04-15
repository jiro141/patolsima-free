import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../css/style.css';

export function Calendario() {
  const [date, setDate] = useState(new Date());

  const formatShortYear = (locale, date) => {
    return date.getYear();
  }

  return (
    <div>
      <Calendar
        value={date}
        onChange={setDate}
        formatShortYear={formatShortYear}
      />
    </div>
  );
}
export default Calendario