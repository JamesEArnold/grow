import { NextApiRequest, NextApiResponse } from 'next/types';
import { fetcher, getWikimediaUrl } from '@/utils';
import NextCors from 'nextjs-cors';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await NextCors(req, res, {
    methods: [ 'GET' ],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { pid } = req.query;

  try {
    if (typeof pid === 'string') {
      const response = await fetcher(getWikimediaUrl(pid));
      res.send(response);
    }
  } catch (error) {
    res.send({
      status: 500,
    });
  }
};

export default handler;
