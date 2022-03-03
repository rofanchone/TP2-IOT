import serial

ser = serial.Serial('/dev/ttyUSB0', 9600)


readedText = ser.readline().decode('utf-8')
print(readedText)
    
ser.close()