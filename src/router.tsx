// router.tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Bills } from "./pages/bills";
import { Home } from "./pages/home";
import { Messages } from "./pages/messages";
import { Profile } from "./pages/profile";
import { Layout } from "./layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Home />} />

      <Route path="home" element={<Home />} />
      <Route path="messages" element={<Messages />} />
      <Route path="bills" element={<Bills />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);
