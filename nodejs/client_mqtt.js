var mqtt = require('mqtt');
var Topic = 'TEMPERATURE';
var Broker_URL = 'mqtt://192.168.10.10';

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
    client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted)
{
    console.log("Subscribed to " + Topic);
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
	console.log('Topic=' +  topic + '  Message=' + message);
	insert(parseInt(message));

}

function mqtt_close()
{
	console.log("Close MQTT");
}

function insert(data) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://192.168.10.5/";

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("tp2iot");
		var myobj = { temperature: data};
		dbo.collection("capteur1").insertOne(myobj, function(err, res) {
		  if (err) throw err;
		  console.log("1 document inserted");
		  db.close();
		});
	  });
}