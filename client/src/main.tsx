import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import App from "./App";
import "./index.css";
import "@vkontakte/vkui/dist/vkui.css";
import "./themes.css";

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot className="h-full">
          <RecoilRoot>
            <DebugObserver />
            {/* <BrowserRouter> */}
            {/* <Router /> */}
            <App />
            {/* </BrowserRouter> */}
          </RecoilRoot>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")!
);
