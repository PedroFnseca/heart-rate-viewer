#include <WiFi.h>
#include <HTTPClient.h>

// Conections params
#define SSID "SSID"
#define PASSWORD "PASSWORD"
#define BASE_URL "https://cardiotech.vercel.app//api/sensor/heart"

// IO pins
#define PULSE_SENSOR_PIN A0
#define LED_PIN 2

void connectToWiFi(){
  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWifi conectado!");
}

void postHTTP(int heartRate){
  HTTPClient http;

  http.begin(BASE_URL);
  http.addHeader("Content-Type", "application/json");

  String payload = "{\"sensor_id\": 1, \"rate\": " + String(heartRate) + ", \"user_id\": 1}";

  int httpCode = http.POST(payload);

  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println(payload);
  } else {
    Serial.println("Erro no envio do POST");
  }

  http.end();
}

int getBeats() {
  int sensorValue = 0;

  // Coleta os batimentos cardíacos

  if (sensorValue > 0) {
    Serial.println("BPM: " + String(sensorValue) + "\n");
  } else {
    Serial.println("Nenhum pulso detectado");
  }

  return sensorValue;
}

void setup() {
  Serial.begin(9600);

  Serial.println("Iniciando...");
}

void loop() {
  connectToWiFi();

  while(true){
    int heartRate = getBeats();
    delay(1000);
  }
}