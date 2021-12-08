import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function SingleDatePicker({ selectedDate, setSelectedDate}) {
  return (
    <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
  );
};