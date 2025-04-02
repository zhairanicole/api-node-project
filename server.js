const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./connectionHelper/db");
const customerRoutes = require("./routes/customerRoutes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger definition
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Customer Management API",
      version: "1.0.0",
      description: "API documentation for the customer management system",
      contact: {
        name: "API Support",
        email: "zhaira.a.pacheco@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
  },
  // Include all relevant files for documentation
  apis: ["./routes/*.js", "./model/*.js", "./controller/*.js"],
};

const specs = swaggerJsDoc(options);

app.use(
  "/api-docs",
  swaggerUI.serve,
  // swaggerUI.setup(specs)
  swaggerUI.setup(specs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Customer API Documentation",
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger UI available at http://localhost:${PORT}/api-docs`);
});
