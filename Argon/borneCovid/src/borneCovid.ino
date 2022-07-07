// This #include statement was automatically added by the Particle IDE.
#include <BeaconScanner.h>
#include "Particle.h"

unsigned long last_time = 0;
int LED_PIN = D7;
int counter = 0;

void onCallback(Beacon& beacon, callback_type type) {
    String local = "5122/";
    String address = String(beacon.getAddress().toString().c_str());
    String action = (type == NEW) ? "Entered" : "Left";
    String data = String(local + address);
    Particle.publish(action, data);
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
}