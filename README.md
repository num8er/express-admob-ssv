# express-admob-ssv [![npm version](https://badge.fury.io/js/express-admob-ssv.png)](https://badge.fury.io/js/express-admob-ssv)

ExpressJS middleware to provide [verification Google AdMob Server-Side](https://developers.google.com/admob/android/rewarded-video-ssv) request for rewarded ads.
 
----

Usage Examples:
```js
const express = require('express');
const app = express();

const AdMobSSV = require('express-admob-ssv');

app.get('/admob/rewards/verify',
  AdMobSSV.middleware(),
  (req, res, next) => {
    // SSV Valid
    // here goes Your logic
  });

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`app listening at: ${PORT}`));
```

using verify method in Your custom middleware:

```js
const {URL} = require('url');
const express = require('express');
const app = express();

const {methods: {verify: verifyAdMobSSV}} = require('express-admob-ssv');

app.get('/admob/rewards/verify',
  async (req, res, next) => {
    try {
      const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
      await verifyAdMobSSV(url, true); // true for throwing errors
    }
    catch(error) {
      // Do something
      // or log somethings
      return res.status(400).end(error.message);
    }
    next();
  },
  (req, res, next) => {
    // SSV Valid
    // here goes Your logic
  });

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`app listening at: ${PORT}`));
```
