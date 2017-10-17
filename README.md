##  courier_tracking_auspost

Gets tracking information for a Australia Post connote and return normalized json response.

#### Usage

```javascript
const auspost_tracker = require('courier_tracking_auspost');

auspost_tracker("API_KEY", "CONNOTE", (err, r) => {
  if (err) {
    console.log(err);
  } else {
    console.log(r);
  }
});

```

A valid result will return a response like

```javascript
{
    connote: 'R7G0000000',
    statusCode: 200,
    courier: 'Australia Post',
    status: 'Delivered',
    pickedUp: true,
    pickedupAt: {
        date: 'Sep 18, 2017',
        time: '9:09am'
    },
    delivered: true,
    deliveredAt: {
        date: 'Sep 25, 2017',
        time: '9:22am'
    },
    signature: null,
    trackingLink: 'https://auspost.com.au/parcels-mail/track.html#/track?id=R7G0000000',
    activity: [{
            date: 'Sep 25, 2017',
            time: '9:22am',
            action: 'Delivered',
            location: 'Ballina, NSW'
        },
        {
            date: 'Sep 25, 2017',
            time: '6:48am',
            action: 'With Australia Post for delivery today',
            location: 'Ballina, NSW'
        },
        {
            date: 'Sep 25, 2017',
            time: '6:48am',
            action: 'Processed through Australia Post facility',
            location: 'Ballina, NSW'
        },
        {
            date: 'Sep 22, 2017',
            time: '11:58am',
            action: 'Processed through Australia Post facility',
            location: 'Chullora, NSW'
        },
        {
            date: 'Sep 18, 2017',
            time: '12:46pm',
            action: 'Shipping information approved by Australia Post',
            location: null
        },
        {
            date: 'Sep 18, 2017',
            time: '9:09am',
            action: 'Shipping information received by Australia Post',
            location: null
        }
    ]
}
```

An error result will look like:

```javascript
{
  connote: "BLAHBLAH",
  statusCode: 500,
  message: { error: "Invalid Australia Post connote" }
}
```

#### Command Line testing

There is a command line script `livetest.js` that can be run to get responses in the terminal.

Usage for this is: `node livetest.js apikey connote`


#### Installation

```
npm install courier_tracking_auspost

or

yarn add courier_tracking_auspost
```

#### Licence

MIT
