const mailgun = require('mailgun-js');
const {
  env: { MAILGUN_DOMAIN, MAILGUN_API_KEY }
} = process;
const mg = mailgun({ apiKey: MAILGUN_API_KEY, MAILGUN_DOMAIN: MAILGUN_DOMAIN });

exports.handler = (_event, _context, callback) => {
  if (!process.env.CONTACT_EMAIL) {
    return callback(null, {
      statusCode: 500,
      body: 'process.env.CONTACT_EMAIL must be defined'
    });
  }

  const homepage = 'static-uptime-robot.netlify.com';

  const descriptor = {
    from: `"Robot" <no-reply@${MAILGUN_DOMAIN}>`,
    to: process.env.CONTACT_EMAIL,
    subject: `Site ${process.env.TARGET_SITE} is down at the moment!`,
    html: `😱 Check out the status page on <a href="${homepage}">${homepage}</a>`
  };

  mg.messages().send(descriptor, function(error, body) {
    if (error) {
      callback(null, {
        statusCode: 500,
        body: error.message
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: 'Mail sent 🎯 \n' + body
      });
    }
  });
};
