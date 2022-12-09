/** @jest-environment jsdom */
import { ArticleStats, PinnedResults } from '@/components';
import { fireEvent, render } from '@testing-library/react';
import { ReactElement } from 'react';

const someArticleName = 'some article';
const someRank = 1;
const someViews = 10;
const someArticle: ArticleStats = {
  article: someArticleName,
  rank: someRank,
  views: someViews,
};
const somePinnedResults = [ someArticle ];
const someSetPinnedResults = jest.fn();

let subject: ReactElement;

describe(PinnedResults, () => {
  beforeEach(() => {
    jest.resetAllMocks();
    subject =
      <PinnedResults
        pinnedResults={somePinnedResults}
        setPinnedResults={someSetPinnedResults}
      />;
  });

  it('renders pinned articles', () => {
    const { getByText } = render(subject);
    getByText(someArticleName);
  });

  it('removes a pinned article if clicked', () => {
    const { getByTestId } = render(subject);
    fireEvent.click(getByTestId(someArticleName));

    expect(someSetPinnedResults).toHaveBeenCalledWith([]);
  });
});
