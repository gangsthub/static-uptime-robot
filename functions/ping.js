const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const { TARGET_SITE, MAILGUN_DOMAIN, MAILGUN_API_KEY } = process.env;

const sideEffectSendAlert = () => {
  const endpoint =
    process.env.ROBOT_DEPLOY_URL + '/.netlify/functions/send-alert';
  fetch(endpoint);
};

exports.handler = async function(_event, _context, _callback) {
  const UNAVAILABLE_RESPONSE = 'Not Found';
  // https://nodejs.org/api/errors.html#errors_common_system_errors
  const NODE_ENOTFOUND = 'ENOTFOUND';

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json; charset=utf-8'
  };

  const time = new Date().toUTCString();

  /**
   * @param {String} status . Status message
   * @param {String} code - Date in UTC
   */
  const httpResponse = (status, code) => ({
    statusCode: code,
    headers,
    body: JSON.stringify({ status, time, URL: TARGET_SITE })
  });

  const notFoundError = httpResponse('Unreachable', 404);

  try {
    const response = await fetch(TARGET_SITE, {
      method: 'OPTIONS'
    }).then(async r => await r.text());

    if (response === UNAVAILABLE_RESPONSE) {
      return notFoundError;
    }

    return httpResponse('All the way up!', 200);
  } catch (err) {
    console.log(err); // output to netlify function log

    if (err.code && err.code === NODE_ENOTFOUND) {
      return notFoundError;
    }

    if (MAILGUN_DOMAIN && MAILGUN_API_KEY) {
      sideEffectSendAlert();
    }

    return httpResponse('Down', 500);
  }
};
