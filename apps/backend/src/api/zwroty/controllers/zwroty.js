'use strict';

/**
 *  zwroty controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const path = require('path');

module.exports = createCoreController('api::zwroty.zwroty', ({ strapi }) => ({
  async createWithMail(ctx) {
    const orderData = ctx.request.body;
    const user = ctx.state.user;
    await super.create(ctx);
    const clientMessage = `
    <body>
    <div style='display:flex;flex-direction:column;'>
      <p>Potwierdzenie dokonania zwrotu na zamówienie nr ${orderData.super.Order_Number}</p>
      <p>Prosimy oczekiwać dalszych informacji drogą e-mailową.</p>
    </div>
    <footer>
      <br/>
      <p><i>Strona PKK Żubry Białystok</i></p>
      <img src="cid:logo">
    </footer>
    </body>`;
    const adminMessage = `
    <div style='display:flex;flex-direction:column;'>
    <p>Potwierdzenie dokonania zwrotu na zamówienie nr ${orderData.super.Order_Number}</p>
    </div>`;
    strapi.plugins['email'].services.email.send({
      to: process.env.EMAIL_ADMIN,
      subject: 'Nowy zwrot',
      html: adminMessage,
    });
    strapi.plugins['email'].services.email.send({
      to: user.email,
      subject: 'Nowy zwrot',
      html: clientMessage,
      attachments: [
        {
          filename: 'logo.png',
          path: path.join(__dirname, '../../../extensions/email/logo.png'),
          cid: 'logo',
        },
      ],
    });
    ctx.send({ data: 'ok' });
  },
}));
