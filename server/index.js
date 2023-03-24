import express from "express";
import { config } from "dotenv";
config();
const app = express();
const port = process.env.APP_PORT || 5000;
import cors from "cors";

// middleware
import sampleMiddleware from "./middleware/sampleMiddleware.js";

// database
import connect from "./db/connect.js";

// routes
import customers from "./routes/customers.js";

app.use(express.json());
app.use(cors());

// route || endPoint
app.get("/", (request, response) => {
  response.send("hello, welcome to my web service.");
});
app.use("/customers", customers);
// app.use(express.urlencoded({ extended: false }));
// app.use(sampleMiddleware);

try {
  connect(process.env.MONGO_URI).then(() => {
    console.log("connected to database");
  });
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
