#include "Modbus.h"
#include "ModbusSerial.h"


//int temp = A0;
const int tempPin = 0;
float volt;
float tempC;
int x ;

// Modbus Registers Offsets (0-9999) => 40001 + offset
enum RegistersOffsets
{
    valeur1,
    valeur2,
    valeur3,
    valeur100=100,
};

//ModbusSerial object
ModbusSerial mb;

byte m_slaveId = 1;//chaque slave doit avoir un ID différent

void setup() 
{
  Serial.begin(57600); 
  //while(!Serial){}

  initModbusSlave();

  
}

void initModbusSlave()
{    
    // Config Modbus Serial (port, speed, byte format) 
    mb.config(&Serial, 57600, 0);
    // Set the Slave ID (1-247)
    mb.setSlaveId(m_slaveId);  

    // ajouter les holding registers
    mb.addHreg(valeur1, 1);
    mb.addHreg(valeur2, 2);
    mb.addHreg(valeur3, 3);
    mb.addHreg(valeur100, tempC);
}

void loop() 
{
  x = analogRead(A0);
  volt = x*5;
  volt/= 1023.0;
  tempC= (volt-0.5)*100;
  //temp = analogRead(A0);

  //Serial.println(tempC);
  
    static int fakeCounter = 0;
    if(fakeCounter > 400)
        fakeCounter = 0;    
    
    //changer la valeur d'un holding register
    mb.Hreg(valeur100, fakeCounter++);

    //process modbus requests
    mb.task();

    delay(10);
}
