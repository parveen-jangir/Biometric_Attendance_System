#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>
#include <Adafruit_Fingerprint.h>
#include <GS_SDHelper.h>
#include <EEPROM.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <LiquidCrystal_I2C.h>

#define inOutPin 14
#define enrollPin 2

LiquidCrystal_I2C lcd(0x3F, 16, 2);

// Replace with your network credentials
const char *ssid = "InnovationLab";
const char *password = "productDesignLab";

const char *serverName = "https://script.google.com/macros/s/AKfycbwkQNEz_8IAdEPBo4HB2rGiDdoQ0vTLCzDkqk4ciKwqsafE2CLaLy6V2LPIUvojR7kB/exec"; // Replace with your server URL

// Create an instance of the server
ESP8266WebServer server(80);
SoftwareSerial mySerial(12, 13);

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

String fingerId;
// Variable to store the user's name
String userName = "";
String timeType = "";
String BTdata = "";

// EEPROM address to store the current fingerprint ID
const bool idAddress = 0;

unsigned long currentTime;
unsigned int scanningTime = 12000;

// print data to LCD display
void print(String data0, String data1)
{
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(data0);
  lcd.setCursor(0, 1);
  lcd.print(data1);
}

void enrollStudent(String name, String rollNumber)
{
  WiFiClientSecure client;
  client.setInsecure(); // Disable SSL certificate validation (for testing purposes)

  HTTPClient http;
  http.begin(client, serverName);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS); // Follow redirects

  String httpRequestData = "action=enroll&name=" + name + "&rollNumber=" + rollNumber;

  int httpResponseCode = http.POST(httpRequestData);

  Serial.print("HTTP Response Code: ");
  Serial.println(httpResponseCode); // Debugging output

  if (httpResponseCode == HTTP_CODE_OK)
  {
    String response = http.getString();
    Serial.println("Response: " + response);

    // Parse JSON response
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, response);

    if (error)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
    }
    else
    {
      const char *studentName = doc["Name"];
      Serial.print("Student Name: ");
      Serial.println(studentName);
      Serial.print("Roll No: ");
      Serial.println(rollNumber);

      print(studentName, "Finger ID:");
      lcd.setCursor(12, 1);
      lcd.print(rollNumber);
      // delay(5000);
      while (digitalRead(enrollPin))
      {
        delay(100);
      }
      print("   Welcome to    ", " Innovation Lab ");
    }
  }
}

void markPresent(String SerialData)
{
  WiFiClientSecure client;
  client.setInsecure(); // Disable SSL certificate validation (for testing purposes)

  HTTPClient http;
  http.begin(client, serverName);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS); // Follow redirects

  String rollNumber = SerialData; // Replace with the actual roll number you want to query
  String httpRequestData = "action=markAttendance&rollNumber=" + rollNumber + "&timeType=" + timeType;
  Serial.println(httpRequestData);
  // String httpRequestData = "rollNumber=" + rollNumber;

  int httpResponseCode = http.POST(httpRequestData);

  Serial.print("HTTP Response Code: ");
  Serial.println(httpResponseCode); // Debugging output

  if (httpResponseCode == HTTP_CODE_OK)
  {
    String response = http.getString();
    Serial.println("Response: " + response);

    // Parse JSON response
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, response);

    if (error)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      print("ERROR", error.f_str());
    }
    else
    {
      const char *studentName = doc["name"];
      const char *status = doc["Status"];
      Serial.print("Student Name: ");
      Serial.println(studentName);
      lcd.clear();
      print(studentName, status);
      delay(2500);
    }
  }
  else
  {
    Serial.println("Error on HTTP request");
  }
  http.end(); // Free resources

  // reset tiemType
  timeType = "";

  print("   Welcome to    ", " Innovation Lab ");
}

