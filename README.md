# express-admob-ssv [![npm version](https://badge.fury.io/js/express-admob-ssv.png)](https://badge.fury.io/js/express-admob-ssv)

ExpressJS middleware to provide [verification Google AdMob Server-Side](https://developers.google.com/admob/android/rewarded-video-ssv) request for rewarded ads.
 
----

Usage Example:
```
const express = require('express');
const app = express();

const ssv = require('../../core/services/admob');

app.get('/admob/rewards/verify',
  ServersideVerification.middleware(),
  (req, res, next) => {
    // SSV Valid
    // here goes Your logic
  });

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`app listening at: ${PORT}`));
```
