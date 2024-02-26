// index.ts

import { NeynarAPIClient, isApiErrorResponse } from "@neynar/nodejs-sdk";
import { AxiosError } from "axios";

import { config } from "dotenv"; // Import config from dotenv

// Load environment variables from .env file
config(); // Call config to load environment variables

// Get your API key from environment variables
const apiKey = process.env.NEYNAR_API_KEY;

// Check if API key is present
if (!apiKey) {
  console.error("API key is missing in the environment variables.");
  process.exit(1); // Exit with error
}

// Instantiate the client with API key
const client = new NeynarAPIClient(apiKey);

(async () => {
  try {
    // 19960 (Required*) => fid of user  we are looking for
    // 191 (Optional) => fid of the viewer
    // Get more info @ https://docs.neynar.com/reference/user-v1
    const user = await client.lookupUserByFid(19960, 191);

    // Stringify and log the response
    console.log(JSON.stringify(user));
  } catch (error) {
    // isApiErrorResponse can be used to check for Neynar API errors
    if (isApiErrorResponse(error)) {
      console.log("API Error", error.response.data);
    } else {
      console.log("Generic Error", error);
    }
  }
})();
