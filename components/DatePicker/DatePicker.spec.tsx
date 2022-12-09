/** @jest-environment jsdom */
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DatePicker } from '@/components';

const someEarliestDate = '2000-01-01';
const someLatestDate = '2022-12-01';
const someSetSelectedDate = jest.fn() as Dispatch<SetStateAction<string>>;
const someTitle = 'some_title';

let subject: ReactElement;

describe(DatePicker, () => {
  beforeEach(() => {
    jest.resetAllMocks();
    subject =
      <DatePicker
        earliestSelectableDate={someEarliestDate}
        latestSelectableDate={someLatestDate}
        setSelectedDate={someSetSelectedDate}
        title={someTitle}
      />;
  });

  it('renders a title', () => {
    const { getByText } = render(subject);

    getByText(someTitle);
  });

  it('renders the selected date', () => {
    const { getByDisplayValue } = render(subject);

    getByDisplayValue(someLatestDate);
  });

  it('sets the selected date when a new date is selected', () => {
    const someDate = '2022-01-01';
    const { getByTestId } = render(subject);

    fireEvent.change(getByTestId('calendar-input'), { target: { value: someDate } });
    expect(someSetSelectedDate).toHaveBeenCalledWith(someDate);
  });

  it('does not set the selected date if its after the latest selectable date', () => {
    const someUnselectableDate = '2023-01-01';
    const { getByTestId } = render(subject);

    fireEvent.change(getByTestId('calendar-input'), { target: { value: someUnselectableDate } });
    expect(someSetSelectedDate).not.toHaveBeenCalledWith(someUnselectableDate);
  });

  it('does not set the selected date if its before the earliest selectable date', () => {
    const someUnselectableDate = '1999-01-01';
    const { getByTestId } = render(subject);

    fireEvent.change(getByTestId('calendar-input'), { target: { value: someUnselectableDate } });
    expect(someSetSelectedDate).not.toHaveBeenCalledWith(someUnselectableDate);
  });
});
