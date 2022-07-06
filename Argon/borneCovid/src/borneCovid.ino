// This #include statement was automatically added by the Particle IDE.
#include <BeaconScanner.h>
#include "Particle.h"

unsigned long last_time = 0;
int LED_PIN = D7;

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

void fakeEnter(){
    Particle.publish("Entered", "Fake address");
}

void fake(){
    Particle.publish("Left", "Fake address");
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
    Scanner.startContinuous();
    
    Serial.begin(9600L);
    
    pinMode(LED_PIN, OUTPUT);
    
    Particle.function("led", ledToggle);
}

void loop() {
    if(millis() - last_time > 5000){
        last_time = millis();    
        Serial.println("Scanning...");
        fakeEnter();
    }
}