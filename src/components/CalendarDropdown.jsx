import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { useState } from "react";
import "./CalendarDropdown.css";

function CalendarDropdown({ date, onChange , showCalendar, visible }) {
    if (!visible) return null;

    return (
    <div className="modal-backdrop">

      <div className="calendar-dropdown">
        <DatePicker
          selected={date.toDate()}
          onChange={(selectedDate) => {
              onChange(dayjs(selectedDate));
              showCalendar(false); // hide dropdown on selection
            }}
            inline
            />
            </div>
    </div>
    );
}

export default CalendarDropdown;