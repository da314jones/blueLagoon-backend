const jwt = require('jsonwebtoken');
require("dotenv").config()

const generateResetToken = (email) => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
    return token;
};

// Example usage
// console.log("JWT Secret:", process.env.JWT_SECRET);
const token = generateResetToken('djonesgrace@gmail.com');
console.log(token); // Use this token for testing
