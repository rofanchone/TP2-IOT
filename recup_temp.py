#!/usr/bin/python3
import paho.mqtt.client as mqtt 
from pymodbus.client.sync import ModbusSerialClient
import time
import os

client = ModbusSerialClient(
    method='rtu',
    port='/dev/ttyUSB0',
    baudrate=57600,
    timeout=3,
    parity='N',
    stopbits=1,
    bytesize=8
)

mqttBroker ="localhost" 
client_mqtt = mqtt.Client("TEMPERATURE")
client_mqtt.connect(mqttBroker, 1883)

while (True):
    if client.connect():  # Trying for connect to Modbus Server/Slave
        time.sleep(2)
        '''Reading from a holding register with the below content.'''
        res = client.read_holding_registers(address=100, count=1, unit=1)

        '''Reading from a discrete register with the below content.'''
        # res = client.read_discrete_inputs(address=1, count=1, unit=1)

        if not res.isError():
            data = res.registers
            temp = data.pop()
            print(temp)
            commande = "mosquitto_pub -h localhost -t TEMPERATURE -m {}".format(temp)
            os.system(commande)
            
        else:
            print(res)

    else:
        print('Cannot connect to the Modbus Server/Slave')
    
    time.sleep(120)
    

