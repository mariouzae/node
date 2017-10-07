const MongoClient = require('mongodb').MongoClient;
const multer = require('multer');
const Vision = require('@google-cloud/vision');
const dbUrl = "mongodb://localhost:27017/redeem";
var db;

var storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './app/uploads')
	},
	filename: (req, file, callback) => {
		callback(null, Date.now()+file.originalname)
	}
})

var upload = multer({storage: storage}).single('myFile')

MongoClient.connect(dbUrl, (err, database) => {
	if (err) console.log("FAILURE TO CONNECT ON DATABASE");
	db = database;		
});

module.exports = (app) => {
	app.get('/refund', (req, res) => {
		//simpleStartProcess()
		toXML()
		/*db.collection('refund').find().toArray((err, data) => {
			//res.status('200').json(data)
			//ocr()
			res.render('refund/refund', {obj:data})

		})*/
		res.send("ok")
	});

	app.post('/refund', (req, res) => {
		//var payload = req.body

		upload(req, res, (err) => {
			if (err) {
				console.log('failure to upload file')
				res.status(500).end('failure to upload file')
			}
			res.end('file uploaded as success')
		})

		/*db.collection('refund').save(payload, (err, result) => {
			if (err) console.log("error to save refund on database")
		})
		res.send("ok")*/
	})
}

function toXML() {
	var http = require('http');
	var body = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/>' xmlns:ws='http://ws.workflow.ecm.technology.totvs.com/'><soapenv:Header/><soapenv:Body><ws:simpleStartProcess'><username>adm</username><password>adm</password><companyId>3</companyId><processId>FLUIGADHOC</processId><comments>teste</comments><attachments/><cardData><item><item>meeting</item><item name='meeting'>Mario</item></item><item><item>detail</item><item name='detail'>Test</item></item></cardData></ws:simpleStartProcess></soapenv:Body></soapenv:Envelope>";

	var postRequest = {
    host: "poc.fluig.com",
    path: "/webdesk/ECMWorkflowEngineService?wsdl",
    port: 8092,
    method: "POST",
    headers: {
        'Cookie': "cookie",
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(body)
    	}
	};
	var buffer = "";

	var req = http.request( postRequest, function( res )    {

   console.log( res.statusCode );
   var buffer = "";
   res.on( "data", function( data ) { buffer = buffer + data; } );
   res.on( "end", function( data ) { console.log( buffer ); } );

});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write( body );
req.end();
}

function ocr() {
	// Instantiates a client
	const vision = Vision();

	// The name of the image file to annotate
	const fileName = 'cupomfiscal.jpg';

	// Prepare the request object
	const request = {
	  source: {
	    filename: fileName
	  }
	};

	// Performs label detection on the image file
	vision.textDetection({ source: { filename: fileName } })
	  .then((results) => {
	    const detections = results[0].textAnnotations;
	    console.log('Text:');
	    //detections.forEach((text) => console.log(text));
	    console.log(detections[0].description)
	  })
	  .catch((err) => {
	    console.error('ERROR:', err);
	  });

}

function simpleStartProcess() {
	var data = { _xml: "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/ xmlns:ws='http://ws.workflow.ecm.technology.totvs.com/'><soapenv:Header/><soapenv:Body><ws:simpleStartProcess'><username>adm</username><password>adm</password><companyId>3</companyId><processId>FLUIGADHOC</processId><comments>teste</comments><attachments/><cardData><item><item>meeting</item><item name='meeting'>Mario</item></item><item><item>detail</item><item name='detail'>Test</item></item></cardData></ws:simpleStartProcess></soapenv:Body></soapenv:Envelope>"}
  	var soap = require('soap');
  	var url = 'http://poc.fluig.com:8092/webdesk/ECMWorkflowEngineService?wsdl';
  	soap.createClient(url, function(err, client) {
      client.simpleStartProcess(data, function(err, result) {
          console.log(result);
      });
  });
}