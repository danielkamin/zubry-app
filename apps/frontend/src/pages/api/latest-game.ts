import { NextApiRequest, NextApiResponse } from 'next';

import { PzkoszApiService } from '@/api';

export default async function latestGame(req: NextApiRequest, res: NextApiResponse) {
  const pzkoszApiService = await PzkoszApiService.getInstance();
  const lastGame = await pzkoszApiService.getLastGame();
  res.status(200).json(lastGame);
}
