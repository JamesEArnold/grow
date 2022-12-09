import { ChangeEvent, Dispatch, ReactElement, RefObject, SetStateAction, useRef } from 'react';
import { Calendar } from 'react-feather';

type DatePickerProps = {
  earliestSelectableDate: string,
  latestSelectableDate: string,
  setSelectedDate: Dispatch<SetStateAction<string>>,
  title: string,
}

const openCalendar = (calendar: RefObject<HTMLInputElement>) => {
  if (calendar.current !== null) {
    calendar.current.showPicker();
    calendar.current.focus();
  }
};

const compareSelectedDateToLatestSelectableDate = (
  earliestSelectableDate: string,
  latestSelectableDate: string,
  selectedDate: ChangeEvent<HTMLInputElement>,
  setSelectedDate: Dispatch<SetStateAction<string>>,
) => {
  if (
    new Date(selectedDate.target.value).valueOf() < new Date(latestSelectableDate).valueOf()
    && new Date(selectedDate.target.value).valueOf() > new Date(earliestSelectableDate).valueOf()
  ) {
    setSelectedDate(selectedDate.target.value);
  }
};

export const DatePicker = ({
  earliestSelectableDate,
  latestSelectableDate,
  setSelectedDate,
  title,
}: DatePickerProps): ReactElement => {
  const calendarRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  return <div className='flex flex-col'>
    <label
      htmlFor='calendar-input'
      className='text-slate-700'
    >
      {title}
    </label>
    <div
      className='inline-flex justify-between w-40 border-solid border-2 border-slate-300
      hover:border-slate-400 ease-in-out duration-300 rounded p-1 cursor-pointer'
      onClick={() => openCalendar(calendarRef)}
    >
      <input
        type='date'
        id='calendar-input'
        data-testid='calendar-input'
        name='calendar-input'
        defaultValue={latestSelectableDate}
        min={earliestSelectableDate}
        max={latestSelectableDate}
        className='outline-none cursor-pointer'
        required={true}
        onChange={
          (event: ChangeEvent<HTMLInputElement>) =>
            compareSelectedDateToLatestSelectableDate(
              earliestSelectableDate,
              latestSelectableDate,
              event,
              setSelectedDate,
            )
        }
        ref={calendarRef}
      />
      <Calendar
        className='text-slate-600'
        onClick={() => openCalendar(calendarRef)}
        data-testid='calendar-icon'
      />
    </div>
  </div>;
};
