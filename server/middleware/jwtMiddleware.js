// middleware/jwtMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      "a715cc5750372437adc174d2460f7f436cbf7473f2dc1574965593130682a3839f92a3a34edbb7877fc191acf84bb4895f28ebec2e3a8fbe939955f22502dff3c021f9208878107daa744f8fe616418ad4e389a392af132a1860a549d09620fa1fd2349256ddcab2f01f278db53a98e5773b463c76941c7bc17f5d8d805415adbaf17982faf14a9326293a8222f4bf58ca421d698e6a009c13e2d0a222acfd89072d741423d60d40dfb68db5deda2cba9f7cffdca0a9d97c6fb442c94b5592ab1a121e7b11147325e4a749cd037fe95128c0a36827b908be47bb13899cd018c7485a9415cadb677a9f08bf4adc8802fa296be7cb07343e71d37a13878f7f5bf0"
    ); // Secret key to verify the token
    req.user = decoded; // Attach the user info to the request object
    next();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
