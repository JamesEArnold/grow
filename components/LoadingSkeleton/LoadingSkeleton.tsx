import { ReactElement } from 'react';

type LoadingSkeletonProps = {
  skeletonsToDisplay?: number,
}

export const LoadingSkeleton = ({
  skeletonsToDisplay = 1,
}: LoadingSkeletonProps): ReactElement => <>
  {[ ...Array(skeletonsToDisplay) ].map((element, index) => (
    <div
      key={index}
      className='bg-slate-700 rounded-lg max-w-sm w-full mx-auto'
      data-testid={`loading-skeleton-${index}`}
    >
      <div className='animate-pulse flex my-5 px-10 py-12 justify-between'>
        <div className='rounded bg-slate-300 h-8 w-32'></div>
        <div className='flex flex-col'>
          <div className='h-3 w-24 mb-1 bg-slate-300 rounded'></div>
          <div className='h-3 w-24 mb-1 bg-slate-300 rounded'></div>
        </div>
      </div>
    </div>
  ))}
</>;
