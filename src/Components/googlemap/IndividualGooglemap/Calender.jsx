import {React, useState} from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';



const Calender = ({setStartDateTime,setEndDateTime}) => {
    const [startDateTimeValue, setStartDateTimeValue] = useState(null);
    const [endDateTimeValue, setEndDateTimeValue] = useState(null);


    const handleDateTimeChange = (newValue) => {
        const formattedStartDateTime = newValue[0] ? dayjs(newValue[0]).toISOString() : null;
        const formattedEndDateTime = newValue[1] ? dayjs(newValue[1]).toISOString() : null;
    
        setStartDateTimeValue(formattedStartDateTime);
        setStartDateTime(formattedStartDateTime);
        setEndDateTime(formattedEndDateTime)
        setEndDateTimeValue(formattedEndDateTime);
      };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimeRangePicker']}>
          <DateTimeRangePicker
            localeText={{ start: 'Start Time', end: 'End Time' }}
            value={[startDateTimeValue ? dayjs(startDateTimeValue) : null, endDateTimeValue ? dayjs(endDateTimeValue) : null]}
            onChange={handleDateTimeChange}
          />
        </DemoContainer>
      </LocalizationProvider>
  )
}

export default Calender