require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middleware/globalErrorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger");
const { 
    authenRoutes,
    userRoutes,
    scanRoutes
} = require("./routes");

const app = express();
app.use(helmet(
    {
        contentSecurityPolicy: false,
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: process.env.FE_URL,
  credentials: true
}))

app.use("/api", authenRoutes);
app.use("/api/user", userRoutes);
app.use("/api/scans", scanRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

module.exports = app;
