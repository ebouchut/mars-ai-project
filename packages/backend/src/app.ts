
//~~~~~~~~~~~~~~~~~~~~~
//  Express Test App
//~~~~~~~~~~~~~~~~~~~~~

import express, {type Express} from 'express';

/*** The backend Express App **/
const app: Express = express();

// REST Endpoints and Routing

// GET / (Home Page)
app.get('/', (req, res) => {
    res.send('Hello Express World')
});


export default app;

