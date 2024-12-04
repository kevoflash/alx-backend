import { createClient } from "redis";

const client = createClient();

client.on("connect", () => {
  console.log("Redis client connected to the server");
});

client.on("error", (err) => {
  console.error(`Reddis client not connected to the server:${err.message}`);
});

client.subscribe("holberton school channel", (err, channel) => {
  if (err) console.error(`Error subscribing to channel: ${err.message}`);
  console.log(`Subscribed to channel: ${channel}`);
});

client.on("message", (channel, message) => {
  console.log(message);
  if (message === "KILL SERVER") {
    client.unsubscribe();
    client.quit();
  }
});
