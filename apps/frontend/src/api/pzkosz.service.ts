import axios, { AxiosInstance } from 'axios';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

import { PZKOSZ_URL } from '@/utils';
import { MainPageService } from '@/api';
import { PzkoszSettings } from '@/types';
const initalLatestGameData = {
  date: format(new Date(), 'dd.MM.yyyy HH:mm', { locale: pl }),
  home: {
    name: 'Żubry Chorten Białystok',
    logo: 'https://s1.static.esor.pzkosz.pl/internalfiles/image/kluby/s23/200-200/7601.jpg',
    score: 0
  },
  visitor: {
    name: 'Żubry Chorten Białystok',
    logo: 'https://s1.static.esor.pzkosz.pl/internalfiles/image/kluby/s23/200-200/7601.jpg',
    score: 0
  },
  gameUrl: 'https://rozgrywki.pzkosz.pl/liga/4/aktualnosci.html'
};

class PzkoszApiService {
  private apiRequestParams: URLSearchParams;
  private apiAxiosInstance: AxiosInstance;
  private settings: PzkoszSettings;
  private static pzkoszApiServiceInstance: PzkoszApiService;

  private constructor(apiRequestParams: URLSearchParams, settings: PzkoszSettings) {
    this.apiAxiosInstance = axios.create({
      baseURL: PZKOSZ_URL
    });
    this.apiRequestParams = apiRequestParams;
    this.settings = settings;
  }
  static async getInstance() {
    if (!PzkoszApiService.pzkoszApiServiceInstance) {
      const apiRequestParams = new URLSearchParams();
      let settings: PzkoszSettings = null;
      try {
        const { result, status } = await MainPageService.getPzkoszSettingsData();
        if (!status) throw new Error('Error while fetching PZKosz settings from CMS!');
        settings = JSON.parse(result.data.attributes.settings as string);
        apiRequestParams.append('key', process.env.PZKOSZ_API_KEY);
        apiRequestParams.append('leagueId', settings.leagueId.toString());
        apiRequestParams.append('seasonid', settings.seasonId.toString());
        apiRequestParams.append('groupid', settings.stages[0].id.toString());
        apiRequestParams.append('teamid', settings.teamId.toString());
      } catch (err) {
        console.error(err);
        apiRequestParams.append('key', process.env.PZKOSZ_API_KEY);
        apiRequestParams.append('leagueId', '4');
        apiRequestParams.append('seasonid', '23');
        apiRequestParams.append('groupid', '1543');
        apiRequestParams.append('teamid', '7601');
      }
      PzkoszApiService.pzkoszApiServiceInstance = new PzkoszApiService(apiRequestParams, settings);
    }
    return PzkoszApiService.pzkoszApiServiceInstance;
  }

  async getOurGames() {
    const currentRequestParams = new URLSearchParams(this.apiRequestParams);
    currentRequestParams.append('function', 'getTimetable');
    try {
      const teamId = this.apiRequestParams.get('teamid');
      currentRequestParams.delete('teamid');
      currentRequestParams.append('home', teamId);
      const homeResults = (await this.apiAxiosInstance.post('', currentRequestParams)).data;
      const homeGames = Object.keys(homeResults.items).map((key) => homeResults.items[key]);
      currentRequestParams.delete('home');
      currentRequestParams.append('visitor', teamId);
      const visitorResults = (await this.apiAxiosInstance.post('', currentRequestParams)).data;
      const visitorGames = Object.keys(visitorResults.items).map((key) => visitorResults.items[key]);

      const allGames = homeGames.concat(visitorGames);
      const result = allGames.sort(function (a, b) {
        return new Date(a.kolejka.data).getTime() - new Date(b.kolejka.data).getTime();
      });
      return { status: true, result: result };
    } catch (err) {
      console.error(err);

      return { status: true, result: [] };
    }
  }

  async getLastGame() {
    const currentRequestParams = new URLSearchParams(this.apiRequestParams);
    currentRequestParams.append('function', 'getTimetable');
    if (this.settings && this.settings.stages.slice(-1)[0]) {
      currentRequestParams.delete('groupid');
      currentRequestParams.append('groupid', this.settings.stages.slice(-1)[0].id.toString());
    }
    currentRequestParams.append('logow', '200');
    currentRequestParams.append('logoh', '200');
    try {
      const response = await this.apiAxiosInstance.post('', currentRequestParams);
      const data = response.data.items;
      if (!data) throw new Error('Brak zwróconych danych z PZKOSZ.');

      const teamId = currentRequestParams.get('teamid');
      const todayDate = Date.now();
      let latestGameDate = null;
      let latestGame = null;
      Object.entries(data).forEach((entrie: unknown) => {
        if (latestGameDate == null) latestGameDate = this.customDateFormat(entrie[1].data);
        if (entrie[1].k1.id == teamId || entrie[1].k2.id == teamId) {
          const currentGameDate = this.customDateFormat(entrie[1].data);
          if (latestGameDate.getTime() <= currentGameDate.getTime() && todayDate > currentGameDate.getTime()) {
            latestGameDate = currentGameDate;
            latestGame = entrie[1];
          }
        }
      });
      if (!latestGame) throw new Error('Nie znaleziono ostatniego meczu.');

      latestGame = {
        date: format(latestGameDate, 'dd.MM.yyyy HH:mm', { locale: pl }),
        home: {
          name: latestGame.k1.nazwa,
          logo: latestGame.k1.logo,
          score: latestGame.wynik1
        },
        visitor: {
          name: latestGame.k2.nazwa,
          logo: latestGame.k2.logo,
          score: latestGame.wynik2
        },
        gameUrl: `https://rozgrywki.pzkosz.pl/mecz/${latestGame.id}`
      };
      return { status: true, result: latestGame };
    } catch (err) {
      console.error(err);
      return { status: true, result: initalLatestGameData };
    }
  }

  async getLeaderBoard() {
    const currentRequestParams = new URLSearchParams(this.apiRequestParams);
    currentRequestParams.append('function', 'getLeagueTable');
    currentRequestParams.append('leagueid', currentRequestParams.get('leagueId'));
    currentRequestParams.delete('leagueId');

    try {
      const { data } = await this.apiAxiosInstance.post('', currentRequestParams);
      const sortedResult =
        data !== null
          ? data.sort((a, b) => {
              return a.pozycja - b.pozycja;
            })
          : [];
      return { status: true, result: sortedResult };
    } catch (err) {
      console.error(err);
      return { status: true, result: [] };
    }
  }

  async getPlayers() {
    const currentRequestParams = new URLSearchParams(this.apiRequestParams);
    currentRequestParams.append('function', 'getTeamPlayers');
    try {
      const { data } = await this.apiAxiosInstance.post('', currentRequestParams);
      if (data.error) return { status: true, result: [] };
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: true, result: [] };
    }
  }

  async getCoachingStaff() {
    const currentRequestParams = new URLSearchParams(this.apiRequestParams);
    currentRequestParams.append('function', 'getTeam');
    try {
      const { data } = await this.apiAxiosInstance.post('', currentRequestParams);
      if (data.error) return { status: true, result: [] };
      return { status: true, result: data.trenerzy };
    } catch (err) {
      console.error(err);
      return { status: true, result: [] };
    }
  }

  customDateFormat(data: string): Date {
    const [date, time] = data.split(' ');
    const [day, month, year] = date.split('.');
    const [hour, minute] = time !== undefined ? time.split(':') : ['17', '00'];
    return new Date(+year, +month - 1, +day, +hour + 1, +minute);
  }
}

export default PzkoszApiService;
