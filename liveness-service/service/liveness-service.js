import {
  RekognitionClient,
  CreateFaceLivenessSessionCommand,
  GetFaceLivenessSessionResultsCommand,
} from "@aws-sdk/client-rekognition";
import dotenv from "dotenv";
import fs from "fs";
import fetch from "node-fetch";

dotenv.config();

const clientConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

const rekognitionClient = new RekognitionClient(clientConfig);

export const createLivenessSessionService = async (input) => {
  try {
    const command = new CreateFaceLivenessSessionCommand(input);
    const response = await rekognitionClient.send(command);
    return response;
  } catch (error) {
    console.error("AWS Rekognition Error: ", error);
    throw new Error("AWS Rekognition service failed");
  }
};

export const getLivenessSessionResultsService = async (sessionId) => {
  try {
    // Generate random MSISDN (8-digit number) and CSID (6-character alphanumeric string)
    const msisdn = generateRandomMSISDN();
    const csid = generateRandomCSID();

    const input = { SessionId: sessionId };
    const command = new GetFaceLivenessSessionResultsCommand(input);
    const response = await rekognitionClient.send(command);

    if (response) {
      // Add msisdn and csid to the response before sending it
      response.MSISDN = msisdn;
      response.CSID = csid;

      await postLivenessData(response);

      return {
        response,
        message:
          "Liveness session results retrieved and image saved successfully",
      };
    } else {
      return {
        message: "Failed to get data from the AWS server",
        flag: false,
      };
    }
  } catch (error) {
    console.error("AWS Rekognition Error: ", error);
    throw new Error("AWS Rekognition service failed");
  }
};

// Function to generate an 8-digit random number as the MSISDN
const generateRandomMSISDN = () => {
  return Math.floor(Math.random() * 90000000) + 10000000; // Range: 10000000 to 99999999
};

// Function to generate a 6-character alphanumeric CSID
const generateRandomCSID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let csid = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    csid += characters[randomIndex];
  }
  return csid;
};

const postLivenessData = async (response) => {
  try {
    const apiUrl =
      // "https://poc-merchant.swifttech.com.np:8000/kyc/api/v1/liveness/post-data";
      "http://10.7.1.36:8000/kyc/api/v1/liveness/post-data";

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("API response:", data);
    } else {
      console.error("API call failed with status:", res.status);
    }
  } catch (error) {
    console.error("Error calling API:", error);
  }
};