void resetData()
{
  WiFiClientSecure client;
  client.setInsecure(); // Disable SSL certificate validation (for testing purposes)

  HTTPClient http;
  http.begin(client, serverName);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS); // Follow redirects

  // String rollNumber = SerialData; // Replace with the actual roll number you want to query
  String httpRequestData = "action=reset";
  Serial.println(httpRequestData);
  // String httpRequestData = "rollNumber=" + rollNumber;

  int httpResponseCode = http.POST(httpRequestData);

  Serial.print("HTTP Response Code: ");
  Serial.println(httpResponseCode); // Debugging output

  if (httpResponseCode == HTTP_CODE_OK)
  {
    String response = http.getString();
    Serial.println("Response: " + response);

    // Parse JSON response
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, response);

    if (error)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
    }
    else
    {
      const char *response1 = doc["status"];
      const char *response2 = doc["name"];
      Serial.print("Student Name: ");
      Serial.print(response1);
      Serial.println(response2);

      print(response1, response2);
      delay(2500);
    }
  }
  else
  {
    Serial.println("Error on HTTP request");
  }
  http.end(); // Free resources
}

// Function to serve the main page
void handleRoot()
{
  String html = "<html><body>";
  html += "<h1>Fingerprint Sensor Interface</h1>";
  html += "<p><a href=\"/enroll\">Enroll Fingerprint</a></p>";
  html += "<p><a href=\"/check\">Check Fingerprint</a></p>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

// Function to handle the enroll page
void handleEnroll()
{
  String html = "<html><body>";
  html += "<h1>Enroll Fingerprint</h1>";
  html += "<form action=\"/submit\" method=\"POST\">";
  html += "Name: <input type=\"text\" name=\"name\"><br>";
  html += "<input type=\"submit\" value=\"Submit\">";
  html += "</form>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

// Function to handle form submission

// Function to handle fingerprint checking
void handleCheck()
{
  // Implement fingerprint checking logic
  // Placeholder response
  server.send(200, "text/html", "<html><body>Check Fingerprint Functionality</body></html>");
}

void saveFingerprintID(int id)
{
  Serial.println("save finger");
  EEPROM.begin(512);         // Initialize EEPROM with size 512 bytes
  EEPROM.put(idAddress, id); // Save the current fingerprint ID to EEPROM
  EEPROM.commit();           // Commit changes to EEPROM
  EEPROM.end();              // End EEPROM access
}

int readFingerprintID()
{
  EEPROM.begin(512); // Initialize EEPROM with size 512 bytes
  int id;
  EEPROM.get(idAddress, id); // Read the current fingerprint ID from EEPROM
  EEPROM.end();              // End EEPROM access
  return id;
}

// function to check and print return type of fingerprint sensor
uint8_t returnedData(uint8_t p)
{
  switch (p)
  {
  case FINGERPRINT_OK:
    Serial.println("Image taken");
    break;
  case FINGERPRINT_NOFINGER:
    Serial.print(".");
    break;
  case FINGERPRINT_PACKETRECIEVEERR:
    Serial.println("Communication error");
    return p;
  case FINGERPRINT_IMAGEFAIL:
    Serial.println("Imaging error");
    return p;
  case FINGERPRINT_IMAGEMESS:
    Serial.println("Image too messy");
    return p;
  case FINGERPRINT_FEATUREFAIL:
    Serial.println("Could not find fingerprint features");
    return p;
  case FINGERPRINT_INVALIDIMAGE:
    Serial.println("Could not find fingerprint features");
    return p;
  case FINGERPRINT_ENROLLMISMATCH:
    Serial.println("Fingerprints did not match");
    return p;
  case FINGERPRINT_BADLOCATION:
    Serial.println("Could not store in that location");
    return p;
  case FINGERPRINT_FLASHERR:
    Serial.println("Could not store in that location");
    return p;
  case FINGERPRINT_NOTFOUND:
    Serial.println("Did not find a match");
    return p;
  default:
    Serial.println("Unknown error");
    return p;
  }

  return (true);
}


uint8_t getFingerprintEnroll(uint8_t id) {

  int p = -1;
  Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.print(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
    default:
      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return false;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return false;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return false;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return false;
    default:
      Serial.println("Unknown error");
      return false;
  }

  Serial.println("Remove finger");
  print("Remove","Finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  Serial.print("ID "); Serial.println(id);
  p = -1;
  Serial.println("Place same finger again");
  print("Place finger","again");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.print(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
    default:
      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return false;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return false;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return false;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return false;
    default:
      Serial.println("Unknown error");
      return false;
  }

  // OK converted!
  Serial.print("Creating model for #");  Serial.println(id);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("Prints matched!");
    print("Finger","matched!");
    delay(500);
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return false;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    return false;
  } else {
    Serial.println("Unknown error");
    return false;
  }

  Serial.print("ID "); Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("Stored!");
    print("ID","Stored");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return false;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return false;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return false;
  } else {
    Serial.println("Unknown error");
    return false;
  }

  return true;
}


// Function to enroll a fingerprint
bool enrollFingerprint()
{
  int id = readFingerprintID(); // Get the current fingerprint ID from EEPROM
  Serial.print("Enrolling ID #");
  Serial.println(id);

  // Check if enrollment was successful
  if (getFingerprintEnroll(id))
  {
    Serial.println("Fingerprint successfully enrolled");
    print("Fingerprint      ", "Enrolled         ");
    return true;
  }
  else
  {
    Serial.println("Fingerprint enrollment failed");
    print("EnrollmentFailed", "Try again");
    return false;
  }
}

//...........function for update google sheet......................//

// Function to handle form submission
void handleSubmit()
{
  if (server.hasArg("name"))
  {
    userName = server.arg("name");
    Serial.println("Received name: " + userName);

    print("Place you Finger ", "   on sensor     ");

    // Start the enrollment process and check if it's successful
    if (enrollFingerprint())
    {

      // Increment and save the fingerprint ID to EEPROM
      int id = readFingerprintID();
      fingerId = (String)id;
      enrollStudent(userName, fingerId);
      id++;
      saveFingerprintID(id);

      // Respond with a JavaScript to redirect to Google if enrollment is successful
      String html = "<html><body>";
      html += "<script>";
      html += "window.location.href = 'https://forms.gle/ySQDpGSoJ5gQ9E776';";
      html += "</script>";
      html += "</body></html>";
      server.send(200, "text/html", html);
    }
    else
    {
      // Respond with an error message if enrollment fails
      server.send(200, "text/plain", "Fingerprint enrollment failed. Please try again.");
    }
  }
  else
  {
    server.send(400, "text/plain", "Name not provided");
  }
}

// Function to start fingerprint enrollment
void handleStartEnroll()
{
  Serial.println("Starting fingerprint enrollment process...");
  enrollFingerprint();
  server.send(200, "text/plain", "Enrollment process started");
}

uint8_t getFingerprintID()
{
  uint8_t p = finger.getImage();

  if (p == FINGERPRINT_OK)
    Serial.println("Image taken");
  else if (returnedData(p) != true)
    return p;
  p = finger.image2Tz();

  if (p == FINGERPRINT_OK)
    Serial.println("Image converted2");
  else if (returnedData(p) != true)
    return p;

  // OK converted!
  p = finger.fingerSearch();

  if (p == FINGERPRINT_OK)
    Serial.println("Found a print match!");
  else if (returnedData(p) != true)
    return p;

  // found a match!
  Serial.print("Found ID #");
  Serial.print(finger.fingerID);
  Serial.print(" with confidence of ");
  Serial.println(finger.confidence);

  fingerId = (String)finger.fingerID;
  if (finger.confidence > 150)
  {
    print("Remove finger & ", "wait a movement..");
    markPresent(fingerId);
    print("   Welcome to    ", " Innovation Lab ");
  }

  return finger.fingerID;
}

// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez()
{
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK)
    return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)
    return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)
    return -1;

  // found a match!
  Serial.print("Found ID #");
  Serial.print(finger.fingerID);
  Serial.print(" with confidence of ");
  Serial.println(finger.confidence);
  return finger.fingerID;
}

