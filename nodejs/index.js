const express = require('express')
const app = express()
const porthttp = 80
const porthttps = 443
var https = require('https')
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
var path = require('path')
var urlencodedParser = bodyParser.json();
const mongoose = require('mongoose')
var fs = require('fs')

var cert_keys = {
    key: fs.readFileSync('cert-priv.pem'),
    cert: fs.readFileSync('cert-pub.pem')
}

mongoose.connect('mongodb://localhost/tp2iot', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Base de données connectée'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());

app.use(function(req, res, next) {
    if(!req.secure) {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  });

app.get('/', (req, res) => {
    res.sendFile('public/main.html', {root: __dirname })
})

app.get('/api/capteur1', (req, res) => {
    db.collection('capteur1').find({}).toArray((err, result) => {
        if(err) throw err
        res.send(result)
    })
})

app.get('/api/capteur2', (req, res) => {
    db.collection('capteur2').find({}).toArray((err, result) => {
        if(err) throw err
        res.send(result)
    })
})

https.createServer(cert_keys, app).listen(porthttps, function() {
    console.log(`Le serveur roule en HTTPS sur: https://localhost:${porthttps}`)
})
app.listen(porthttp, () => {
    console.log(`Le serveur roule sur: http://localhost:${porthttp}`)
})

async function getData(url) {
    const response = await fetch(url);
  
    return response.json();
  }