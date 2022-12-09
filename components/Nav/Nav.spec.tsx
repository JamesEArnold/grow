/** @jest-environment jsdom */
import { Nav } from '@/components';
import { render } from '@testing-library/react';

describe(Nav, () => {
  it('renders a title', () => {
    const someTitle = 'some_title';
    const { getByText } = render(<Nav title={someTitle} />);
    getByText(someTitle);
  });
});
