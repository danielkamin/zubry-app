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
    const pzkoszConfig = await strapi.entityService.findMany('api::ustawienia-pz-kosz.ustawienia-pz-kosz');
    searchParams.append('key', process.env.PZKOSZ_API_KEY);
    searchParams.append('leagueId', pzkoszConfig.League_Id);
    searchParams.append('seasonid', pzkoszConfig.Season_Id);
    searchParams.append('groupid', pzkoszConfig.Group_Id);
    searchParams.append('teamid', pzkoszConfig.Team_Id);
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
      playersResponse.data.forEach(async (p) => {
        const { data } = await getPlayerStatistics(p.id, baseApiRequestParams);

        const player = players.find((player) => {
          if (data[0]?.nazwisko.includes('-'))
            return player.Last_Name.toLowerCase().includes(data[0]?.nazwisko.split('-')[0].toLowerCase());
          else return player.Last_Name.toLowerCase().includes(data[0]?.nazwisko.toLowerCase());
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
