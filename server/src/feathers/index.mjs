import feathers from "@feathersjs/feathers";
import { MessagesService } from "./messages.service.mjs";

const feathersApp = feathers();

feathersApp.use("messages", new MessagesService());

export { feathersApp };
