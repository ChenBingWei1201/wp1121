import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({ref, placeholder}: {ref: React.RefObject<HTMLInputElement>, placeholder: string}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{width: 300}}>
        <DatePicker label={placeholder} value={ref}/>
      </DemoContainer>
    </LocalizationProvider>
  );
}