// function to delete all data of fingerprint sensor
void deleteAllFingerprints()
{
  Serial.println("Deleting all fingerprints...");

  // Loop through all possible IDs (from 1 to 127)
  for (int i = 0; i < 128; i++)
  {
    uint8_t p = finger.deleteModel(i);
    if (p == FINGERPRINT_OK)
    {
      Serial.print("Deleted fingerprint ID #");
      Serial.println(i);
    }
    else if (returnedData(p) != true)
    {
      Serial.print("Unknown error while deleting ID #");
      Serial.println(i);
    }
  }
}

void setup()
{
  pinMode(inOutPin, INPUT_PULLUP);
  pinMode(enrollPin, INPUT_PULLUP);

  lcd.init();
  lcd.clear();
  lcd.backlight();

  // Start serial communication at 115200 baud rate
  Serial.begin(115200);

  print("Device starting.", "                ");
  delay(1500);

  // Initialize the fingerprint sensor
  finger.begin(57600);
  if (!finger.verifyPassword())
  {
    print("", "FPsensorNotFound");
    Serial.println("Did not find fingerprint sensor :");
    while (!finger.verifyPassword())
    {
      delay(1);
    }
  }
  Serial.println("Found fingerprint sensor!");
  print("", "Found FPsensor ");
  delay(1000);

  Serial.println(F("Reading sensor parameters"));
  finger.getParameters();
  Serial.print(F("Status: 0x"));
  Serial.println(finger.status_reg, HEX);
  Serial.print(F("Sys ID: 0x"));
  Serial.println(finger.system_id, HEX);
  Serial.print(F("Capacity: "));
  Serial.println(finger.capacity);
  Serial.print(F("Security level: "));
  Serial.println(finger.security_level);
  Serial.print(F("Device address: "));
  Serial.println(finger.device_addr, HEX);
  Serial.print(F("Packet len: "));
  Serial.println(finger.packet_len);
  Serial.print(F("Baud rate: "));
  Serial.println(finger.baud_rate);

  WiFi.setAutoReconnect(true);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  print("", "Connecting WiFi");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
    print("", "Connecting WiFi.");
  }
  Serial.println("Connected!");
  print("", "WiFi Connected! ");
  delay(1000);

  // Print the IP address
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/enroll", handleEnroll);
  server.on("/submit", HTTP_POST, handleSubmit);
  server.on("/start_enroll", handleStartEnroll);
  server.on("/check", handleCheck);

  // Start the server
  server.begin();
  Serial.println("HTTP server started");
  print("", "HTTPserverStart");

  // reset device
  delay(1500);
  if (digitalRead(enrollPin) == HIGH && digitalRead(inOutPin) == LOW)
  {
    print("Reset process", "starting..");
    delay(1500);
    currentTime = millis();
    while (digitalRead(enrollPin) == LOW && digitalRead(inOutPin) == LOW)
    {
      print("On count of", String((millis() - currentTime) / 1000));
      delay(1000);
      if (millis() - currentTime >= 5000)
      {
        print("Reset device..   ", "Delete all data.");
        saveFingerprintID(1);
        deleteAllFingerprints();
        print("Fringprint data", "deleted");
        resetData();
        print("   Welcome to    ", " Innovation Lab ");
      }
    }
  }
  delay(1000);

  // set cuttent time
  currentTime = millis();
  print("   Welcome to   ", " Innovation Lab  ");
}

