var express = require('express');
var app = express();
const dataRouter = require('./routers/data');
var cors = require('cors')
const port = process.env.PORT || 3000;

app.use(cors())
app.use(dataRouter);
app.listen(port, () => {
    console.log('server is running')
})


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



