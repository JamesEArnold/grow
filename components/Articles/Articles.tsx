import { fetcher, getWikimediaUrl } from '@/utils';
import { LoadingSkeleton } from '@/components';
import { ReactElement } from 'react';
import useSWR from 'swr';

export type ArticleStats = {
  article: string,
  rank: number,
  views: number,
}

type WikimediaResponse = {
  access: string,
  day: string,
  month: string,
  year: string,
  project: string,
  articles: ArticleStats[],
}

type ArticleProps = {
  articlesToDisplay: number,
  selectedDate: string,
}

export const Articles = ({ articlesToDisplay, selectedDate }: ArticleProps): ReactElement => {
  const { data, error } = useSWR<{ items: WikimediaResponse[] }>(
    getWikimediaUrl(selectedDate), fetcher,
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

  return <div className='w-full'>
    {articles.slice(0, articlesToDisplay).map(({ article, views }: ArticleStats, index) => (
      <div
        key={article}
        className='flex justify-between mx-auto my-5 max-w-sm p-10 rounded-lg shadow-xl bg-gray-800 border-gray-700 hover:bg-gray-700'
        data-testid={`article-${index}`}
      >
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-white break-words flex-1'>
          {article.replaceAll(/_/g, ' ')}
        </h5>
        <div className='ml-2'>
          <p className='font-normal text-gray-400'>Views:</p>
          <p className='font-normal text-gray-400'>{views}</p>
        </div>
      </div>
    ))}
  </div>;
};
