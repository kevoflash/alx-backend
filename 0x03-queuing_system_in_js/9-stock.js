const express = require("express");
const redis = require("redis");
const { promisify } = require("util");

const app = express();
const port = 1245;

// List of products with initial stock
const listProducts = [
  {
    itemId: 1,
    itemName: "Suitcase 250",
    price: 50,
    initialAvailableQuantity: 4,
  },
  {
    itemId: 2,
    itemName: "Suitcase 450",
    price: 100,
    initialAvailableQuantity: 10,
  },
  {
    itemId: 3,
    itemName: "Suitcase 650",
    price: 350,
    initialAvailableQuantity: 2,
  },
  {
    itemId: 4,
    itemName: "Suitcase 1050",
    price: 550,
    initialAvailableQuantity: 5,
  },
];

// Redis client with promisified methods
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Function to get product by ID from listProducts
function getItemById(id) {
  return listProducts.find((product) => product.itemId === id);
}

// Function to reserve stock for an item ID
async function reserveStockById(itemId, stock) {
  const key = `item.${itemId}`;
  await setAsync(key, stock);
}

// Function to get current reserved stock for an item ID
async function getCurrentReservedStockById(itemId) {
  const key = `item.${itemId}`;
  const reservedStock = await getAsync(key);
  return reservedStock ? parseInt(reservedStock, 10) : 0;
}

// Route to list all products
app.get("/list_products", (req, res) => {
  res.json(listProducts);
});

// Route to get product details and current stock
app.get("/list_products/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(parseInt(itemId, 10));
  if (!product) {
    return res.json({ status: "Product not found" });
  }

  const currentStock = await getCurrentReservedStockById(product.itemId);
  res.json({ ...product, currentQuantity: currentStock });
});

// Route to reserve a product
app.get("/reserve_product/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(parseInt(itemId, 10));
  if (!product) {
    return res.json({ status: "Product not found" });
  }

  const currentStock = await getCurrentReservedStockById(product.itemId);
  if (currentStock === 0) {
    return res.json({ status: "Not enough stock available", itemId });
  }

  await reserveStockById(product.itemId, currentStock - 1);
  res.json({ status: "Reservation confirmed", itemId });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
