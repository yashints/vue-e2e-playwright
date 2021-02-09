# Testing authenitcated Vue apps with Playwright

This repository conatins code of an application written with [Vue 3](https://v3.vuejs.org/), which uses [Auth0](https://auth0.com) as its identity manager, [Playwright](https://playwright.dev/) to test the app and the login flow end to end, [Jest](https://jestjs.io/) and [Vue Test Utils](https://vue-test-utils.vuejs.org/) for component testing, and [Mirage.js](https://miragejs.com/) as a mock backend API.

## Install dependencies

After cloning the app run `yarn` to install the dependencies.

## Adding environment variables

You would need some information injected into the app. Create a `.env` file and add the following information from your Auth0 account and application:

```
VUE_APP_DOMAIN=your.auth0.domain
VUE_APP_CLIENTID=client id
VUE_APP_REDIRECT_URL=http://localhost:8080
VUE_APP_AUDIENCE=audience if you have defined any
VUE_APP_SCOPE=openid%20profile%20email%20crud:users
```

You could add your user name and passwords here and use it inside the tests.

> 💡 Make sure to add one user in the `server.js` file in the `src` directory.

## Running the application

Run `yarn serve` to run the application. The app is using Mirage.js as a mock backend API.

## Running component tests

Run `yarn test` to run the component tests. Those tests are written with Vue test utils and Jest.

## Running E2E tests

Run `yarn test:e2e` to run the end to end tests.

## Licence

This repository is open for use by public under [MIT license](./LICENSE).
