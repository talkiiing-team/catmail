import { Service } from "feathers-memory";
import { z } from "zod";
import { Message } from "../models/message.mjs";

export class MessagesService extends Service {
  constructor() {
    super({
      paginate: {
        default: 20,
        max: 1000,
      },
      multi: true,
    });
  }

  async create(data, params) {
    const validated = await z.array(Message).safeParseAsync(data);

    if (!validated.success) {
      throw new BadRequest(validated.error);
    }

    return super.create(validated.data, params);
  }
}
