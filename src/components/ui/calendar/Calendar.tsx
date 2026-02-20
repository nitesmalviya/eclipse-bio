"use client";
import React, { useState } from "react";
import Image from "next/image";

interface CalendarProps {
  selectedDate?: Date | null;
  onDateSelect: (date: Date) => void;
  onCancel: () => void;
  onNext: () => void;
  minDate?: Date;
  maxDate?: Date;
  startDate?: Date | null;
  endDate?: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  onCancel,
  onNext,
  minDate,
  maxDate,
  startDate,
  endDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate || startDate || new Date(),
  );

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    onDateSelect(newDate);
  };

  const isDateSelected = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );

    // Check if this date matches the selectedDate
    if (selectedDate) {
      const isSelected =
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      if (isSelected) return true;
    }

    // Also check if this date matches the startDate (for end date calendar)
    if (startDate && !selectedDate) {
      const isStartDate =
        date.getDate() === startDate.getDate() &&
        date.getMonth() === startDate.getMonth() &&
        date.getFullYear() === startDate.getFullYear();
      if (isStartDate) return true;
    }

    return false;
  };

  const isDateInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    return date >= startDate && date <= endDate;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="w-80 bg-white rounded-2xl p-6 shadow-[0px_4px_20px_0px_rgba(84,110,116,0.12)] box-border flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button
          className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer rounded-full transition-colors hover:bg-[rgba(0,156,166,0.1)]"
          onClick={handlePrevMonth}
          type="button"
        >
          <Image
            src="/assets/svgs/arrow-left.svg"
            alt="Previous"
            width={16}
            height={16}
          />
        </button>
        <h3 className="font-titillium font-semibold text-lg leading-none text-[#166470] m-0">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer rounded-full transition-colors hover:bg-[rgba(0,156,166,0.1)]"
          onClick={handleNextMonth}
          type="button"
        >
          <Image
            src="/assets/svgs/arrow-left.svg"
            alt="Next"
            width={16}
            height={16}
            style={{ transform: "rotate(180deg)" }}
          />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="font-titillium font-semibold text-sm leading-none text-[#009ca6] text-center py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isSelected = day && isDateSelected(day);
          const inRange = day && isDateInRange(day);
          const isEmpty = day === null;

          return (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center font-manrope text-sm leading-none transition-all relative ${
                isEmpty
                  ? "cursor-default pointer-events-none"
                  : "cursor-pointer text-[#202024]"
              } ${
                inRange && !isSelected
                  ? "bg-[rgba(0,156,166,0.15)] text-[#009ca6]"
                  : ""
              } ${
                isSelected
                  ? "relative z-[2] after:content-[''] after:absolute after:w-full after:h-full after:bg-[#009ca6] after:rounded-full after:-z-[1] text-white font-semibold"
                  : ""
              } ${
                !isEmpty && !isSelected && !inRange
                  ? "hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-full hover:before:bg-[rgba(0,156,166,0.1)] hover:before:rounded-full hover:before:z-0"
                  : ""
              }`}
              onClick={() => day && handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-end gap-6 mt-2 pt-4 border-t border-[#eef2f6]">
        <button
          className="bg-transparent border-none font-manrope font-semibold text-base leading-none text-[#009ca6] cursor-pointer px-4 py-2 transition-opacity hover:opacity-70"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="bg-[#009ca6] border-none rounded-lg px-6 py-3 font-manrope font-semibold text-base leading-none text-white cursor-pointer transition-colors hover:bg-[#008891]"
          onClick={onNext}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Calendar;
