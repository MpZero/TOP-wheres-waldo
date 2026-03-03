import "dotenv/config";
import express from "express";
import router from "./router/router.js";
import cors from "cors";
const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(
  cors({
    // eslint-disable-next-line no-undef
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
