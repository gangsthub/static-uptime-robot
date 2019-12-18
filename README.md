# Static Uptime

Automatically check through a serverless function call whether a site (from environment variables `env.TARGET_SITE`) is
up and running.

## Configuration

Before creating the site, Netlify will ask you to fill required the following environment variable:

- `TARGET_SITE`: The (absolute) URL of the site or service you want to check.

## Deploy your own!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gangsthub/static-uptime-robot)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate
```

## Previous art

- Netlify StatusKit - https://github.com/netlify/netlify-statuskit
