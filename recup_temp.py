#!/usr/bin/python3
import paho.mqtt.client as mqtt 
from pymodbus.client.sync import ModbusSerialClient
import time
import os

capteur1 = ModbusSerialClient(
    method='rtu',
    port='/dev/ttyUSB0',
    baudrate=57600,
    timeout=3,
    parity='N',
    stopbits=1,
    bytesize=8
)

capteur2 = ModbusSerialClient(
    method='rtu',
    port='/dev/ttyUSB1',
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
    if capteur1.connect():  # Trying for connect to Modbus Server/Slave
        time.sleep(2)
        '''Reading from a holding register with the below content.'''
        res1 = capteur1.read_holding_registers(address=100, count=1, unit=1)

        '''Reading from a discrete register with the below content.'''
        # res = client.read_discrete_inputs(address=1, count=1, unit=1)

        if not res1.isError():
            data = res1.registers
            temp1 = data.pop()
            print(temp1)
            commande = "mosquitto_pub -h localhost -t capteur1 -m {}".format(temp1)
            os.system(commande)
            
        else:
            print(res1)

    else:
        print('(Capteur1)Cannot connect to the Modbus Server/Slave')
        
        
    
    if capteur2.connect():  # Trying for connect to Modbus Server/Slave
        time.sleep(2)
        '''Reading from a holding register with the below content.'''
        res2 = capteur1.read_holding_registers(address=100, count=1, unit=1)

        '''Reading from a discrete register with the below content.'''
        # res = client.read_discrete_inputs(address=1, count=1, unit=1)

        if not res2.isError():
            data = res2.registers
            temp2 = data.pop()
            print(temp2)
            commande = "mosquitto_pub -h localhost -t capteur2 -m {}".format(temp2)
            os.system(commande)
            
        else:
            print(res2)

    else:
        print('(Capteur2)Cannot connect to the Modbus Server/Slave')
    
    time.sleep(120)
    