import mongoose from "mongoose";
import { Pair } from "./mongoDBConnection.js";
import env from "dotenv";

env.config();

const uri = process.env.URL;

async function connect() {
  try {
    mongoose.connect(uri);
    console.log("Connected to Database");
  } catch (err) {
    console.error(`Error in connecting to Database ${err}`);
  }
}

async function closeConnection() {
  try {
    mongoose.connection.close();
    console.log(`Database disconnected`);
  } catch (err) {
    console.error(`Error while disconnecting to Database ${err}`);
  }
}

// Create operation
async function create(data) {
  try {
    const pair = new Pair(data);
    await pair.save();
    console.log("Pair added successfully:", data);
  } catch (err) {
    console.error("Error while adding new pair:", err);
  }
}

// Read operation
async function read(pairAddress) {
  try {
    const pair = await Pair.findOne({ pairAddress });
    if (pair) {
      console.log("Found pair:", pair);
      return pair;
    } else {
      console.log("Pair not found.");
    }
  } catch (err) {
    console.error("Error while fetching pair:", err);
  }
}

//update operation
async function update(pairAddress, newData) {
  try {
    const pair = await Pair.findOneAndUpdate({ pairAddress }, newData, {
      new: true,
    });
    if (pair) {
      console.log("Pair updated successfully:", pair);
    } else {
      console.log("Pair not found.");
    }
  } catch (err) {
    console.error("Error while updating pair:", err);
  }
}

// Delete operation
async function deleteData(pairAddress) {
  try {
    const pair = await Pair.findOneAndDelete({ pairAddress });
    if (pair) {
      console.log("Pair deleted successfully:", pair);
    } else {
      console.log("Pair not found.");
    }
  } catch (err) {
    console.error("Error while deleting pair:", err);
  }
}

export { connect, closeConnection, create, update, deleteData, read };
