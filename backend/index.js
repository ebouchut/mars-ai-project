
//~~~~~~~~~~~~~~~~~~~~~
//  Express Test App
//~~~~~~~~~~~~~~~~~~~~~

import express from 'express';

const APP = express();

// REST Endpoints and Routing

// GET / (Home Page)
APP.get('/', (req, res) => {
    res.send('Hello Express World')
});

// GET / TODO
APP.get();


APP.listen(3000, () => {
    console.log('Express Server running on port 3000')
});


