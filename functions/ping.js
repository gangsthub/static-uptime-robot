const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

exports.handler = async function(_event, _context, _callback) {
  const UNAVAILABLE_RESPONSE = 'Not Found';
  // https://nodejs.org/api/errors.html#errors_common_system_errors
  const NODE_ENOTFOUND = 'ENOTFOUND';

  const URL = process.env.TARGET_SITE;

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

    return httpResponse('All the way up!', 200);
  } catch (err) {
    console.log(err); // output to netlify function log

    if (err.code && err.code === NODE_ENOTFOUND) {
      return notFoundError;
    }

    return httpResponse('Down', 500);
  }
};
