import express from "express";
import bodyParser from "body-parser";
import {
  connect,
  closeConnection,
  create,
  update,
  deleteData,
  read,
} from "./mongoDBMethods.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connect();

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

//create operation
app.post("/create", async (req, res) => {
  try {
    const pairData = req.body;
    await create(pairData);
    res.status(201).send("Pair added successfully");
  } catch (error) {
    console.error("Error while adding pair:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Read operation
app.get("/read", async (req, res) => {
  try {
    const pairAddress = req.query.pairAddress;
    const pair = await read(pairAddress);
    if (pair) {
      res.status(200).send(pair);
    } else {
      res.status(404).send("Pair not found");
    }
  } catch (error) {
    console.error("Error while reading pair:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Update operation
app.put("/update", async (req, res) => {
  try {
    const pairAddress = req.query.pairAddress;
    const newData = req.body;
    console.log(pairAddress);
    await update(pairAddress, newData);
    console.log(`Updated with new data ${newData}`);
    res.status(200).send("Pair updated successfully");
  } catch (error) {
    console.error("Error while updating pair:", error);
    res.status(500).send("Internal Server Error");
  }
});

//delete operation
app.delete("/delete", async (req, res) => {
  try {
    const pairAddress = req.query.pairAddress;
    await deleteData(pairAddress);
    res.status(200).send("Pair deleted successfully");
  } catch (error) {
    console.error("Error while deleting pair:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for getting price and volume data
app.get("/data", async (req, res) => {
  try {
    const pairAddress = req.query.pairAddress;
    const pair = await read(pairAddress);
    if (pair) {
      const { priceNative, priceUsd, volume } = pair;
      const data = {
        priceNative,
        priceUsd,
        volume,
      };
      res.status(200).json(data);
    } else {
      res.status(404).send("Pair not found");
    }
  } catch (error) {
    console.error("Error while getting price and volume data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is listening at port ${port}`);
});

process.on("SIGINT", () => {
  closeConnection();
  process.exit();
});
