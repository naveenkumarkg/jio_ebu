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
app.use(express.static(path.join(__dirname, '/dist/business/ebu-prepaid')));

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
const certificate = './certs/www.flaolprvd04.mtn.co.za.crt';
const port = 8114;
https.createServer({ key: fs.readFileSync(privateKey), cert: fs.readFileSync(certificate)}, app)
  .listen(port, () => {
    console.log('ebu-prepaid server running on https://localhost:' + port);
  });
