const functions = require('firebase-functions');
const fetch = require('node-fetch');

exports.preload = functions.https.onRequest((req, res) => {
  const url = 'https://node-hnapi.herokuapp.com/news?page=1';

  fetch(url)
    .then(response => response.json())
    .then((items) => {
      res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
      res.status(200).send(`[[html]]`);
    });
});
