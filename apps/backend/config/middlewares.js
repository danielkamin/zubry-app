/* eslint-disable quotes */
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'zubry-general.s3.waw.io.cloud.ovh.net'],
          'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'zubry-general.s3.waw.io.cloud.ovh.net'],
          upgradeInsecureRequests: null
        }
      }
    }
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '100mb'
    }
  },
  'strapi::favicon',
  'strapi::public'
];
