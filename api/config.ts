import Constants from 'expo-constants';
import { Account, Client, Databases, Graphql } from 'react-native-appwrite';

// Get Appwrite configuration from expo constants
const APPWRITE_PLATFORM = "com.shamTruck.shamTruck";
const APPWRITE_PROJECT_ID = "68717034002ea25cabc2";
const APPWRITE_URL = "https://fra.cloud.appwrite.io/v1";
const APPWRITE_DATABASE_ID = Constants.expoConfig?.extra?.APPWRITE_DATABASE_ID || "68724035002cd5c6269d";

// Validate that all required environment variables are present
if (!APPWRITE_URL || !APPWRITE_PROJECT_ID || !APPWRITE_PLATFORM || !APPWRITE_DATABASE_ID) {
    console.error('Missing Appwrite configuration:', {
        APPWRITE_URL: !!APPWRITE_URL,
        APPWRITE_PROJECT_ID: !!APPWRITE_PROJECT_ID,
        APPWRITE_PLATFORM: !!APPWRITE_PLATFORM,
        APPWRITE_DATABASE_ID: !!APPWRITE_DATABASE_ID
    });
    throw new Error('Appwrite configuration is incomplete. Please check your app.json extra section.');
}

export const client: Client = new Client();
client
    .setEndpoint(APPWRITE_URL)
    .setProject(APPWRITE_PROJECT_ID)
    .setPlatform(APPWRITE_PLATFORM);

export const account: Account = new Account(client);
export const db = new Databases(client);
export const graphql = new Graphql(client);

export default { client, account, db, graphql };