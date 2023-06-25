'use strict';

const {
  winston,
  formats: { prettyPrint, levelFilter }
} = require('@strapi/logger');
module.exports = {
  transports: [
    new winston.transports.File({
      filename: `./logs/${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.log`,
      level: 'error',
      format: winston.format.combine(levelFilter('error'), winston.format.timestamp(), winston.format.uncolorize())
    }),
    new winston.transports.Console({
      level: 'http',
      format: winston.format.combine(levelFilter('http'), prettyPrint({ timestamps: 'YYYY-MM-DD hh:mm:ss.SSS' }))
    })
  ]
};
