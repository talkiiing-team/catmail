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
import {
  currentSkip,
  currentTotal,
  MAX_ON_PAGE,
  messages,
} from "./state/messages";
import { themeStore } from "./state/theme";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [messagesState, setMessagesState] = useRecoilState(messages);
  const [skip, setSkip] = useRecoilState(currentSkip);
  const [total, setTotal] = useRecoilState(currentTotal);

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

    document.querySelector("html")!.className = className;
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") ?? "cats";

    setTheme(savedTheme);

    localStorage.setItem("theme", savedTheme);
    (async () => {
      try {
        const res = await fetch(
          import.meta.env.PROD
            ? "https://catmailback.s.ix3.space/messages?limit=" + MAX_ON_PAGE
            : "http://localhost:7890/messages?limit=" + MAX_ON_PAGE
        ).then((res) => res.json());

        console.log(res);

        setMessagesState(res.data);
        setSkip(res.data.length);
        setTotal(res.total);
      } catch (e) {
        console.log(e);
      }
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
