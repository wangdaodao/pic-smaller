import { ConfigProvider, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { configure } from "mobx";
import ReactDOM from "react-dom/client";
import { gstate } from "./global";
import { initHistoryLogic } from "./history";
import { ContextAction } from "./ContextAction";
import { initLangSetting } from "./locale";
import { Analytics } from "@vercel/analytics/react";

const App = observer(() => {
  return (
    <ConfigProvider
      locale={gstate.locale?.antLocale}
      theme={{
        token: {
          borderRadius: 0,
          borderRadiusSM: 0,
          borderRadiusLG: 0,
          colorPrimary: "#1da565",
          colorLink: "#1da565",
          colorSuccess: "#1da565",
        },
      }}
    >
      <ContextAction />
      <Analytics />
      {gstate.page}
      {gstate.loading && <Spin fullscreen spinning tip={gstate.loadingTip} />}
    </ConfigProvider>
  );
});

export async function runApp() {
  configure({
    enforceActions: "never",
    useProxies: "ifavailable",
  });

  await initLangSetting();
  initHistoryLogic();

  const root = document.getElementById("root") as HTMLElement;
  ReactDOM.createRoot(root).render(<App />);
}
