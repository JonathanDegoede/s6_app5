// This #include statement was automatically added by the Particle IDE.
#include <BeaconScanner.h>
#include "Particle.h"

unsigned long last_time = 0;
int LED_PIN = D7;
int counter = 0;

void onCallback(Beacon& beacon, callback_type type) {
    
    Serial.printf("Address: %s. Type: %s", beacon.getAddress().toString().c_str(), (type == NEW) ? "Entered" : "Left");
    if(type == NEW){
        Particle.publish("Entered", beacon.getAddress().toString().c_str());
    }
    else{
        Particle.publish("Left", beacon.getAddress().toString().c_str());
    }
    
    Serial.print("\n");
}

void fakeEnter(String address){
    Particle.publish("Entered", address);
}

void fakeLeave(String address){
    Particle.publish("Left", address);
}

int ledToggle(String command)
{
  if (command.equals("on"))
  {
    digitalWrite(LED_PIN, HIGH);
    return 1;
  }
  else if (command.equals("off"))
  {
    digitalWrite(LED_PIN, LOW);
    return 0;
  }
  else
  {
    return -1;
  }
}

void setup() {
    // Other setup
    BLE.on();
    Scanner.setCallback(onCallback);
    Scanner.setScanPeriod(1);
    Scanner.startContinuous();
    
    Serial.begin(9600L);
    
    pinMode(LED_PIN, OUTPUT);
    
    Particle.function("led", ledToggle);
}

void loop() {
    Scanner.loop();
    if(millis() - last_time > 2000){
        last_time = millis();    
        Serial.println("Scanning...");
        if(counter % 2 == 0){
            fakeEnter("5122:1001");
            fakeLeave("5122:1001");
        }
        else{
            fakeEnter("5122:1002");
            fakeLeave("5122:1002");
        }
        counter++;
    }
}