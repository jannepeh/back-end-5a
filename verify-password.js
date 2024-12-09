const bcrypt = require("bcryptjs");

const testPassword = async () => {
  const password = "password123"; // The plaintext password
  const storedHash = "$2a$10$HASHED_PASSWORD_HERE"; // Replace with the hash from the database

  const isMatch = await bcrypt.compare(password, storedHash);

  if (isMatch) {
    console.log("The password matches the stored hash!");
  } else {
    console.log("The password does NOT match the stored hash.");
  }
};

testPassword();
