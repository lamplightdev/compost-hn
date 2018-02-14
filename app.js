const express = require('express');
const fetch = require('node-fetch');
const es6Renderer = require('express-es6-template-engine');
const app = express();

const url = 'https://node-hnapi.herokuapp.com/news?page=1';
const cacheAgeLimit = 1 * 60 * 1000;
const cache = {
  time: 0,
  items: [],
};

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');
app.use(express.static('public'));

app.get('*', (req, res) => {
  const now = Date.now();
  let promise;

  if (now - cache.time > cacheAgeLimit) {
    promise = fetch(url)
      .then(response => response.json())
      .then((items) => {
        cache.time = now;
        cache.items = items;

        return items;
      }).catch((err) => {
        cache.time = 0;

        return [];
      });
  } else {
    promise = Promise.resolve(cache.items);
  }

  promise.then((items) => {
    res.render('index', {
      locals: {
        items: JSON.stringify(items),
        time: cache.time,
      },
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
