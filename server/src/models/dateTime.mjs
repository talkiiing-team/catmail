import { z } from "zod";
import { DateTime } from "luxon";

const THIS_YEAR_REGEX = /^\d\d? [а-яё]+$/;

export const AwkwardDateTime = z.string().transform((str) => {
  console.log(str, THIS_YEAR_REGEX.test(str));
  return DateTime.fromFormat(
    str,
    THIS_YEAR_REGEX.test(str) ? "d MMMM" : "dd.mm.yyyy",
    {
      locale: "ru",
    }
  ).toISODate();
});
