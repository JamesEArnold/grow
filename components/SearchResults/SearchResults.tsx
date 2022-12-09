import { Article, ArticleStats, LoadingSkeleton } from '@/components';
import { Dispatch, SetStateAction } from 'react';
import { fetcher } from '@/utils';
import useSWR from 'swr';

type WikimediaResponse = {
  access: string,
  day: string,
  month: string,
  year: string,
  project: string,
  articles: ArticleStats[],
}

type SearchResultsProps = {
  numberOfResultsToDisplay: number,
  selectedDate: string,
  pinnedResults: ArticleStats[],
  setPinnedResults: Dispatch<SetStateAction<ArticleStats[]>>,
}

const addToPinnedArticles = (
  article: ArticleStats,
  pinnedResults: ArticleStats[],
  setPinnedResults: Dispatch<SetStateAction<ArticleStats[]>>,
) => {
  if (!pinnedResults.includes(article)) {
    setPinnedResults([ ...pinnedResults, article ]);
  }
};

export const SearchResults = ({
  numberOfResultsToDisplay,
  selectedDate,
  pinnedResults,
  setPinnedResults,
}: SearchResultsProps) => {
  const { data, error } = useSWR<{ items: WikimediaResponse[] }>(
    [ `/api/get-top-articles/${selectedDate}`, selectedDate ], fetcher,
  );

  if (error) {
    return <div className='flex justify-center my-10'>
      <p
        className='text-slate-700 text-2xl'
        data-testid='articles-error-message'
      >
        An error has occurred.<br /> Please try refreshing.
      </p>
    </div>;
  } else if (!data) {
    return <LoadingSkeleton skeletonsToDisplay={10}/>;
  }

  const { articles }: WikimediaResponse = data.items[0];

  return <div
    className='w-full'
    data-testid='search-results'
  >
    {articles.slice(0, numberOfResultsToDisplay).map((article: ArticleStats, index: number) => (
      <Article
        key={`${article.article}-${selectedDate}`}
        title={article.article}
        rank={article.rank}
        views={article.views}
        data-testid={`search-result-${index}`}
        onClickHandler={() => addToPinnedArticles(article, pinnedResults, setPinnedResults)}
      />
    ))}
  </div>;
};
