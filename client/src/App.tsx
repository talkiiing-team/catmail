import { useEffect, useState } from "react";
import {
  AppRoot,
  Button,
  CellButton,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  SplitCol,
  SplitLayout,
  useAdaptivity,
  View,
  ViewWidth,
} from "@vkontakte/vkui";
import { MailBox } from "./components/MailBox";
import { Icon28AddOutline } from "@vkontakte/icons";
import { UploadForm } from "./components/UploadForm";
import { useRecoilState } from "recoil";
import { messages } from "./state/messages";
import { themeStore } from "./state/theme";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [messagesState, setMessagesState] = useRecoilState(messages);

  const [theme, setTheme] = useRecoilState(themeStore);

  const { viewWidth } = useAdaptivity();

  useEffect(() => {
    const className =
      theme === "cats"
        ? "cats-theme"
        : theme === "dogs"
        ? "dogs-theme"
        : theme === "dark"
        ? "dark-theme"
        : theme === "contrast"
        ? "contrast-theme"
        : "";

    document.querySelector("html").className = className;
  }, [theme]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:9000/messages").then((res) =>
        res.json()
      );

      setMessagesState(res.data);
    })();
  }, []);

  return (
    <SplitLayout header={<PanelHeader separator={false} />}>
      <SplitCol spaced={viewWidth > ViewWidth.MOBILE}>
        <View activePanel="main" className="h-full">
          <Panel id="main" className="h-full w-full">
            <PanelHeader>{theme === "dogs" ? "Dog" : "Cat"}Mail</PanelHeader>

            <Group>
              {isFormOpen ? (
                <UploadForm />
              ) : (
                <CellButton
                  onClick={() => setIsFormOpen(true)}
                  before={<Icon28AddOutline />}
                >
                  Загрузить
                </CellButton>
              )}
            </Group>

            <MailBox />
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}

export default App;
