const axios = require('axios');

function getPlayers(requestParams) {
  const tempParams = new URLSearchParams(requestParams);
  tempParams.append('function', 'getTeamPlayers');

  return axios({
    method: 'POST',
    url: 'https://esor.pzkosz.pl/api',
    data: tempParams
  });
}

function getPlayerStatistics(playerId, requestParams) {
  const tempParams = new URLSearchParams(requestParams);
  tempParams.append('function', 'getPlayerStatistics');
  tempParams.append('what', '0');
  tempParams.append('playerid', playerId);
  return axios({
    method: 'POST',
    url: 'https://esor.pzkosz.pl/api',
    data: tempParams
  });
}

async function getRequestRequiredSearchParams(strapi) {
  const searchParams = new URLSearchParams();
  try {
    const { settings } = await strapi.entityService.findMany('api::ustawienia-pz-kosz.ustawienia-pz-kosz');
    if (!settings) throw new Error('Pzkosz settings not found!');
    searchParams.append('key', process.env.PZKOSZ_API_KEY);
    searchParams.append('leagueId', settings.leagueId);
    searchParams.append('seasonid', settings.seasonId);
    searchParams.append('groupid', settings.groupId);
    searchParams.append('teamid', settings.teamId);
    return searchParams;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = async (strapi) => {
  const baseApiRequestParams = await getRequestRequiredSearchParams(strapi);
  if (!baseApiRequestParams) return;

  try {
    const players = await strapi.entityService.findMany('api::zawodnicy-2-lm.zawodnicy-2-lm');
    const playersResponse = await getPlayers(baseApiRequestParams);

    if (playersResponse.data && playersResponse.data.length) {
      playersResponse.data.forEach(async (r) => {
        const { data } = await getPlayerStatistics(r.id, baseApiRequestParams);
        const player = players.find((p) => {
          if (data[0]?.nazwisko.includes('-'))
            return p.Last_Name.toLowerCase().includes(data[0]?.nazwisko.split('-')[0].trim().toLowerCase());
          else return p.Last_Name.toLowerCase().includes(data[0]?.nazwisko.trim().toLowerCase());
        });

        if (player) {
          await strapi.entityService.update('api::zawodnicy-2-lm.zawodnicy-2-lm', player.id, {
            data: {
              Average_Points: data[0]?.Pkt,
              Average_Rebounds: data[0]?.Sum,
              Average_Asists: data[0]?.As,
              Average_Minutes: data[0]?.min / 60
            }
          });
        }
      });
    }
    console.log('Succesfully updated players statistics!');
  } catch (err) {
    console.error(err.message ? err.message : err);
  }
};
