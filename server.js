var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'example')));
app.use('/docs', express.static(path.join(__dirname, 'docs'), { index: 'struck.html' }));

app.listen(process.env.PORT || 8080);