'use strict';

/**
 *  wiadomosc-kontaktowa controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wiadomosc-kontaktowa.wiadomosc-kontaktowa', ({ strapi }) => ({
  async send(ctx) {
    const { data } = ctx.request.body;
    if (!data.Name || !data.Message || !data.Email) return ctx.send('Brak wszystkich informacji!');

    const message = `<div>
    <h5>Wiadomość kontaktowa.</h5>
    <p>Imię i nazwisko osoby kontaktowej: ${data.Name}</p>
    <p>Email kontaktowy: ${data.Email}</p>
    <p>Treść: ${data.Message}</p>
    </div>`;
    try {
      await strapi.plugins['email'].services.email.send({
        from: `Strona Żubry Białystok <${process.env.EMAIL_ADMIN}>`,
        to: `Strona Żubry Białystok <${process.env.EMAIL_ADMIN}>`,
        subject: 'Nowa wiadomość kontaktowa',
        html: message
      });
      strapi.query('api::wiadomosc-kontaktowa.wiadomosc-kontaktowa').create({
        data: {
          Name: data.Name,
          Message: data.Message,
          Email: data.Email
        }
      });
      ctx.send('Wiadomość wysłana!');
    } catch (err) {
      console.log(err);
      ctx.send('Wystąpił błąd przy wysyłaniu wiadomosci');
    }
  }
}));
