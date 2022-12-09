import { Articles, DatePicker, DropDown, Nav } from '@/components';
import { subtractDaysFromADate } from '@/utils';
import { useState } from 'react';

const defaultRows = 100;
const rowsToDisplay = [ 25, 50, 75, 100, 200 ];
const latestSelectableDate: string = subtractDaysFromADate(1);

const Home = () => {
  const [ numberOfArticlesToDisplay, setNumberOfArticlesToDisplay ] = useState<number>(defaultRows);
  const [ selectedDate, setSelectedDate ] = useState<string>(latestSelectableDate);

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
          selectedRow={numberOfArticlesToDisplay}
          setSelectedRow={setNumberOfArticlesToDisplay}
          title='Number of Results'
        />
      </div>
      <Articles
        articlesToDisplay={numberOfArticlesToDisplay}
        selectedDate={selectedDate}
      />
    </div>
  </div>;
};

export default Home;
