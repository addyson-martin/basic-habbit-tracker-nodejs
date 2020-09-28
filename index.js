const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const db = require('./config/db_connection')
const port = process.env.PORT
const pathToViews = path.join(__dirname, 'views')

//config
app.use(express.json());
app.use(cors())
app.set('view engine', 'ejs')
app.set('views', pathToViews)

// init site routes routes

app.use('/api', require('./api/routes'))

app.use(require('./site-routes'))

app.listen(port, function(err) {
    if (err) {
        console.log(`error in listening: ${err}`);
    }
    console.log('click here', `http://localhost:${port}`);
});