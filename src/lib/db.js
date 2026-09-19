import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn("MONGODB_URI is not configured; database routes will return 503.");
}

const globalForMongo = globalThis;
const clientPromise = uri
  ? (globalForMongo.__wanderlastMongoClientPromise ??= new MongoClient(uri).connect())
  : null;

export async function getDatabase() {
  if (!clientPromise) {
    throw new Error("MONGODB_URI is not configured");
  }
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "wanderlast");
}
