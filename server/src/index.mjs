import express from "express";
import { messagesRouter } from "./routes/messages.mjs";
import cors from "cors";

const app = express();

app.use(cors("*"));

app.use(express.json());

app.use("/messages", messagesRouter);

app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not found: ${req.originalUrl}`);
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV !== "production" && err.stack,
  });
});

app.listen(7890, () => {
  console.log("Listening on http://localhost:7890/");
});
