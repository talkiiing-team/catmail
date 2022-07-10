import { Icon24Document, Icon24GlobeOutline } from "@vkontakte/icons";
import { Button, File, FormItem, FormLayout } from "@vkontakte/vkui";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { messages } from "../state/messages";

export const UploadForm = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const setMessages = useSetRecoilState(messages);

  const sendFile = async () => {
    console.log(fileRef.current?.value);
    const data = new FormData();

    if (fileRef.current?.files) {
      const file = fileRef.current?.files.item(0);

      if (file) {
        data.append("file", file);
        const res = await fetch("http://localhost:9000/messages", {
          method: "POST",
          body: data,
        }).then((v) => v.json());
        console.log(res);

        setMessages((v) => [...v, ...res]);
      }
    }
  };

  return (
    <FormLayout>
      <FormItem top="Загрузите JSON">
        <File getRef={fileRef} size="l" before={<Icon24Document />} />
      </FormItem>

      <FormItem>
        <Button size="l" before={<Icon24GlobeOutline />} onClick={sendFile}>
          Загрузить
        </Button>
      </FormItem>
    </FormLayout>
  );
};
