const populatePlayerStatistics = require('./functions/populatePlayersStatistics');
const populatePzkoszSettings = require('./functions/populatePzkoszSettings');
module.exports = {
  '0 0 * * *': ({ strapi }) => {
    populatePlayerStatistics(strapi);
  },
  '0 0 * * 0': ({ strapi }) => {
    populatePzkoszSettings(strapi);
  }
};
