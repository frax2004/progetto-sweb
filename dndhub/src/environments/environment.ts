// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const PORT = 10000;

// const POLAREZZA_IP_ADDRESS = '192.168.1.36';
 const POLAREZZA_IP_ADDRESS = 'localhost';
const IP_ADDRESS = POLAREZZA_IP_ADDRESS;

export const environment = {
  production: false,
  api_url: `http://${IP_ADDRESS}:${PORT}`,
  defaultRoute: "profile",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
