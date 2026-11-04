import { MongoClient } from 'mongodb';

export function isMongoConfigured() {
  const uri = process.env.MONGODB_URI;
  return Boolean(uri && uri.trim().length > 0);
}

export async function getDatabase() {
  if (!isMongoConfigured()) {
    return null;
  }

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'gdgoc_campaign';

  // Serverless Connection Pooling pattern:
  // In development and production serverless, reuse clientPromise across invocations
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    global._mongoClientPromise = client.connect();
  }

  const connectedClient = await global._mongoClientPromise;
  return connectedClient.db(dbName);
}
