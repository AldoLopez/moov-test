const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config()
const path = require('path');
const app = express();
const { Moov, SCOPES, ALL_SCOPES } = require('@moovio/node');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/token', async (req, res) => {
  console.log('token getting');
  console.log(process.env.MOOV_ACCOUNT);
  const moov = new Moov({
    accountID: process.env.MOOV_ACCOUNT,
    publicKey: process.env.MOOV_PUBLIC,
    secretKey: process.env.MOOV_SECRET,
    domain: "http://localhost"
  });

  console.log(process.env.PATIENT_ACCOUNT_ID);
  const accountId = process.env.PATIENT_ACCOUNT_ID;
  try {
    const { token } = await moov.generateToken(ALL_SCOPES, accountId);
    res.json({ token, accountId });
  } catch (err) {
    res.status(401);
  }
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('listening on 8080'));