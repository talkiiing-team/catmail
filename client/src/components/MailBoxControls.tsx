import { Button, ButtonGroup, Group, NativeSelect } from "@vkontakte/vkui";
import { useRecoilState } from "recoil";
import { checkedMessages, messages } from "../state/messages";
import { themeStore } from "../state/theme";

export const MailBoxControls = () => {
  const [messagesState, setMessagesState] = useRecoilState(messages);
  const [checked, setChecked] = useRecoilState(checkedMessages);
  const [theme, setTheme] = useRecoilState(themeStore);

  const patch = async (read: boolean) => {
    try {
      const res = await fetch(
        import.meta.env.PROD
          ? "https://catmailback.s.ix3.space/messages"
          : "http://localhost:7890/messages",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            in: checked,
            do: {
              read,
            },
          }),
        }
      ).then((res) => res.json());

      setMessagesState((arr) =>
        arr.map((v) => {
          if (checked.includes(v.id)) {
            const correspondingReturned = res.find((t) => t.id === v.id);
            return correspondingReturned!;
          }

          return v;
        })
      );
    } catch (e) {
      console.log(e);
    }

    setChecked([]);
  };

  const disabled = checked.length === 0;

  const markAll = () => {
    setChecked(messagesState.map((v) => v.id));
  };

  const unmarkAll = () => {
    setChecked([]);
  };

  const readAll = async () => {
    const res = await fetch(
      import.meta.env.PROD
        ? "https://catmailback.s.ix3.space/messages"
        : "http://localhost:7890/messages",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          in: "*",
          do: {
            read: true,
          },
        }),
      }
    ).then((res) => res.json());

    setMessagesState((arr) => arr.map((v) => ({ ...v, read: true })));

    setChecked([]);
  };

  return (
    <ButtonGroup className="mb-4">
      <Button size="l" onClick={() => patch(true)} disabled={disabled}>
        ?? ??????????????????????
      </Button>
      <Button size="l" onClick={() => patch(false)} disabled={disabled}>
        ?? ??????????????????????????
      </Button>

      <Button size="l" onClick={disabled ? markAll : unmarkAll}>
        {disabled ? "???????????????? ??????????????" : "?????????? ??????????????????"}
      </Button>

      <Button size="l" onClick={readAll}>
        ?????????????????? ??????
      </Button>

      <NativeSelect
        onChange={(e) => {
          setTheme(e.target.value);
          localStorage.setItem("theme", e.target.value);
        }}
        value={theme}
      >
        <option value="light">??????????????</option>
        <option value="dark">????????????</option>
        <option value="cats">????????????</option>
        <option value="dogs">??????????????</option>
        <option value="contrast">????????????????</option>
      </NativeSelect>
    </ButtonGroup>
  );
};
