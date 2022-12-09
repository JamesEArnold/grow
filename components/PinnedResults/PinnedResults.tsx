import { Article, ArticleStats, Divider } from '@/components';
import { Dispatch, SetStateAction } from 'react';

type PinnedResultsProps = {
  pinnedResults: ArticleStats[],
  setPinnedResults: Dispatch<SetStateAction<ArticleStats[]>>,
}

export const PinnedResults = ({
  pinnedResults,
  setPinnedResults,
}: PinnedResultsProps) => <>
  {pinnedResults.length > 0
    ? <>
      <Divider title={'Pinned Articles'} />
      {pinnedResults.map((article: ArticleStats, index) => (
        <Article
          key={`${article.article}-${index}`}
          title={article.article}
          rank={article.rank}
          views={article.views}
          onClickHandler={() =>
            setPinnedResults(pinnedResults.filter((pinnedResult) => pinnedResult !== article))
          }
        />
      ))}
      <Divider title={'Search Results'} />
    </>
    : <></>}
</>;
