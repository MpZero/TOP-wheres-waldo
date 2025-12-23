import express from "express";
import router from "./router/router.js";
import cors from "cors";
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
