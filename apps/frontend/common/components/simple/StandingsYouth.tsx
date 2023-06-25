import { TStrapiLeaderBoardItem } from '@/types/strapi.types';
import React from 'react';

const StandingsYouth = ({ leaderBoard }: { leaderBoard: TStrapiLeaderBoardItem[] }) => {
  return (
    <div className="rounded shadow border-b border-gray-200 mb-20 md:overflow-hidden overflow-auto">
      <table className="text-center w-full ">
        <thead className="bg-gray-200 text-gray-700 h-12 text-sm md:text-base">
          <tr className="border">
            <th className="border py-2">Drużyna</th>
            <th className="border py-2">Mecze</th>
            <th className="border py-2">Bilans</th>
            <th className="border py-2">Punkty</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoard.length == 0 ? (
            <>
              <tr>
                <td colSpan={4} className="py-4">
                  Brak danych
                </td>
              </tr>
            </>
          ) : (
            <>
              {leaderBoard.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className={
                      'border h-16 text-sm' +
                      (item.Name.toLowerCase().includes('żubry') &&
                      !item.Name.includes('Młode') &&
                      !item.Name.includes('Akademia')
                        ? ' font-bold'
                        : '')
                    }
                  >
                    <td>
                      <div className="flex flex-row items-center">
                        <div className="flex flex-col w-1/12 ml-2">{item.Rank}.</div>
                        <div className="flex flex-col w-10/12 h-full items-start ml-3">{item.Name}</div>
                      </div>
                    </td>
                    <td className="border">{item.Games}</td>
                    <td className="border">
                      {item.Wins} - {item.Losses}
                    </td>
                    <td className="border">{item.Points}</td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsYouth;
