import {
  Icon12Circle,
  Icon28ArrowUpCircleOutline,
  Icon28BrushOutline,
  Icon28ChatsOutline,
  Icon28LockOutline,
  Icon28MoneyCircleOutline,
} from "@vkontakte/icons";
import {
  Avatar,
  Cell,
  Checkbox,
  ContentCard,
  SimpleCell,
  SizeType,
} from "@vkontakte/vkui";
import { DateTime } from "luxon";

type InlineMessageProps = {
  authorName: string;
  avatar: string;
  message: string;
  theme: string;
  read: boolean;
  checked: boolean;
  file?: {
    preview: string;
    filePath: string;
  };
  onChecked: CallableFunction;
  date: string;
  finance: boolean;
  important: boolean;
  newThread: boolean;
  confidence: boolean;
  flag: boolean;
};

export const InlineMessage = ({
  authorName,
  message,
  theme,
  read,
  avatar,
  checked,
  file,
  date,
  onChecked,
  finance,
  newThread,
  important,
  confidence,
  flag,
}: InlineMessageProps) => {
  const currentDate = DateTime.fromISO(date);
  const displayDate = currentDate.toFormat("dd.MM.yyyy");

  return (
    <SimpleCell
      className={`group ${!file ? "h-10" : ""} ${
        checked ? "ring-8 ring-blue-500" : ""
      } relative`}
    >
      <div className="flex flex-row space-x-3 text-gray-400 items-center text-sm">
        <div
          className={`${
            !read ? "font-medium text-primary-text" : ""
          } w-72 flex-shrink-0 truncate grid grid-cols-[2rem,3rem,1fr] items-center`}
        >
          <div>{!read && <Icon12Circle className="mr-3 text-blue-500" />}</div>
          <div
            className={`relative opacity-100 group-hover:opacity-0 ${
              checked ? "!opacity-0" : ""
            } transition-all duration-200`}
          >
            <Avatar src={avatar} size={28} />
          </div>
          {authorName}
        </div>
        <div
          className={`${
            !read ? "font-medium text-primary-text" : ""
          } truncate max-w-2xl`}
        >
          {theme}
        </div>
        <div className="text-gray-400 truncate">{message}</div>

        {finance && <Icon28MoneyCircleOutline className="text-green-500" />}
        {important && <Icon28ArrowUpCircleOutline className="text-red-500" />}
        {newThread && <Icon28ChatsOutline className="text-blue-500" />}
        {confidence && <Icon28LockOutline className="text-amber-500" />}
        {flag && <Icon28BrushOutline className="text-rose-500" />}

        <div>{displayDate}</div>

        <div
          className={`absolute left-7 opacity-0 group-hover:opacity-100 ${
            checked ? "!opacity-100" : ""
          } transition-all duration-200`}
        >
          <Checkbox
            checked={checked}
            onChange={(e) => {
              e.stopPropagation();
              onChecked();
            }}
          />
        </div>
      </div>

      {file && (
        <div className="mt-3 flex flex-row items-center rounded-lg space-x-5 ml-[18.5rem]">
          <img
            src={file.preview}
            className="w-14 h-14 object-cover rounded-lg"
          />
          <div className="text-gray-400">{file.filePath}</div>
        </div>
      )}
    </SimpleCell>
  );
};
