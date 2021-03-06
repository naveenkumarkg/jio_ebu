const write = require('fs');
require('dotenv').config();
const environment = process.env.DEPLOY_ENV;
let CMS_SERVER_API_URL, SENTRY_DSN, HOME_PAGE_URL, MAPS_KEY, CAPTCHA_KEY,
  GENERATE_PROD_TRANSACTION_ID, SENTRY_PROJECT_KEY, IS_PROD, CLIENT_ID,
  DOMAIN_NAME, SOA_SERVER_API_URL,WCC_SERVER_HOST_URL, ENTERPRISE_SERVER_API_URL,
  ECOMMERCE_SERVER_API_URL, MY_CONTRACT_LOGIN, LOG_OUT_REDIRECT , PRE_PROD;

switch (environment) {
  case 'preprod1':
    ECOMMERCE_SERVER_API_URL = process.env.ECOMMERCE_SERVER_API_URL_PRE_PROD;
    SOA_SERVER_API_URL = process.env.SOA_SERVER_API_URL_PRE_PROD;
    CMS_SERVER_API_URL = process.env.CMS_SERVER_API_URL_PRE_PROD;
    WCC_SERVER_HOST_URL=process.env.WCC_SERVER_HOST_URL_PRE_PROD; 
    ENTERPRISE_SERVER_API_URL = process.env.ENTERPRISE_SERVER_API_URL_PRE_PROD;
    SENTRY_DSN = process.env.SENTRY_DSN_PRE_PROD;
    HOME_PAGE_URL = process.env.HOME_PAGE_URL_PRE_PROD;
    MAPS_KEY = process.env.MAPS_KEY;
    CAPTCHA_KEY = process.env.CATCHA_KEY_PRE_PROD;
    GENERATE_PROD_TRANSACTION_ID = false;
    SENTRY_PROJECT_KEY = process.env.SENTRY_PROJECTKEY_PRE_PROD;
    LOG_OUT_REDIRECT = process.env.LOG_OUT_REDIRECT_URL_PRE_PROD;
    IS_PROD = false;
    PRE_PROD = true;
    break;
  case 'preprod2':
    ECOMMERCE_SERVER_API_URL = process.env.ECOMMERCE_SERVER_API_URL_PRE_PROD_TWO;
    SOA_SERVER_API_URL = process.env.SOA_SERVER_API_URL_PRE_PROD_TWO;
    CMS_SERVER_API_URL = process.env.CMS_SERVER_API_URL_PRE_PROD_TWO;
    WCC_SERVER_HOST_URL=process.env.WCC_SERVER_HOST_URL_PRE_PROD_TWO; 
    ENTERPRISE_SERVER_API_URL = process.env.ENTERPRISE_SERVER_API_URL_PRE_PROD_TWO;
    SENTRY_DSN = process.env.SENTRY_DSN_PRE_PROD_TWO;
    HOME_PAGE_URL = process.env.HOME_PAGE_URL_PRE_PROD_TWO;
    MAPS_KEY = process.env.MAPS_KEY;
    CAPTCHA_KEY = process.env.CATCHA_KEY_PRE_PROD_TWO;
    GENERATE_PROD_TRANSACTION_ID = false;
    SENTRY_PROJECT_KEY = process.env.SENTRY_PROJECTKEY_PRE_PROD_TWO;
    LOG_OUT_REDIRECT = process.env.LOG_OUT_REDIRECT_URL_PRE_PROD_TWO;
    IS_PROD = false;
    PRE_PROD = true;
    break;
  case 'dev':
    ECOMMERCE_SERVER_API_URL = process.env.ECOMMERCE_SERVER_API_URL_DEV;
    SOA_SERVER_API_URL = process.env.SOA_SERVER_API_URL_DEV;
    CMS_SERVER_API_URL = process.env.CMS_SERVER_API_URL_DEV;
    WCC_SERVER_HOST_URL=process.env.WCC_SERVER_HOST_URL_DEV; 
    ENTERPRISE_SERVER_API_URL = process.env.ENTERPRISE_SERVER_API_URL_DEV;
    SENTRY_DSN = process.env.SENTRY_DSN_DEV;
    HOME_PAGE_URL = process.env.HOME_PAGE_URL_DEV;
    MAPS_KEY = process.env.MAPS_KEY;
    CAPTCHA_KEY = process.env.CATCHA_KEY_PRE_DEV;
    GENERATE_PROD_TRANSACTION_ID = false;
    SENTRY_PROJECT_KEY = process.env.SENTRY_PROJECTKEY_DEV;
    LOG_OUT_REDIRECT = process.env.LOG_OUT_REDIRECT_URL_DEV;
    IS_PROD = false;
    PRE_PROD = false;
    break;
  case 'traefik_dev':
    ECOMMERCE_SERVER_API_URL = process.env.ECOMMERCE_SERVER_API_URL_TRAEFIK_DEV;
    SOA_SERVER_API_URL = process.env.SOA_SERVER_API_URL_TRAEFIK_DEV;
    CMS_SERVER_API_URL = process.env.CMS_SERVER_API_URL_TRAEFIK_DEV;
    WCC_SERVER_HOST_URL=process.env.WCC_SERVER_HOST_URL_TRAEFIK_DEV; 
    ENTERPRISE_SERVER_API_URL = process.env.ENTERPRISE_SERVER_API_URL_TRAEFIK_DEV;
    SENTRY_DSN = process.env.SENTRY_DSN_TRAEFIK_DEV;
    HOME_PAGE_URL = process.env.HOME_PAGE_URL_TRAEFIK_DEV;
    MAPS_KEY = process.env.MAPS_KEY;
    CAPTCHA_KEY = process.env.CATCHA_KEY_PRE_TRAEFIK_DEV;
    GENERATE_PROD_TRANSACTION_ID = false;
    SENTRY_PROJECT_KEY = process.env.SENTRY_PROJECTKEY_TRAEFIK_DEV;
    LOG_OUT_REDIRECT = process.env.LOG_OUT_REDIRECT_URL_TRAEFIK_DEV;
    IS_PROD = false;
    PRE_PROD = false;
    break;
  case 'traefik_testing':
    ECOMMERCE_SERVER_API_URL = process.env.ECOMMERCE_SERVER_API_URL_TRAEFIK_TESTING;
    SOA_SERVER_API_URL = process.env.SOA_SERVER_API_URL_TRAEFIK_TESTING;
    CMS_SERVER_API_URL = process.env.CMS_SERVER_API_URL_TRAEFIK_TESTING;
    WCC_SERVER_HOST_URL=process.env.WCC_SERVER_HOST_URL_TRAEFIK_TESTING; 
    ENTERPRISE_SERVER_API_URL = process.env.ENTERPRISE_SERVER_API_URL_TRAEFIK_TESTING;
    SENTRY_DSN = process.env.SENTRY_DSN_TRAEFIK_TESTING;
    HOME_PAGE_URL = process.env.HOME_PAGE_URL_TRAEFIK_TESTING;
    MAPS_KEY = process.env.MAPS_KEY;
    CAPTCHA_KEY = process.env.CATCHA_KEY_PRE_TRAEFIK_TESTING;
    GENERATE_PROD_TRANSACTION_ID = false;
    SENTRY_PROJECT_KEY = process.env.SENTRY_PROJECTKEY_TRAEFIK_TESTING;
    LOG_OUT_REDIRECT = process.env.LOG_OUT_REDIRECT_URL_TRAEFIK_TESTING;
    IS_PROD = false;
    PRE_PROD = false;
    break;
  case 'traefik_preprod':
    ECOMMERCE_SERVER_API_URL = process.env.ECOMMERCE_SERVER_API_URL_TRAEFIK_PRE_PROD;
    SOA_SERVER_API_URL = process.env.SOA_SERVER_API_URL_TRAEFIK_PRE_PROD;
    CMS_SERVER_API_URL = process.env.CMS_SERVER_API_URL_TRAEFIK_PRE_PROD;
    WCC_SERVER_HOST_URL=process.env.WCC_SERVER_HOST_URL_TRAEFIK_PRE_PROD; 
    ENTERPRISE_SERVER_API_URL = process.env.ENTERPRISE_SERVER_API_URL_TRAEFIK_PRE_PROD;
    SENTRY_DSN = process.env.SENTRY_DSN_TRAEFIK_PRE_PROD;
    HOME_PAGE_URL = process.env.HOME_PAGE_URL_TRAEFIK_PRE_PROD;
    MAPS_KEY = process.env.MAPS_KEY;
    CAPTCHA_KEY = process.env.CATCHA_KEY_PRE_TRAEFIK_PRE_PROD;
    GENERATE_PROD_TRANSACTION_ID = false;
    SENTRY_PROJECT_KEY = process.env.SENTRY_PROJECTKEY_TRAEFIK_PRE_PROD;
    LOG_OUT_REDIRECT = process.env.LOG_OUT_REDIRECT_URL_TRAEFIK_PRE_PROD;
    IS_PROD = false;
    PRE_PROD = true;
    break;
  case 'dr1':
    ECOMMERCE_SERVER_API_URL = process.env.ECOMMERCE_SERVER_API_URL_DR_ONE;
    SOA_SERVER_API_URL = process.env.SOA_SERVER_API_URL_DR_ONE;
    CMS_SERVER_API_URL = process.env.CMS_SERVER_API_URL_DR_ONE;
    WCC_SERVER_HOST_URL=process.env.WCC_SERVER_HOST_URL_DR_ONE; 
    ENTERPRISE_SERVER_API_URL = process.env.ENTERPRISE_SERVER_API_URL_DR_ONE;
    SENTRY_DSN = process.env.SENTRY_DSN_DR_ONE;
    HOME_PAGE_URL = process.env.HOME_PAGE_URL_DR_ONE;
    MAPS_KEY = process.env.MAPS_KEY;
    CAPTCHA_KEY = process.env.CATCHA_KEY_DR_ONE;
    GENERATE_PROD_TRANSACTION_ID = true;
    SENTRY_PROJECT_KEY = process.env.SENTRY_PROJECTKEY_DR_ONE;
    LOG_OUT_REDIRECT = process.env.LOG_OUT_REDIRECT_URL_DR_ONE;
    IS_PROD = true;
    PRE_PROD = true;
    break;
  case 'dr2':
    ECOMMERCE_SERVER_API_URL = process.env.ECOMMERCE_SERVER_API_URL_DR_TWO;
    SOA_SERVER_API_URL = process.env.SOA_SERVER_API_URL_DR_TWO;
    CMS_SERVER_API_URL = process.env.CMS_SERVER_API_URL_DR_TWO;
    WCC_SERVER_HOST_URL=process.env.WCC_SERVER_HOST_URL_DR_TWO; 
    ENTERPRISE_SERVER_API_URL = process.env.ENTERPRISE_SERVER_API_URL_DR_TWO;
    SENTRY_DSN = process.env.SENTRY_DSN_DR_TWO;
    HOME_PAGE_URL = process.env.HOME_PAGE_URL_DR_TWO;
    MAPS_KEY = process.env.MAPS_KEY;
    CAPTCHA_KEY = process.env.CATCHA_KEY_DR_TWO;
    GENERATE_PROD_TRANSACTION_ID = true;
    SENTRY_PROJECT_KEY = process.env.SENTRY_PROJECTKEY_DR_TWO;
    LOG_OUT_REDIRECT = process.env.LOG_OUT_REDIRECT_URL_DR_TWO;
    IS_PROD = true;
    PRE_PROD = true;
    break;
  case 'prod1':
    ECOMMERCE_SERVER_API_URL = process.env.ECOMMERCE_SERVER_API_URL_PROD_ONE;
    SOA_SERVER_API_URL = process.env.SOA_SERVER_API_URL_PROD_ONE;
    CMS_SERVER_API_URL = process.env.CMS_SERVER_API_URL_PROD_ONE;
    WCC_SERVER_HOST_URL=process.env.WCC_SERVER_HOST_URL_PROD_ONE; 
    ENTERPRISE_SERVER_API_URL = process.env.ENTERPRISE_SERVER_API_URL_PROD_ONE;
    SENTRY_DSN = process.env.SENTRY_DSN_PROD_ONE;
    HOME_PAGE_URL = process.env.HOME_PAGE_URL_PROD_ONE;
    MAPS_KEY = process.env.MAPS_KEY;
    CAPTCHA_KEY = process.env.CATCHA_KEY_PROD_ONE;
    GENERATE_PROD_TRANSACTION_ID = true;
    SENTRY_PROJECT_KEY = process.env.SENTRY_PROJECTKEY_PROD_ONE;
    LOG_OUT_REDIRECT = process.env.LOG_OUT_REDIRECT_URL_PROD_ONE;
    IS_PROD = true;
    PRE_PROD = true;
    break;
  case 'prod2':
    ECOMMERCE_SERVER_API_URL = process.env.ECOMMERCE_SERVER_API_URL_PROD_TWO;
    SOA_SERVER_API_URL = process.env.SOA_SERVER_API_URL_PROD_TWO;
    CMS_SERVER_API_URL = process.env.CMS_SERVER_API_URL_PROD_TWO;
    WCC_SERVER_HOST_URL=process.env.WCC_SERVER_HOST_URL_PROD_TWO; 
    ENTERPRISE_SERVER_API_URL = process.env.ENTERPRISE_SERVER_API_URL_PROD_TWO;
    SENTRY_DSN = process.env.SENTRY_DSN_PROD_TWO;
    HOME_PAGE_URL = process.env.HOME_PAGE_URL_PROD_TWO;
    MAPS_KEY = process.env.MAPS_KEY;
    CAPTCHA_KEY = process.env.CATCHA_KEY_PROD_TWO;
    GENERATE_PROD_TRANSACTION_ID = true;
    SENTRY_PROJECT_KEY = process.env.SENTRY_PROJECTKEY_PROD_TWO;
    LOG_OUT_REDIRECT = process.env.LOG_OUT_REDIRECT_URL_PROD_TWO;
    IS_PROD = true;
    PRE_PROD = true;
    break;
}

const targetPath = `./src/environments/environment.prod.ts`;
const envConfigFile = `export const environment = {
   production: true,
   SOA_API_URL: '${SOA_SERVER_API_URL}',
   CMS_API_URL: '${CMS_SERVER_API_URL}',
   ECOMMERCE_API_URL: '${ECOMMERCE_SERVER_API_URL}',
   ENTERPRISE_API_URL: '${ENTERPRISE_SERVER_API_URL}',
   DEPLOY_ENV: 'other',
   GENERATE_PROD_TRANSACTION_ID: ${GENERATE_PROD_TRANSACTION_ID},
   SENTRY_PROJECT_KEY: '${SENTRY_PROJECT_KEY}',
   IS_PROD: '${IS_PROD}',
   SOURCE_IDENTIFIER: 'EBU_SME',
   SOA_SOURCE_IDENTIFIER: 'EBU_ONLINE_PORTAL',
   WCC_HOST_URL: '${WCC_SERVER_HOST_URL}',
   PRE_PROD: ${PRE_PROD},
};
`;
write.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
});
