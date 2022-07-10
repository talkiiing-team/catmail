import express from "express";
import { messagesRouter } from "./routes/messages.mjs";
import cors from "cors";

const app = express();

app.use(cors("*"));

app.use(express.json());

app.use("/messages", messagesRouter);

app.listen(9000, () => {
  console.log("Listening on http://localhost:9000/");
});
