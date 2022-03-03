import paho.mqtt.client as mqtt 
import time
import os
import serial

#mqttBroker ="localhost" 
#client_mqtt = mqtt.Client("TEMPERATURE")
#client_mqtt.connect(mqttBroker, 1883)

while (True):
        
        ser = serial.Serial('/dev/ttyUSB0', 9600)
        res1 = ser.readline().decode('utf-8')


        if not res1.isError():
            data = res1.registers
            temp1 = data.pop()
            print(temp1)
            commande = "mosquitto_pub -h localhost -t capteur1 -m {}".format(temp1)
            os.system(commande)
            
        else:
            print(res1)

    
time.sleep(120)