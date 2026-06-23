import { useEffect } from "react";
import { Link } from "react-router-dom";

const CANONICAL = "https://mohanadportfolio.lovable.app/projects/smart-greenhouse";
const TITLE = "Smart Greenhouse: Arduino IoT Projects Guide (ESP32 + DHT22)";
const DESCRIPTION =
  "Step-by-step technical guide to building a smart greenhouse — one of the most practical arduino iot projects — using ESP32, DHT22, soil moisture sensors, and MQTT.";

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const SmartGreenhouse = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = TITLE;
    setMeta("name", "description", DESCRIPTION);
    setMeta("property", "og:title", TITLE);
    setMeta("property", "og:description", DESCRIPTION);
    setMeta("property", "og:url", CANONICAL);
    setMeta("property", "og:type", "article");
    setMeta("name", "twitter:title", TITLE);
    setMeta("name", "twitter:description", DESCRIPTION);
    setCanonical(CANONICAL);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: TITLE,
      description: DESCRIPTION,
      author: { "@type": "Person", name: "Mohanad Abubaker" },
      mainEntityOfPage: CANONICAL,
      keywords: "arduino iot projects, esp32, dht22, smart greenhouse, mqtt",
    });
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      ld.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="container mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-smooth">
            ← Home
          </Link>
        </nav>

        <header className="mb-10">
          <p className="text-sm uppercase tracking-widest text-primary mb-3">
            Arduino IoT Projects
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Smart Greenhouse with ESP32 &amp; DHT22 — A Complete Build Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            A practical, end-to-end technical walkthrough for one of the most
            rewarding arduino iot projects: a self-monitoring greenhouse that
            reads temperature, humidity, and soil moisture, then publishes the
            data to an MQTT broker for remote dashboards and alerts.
          </p>
        </header>

        <section className="prose prose-invert max-w-none space-y-6">
          <h2 className="text-2xl font-semibold mt-10 mb-3">Why this project</h2>
          <p>
            Smart greenhouses sit at the sweet spot of arduino iot projects:
            low-cost hardware, real-world value, and enough sensor variety to
            cover analog input, digital protocols (I²C, 1-Wire), and wireless
            networking. By the end you will have a deployable node that streams
            telemetry every few seconds and triggers a relay when soil moisture
            drops below a threshold.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-3">Components used</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>ESP32 DevKit v1 (Wi-Fi + Bluetooth, dual-core)</li>
            <li>DHT22 temperature &amp; humidity sensor</li>
            <li>Capacitive soil moisture sensor v1.2 (analog)</li>
            <li>5V single-channel relay module (for the water pump)</li>
            <li>Mini 5V submersible water pump + silicone tubing</li>
            <li>10kΩ pull-up resistor, breadboard, jumper wires</li>
            <li>5V / 2A USB power supply</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-3">Wiring diagram</h2>
          <p>Connect the components to the ESP32 as follows:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-2 border-b border-border">Component</th>
                  <th className="text-left p-2 border-b border-border">Component pin</th>
                  <th className="text-left p-2 border-b border-border">ESP32 pin</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border-b border-border">DHT22</td><td className="p-2 border-b border-border">VCC / DATA / GND</td><td className="p-2 border-b border-border">3V3 / GPIO4 (+10kΩ to 3V3) / GND</td></tr>
                <tr><td className="p-2 border-b border-border">Soil moisture</td><td className="p-2 border-b border-border">VCC / AOUT / GND</td><td className="p-2 border-b border-border">3V3 / GPIO34 / GND</td></tr>
                <tr><td className="p-2 border-b border-border">Relay</td><td className="p-2 border-b border-border">VCC / IN / GND</td><td className="p-2 border-b border-border">5V (Vin) / GPIO26 / GND</td></tr>
                <tr><td className="p-2">Pump</td><td className="p-2">+ / -</td><td className="p-2">Relay NO / external 5V GND</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            Power the pump from a separate 5V rail and only switch it through
            the relay — the ESP32&apos;s 3V3 line cannot source pump current.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-3">Firmware (Arduino IDE)</h2>
          <p>
            Install the <code>DHT sensor library</code> by Adafruit and{" "}
            <code>PubSubClient</code> by Nick O&apos;Leary. The sketch below
            connects to Wi-Fi, reads the three sensors, publishes JSON to
            <code> greenhouse/telemetry</code>, and toggles the pump when soil
            moisture exceeds 2600 (drier = higher analog reading on this sensor).
          </p>
          <pre className="bg-muted/40 border border-border rounded-lg p-4 overflow-x-auto text-xs leading-relaxed">
{`#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

#define DHTPIN     4
#define DHTTYPE    DHT22
#define SOIL_PIN   34
#define RELAY_PIN  26
#define DRY_THRESHOLD 2600   // calibrate for your sensor

const char* WIFI_SSID = "your-ssid";
const char* WIFI_PASS = "your-password";
const char* MQTT_HOST = "broker.hivemq.com";
const uint16_t MQTT_PORT = 1883;

DHT dht(DHTPIN, DHTTYPE);
WiFiClient net;
PubSubClient mqtt(net);

void connectWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) { delay(300); }
}

void connectMQTT() {
  while (!mqtt.connected()) {
    mqtt.connect("greenhouse-esp32");
    delay(500);
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
  dht.begin();
  connectWiFi();
  mqtt.setServer(MQTT_HOST, MQTT_PORT);
}

void loop() {
  if (!mqtt.connected()) connectMQTT();
  mqtt.loop();

  float t = dht.readTemperature();
  float h = dht.readHumidity();
  int   soil = analogRead(SOIL_PIN);

  bool needsWater = soil > DRY_THRESHOLD;
  digitalWrite(RELAY_PIN, needsWater ? HIGH : LOW);

  char payload[160];
  snprintf(payload, sizeof(payload),
    "{\\"temp_c\\":%.1f,\\"humidity\\":%.1f,\\"soil\\":%d,\\"pump\\":%s}",
    t, h, soil, needsWater ? "true" : "false");
  mqtt.publish("greenhouse/telemetry", payload);

  delay(5000);
}`}
          </pre>

          <h2 className="text-2xl font-semibold mt-10 mb-3">Software logic explained</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Sampling.</strong> The DHT22 is sampled once per loop
              (every 5 seconds) — faster than 2 s causes the sensor to return
              NaN.
            </li>
            <li>
              <strong>Soil calibration.</strong> Submerge the probe in dry soil
              and water to record both extremes, then set{" "}
              <code>DRY_THRESHOLD</code> roughly 70% of the way toward dry.
            </li>
            <li>
              <strong>Actuation.</strong> The relay is driven HIGH only while
              the soil reading is above threshold; the next cycle re-evaluates,
              giving you simple bang-bang irrigation with no extra state.
            </li>
            <li>
              <strong>Telemetry.</strong> JSON over MQTT is consumed by
              Node-RED, Home Assistant, or a custom dashboard. Switch the
              broker to <code>mqtts://</code> with TLS for production.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mt-10 mb-3">Extending the build</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Add a BH1750 lux sensor over I²C for grow-light automation.</li>
            <li>Persist last-known telemetry to NVS so reboots don&apos;t lose state.</li>
            <li>Move thresholds to MQTT-subscribed config topics for remote tuning.</li>
            <li>Wrap the firmware in OTA updates using <code>ArduinoOTA</code>.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-3">Wrapping up</h2>
          <p>
            This greenhouse node is intentionally small but touches every layer
            you will reuse in future arduino iot projects: analog and digital
            sensing, safe high-current switching, Wi-Fi, and MQTT publishing.
            Fork it, swap sensors, and you have a template for air-quality
            monitors, fish-tank controllers, or smart-room dashboards.
          </p>
        </section>

        <footer className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-smooth">
            ← Back to portfolio
          </Link>
        </footer>
      </article>
    </main>
  );
};

export default SmartGreenhouse;
