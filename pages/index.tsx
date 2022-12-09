import { ArticleStats, DatePicker, DropDown, Nav, PinnedResults, SearchResults } from '@/components';
import { subtractDaysFromADate } from '@/utils';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { useState } from 'react';

const defaultRows = 100;
const rowsToDisplay = [ 25, 50, 75, 100, 200 ];
const latestSelectableDate: string = subtractDaysFromADate(1);

const Home = () => {
  const [ numberOfResultsToDisplay, setNumberOfResultsToDisplay ] = useState<number>(defaultRows);
  const [ selectedDate, setSelectedDate ] = useState<string>(latestSelectableDate);
  const [ pinnedResults, setPinnedResults ] = useLocalStorageState<ArticleStats[]>('pinned-articles', []);

  return <div className='relative'>
    <Nav title='Grow Take Home' />
    <div className='mt-20'>
      <div className='flex justify-between max-w-sm mx-auto'>
        <DatePicker
          earliestSelectableDate='2000-01-01'
          latestSelectableDate={latestSelectableDate}
          setSelectedDate={setSelectedDate}
          title='Start Date:'
        />
        <DropDown
          rows={rowsToDisplay}
          selectedRow={numberOfResultsToDisplay}
          setSelectedRow={setNumberOfResultsToDisplay}
          title='Number of Results'
        />
      </div>
      <PinnedResults
        pinnedResults={pinnedResults}
        setPinnedResults={setPinnedResults}
      />
      <SearchResults
        numberOfResultsToDisplay={numberOfResultsToDisplay}
        selectedDate={selectedDate}
        pinnedResults={pinnedResults}
        setPinnedResults={setPinnedResults}
      />
    </div>
  </div>;
};

export default Home;
