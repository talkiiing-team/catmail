import { Group, List } from "@vkontakte/vkui";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
// import data from "../data/small.json";
import { checkedMessages, messages } from "../state/messages";
import { InlineMessage } from "./InlineMessage";
import { MailBoxControls } from "./MailBoxControls";

export const MailBox = () => {
  const [messagesState, setMessagesState] = useRecoilState(messages);

  const [checked, setChecked] = useRecoilState(checkedMessages);

  console.log(messagesState);
  return (
    <Group>
      <MailBoxControls />

      <List className="space-y-4 divide-y divide-gray-400">
        {messagesState.map((v) => (
          <InlineMessage
            key={v.id}
            authorName={v.author.name}
            theme={v.title}
            message={v.text}
            read={v.read}
            avatar={v.author.avatar}
            file={v.file}
            date={v.dateTime}
            finance={v.finance}
            newThread={v.newThread}
            confidence={v.confidence}
            flag={v.flag}
            important={v.important}
            checked={checked.includes(v.id)}
            onChecked={() => {
              const id = v.id;

              if (!checked.includes(id)) {
                setChecked((arr) => [...arr, id]);
              } else {
                setChecked((arr) => arr.filter((mail) => mail !== id));
              }
            }}
          />
        ))}
      </List>
    </Group>
  );
};
