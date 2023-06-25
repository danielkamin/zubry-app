import { NextApiRequest, NextApiResponse } from 'next';

import PzkoszApiService from '@/modules/services/pzkosz.service';

export default async function latestGame(req: NextApiRequest, res: NextApiResponse) {
  const pzkoszApiService = await PzkoszApiService.getInstance();
  const lastGame = await pzkoszApiService.getLastGame();
  res.status(200).json(lastGame);
}
