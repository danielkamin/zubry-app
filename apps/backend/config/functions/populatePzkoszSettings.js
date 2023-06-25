const axios = require('axios');
const API_KEY = process.env.PZKOSZ_API_KEY;
const pzkoszApiInstance = axios.create({
  baseURL: 'https://esor.pzkosz.pl/api'
});
async function fetchCurrentSeason() {
  const params = new URLSearchParams();
  params.append('key', API_KEY);
  params.append('function', 'getCurrentSeason');

  try {
    return (await pzkoszApiInstance.post('', params)).data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function fetchCurrentLeague() {
  const params = new URLSearchParams();
  params.append('key', API_KEY);
  params.append('function', 'getAllLeagues');

  try {
    return (await pzkoszApiInstance.post('', params)).data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchCurrentRound(leagueId, seasonId) {
  const params = new URLSearchParams();
  params.append('key', API_KEY);
  params.append('function', 'getRounds');
  params.append('leagueid', leagueId);
  params.append('seasonid', seasonId);

  try {
    return (await pzkoszApiInstance.post('', params)).data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchTeams(leagueId, seasonId, groupId) {
  const params = new URLSearchParams();
  params.append('key', API_KEY);
  params.append('function', 'getTeams');
  params.append('leagueid', leagueId);
  params.append('seasonid', seasonId);
  params.append('groupid', groupId);

  try {
    return (await pzkoszApiInstance.post('', params)).data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = async (strapi) => {
  const seasonData = await fetchCurrentSeason();
  if (!seasonData || 'error' in seasonData) {
    console.log('Error fetching with getCurrentSeason request');
    return;
  }
  const seasonId = seasonData.id;

  const leagueData = await fetchCurrentLeague();
  if (!leagueData || 'error' in leagueData) {
    console.log('Error fetching with getAllLeagues request');
    return;
  }
  const leagueId = Object.keys(leagueData)[0];

  const roundData = await fetchCurrentRound(leagueId, seasonId);
  if (!roundData || 'error' in roundData) {
    console.log('Error fetching with getRounds request');
    return;
  }
  const gamesStage = [];
  roundData.forEach((round) => {
    const stage = round.groups.find((g) => g.nazwa === 'B');
    if (stage) gamesStage.push(stage);
  });

  const teamsData = await fetchTeams(leagueId, seasonId, gamesStage[0].id);
  let teamId;
  // eslint-disable-next-line no-unused-vars
  for (const [_, value] of Object.entries(teamsData)) {
    if (value.nazwa.toLowerCase().includes('żubry')) {
      teamId = value.id;
    }
  }

  if (!leagueId || !seasonId || !gamesStage[0].id || !teamId) {
    console.log('Some of following parameters are missing: leagueId, seasonId, groupId, teamId');
    return;
  }
  await strapi.entityService.update('api::ustawienia-pz-kosz.ustawienia-pz-kosz', 1, {
    data: {
      settings: JSON.stringify({
        leagueId: leagueId,
        seasonId: seasonId,
        teamId: teamId,
        stages: gamesStage
      })
    }
  });
  console.log('Succesfully updated pzkosz settings!');
};
