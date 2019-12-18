# Static Uptime

Automatically check through a serverless function call whether a site (from environment variables `env.TARGET_SITE`) is
up and running.

## Deploy your own!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gangsthub/static-uptime-robot)

You'll need to add this environment variable in your Netlify admin site after initially forking it (`Settings > Environments > Environment variables`):

- `TARGET_SITE`: The (absolute) URL of the site or service you want to check.

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
