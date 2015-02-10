var express = require('express');
var bodyParser = require('body-parser');
var Firebase = require('firebase');
var path = require('path');
var send = require('send');
var url = require('url');
var twilio = require('twilio')('AC96b58d165af343b481e6be97e045040c','3ca82bc305eab3e1e6af9691143d8527')
var app = express();
var firebaseUrl = 'http://jcd.firebaseio.com/twilio/numbers';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.post('/api/reply', function(req, res) {
//Send an SMS text message
twilio.sendMessage({

    to: req.body.to_number, // Any number Twilio can deliver to
    from: '+18019809870', // A number you bought from Twilio and can use for outbound communication
    body: req.body.text // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."
        var created = new Date();
        var ref = new Firebase(firebaseUrl + '/' + req.body.to_number);
        ref.push({
        	body: req.body.text,
        	from: 'Support',
        	date_sent: created,
        	status: 'sent',
        	direction: 'outbound',
        	to: req.body.to_number
        });

        //respond to post request
        console.log(req.body);
        res.status(200).json(req.body);

    } else {
    	console.log(err);
    }
});


});

app.get('/api/support/resources/:resource_name', function(req, res) {
	//console.log(req);
	var file = req.params.resource_name;
	var files = [
		'FakeTermsandConditions.pdf',
		'FakeCeaseandDesist.pdf',
		'helpful-infographic.jpg'
		];
	if (files.indexOf(file) !== -1) {
		console.log('get ' + file);
/*		res.attachment(file);
		res.status(200).send(req.url).pipe(res);*/
		res.attachment(file);
		res.status(200).sendFile(file, {root: path.join(__dirname + '/public/')});
	} else {
		console.log('Looking for the answer');
		res.status(200).sendFile(__dirname + '/public/404.html');
	}
});

app.listen(8080);