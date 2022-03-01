var mqtt = require('mqtt');
var Topic1 = 'capteur1';
var Topic2 = 'capteur2';
var Broker_URL = 'mqtt://192.168.10.10';

var capteur1;
var capteur2;

var options = {
	clientId: 'MyMQTT',
	port: 1883,
	keepalive : 60
};

var client  = mqtt.connect(Broker_URL, options);
client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);



function mqtt_connect()
{
    console.log("Connecting MQTT");
    client.subscribe(Topic1);
	client.subscribe(Topic2, mqtt_subscribe);
}

function mqtt_subscribe(err, granted)
{
    console.log("Subscribed to " + Topic1 + " & " + Topic2);
    if (err) {console.log(err);}
}

function mqtt_reconnect(err)
{
    console.log("Reconnect MQTT");
    if (err) {console.log(err);}
	client  = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err)
{
    console.log("Error!");
	if (err) {console.log(err);}
}

function mqtt_messsageReceived(topic, message, packet)
{
	if (topic === 'capteur1') {
		capteur1 = message;
		insertCapteur1(parseFloat(message));
		console.log('Topic=' +  topic + '  Message=' + message);
	}

	if (topic === 'capteur2') {
		capteur2 = message;
		insertCapteur2(parseFloat(message));
		console.log('Topic=' +  topic + '  Message=' + message);
	}
	
	

}

function mqtt_close()
{
	console.log("Close MQTT");
}

function insertCapteur1(data, collection) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://192.168.10.5/";

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("tp2iot");
		var myobj = { temperature: data};
		dbo.collection("capteur1").insertOne(myobj, function(err, res) {
		  if (err) throw err;
		  console.log("Une données insérée");
		  db.close();
		});
	  });
}

function insertCapteur2(data, collection) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://192.168.10.5/";

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("tp2iot");
		var myobj = { temperature: data};
		dbo.collection("capteur2").insertOne(myobj, function(err, res) {
		  if (err) throw err;
		  console.log("Une données insérée");
		  db.close();
		});
	  });
}