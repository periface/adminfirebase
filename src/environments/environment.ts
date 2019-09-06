// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDCJ5RBAA2uDV0_D6UQM0l8A6TfiVPMhgM',
    authDomain: 'boiling-torch-572.firebaseapp.com',
    databaseURL: 'https://boiling-torch-572.firebaseio.com',
    projectId: 'boiling-torch-572',
    storageBucket: 'boiling-torch-572.appspot.com',
    messagingSenderId: '324229473840',
    appId: '1:324229473840:web:d92bd2794e923d5a'
  },
  permissions: [
    {
      permissionName: 'users',
      displayName: 'Usuarios'
    },
    {
      permissionName: 'roles',
      displayName: 'Roles'
    },
    {
      permissionName: 'events',
      displayName: 'Eventos'
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
