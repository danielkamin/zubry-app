import { TStrapiOrder } from '@/types/strapi.types';
import { parse, differenceInYears } from 'date-fns';
import { NextRouter } from 'next/router';
import qs from 'qs';

const polishWeirdWordEndingAgeNumbers = [2, 3, 4];

export function PickGridCols(count) {
  if (count == 1) return 'lg:grid-cols-1';
  else if (count % 2 == 0) return 'lg:grid-cols-2';
  else if (count % 3 == 0) return 'lg:grid-cols-3';
}

export const calculateAge = (birthday, dateFormat = 'dd.MM.yyyy') => {
  if (!birthday) return '';
  const paredDate = parse(birthday, dateFormat, new Date());
  const age = differenceInYears(new Date(), paredDate);

  let grammarAgeResult = `${age} lat`;
  polishWeirdWordEndingAgeNumbers.includes(age % 10) && (grammarAgeResult += 'a');

  return grammarAgeResult;
};

export const isCurrentPath = (path, router: NextRouter) => {
  return path === router.pathname;
};

export const goToPath = (path, router: NextRouter) => {
  router.push(path);
};

export const getDateOnly = (date = new Date()) => {
  return date.toJSON().split('T')[0];
};

export const getOrderStatusText = (order: TStrapiOrder): string => {
  if (order.Is_Returned) {
    return 'Zwrócone';
  } else if (order.Is_Realized) {
    return 'Is_Realized';
  } else if (!order.Is_Realized && order.Is_Sent) {
    return 'Wysłane';
  } else {
    return 'Realizacja';
  }
};
export const getPopulateUserQuery = (userId: number) => {
  const query = qs.stringify(
    {
      populate: {
        Users: {
          filters: {
            id: {
              $eq: userId
            }
          }
        }
      }
    },
    {
      encodeValuesOnly: true
    }
  );
  return query;
};

export const extractIdFromYoutubeUrl = (url: string): string => {
  const { pathname, search } = new URL(url);
  try {
    if (url.includes('youtu.be')) {
      if (!pathname) throw new Error(`Invalid youtube url: ${url}! Does not contain content id!`);
      return pathname.substring(1);
    } else if (search) {
      return search.split('&')[0].split('=')[1];
    } else {
      return 'dAjI2Lkup3A'; //default video id from zubry yt channel
    }
  } catch (err) {
    console.error(err);
    return 'dAjI2Lkup3A'; //default video id from zubry yt channel
  }
};
