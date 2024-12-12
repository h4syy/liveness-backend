import { createJWT } from "../middlewares/auth.js";
const createAuthToken = (mobile_number) => {
  return createJWT(mobile_number);
};

export { createAuthToken };
