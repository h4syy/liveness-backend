import {
  createLivenessSessionService,
  getLivenessSessionResultsService,
} from "../services/liveness-service.js";

export const createLivenessSession = async (req, res) => {
  try {
    console.log("Liveness request from IP: ", req.ip);

    const { kmsKeyId, auditImagesLimit, clientRequestToken } = req.body;

    // Input validation can be done here
    if (!clientRequestToken) {
      return res.status(400).json({
        success: false,
        message: "ClientRequestToken is required",
      });
    }

    const input = {
      KmsKeyId: kmsKeyId || null, // Use null if not provided
      Settings: {
        AuditImagesLimit: auditImagesLimit || 4, // Optional, default to 4 if not provided
      },
      ClientRequestToken: clientRequestToken,
    };

    const response = await createLivenessSessionService(input);

    res.status(200).json({
      success: true,
      message: "Liveness session created successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error creating liveness session:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create liveness session",
      error: error.message,
    });
  }
};

export const getLivenessSessionResults = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required",
      });
    }

    const response = await getLivenessSessionResultsService(sessionId);

    if (response) {
      return res.status(200).json({
        success: true,
        message:
          "Liveness session results retrieved and first audit image saved successfully",
        data: response,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No audit images found in the session results",
      });
    }
  } catch (error) {
    console.error("Error retrieving liveness session results:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve liveness session results",
      error: error.message,
    });
  }
};
