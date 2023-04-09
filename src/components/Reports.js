import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Reports() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hrRangeMin, setHrRangeMin] = useState(40);

  function onSubmit(e) {
    e.preventDefault();
    console.log({
      startDate,
      endDate,
      hrRangeMin
    });
  }

  function handleStartDateChange(date) {
    setStartDate(date);
  }

  function handleEndDateChange(date) {
    setEndDate(date);
  }

  function handleHrRangeMinChange(e) {
    setHrRangeMin(e.target.value);
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-xl font-bold mb-4 text-gray-800">Gerador de relatório</h1>
        <form onSubmit={onSubmit} className="flex flex-col justify-between h-full">
          <div className="mb-4">
            <label htmlFor="startDate" className="block font-medium mb-2">
              Data de início:
            </label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block font-medium mb-2">
              Data de fim:
            </label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hrRangeMin" className="block font-medium mb-2">
              Batimentos cardíacos mínimos: {hrRangeMin} bpm
            </label>
            <input
              type="range"
              id="hrRangeMin"
              className="w-full"
              min={30}
              max={240}
              value={hrRangeMin}
              onChange={handleHrRangeMinChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 self-end"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}