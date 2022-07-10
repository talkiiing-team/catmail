import { z } from "zod";
import { Author } from "./author.mjs";
import { AwkwardDateTime } from "./dateTime.mjs";

export const Message = z.object({
  author: Author.default({
    avatar: "https://picsum.photos/64/64",
    email: "default@email.com",
    name: "Дефолтный Автор",
  }),
  dateTime: AwkwardDateTime.default("08.08.2020"),

  text: z.string().default("Тут мог быть ваш текст"),
  title: z.string().default("Тут могла быть ваша тема"),

  file: z
    .object({
      filePath: z.string().default("file.jpg"),
      preview: z.string().default("https://picsum.photos/64/64"),
    })
    .optional(),

  confidence: z.boolean().default(false),
  finance: z.boolean().default(false),
  flag: z.boolean().default(false),
  important: z.boolean().default(false),
  newThread: z.boolean().default(false),
  read: z.boolean().default(false),
});
