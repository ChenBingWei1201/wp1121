import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function BasicDatePicker({
  ref,
  placeholder,
}: {
  ref: React.RefObject<HTMLDivElement>;
  placeholder: string;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]} sx={{ width: 300 }}>
        <DatePicker label={placeholder} ref={ref} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
