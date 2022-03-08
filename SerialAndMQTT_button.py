#!/usr/bin/python3
import paho.mqtt.client as mqtt 
import time
import os
import serial

import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

while (True):
    if GPIO.input(10) == GPIO.HIGH:
        
        ser = serial.Serial('/dev/ttyUSB0', 19200, timeout=1)
        res1 = ser.readline()
        res1_decode = res1.decode('utf-8')

        print(res1_decode)
        commande = "mosquitto_pub -h localhost -t capteur1 -m {}".format(res1_decode)
        os.system(commande)

        
        ser = serial.Serial('/dev/ttyUSB0', 19200, timeout=1)
        res2 = ser.readline()
        res2_decode = res2.decode('utf-8')

        print(res2_decode)
        commande = "mosquitto_pub -h localhost -t capteur2 -m {}".format(res2_decode)
        os.system(commande)