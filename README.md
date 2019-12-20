# Static Uptime

Automatically check through a serverless function call whether a site (from environment variables `env.TARGET_SITE`) is
up and running.

## Deploy your own!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gangsthub/static-uptime-robot)

You'll need to add this environment variable in your Netlify admin site after initially forking it (`Settings > Environments > Environment variables`):

- `TARGET_SITE`: The (absolute) URL of the site or service you want to check.
- `ROBOT_DEPLOY_URL`: That's the homepage of your site (deployed on Netlify) and it's the base URL for the lambda functions.

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

## TODO

- [x] Send mail on downtime
- [ ] Collect monthly statistics and display actual uptime.
- [ ] Customize robot (color, expression) if it's down.
