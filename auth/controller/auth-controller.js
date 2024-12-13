import { createAuthToken } from "../../services/auth-service.js";

const startAuth = (req, res) => {
  const { mobile_number } = req.body;

  if (!mobile_number) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  const token = createAuthToken(mobile_number);

  return res.json({ token });
};

export { startAuth };
