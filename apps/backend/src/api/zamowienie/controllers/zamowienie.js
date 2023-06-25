'use strict';

/**
 *  zamowienie controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const path = require('path');

const createHeadTag = () => {
  return `<head>
    <style>
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      table {
        text-align:center;
      }
    </style>
  </head>`;
};
const createHtmlTag = (headTag, bodyTag) => {
  return `<html>
  ${headTag}
  ${bodyTag}
  </html>`;
};

const createBodyTag = (user, orderProducts, orderDetails) => {
  let orderProductsRows = '';
  orderProducts.forEach((product) => {
    orderProductsRows += `<tr><td>${product.Product}</td><td>${product.Size}</td><td>${product.Quantity}</td></tr>`;
  });
  return `<body>
    <main>
      <h3>Potwierdzenie zamówienia nr ${orderDetails.Order_Number}</h3>
      <div>
        <p><b>Dane do zamówienia:</b></p>
        <table>
        <tr>
          <th>Email</th>
          <th>Telefon</th>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Miasto</th>
          <th>Ulica</th>
          <th>Numer budynku</th>
          <th>Numer lokalu/mieszkania</th>
          <th>Kod pocztowy</th>
        </tr>
        <tr>
          <td>${user.email}</td>
          <td>${orderDetails.Phone_Number}</td>
          <td>${orderDetails.First_Name}</td>
          <td>${orderDetails.Last_Name}</td>
          <td>${orderDetails.City}</td>
          <td>${orderDetails.Street}</td>
          <td>${orderDetails.Building_Number}</td>
          <td>${orderDetails.Apartment_Number}</td>
          <td>${orderDetails.Zip_Code}</td>
        </tr>
        </table>
        <p>Opcjonalna notatka do zamówienia: ${orderDetails.Note}</p>
      </div>
      <br/>
      <div>
        <table>
          <tr>
            <th>Produkt</th>
            <th>Rozmiar</th>
            <th>Ilość</th>
          </tr>
          ${orderProductsRows}
        </table>
      </div>
      <p>Dokładne informacje na temat ceny zamówienia i terminów dostaw będą przekazywane drogą mailową</p>
    </main>
    <footer>
      <br/>
      <p><i>Strona PKK Żubry Białystok</i></p>
      <img src="cid:logo">
    </footer>
  </body>`;
};
const createEmailTemplate = (user, orderProducts, orderDetails) => {
  const headTag = createHeadTag();
  const bodyTag = createBodyTag(user, orderProducts, orderDetails);
  return createHtmlTag(headTag, bodyTag);
};

module.exports = createCoreController(
  'api::zamowienie.zamowienie',
  ({ strapi }) => ({
    async sendConfirmationEmail(ctx) {
      const orderData = ctx.request.body;
      const user = ctx.state.user;

      const emailTemplate = createEmailTemplate(
        user,
        orderData.data.Details,
        orderData.data
      );
      try {
        await strapi.plugins['email'].services.email.send({
          from: `Sklep Żubry Białystok <${process.env.EMAIL_ADMIN}>`,
          to: `Sklep Żubry Białystok <${process.env.EMAIL_ADMIN}>`,
          subject: `Potwierdzenie zamówienia nr ${orderData.data.Order_Number}`,
          replyTo: `${user.email}`,
          html: emailTemplate,
          attachments: [
            {
              filename: 'logo.png',
              path: path.join(__dirname, '../../../extensions/email/logo.png'),
              cid: 'logo',
            },
          ],
        });
        strapi.plugins['email'].services.email.send({
          from: `Sklep Żubry Białystok <${process.env.EMAIL_ADMIN}>`,
          to: `${user.First_Name} ${user.Last_Name} <${user.email}>`,
          subject: `Potwierdzenie zamówienia nr ${orderData.data.Order_Number}`,
          html: emailTemplate,
          attachments: [
            {
              filename: 'logo.png',
              path: path.join(__dirname, '../../../extensions/email/logo.png'),
              cid: 'logo',
            },
          ],
        });
        ctx.send({ data: 'ok' });
      } catch (err) {
        console.log(err);
      }
    },
  })
);
