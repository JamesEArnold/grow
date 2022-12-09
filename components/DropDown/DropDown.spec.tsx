/** @jest-environment jsdom */
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DropDown } from '@/components';

const someTitle = 'some_title';
const someRows = [ 1, 2, 3 ];
const someSelectedRow = 2;
const someSetSelectedRow = jest.fn() as Dispatch<SetStateAction<number>>;

let subject: ReactElement;

describe(DropDown, () => {
  beforeEach(() => {
    jest.resetAllMocks();
    subject =
      <DropDown
        title={someTitle}
        rows={someRows}
        selectedRow={someSelectedRow}
        setSelectedRow={someSetSelectedRow}
      />;
  });

  it('renders with a title', () => {
    const { getByText } = render(subject);

    getByText(someTitle);
  });

  it('renders the currently selected row', () => {
    const { getByText } = render(subject);

    getByText(someSelectedRow);
  });

  it('shows the selectable rows when clicked', () => {
    const { getByTestId, getByText } = render(subject);
    fireEvent.click(getByTestId('dropdown-rows-button'));

    someRows.map((row: number) =>
      getByText(row, { selector: 'button' }));
  });

  it('updates the currently selected row when clicked', () => {
    const { getByTestId, getByText } = render(subject);
    fireEvent.click(getByTestId('dropdown-rows-button'));

    fireEvent.click(getByText(someRows[0]));
    expect(someSetSelectedRow).toHaveBeenCalledWith(someRows[0]);
  });

  it('closes the drop down when clicking outside the drop down', () => {
    const { getByTestId, queryByText } = render(
      <div data-testid="outside">
        {subject}
      </div>,
    );

    fireEvent.click(getByTestId('dropdown-rows-button'));
    fireEvent.click(getByTestId('outside'));
    expect(queryByText(someRows[0])).toBeFalsy();
  });
});
