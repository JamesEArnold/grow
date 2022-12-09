/** @jest-environment jsdom */
import { ArticleStats, SearchResults } from '@/components';
import { fireEvent, render } from '@testing-library/react';
import { ReactElement } from 'react';
import { fetcher } from '@/utils';
import useSWR from 'swr';

jest.mock('swr');

const someNumberOfArticlesToDisplay = 5;
const someSelectedDate = '2022/12/01';
const someArticleName = 'some_article';
const someRank = 1;
const someViews = 10;
const somePinnedArticles: ArticleStats[] = [];
const someSetPinnedArticles = jest.fn();
const someArticle: ArticleStats = {
  article: someArticleName,
  views: someViews,
  rank: someRank,
};

const someResponse = (articles: ArticleStats[]) => ({
  data: {
    items: [
      {
        articles,
      },
    ],
  },
});

let subject: ReactElement;

describe(SearchResults, () => {
  beforeEach(() => {
    jest.resetAllMocks();
    subject =
      <SearchResults
        numberOfResultsToDisplay={someNumberOfArticlesToDisplay}
        selectedDate={someSelectedDate}
        pinnedResults={somePinnedArticles}
        setPinnedResults={someSetPinnedArticles}
      />;
  });

  it('renders the number of articles the user selected', () => {
    const tenArticles: ArticleStats[] = Array(10).fill(someArticle);
    (useSWR as jest.Mock).mockReturnValue(someResponse(tenArticles));
    const { getAllByTestId } = render(subject);

    expect(getAllByTestId(someArticleName)).toHaveLength(someNumberOfArticlesToDisplay);
  });

  it('requests the articles for the selected date', () => {
    (useSWR as jest.Mock).mockReturnValue(someResponse([ someArticle ]));
    render(subject);
    expect(useSWR).toHaveBeenCalledWith([ `/api/get-top-articles/${someSelectedDate}`, someSelectedDate ], fetcher);
  });

  it('displays the error message if there was an error during the request', () => {
    (useSWR as jest.Mock).mockReturnValue({ error: 'some_error' });
    const { getByTestId } = render(subject);
    getByTestId('articles-error-message');
  });

  it('displays the loading skeleton while the request is in flight', () => {
    (useSWR as jest.Mock).mockReturnValue({});
    const { getByTestId } = render(subject);
    getByTestId('loading-skeleton-0');
  });

  it('pins the article when clicked', () => {
    (useSWR as jest.Mock).mockReturnValue(someResponse([ someArticle ]));
    const { getByTestId } = render(subject);

    fireEvent.click(getByTestId(someArticleName));
    expect(someSetPinnedArticles).toHaveBeenCalledWith([ someArticle ]);
  });

  it('does not pin the article if it is already pinned', () => {
    (useSWR as jest.Mock).mockReturnValue(someResponse([ someArticle ]));
    const { getByTestId } = render(
      <SearchResults
        numberOfResultsToDisplay={someNumberOfArticlesToDisplay}
        selectedDate={someSelectedDate}
        pinnedResults={[ someArticle ]}
        setPinnedResults={someSetPinnedArticles}
      />,
    );

    fireEvent.click(getByTestId(someArticleName));
    expect(someSetPinnedArticles).not.toHaveBeenCalled();
  });
});
