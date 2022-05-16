// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    PRE_PROD: false,
    CMS_API_URL: 'https://portals-dev.mtn.co.za/api/cms',
    ECOMMERCE_API_URL: 'https://portals-dev.mtn.co.za/api/ecommerce',
    ENTERPRISE_API_URL: 'https://portals-dev.mtn.co.za/api/enterprise',
    GENERATE_PROD_TRANSACTION_ID: false,
    SOA_API_URL: 'https://portals-dev.mtn.co.za/api/soa',
    SOURCE_IDENTIFIER: 'EBU_SME',
    SOA_SOURCE_IDENTIFIER: 'EBU_ONLINE_PORTAL',
    WCC_HOST_URL: 'https://wcc-qa.mtn.co.za',
    SENTRY_PROJECT_KEY: 'ad',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
