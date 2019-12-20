// with thanks to https://github.com/Urigo/graphql-modules/blob/8cb2fd7d9938a856f83e4eee2081384533771904/website/lambda/contact.js
const sendMail = require('sendmail')();

const { homepage } = require('../package.json');

exports.handler = (_event, _context, callback) => {
  if (!process.env.CONTACT_EMAIL) {
    return callback(null, {
      statusCode: 500,
      body: 'process.env.CONTACT_EMAIL must be defined'
    });
  }

  const descriptor = {
    from: `"Robot" <no-reply@static-uptime-robot.netlify.com>`,
    to: process.env.CONTACT_EMAIL,
    subject: `Site ${process.env.TARGET_SITE} is down at the moment!`,
    html: `😱 Check out the status page on <a href="${homepage}">${homepage}</a>`
  };

  sendMail(descriptor, e => {
    if (e) {
      callback(null, {
        statusCode: 500,
        body: e.message
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: 'Mail sent 🎯'
      });
    }
  });
};
