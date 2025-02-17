const adminAuth = (req, res, next) => {
    const apiKey = req.header("x-api-key");
    if (apiKey !== process.env.ADMIN_API_KEY) {
      console.log("Unauthorized Admin Access");
      return res.status(403).json({ message: "Unauthorized Admin Access" });
    }
    next();
  };
  
  export default adminAuth;
  