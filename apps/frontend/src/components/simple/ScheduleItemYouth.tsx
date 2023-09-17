import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

import { TStrapiScheduleItem } from '@/types';

const ScheduleItemYouth = ({ scheduleItem }: { scheduleItem: TStrapiScheduleItem }) => {
  const matchDate = format(new Date(scheduleItem.Game_Date), 'dd.MM.yyyy HH:mm', { locale: pl });

  const formatScoreString = (scoreNumber: number) =>
    scoreNumber !== null && scoreNumber !== undefined ? scoreNumber : '--';

  if (scheduleItem.Host_Team === null || scheduleItem.Away_Team === null) {
    return <div></div>;
  }
  return (
    <div className="md:m-7 mx-2 my-4">
      <div className="flex flex-col content-center justify-center">
        <div className="flex flex-row justify-center w-full mb-2">
          <div className="flex flex-col w-full justify-center">
            <div className="font-semibold text-sm text-center text-gray-500">{matchDate}</div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="relative flex flex-col w-5/12 justify-center">
            <p
              className={
                'text-center break-words' +
                (scheduleItem.Host_Team != null &&
                scheduleItem.Host_Team.includes('Żubry') &&
                !scheduleItem.Host_Team.includes('Młode') &&
                !scheduleItem.Host_Team.includes('Akademia')
                  ? ' font-bold'
                  : '')
              }
            >
              {scheduleItem.Host_Team}
            </p>
          </div>
          <div className="flex flex-col w-2/12 mx-2 text-center font-bold justify-center min-w-fit">
            {formatScoreString(scheduleItem.Host_Points)} : {formatScoreString(scheduleItem.Away_Points)}
          </div>
          <div className="relative flex flex-col w-5/12 justify-center">
            <div
              className={
                'text-center break-words' +
                (scheduleItem.Away_Team != null &&
                scheduleItem.Away_Team.includes('Żubry') &&
                !scheduleItem.Away_Team.includes('Młode') &&
                !scheduleItem.Away_Team.includes('Akademia')
                  ? ' font-bold'
                  : '')
              }
            >
              {scheduleItem.Away_Team}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItemYouth;
