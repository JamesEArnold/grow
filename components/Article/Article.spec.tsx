/** @jest-environment jsdom */
import { Article } from '@/components';
import { ReactElement } from 'react';
import { render } from '@testing-library/react';

const someArticleTitle = 'some_title';
const someRank = 1;
const someViews = 10;

const subject: ReactElement =
  <Article
    title={someArticleTitle}
    rank={someRank}
    views={someViews}
  />;

describe(Article, () => {
  it('renders the title of the article with _ removed', () => {
    const { getByText } = render(subject);
    getByText(someArticleTitle.replaceAll(/_/g, ' '));
  });

  it('renders the views of the article', () => {
    const { getByText } = render(subject);
    getByText(`Views: ${someViews.toLocaleString()}`);
  });

  it('renders the rank of the article', () => {
    const { getByText } = render(subject);
    getByText(`Rank: ${someRank}`);
  });
});
