import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function SingleDatePicker({ selectedDate, setSelectedDate}) {
  return (
    <DatePicker className="focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none border-gray-300 rounded-md dark:text-gray-300 dark:bg-gray-700" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
  );
};