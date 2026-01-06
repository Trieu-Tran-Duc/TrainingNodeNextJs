const bcrypt = require("bcrypt");

const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
    refreshToken: null
  },
  {
    id: 2,
    username: "user",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    refreshToken: null
  }
];

module.exports = users;
