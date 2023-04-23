#include "filter.h"
#include <WiFi.h>
#include <HTTPClient.h>

#define SSID "SSID"
#define PASSWORD "PASSWORD"
#define BASE_URL "https://cardiotech.vercel.app"

#define ARRAY_SIZE 400
#define LED 2   //  Pino que irá piscar junto com o batimento cardíaco.
#define SENSORPIN A5 // Pino do sensor de batimento cardíaco.

int sample;
int Threshold = 550; 
int BPM = 0;
unsigned long startMillis =0;
unsigned long lastSend = 0;  
bool state= true;
int arraySample[ARRAY_SIZE];
int maximum = 0;
int minimum = 0;
int isteresi = 20;
int beatStatus = 0;
int DELAYTOREPEATSECONDS = 5 * 1000;

Filter filtroBPM;

void setup() {
  pinMode(LED,OUTPUT);
  filtroBPM.setDepthFilter(10);

  Serial.begin(115200);
  Serial.println("Iniciando...");
}

void loop() {
  connectToWiFi();

  setBeats();

  if (millis() - lastSend > DELAYTOREPEATSECONDS){
    Serial.println("Batimentos: " + BPM);
    postHTTP(BPM);

    lastSend = millis();
  }

  delay(5);
}

// ----------------- HTTP ----------------- //

void connectToWiFi(){
  if (WiFi.status() == WL_CONNECTED) {
    return;
  } else {
    Serial.print("Conectando ao WiFi...");
  }

  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWifi conectado!");
}

void postHTTP(int heartRate){
  String payload = "/api/sensor/heart?sensor_id=1&user_id=1&rate=" + String(heartRate);

  HTTPClient http;

  http.begin(BASE_URL);

  int httpCode = http.POST(payload);

  Serial.println("\n\n----------------------------------------------------------------------------------------------------");
  Serial.println(BASE_URL + payload);
  Serial.println("Method: POST");
  Serial.println("HTTP Code: " + String(httpCode));

  if (httpCode > 0) {
    String response = http.getString();
    Serial.println(response);
  } else {
    Serial.println("Erro no envio dos dados");
  }

  Serial.println("----------------------------------------------------------------------------------------------------");
  http.end();
}

// ----------------- Batimentos cardiacos ----------------- //

void setBeats() {
  sample = analogRead(SENSORPIN);

  findThreshold();

  readBPM();
}

void findThreshold() {
  maximum = arraySample[0]; 
  minimum = arraySample[0];

  for(int i = 0; i < ARRAY_SIZE ;i++) {
    arraySample[i] = arraySample[i+1];
  }

  arraySample[ARRAY_SIZE -1] = sample;

  for(int i = 0; i < ARRAY_SIZE ;i++) {
    if(arraySample[i] > maximum) maximum = arraySample[i] ;
  }

   for(int i = 0; i < ARRAY_SIZE ;i++) {
     if(arraySample[i] < minimum) minimum = arraySample[i] ;
  }

  Threshold = (maximum + minimum)/2;
}

void readBPM() {
 if (analogRead(SENSORPIN) > Threshold  + isteresi) { 
    digitalWrite(LED,HIGH);  
    beatStatus = 1;
      
    if (!state) {
      calcBPM();
      state = true;
    }        
  }
    
  if (analogRead(SENSORPIN) < Threshold  - isteresi){  
    digitalWrite(LED,LOW);
    beatStatus = 0;
    state = false;  
  }
}

void calcBPM() {
  double t = (double)(millis() - startMillis)/(double)1000;
  startMillis= millis();
  
  BPM = filtroBPM.filterSamples((double)60/t);
}
