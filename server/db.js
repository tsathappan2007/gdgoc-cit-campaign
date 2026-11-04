import dns from 'dns';
import { MongoClient } from 'mongodb';

// Configure reliable DNS servers (Google / Cloudflare) to prevent Windows / ISP `querySrv ECONNREFUSED` issues
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // Ignore in restricted environments
}

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
    
    global._mongoClientPromise = client.connect().catch((err) => {
      // Clear cached promise on failure so subsequent attempts can retry rather than latching onto the failure
      global._mongoClientPromise = null;
      throw err;
    });
  }

  const connectedClient = await global._mongoClientPromise;
  return connectedClient.db(dbName);
}
