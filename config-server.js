const write = require('fs');

const environment = process.env.DEPLOY_ENV;
let CERT_NAME, SERVER_NAME;
let TARGET_PATH = './server.js';

switch (environment) {
  case 'prod1':
    CERT_NAME = 'www.nlaolprva05.mtn.co.za.crt';
    SERVER_NAME = 'nlaolprva05.mtn.co.za';
    break;
  case 'prod2':
    CERT_NAME = 'www.nlaolprva06.mtn.co.za.crt';
    SERVER_NAME = 'nlaolprva06.mtn.co.za';
    break;
  case 'preprod1':
  case 'traefik_preprod':
    CERT_NAME = 'www.flaolprvs06.mtn.co.za.crt';
    SERVER_NAME = 'flaolprvs06.mtn.co.za';
    break;
  case 'dev':
  case 'traefik_dev':
  case 'traefik_testing':
    CERT_NAME = 'www.flaolprvd04.mtn.co.za.crt';
    SERVER_NAME = 'flaolprvd04.mtn.co.za';
    break;
  case 'dr1':
    CERT_NAME = 'www.flaolprvb05.mtn.co.za.crt';
    SERVER_NAME = 'flaolprvb05.mtn.co.za';
    break;
  case 'dr2':
    CERT_NAME = 'www.flaolprvb06.mtn.co.za.crt';
    SERVER_NAME = 'flaolprvb06.mtn.co.za';
    break;
}

const ssrConfig = `
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const https = require('https');
const fs = require('fs');

app.enable('trust proxy');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

app.get('/*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

const privateKey = './certs/device.key';
const certificate = './certs/${CERT_NAME}';
const port = 8114;
https.createServer({ key: fs.readFileSync(privateKey), cert: fs.readFileSync(certificate)}, app)
  .listen(port, () => {
  console.log('Angular starter application running on https://localhost:' + port + '/business/ebu-prepaid');
});
`;

write.writeFile(TARGET_PATH, ssrConfig, err => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
});

