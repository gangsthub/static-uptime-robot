const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const pkg = require('../package');

dotenv.config();

const FILE_NAME = 'config.js';

const fileTemplate = (status, time) => {
  return `
module.exports = {
  STATUS_TEXT: '${status}',
  TIME: '${time}',
  URL: '${process.env.TARGET_SITE}',
};
`;
};

/**
 * Will call the ping serverless function and return JSON formar
 */
const getPingJson = async () => {
  const endpoint = pkg.homepage + '/.netlify/functions/ping';
  return await (await fetch(endpoint)).json();
};

/**
 * Handles the file creation/modification in the file system
 * @param {String} fileContent - expects the content of the file to be written
 */
const impureWriteConfigFile = fileContent => {
  fs.writeFileSync(FILE_NAME, fileContent, err => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
  console.log('Written Config File From Ping Function ✅');
};

(async () => {
  const { status, time } = await getPingJson();
  const fileContent = fileTemplate(status, time);
  impureWriteConfigFile(fileContent);
})();
