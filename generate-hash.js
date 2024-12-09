const bcrypt = require("bcryptjs");

const hashPassword = async () => {
  const hashedPassword = await bcrypt.hash("password123", 10);
  console.log("New Hashed Password:", hashedPassword);
};

hashPassword();
