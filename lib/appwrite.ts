import {
  Client,
  Account,
  Databases,
  Avatars,
  Storage,
  OAuthProvider,
  Query,
} from "appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

// ------------------ CONFIG ------------------
export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID!,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID!,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID!,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID!,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
};

// ------------------ CLIENT ------------------
export const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);

// ------------------ OAUTH LOGIN ------------------
export async function login() {
  try {
    const redirectUri = Linking.createURL("auth-callback"); // deep link back to app

    // Use JS SDK mobile-friendly method
    const oauthUrl = account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUri,
      redirectUri
    );

    const browserResult = await openAuthSessionAsync(oauthUrl as string, redirectUri);

    if (browserResult.type !== "success") {
      throw new Error("OAuth login cancelled or failed");
    }

    // Parse the returned URL for session info
    const url = new URL(browserResult.url);
    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");

    if (!userId || !secret) {
      throw new Error("Failed to get OAuth session data");
    }

    // Complete the session
    await account.createSession(userId, secret);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// ------------------ LOGOUT ------------------
export async function logout() {
  try {
    return await account.deleteSessions();
  } catch (err) {
    console.error(err);
    return false;
  }
}

// ------------------ CURRENT USER ------------------
export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name || "");
      return { ...result, avatar: userAvatar.toString() };
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// ------------------ PROPERTIES ------------------
export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId,
      config.propertiesCollectionId,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );
    return result.documents;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery: any[] = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All") buildQuery.push(Query.equal("type", filter));

    if (query)
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );

    if (limit) buildQuery.push(Query.limit(limit));

    const result = await databases.listDocuments(
      config.databaseId,
      config.propertiesCollectionId,
      buildQuery
    );

    return result.documents;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// ------------------ GET PROPERTY BY ID ------------------
export async function getPropertyById({ id }: { id: string }) {
  try {
    return await databases.getDocument(
      config.databaseId,
      config.propertiesCollectionId,
      id
    );
  } catch (err) {
    console.error(err);
    return null;
  }
}
