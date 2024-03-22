import mongoose from "mongoose";

const { Schema } = mongoose;

const pairSchema = new Schema({
  chainId: String,
  dexId: String,
  url: String,
  pairAddress: String,
  baseToken: {
    address: String,
    name: String,
    symbol: String,
  },
  quoteToken: {
    address: String,
    name: String,
    symbol: String,
  },
  priceNative: String,
  priceUsd: String,
  txns: {
    m5: {
      buys: Number,
      sells: Number,
    },
    h1: {
      buys: Number,
      sells: Number,
    },
    h6: {
      buys: Number,
      sells: Number,
    },
    h24: {
      buys: Number,
      sells: Number,
    },
  },
  volume: {
    h24: Number,
    h6: Number,
    h1: Number,
    m5: Number,
  },
  priceChange: {
    m5: Number,
    h1: Number,
    h6: Number,
    h24: Number,
  },
  liquidity: {
    usd: Number,
    base: Number,
    quote: Number,
  },
  pairCreatedAt: Date,
  info: {
    imageUrl: String,
    websites: [],
    socials: [],
  },
});

const Pair = mongoose.model("Pair", pairSchema);

export { Pair };
