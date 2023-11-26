import Image from "next/legacy/image";
import { FC } from 'react';

import { calculateAge } from '@/utils';
import { PictureOutlined } from '@ant-design/icons';

interface IPlayer {
  name: string;
  surname: string;
  imageSrc: string;
  dateOfBirth: string;
  position: string;
  playerId: number;
  playerFromCms?: boolean;
  withLink?: boolean;
}
const Player: FC<IPlayer> = ({
  name,
  surname,
  imageSrc,
  dateOfBirth,
  position,
  playerId,
  playerFromCms = false,
  withLink = false
}) => {
  return (
    <div className="flex p-3 shadow-xl border rounded-xl gap-5 w-full lg:w-96 bg-white">
      <div className="w-24 h-36 relative my-auto rounded-xl shadow overflow-hidden">
        {imageSrc ? (
          <Image layout="fill" objectFit="cover" alt={`${name} ${surname}`} src={imageSrc} />
        ) : (
          <div className="flex text-4xl justify-center items-center h-full text-gray-400">
            <PictureOutlined />
          </div>
        )}
      </div>
      <div className="w-2/3">
        <div className="h-1/2">
          <div className="font-semibold">
            {name} {surname}
          </div>
          <div className="text-sm">
          {dateOfBirth ? `${calculateAge(dateOfBirth, playerFromCms ? 'yyyy-MM-dd' : 'dd.MM.yyyy')},` : ''}, {position}
          </div>
        </div>
        {!playerFromCms ||
          (withLink && (
            <div className="relative h-1/2">
              <div className="absolute bottom-0 right-0">
                <a
                  rel="noreferrer"
                  href={`/druzyna_2lm/${playerId}`}
                  className="text-sm text-gray-400 font-semibold hover:text-gray-700"
                >
                  szczegóły
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Player;
