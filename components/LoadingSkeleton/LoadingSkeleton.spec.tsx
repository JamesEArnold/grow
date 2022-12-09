/** @jest-environment jsdom */
import { LoadingSkeleton } from '@/components';
import { render } from '@testing-library/react';

describe(LoadingSkeleton, () => {
  it('renders a single skeleton by default', () => {
    const { getByTestId } = render(<LoadingSkeleton />);
    getByTestId('loading-skeleton-0');
  });

  it('renders x number of skeletons', () => {
    const someSkeletonsToDisplay = 5;
    const { getByTestId } = render(<LoadingSkeleton skeletonsToDisplay={someSkeletonsToDisplay} />);
    Array(someSkeletonsToDisplay).map((element, index) => {
      getByTestId(`loading-skeleton-${index}`);
    });
  });
});
