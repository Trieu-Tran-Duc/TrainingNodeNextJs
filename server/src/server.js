const app = require("./app");

// app.listen(process.env.PORT, () =>
//   console.log(`Server running on port ${process.env.PORT}`)
// );
app.listen(4000, () => {
  console.log("API running on port 4000");
});