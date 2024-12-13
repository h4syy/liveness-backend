import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;

const createJWT = (mobile_number) => {
  const payload = {
    sub: mobile_number,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 10 * 60, // Token expires in 10 minutes
    iss: "smart-identity-verification",
    aud: "liveness-check-service",
  };

  return jwt.sign(payload, secretKey);
};

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  jwt.verify(
    token,
    secretKey,
    {
      audience: "liveness-check-service",
      issuer: "smart-identity-verification",
    },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      req.user = decoded;
      next();
    }
  );
};

export { createJWT, verifyJWT };
