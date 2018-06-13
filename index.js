const { promisify } = require('util')

const cors = require('cors')
const util = require ('util')
const PORT = process.env.PORT || 3000

// QRCode generation requirements
const QRCode = require('qrcode')
const genDataUrl = promisify(QRCode.toDataURL.bind(QRCode))

var ip = require('ip');

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');


// Express requirements
const bodyParser = require('body-parser')
const express = require('express')
var router = express.Router()

// Configure Express app
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('public'));
app.set('view engine', 'pug');

// docu einbauen

//fix gemacht

router.route('/')
    .get(async(req,res,next) => {
        iban = req.query.iban;
        betrag=req.query.betrag;
        verwendung = req.query.verwendung;
        empfaenger = req.query.empfaenger;
        errtxt = util.format('bitte geben Sie folgende Parameter an: iban, betrag, verwendung, empfaenger\neine gültiger code wird mit: "http://%s:3000/api/v1?iban=DE91694500650001313600&betrag=22.45&empfaenger=Schwenninger&verwendung=Rechnung123"',ip.address());
        if(!iban || !betrag || !verwendung || !empfaenger) {

            res.status(422).render('index', { title: 'Hey', message: 'Hello there!' });
        }
        else {
            payload = util.format('BCD\n001\n2\nSCT\n\n%s\n%s\nEUR%s\n\n\n%s\n\n',empfaenger,iban,betrag,verwendung);
            var data =  await genDataUrl(payload,{type:"image/png"});
            var im = data.split(",")[1];
            var img = new Buffer(im, 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            res.end(img);
        }   
    }
);


app.listen(
    PORT,
    () => {
        console.log('Server is running')
    }
)