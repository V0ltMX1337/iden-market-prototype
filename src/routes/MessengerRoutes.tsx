import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const TrivoMessengerLanding = lazy(() => import("../pages/messenger/TrivoMessengerLanding"));
const TrivoMessengerMain = lazy(() => import("../pages/messenger/TrivoMessengerMain"));
const TrivoMessengerChat = lazy(() => import("../pages/messenger/TrivoMessengerChat"));
const TrivoMessengerChannel = lazy(() => import("../pages/messenger/TrivoMessengerChannel"));

const MessengerRoutes = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <Routes>
      <Route path="/messenger" element={<TrivoMessengerLanding />} />
      <Route path="/messenger/main" element={<TrivoMessengerMain />} />
      <Route path="/messenger/chat/:chatId" element={<TrivoMessengerChat />} />
      <Route path="/messenger/channel/:channelId" element={<TrivoMessengerChannel />} />
    </Routes>
  </Suspense>
);

export default MessengerRoutes;