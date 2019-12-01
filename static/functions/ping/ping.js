require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function(_event, _context, _callback) {
  const UNAVAILABLE_RESPONSE = 'Not Found';
  // https://nodejs.org/api/errors.html#errors_common_system_errors
  const NODE_ENOTFOUND = 'ENOTFOUND';

  const URL = process.env.TARGET_SITE;

  const time = new Date().toUTCString();

  /**
   * @param {String} status . Status message
   * @param {String} code - Date in UTC
   */
  const httpResponse = (status, code) => ({
    statusCode: code,
    body: JSON.stringify({ status, time, URL })
  });

  const notFoundError = httpResponse('Unreachable', 404);

  try {
    const response = await fetch(URL, {
      method: 'OPTIONS'
    }).then(async r => await r.text());

    if (response === UNAVAILABLE_RESPONSE) {
      return notFoundError;
    }

    return httpResponse('Up!', 200);
  } catch (err) {
    console.log(err); // output to netlify function log

    if (err.code && err.code === NODE_ENOTFOUND) {
      return notFoundError;
    }

    return httpResponse('Down', 500);
  }
};
