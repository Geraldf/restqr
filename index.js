const { promisify } = require('util')

const cors = require('cors')
const PORT = process.env.PORT || 3000

// QRCode generation requirements
const QRCode = require('qrcode')
const genDataUrl = promisify(QRCode.toDataURL.bind(QRCode))

// Express requirements
const bodyParser = require('body-parser')
const express = require('express')

// Configure Express app
const app = express()
app.use(bodyParser.json())
app.use(cors())

/**
 * Receives a POST request with a body that contains a 'payload' attribute
 * and returns the base64 data-url.
 * @returns {{ src: String }}
 */
app.get('/girocode', async (req, res) => {
    iban = req.query.iban
    betrag=req.query.betrag
    verwendung = req.query.verwendung
    empfaenger = req.query.empfaenger
    payload = util.format('BCD\n001\n2\nSCT\n\n%s\n%s\nEUR%s\n\n\n%s\n\n',empfaenger,iban,betrag,verwendung)
    var data =  await genDataUrl(payload,{type:"image/png"})
    var im = data.split(",")[1];
    var img = new Buffer(im, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);

    // if (payload === '') {
    //     return res
    //         .status(422)
    //         .json({ err: 'Missing required parameter: "payload"' })
    // }

    // const dataUrl = await genDataUrl(payload)

    // return res.json({ src: dataUrl })
})

app.listen(
    PORT,
    () => {
        console.log('Server is running')
    }
)