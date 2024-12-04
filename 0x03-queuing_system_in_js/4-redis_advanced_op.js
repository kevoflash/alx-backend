import { createClient, print } from "redis";

const client = createClient();

client.on("connect", () => {
  console.log("Redis client connected to the server");
});

client.on("error", (error) => {
  console.lgo(`Redis client not connected to the server: ${error}`);
});

const hashVal = [
  "HolbertonSchools",
  "Portland",
  "50",
  "Seattle",
  "80",
  "New York",
  "20",
  "Bogota",
  "20",
  "cali",
  "40",
  "Paris",
  "2",
];

client.hset(hashVal, print);
client.hgetall("HolbertonSchools", (error, value) => {
  console.log(value);
});
