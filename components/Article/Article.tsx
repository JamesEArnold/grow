export type ArticleStats = {
  article: string,
  rank: number,
  views: number,
}

type ArticleProps = {
  title: string,
  rank: number,
  views: number,
  onClickHandler?: () => void,
}

export const Article = ({ title, rank, views, onClickHandler = () => {} }: ArticleProps) => <div
  key={title}
  className='flex justify-between mx-auto my-5 max-w-sm p-10 rounded-lg shadow-xl
  bg-gray-800 border-gray-700 hover:bg-gray-700 cursor-pointer'
  onClick={() => onClickHandler()}
  data-testid={title}
>
  <h5 className='mb-2 text-2xl font-bold tracking-tight text-white break-words flex-1'>
    {title.replaceAll(/_/g, ' ')}
  </h5>
  <div className='flex flex-col'>
    <div className='ml-2'>
      <p className='font-normal text-gray-400'>Rank: {rank}</p>
    </div>
    <div className='ml-2'>
      <p className='font-normal text-gray-400'>Views: {views.toLocaleString()}</p>
    </div>
  </div>
</div>;
