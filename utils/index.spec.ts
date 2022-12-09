import { fetcher, getWikimediaUrl, subtractDaysFromADate } from '@/utils';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: 'some_data' })),
}));

describe('utils', () => {
  describe(fetcher, () => {
    const someUrl = 'some_url';

    it('makes a call with the provided address', async () => {
      await fetcher(someUrl);
      expect(axios.get).toHaveBeenCalledWith(someUrl);
    });
  });

  describe(subtractDaysFromADate, () => {
    beforeEach(() => {
      jest.useFakeTimers()
        .setSystemTime(new Date('12-08-2022'));
    });

    it('subtracts a number of days from the current date', () => {
      expect(subtractDaysFromADate(1)).toEqual('2022-12-07');
    });

    it('returns the date in yyyy-mm-dd format', () => {
      expect(subtractDaysFromADate(0)).toEqual('2022-12-08');
    });
  });

  describe(getWikimediaUrl, () => {
    it('returns an address using a specific date', () => {
      expect(getWikimediaUrl('2000-01-01')).toEqual(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2000/01/01`);
    });
  });
});
