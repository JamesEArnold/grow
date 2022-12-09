/** @jest-environment jsdom */
import { Divider } from '@/components/';
import { render } from '@testing-library/react';

describe(Divider, () => {
  it('renders a title in the divider', () => {
    const someTitle = 'some_title';
    const { getByText } = render(<Divider title={someTitle} />);
    getByText(someTitle);
  });
});
