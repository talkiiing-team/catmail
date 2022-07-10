import { Group, List } from "@vkontakte/vkui";
import { useCallback, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  checkedMessages,
  currentSkip,
  currentTotal,
  isLoading,
  MAX_ON_PAGE,
  messages,
  ON_SCREEN,
} from "../state/messages";
import { InlineMessage } from "./InlineMessage";
import { MailBoxControls } from "./MailBoxControls";
import { CubeTransparentIcon } from "@heroicons/react/outline";

let loadingVar = false;

export const MailBox = () => {
  const [messagesState, setMessagesState] = useRecoilState(messages);

  const [checked, setChecked] = useRecoilState(checkedMessages);
  const [skip, setSkip] = useRecoilState(currentSkip);
  const [total, setTotal] = useRecoilState(currentTotal);
  const [loading, setLoading] = useRecoilState(isLoading);

  const listRef = useRef<HTMLDivElement | null>(null);

  const fetchMore = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        import.meta.env.PROD
          ? "https://catmailback.s.ix3.space/messages?skip=" +
              skip +
              "&limit=" +
              ON_SCREEN
          : "http://localhost:7890/messages?skip=" +
              skip +
              "&limit=" +
              ON_SCREEN
      ).then((res) => res.json());

      console.log(res);

      const resultLength = messagesState.length + res.data.length;

      if (resultLength > MAX_ON_PAGE) {
        setMessagesState((v) => {
          const resultArray = [...v, ...res.data];

          const result = resultArray.slice(
            resultLength - MAX_ON_PAGE,
            resultLength
          );

          const children = listRef.current?.children;

          const height = [...(children ?? [])].reduce(
            (prev, current, index) => {
              if (index < resultLength - result.length) {
                return prev + current.getBoundingClientRect().height;
              }

              return prev;
            },
            0
          );

          const previousPos = window.scrollY;

          const nextPos = previousPos - height;
          console.log(nextPos);

          setTimeout(() => window.scroll(0, nextPos), 10);

          return result;
        });
      } else {
        setMessagesState((v) => [...v, ...res.data]);
      }

      setSkip((skip) => skip + res.data.length);
      setTotal(res.total);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [skip, loading]);

  return (
    <Group>
      <MailBoxControls />

      <List className="space-y-4 divide-y divide-gray-400 w-full">
        <div ref={listRef}>
          {messagesState.map((v, i) => (
            <InlineMessage
              key={v.id}
              id={v.id}
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
              subscribe={i === messagesState.length - 1}
              onInViewport={fetchMore}
            />
          ))}
        </div>
      </List>

      {loading && (
        <div className="flex w-full flex-col items-center text-gray-400 my-6">
          <CubeTransparentIcon className="w-20 h-20 animate-spin stroke-1 mb-4" />
          Загружаем еще...
        </div>
      )}
    </Group>
  );
};
