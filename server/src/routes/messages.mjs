import { Router } from "express";
import multer from "multer";
import { feathersApp } from "../feathers/index.mjs";

const messagesRouter = Router();

messagesRouter.get("/", async (req, res) => {
  const { skip, limit } = req.query;

  const messages = await feathersApp.services.messages.find({
    query: {
      $skip: parseInt(skip),
      $limit: parseInt(limit),
    },
  });

  res.json(messages);
});

messagesRouter.post("/", multer().single("file"), async (req, res) => {
  const { file } = req;
  const body = file.buffer.toString();

  const inserted = await feathersApp.services.messages.create(JSON.parse(body));

  res.json(inserted);
});

messagesRouter.patch("/", async (req, res) => {
  const { body } = req; // { in: [1, 2, 3] or "*", do: { read: true } }

  const patched = await feathersApp.services.messages.patch(null, body.do, {
    query:
      body.in === "*"
        ? {}
        : {
            id: {
              $in: body.in,
            },
          },
  });

  if (patched.length > 20) {
    return res.json([]);
  }

  res.json(patched);
});

export { messagesRouter };
