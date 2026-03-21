import "dotenv/config";
import { config } from "dotenv";
import express from "express";
import router from "./router/router.js";
import cors from "cors";
import { envPath } from "./dotenvconfig.js";

const app = express();

config({ path: envPath });

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running`);
});