void loop()
{
  // Read push button data
  // bool inOutSW = digitalRead(inOutPin);
  // bool enrollSW = HIGH;
  // if (digitalRead(enrollPin) == LOW)
  // {
  //   // Serial.println("hi1");
  //   currentTime = millis();
  //   delay(50);
  //   while (digitalRead(enrollPin) == LOW)
  //   {
  //     // Serial.println("hi2");
  //     if (millis() - currentTime >= 2500)
  //     {
  //       delay(50);
  //       // Serial.println("hi3");
  //       enrollSW = LOW;
  //     }
  //   }
  // }

  // Handle client requests
  // server.handleClient();
  if (timeType == "checkIn" || timeType == "checkOut")
  {
    getFingerprintID();
    Serial.println("yes");
  }

  if (millis() - currentTime >= scanningTime && (timeType == "checkIn" || timeType == "checkOut"))
  {
    print("TRY AGAIN....", "");
    delay(1500);
    // Serial.println("no");
    print("   Welcome to", " Innovation Lab");
    timeType = "";
  }

  // reset eeprom data
  BTdata = "";
  if (Serial.available())
  {
    BTdata = Serial.readStringUntil('\n');
    currentTime = millis();
    BTdata.trim();
  }
  if (BTdata == "add")
  {
    Serial.println("Start entollment :");
    Serial.println(enrollFingerprint());
  }
  if (BTdata == "reset1.1")
  {
    print("Reset device..   ", "Delete all data.");
    saveFingerprintID(1);
    deleteAllFingerprints();
    print("Fringprint data", "deleted");
    resetData();
    print("   Welcome to    ", " Innovation Lab ");
  }
  if (BTdata == "in" || (digitalRead(inOutPin) == LOW && timeType != "checkIn"))
  {
    currentTime = millis();
    print(" Place finger on", "SensorToCheckIn ");
    timeType = "checkIn";
    Serial.println("in ho gya");
    delay(75);
  }
  if (BTdata == "out" || (digitalRead(inOutPin) == LOW && timeType != "checkOut"))
  {
    currentTime = millis();
    print(" Place finger on", "SensorToCheckOut");
    Serial.println("out ho gya");
    timeType = "checkOut";
    delay(75);
  }
  if (BTdata == "enroll" || digitalRead(enrollPin) == LOW)
  {
    timeType = "";
    bool pressKey = false;
    print("EnrolmentStarted", "Press enter key");
    delay(200);
    while (digitalRead(enrollPin))
    {
      server.handleClient();
      if(!digitalRead(inOutPin)){
        pressKey = true;
        break;
      }
      delay(30);
    }
    delay(200);
    // delay(3500);
    print("  Connect your  ", " mobile to WiFi  ");
    while (digitalRead(enrollPin) && pressKey == false)
    {
      server.handleClient();
      if(!digitalRead(inOutPin)){
        pressKey = true;
        break;
      }
      delay(30);
    }
    delay(200);
    // delay(3500);
    print(String(ssid), "");
    while (digitalRead(enrollPin) && pressKey == false)
    {
      server.handleClient();
      if(!digitalRead(inOutPin)){
        pressKey = true;
        break;
      }
      delay(30);
    }
    delay(200);
    // delay(5000);
    print("scanQR or search", "");
    lcd.setCursor(0, 1);
    lcd.print(WiFi.localIP());
    while (digitalRead(enrollPin) && pressKey == false)
    {
      server.handleClient();
      if(!digitalRead(inOutPin)){
        break;
      }
      delay(30);
    }
    delay(200);
    print("   Welcome to    ", " Innovation Lab ");
  }
}

