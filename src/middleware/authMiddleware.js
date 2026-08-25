import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // read the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Get token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach decoded token data (userId) to req.user
    req.user = decoded;

    // 5. Continue to the controller
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;