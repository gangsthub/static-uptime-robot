const fs = require('fs');
const url = require('url');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const FILE_NAME = 'config.js';
const { ROBOT_DEPLOY_URL, TARGET_SITE } = process.env;

const fileTemplate = (status, time) => {
  return `
module.exports = {
  STATUS_TEXT: '${status}',
  TIME: '${time}',
  URL: '${TARGET_SITE}',
};
`;
};

/**
 * Will call the ping serverless function and return JSON formar
 */
const getPingJson = async () => {
  const endpoint = url.resolve(ROBOT_DEPLOY_URL, '/.netlify/functions/ping');
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
