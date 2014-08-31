var express = require('express');
var path = require('path');

var router = express.Router();
var app = express();

app.use('/example', express.static(path.join(__dirname, 'example')));
app.use('/docs', express.static(path.join(__dirname, 'docs'), { index: 'struck.html' }));

app.listen(process.env.PORT || 8080);