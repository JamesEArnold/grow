import { Dispatch, ReactElement, RefObject, SetStateAction, useState } from 'react';
import { ChevronDown } from 'react-feather';
import classNames from 'classnames';
import { useOutsideClick } from '@/hooks';

type DropDownProps = {
  title: string,
  rows: number[],
  selectedRow: number,
  setSelectedRow: Dispatch<SetStateAction<number>>,
}

/** A drop down to select a number of rows to be displayed */
export const DropDown = ({
  title,
  rows,
  selectedRow,
  setSelectedRow,
}: DropDownProps): ReactElement => {
  const [ showDropDown, setShowDropDown ] = useState<boolean>(false);
  const dropDownRef: RefObject<HTMLButtonElement> =
    useOutsideClick<HTMLButtonElement>(() => setShowDropDown(false));

  return <div className='flex flex-col'>
    <label
      htmlFor='row-count'
      className='text-slate-700'
    >
      {title}
    </label>
    <button
      className={classNames(showDropDown ? 'border-slate-400' : 'border-slate-300',
        'inline-flex justify-between border-solid border-2 rounded hover:border-slate-400 p-1 w-16 ease-in-out duration-300')}
      onClick={() => setShowDropDown(!showDropDown)}
      ref={dropDownRef}
      id='row-count'
      data-testid='dropdown-rows-button'
    >
      <p>{selectedRow}</p>
      <ChevronDown className={classNames(showDropDown ? 'rotate-180' : '', 'transition text-slate-600')} />
    </button>
    {showDropDown &&
    <li
      className='flex flex-col absolute top-16 bg-slate-100 last:rounded border-b-2 border-slate-300 shadow-lg'
    >
      {rows.map((row: number) => (
        <button
          key={row}
          onClick={() => {
            setSelectedRow(row);
            setShowDropDown(false);
          }}
          className='px-4 py-1 border-b-2 border-slate-300 first-of-type:rounded-t last-of-type:border-b-0 hover:bg-slate-200'
          aria-label={`Show ${row} rows`}
        >
          {row}
        </button>
      ))}
    </li>}
  </div>;
};
