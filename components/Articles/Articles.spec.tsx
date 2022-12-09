/** @jest-environment jsdom */
import { ArticleStats, Articles } from '@/components';
import { ReactElement } from 'react';
import { fetcher } from '@/utils';
import { render } from '@testing-library/react';
import useSWR from 'swr';

jest.mock('swr');

const someNumberOfArticlesToDisplay = 5;
const someSelectedDate = '2022/12/01';
const someArticleName = 'some_article';
const someRank = 1;
const someViews = 10;
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

describe(Articles, () => {
  beforeEach(() => {
    jest.resetAllMocks();
    subject =
      <Articles
        articlesToDisplay={someNumberOfArticlesToDisplay}
        selectedDate={someSelectedDate}
      />;
  });

  it('renders the title of the article with _ removed', () => {
    (useSWR as jest.Mock).mockReturnValue(someResponse([ someArticle ]));
    const { getByText } = render(subject);
    getByText(someArticleName.replaceAll(/_/g, ' '));
  });

  it('renders the views of the article', () => {
    (useSWR as jest.Mock).mockReturnValue(someResponse([ someArticle ]));
    const { getByText } = render(subject);
    getByText(`Views: ${someViews.toLocaleString()}`);
  });

  it('renders the rank of the article', () => {
    (useSWR as jest.Mock).mockReturnValue(someResponse([ someArticle ]));
    const { getByText } = render(subject);
    getByText(`Rank: ${someRank}`);
  });

  it('renders the number of articles the user selected', () => {
    const tenArticles: ArticleStats[] = Array(10).fill(someArticle);
    (useSWR as jest.Mock).mockReturnValue(someResponse(tenArticles));
    const { getByTestId } = render(subject);

    tenArticles.slice(0, someNumberOfArticlesToDisplay).map((element, index) => {
      getByTestId(`article-${index}`);
    });
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
});
