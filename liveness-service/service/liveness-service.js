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
    const input = { SessionId: sessionId };
    const command = new GetFaceLivenessSessionResultsCommand(input);
    const response = await rekognitionClient.send(command);

    // if (response) {
    //   await postLivenessData(response);

    //   const firstImageBytes = response.ReferenceImage.Bytes;
    //   if (firstImageBytes) {
    //     const buffer = Buffer.from(Object.values(firstImageBytes));

    //     const filePath = `datastore/abcd${Math.random()
    //       .toString()
    //       .replace(".", "")}audit-image-2.jpg`;
    //     fs.writeFileSync(filePath, buffer);
    //   }

    //   return {
    //     response,
    //     message:
    //       "Liveness session results retrieved and first audit image saved successfully",
    //   };
    // } else {
    //   return null;
    // }
    return {
      message: "session fetched successfully",
      result: response,
    };
  } catch (error) {
    console.error("AWS Rekognition Error: ", error);
    throw new Error("AWS Rekognition service failed");
  }
};

const postLivenessData = async (response) => {
  try {
    const apiUrl = "http://0.0.0.0:8000/api/liveness/post-data";
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