// uint8_t getFingerprintEnro(uint8_t id)
// {
//   int p = -1;
//   Serial.print("Waiting for valid finger to enroll as #");
//   Serial.println(id);
//   while (p != FINGERPRINT_OK)
//   {
//     p = finger.getImage();
//     Serial.print("R1 : ");
//     Serial.println(returnedData(p));
//   }

//   p = finger.image2Tz(1);

//   if (returnedData(p) != true)
//   {
//     int i = 1;
//     while (p != FINGERPRINT_OK && i <= 5)
//     {
//       p = finger.getImage();
//       p = finger.image2Tz(1);
//       i++;
//       print("ERROR", "Wait a movement");
//       delay(500);
//     }
//     if (i >= 5)
//       return false;
//   }
//   if (p == FINGERPRINT_OK)
//   {
//     Serial.println("Stored!");
//     // print("Fingerprint     ", "Stored           ");
//     // delay(800);
//   }

//   Serial.println("Remove finger");
//   print(" Remove Finger", "");
//   delay(2000);
//   p = 0;
//   while (p != FINGERPRINT_NOFINGER)
//   {
//     p = finger.getImage();
//   }
//   Serial.print("ID ");
//   Serial.println(id);
//   p = -1;
//   Serial.println("Place same finger again");
//   print("Place same", "finger again");
//   delay(1000);
//   while (p != FINGERPRINT_OK)
//   {
//     Serial.println("r4");
//     p = finger.getImage();
//     returnedData(p);
//   }

//   p = finger.image2Tz(2);

//   if (p == FINGERPRINT_OK)
//   {
//     Serial.println("Image converted");
//     print("ID Stored        ", "Successfully     ");
//   }
//   else if (returnedData(p) != true)
//     return p;

//   Serial.print("Creating model for #");
//   Serial.println(id);
//   p = finger.createModel();

//   if (p == FINGERPRINT_OK)
//     Serial.println("Prints matched!");
//   else if (returnedData(p) != true)
//     return p;

//   Serial.print("ID ");
//   Serial.println(id);
//   p = finger.storeModel(id);
//   if (p == FINGERPRINT_OK)
//     Serial.println("Stored!2");
//   if (returnedData(p) != true)
//     return p;
//   return true;
// }