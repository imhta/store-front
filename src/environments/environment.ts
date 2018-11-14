// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    apiKey: 'AIzaSyBTQfUTHpA5ys_XnEJQewr6FehlDZhDe9I',
    authDomain: 'clothx.net',
    databaseURL: 'https://clothxnet.firebaseio.com',
    projectId: 'clothxnet',
    storageBucket: 'clothxnet.appspot.com',
    messagingSenderId: '909059793100'
  },
  algolia: {
    appId: 'K5TY9WEM1N',
    apiKey: 'c34f0706878bc2a520600b07f9587757'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
