import "dotenv/config";
import express from "express";
import router from "./router/router.js";
import cors from "cors";
const app = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.DATABASE_URL,
    credentials: true,
  }),
);
console.log(process.env.DATABASE_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running`);
});
