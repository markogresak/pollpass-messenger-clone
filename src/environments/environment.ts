// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBase: 'https://api-testing.pollpass.com',
  wsBase: 'wss://neo-testing.pollpass.com',
  auth: {
    client_id:
      '1PlWXn3VKdpMu0M14OYhQTCeSM2y3Aq8awDseo42QlINHBtpM6e8wHf8fabkRGJA',
    client_secret:
      'Cjt3yecyT5XyMC9onGHeRhkgF7f1pGMzXyqMenKUZZXgpRZFseo36NliFgZBA2bX',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
