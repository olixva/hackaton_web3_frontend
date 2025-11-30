import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home } from "./pages/home";
import { Alerts } from "./pages/alerts";
import { Profile } from "./pages/profile";
import { Layout } from "./layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Home />} />
      <Route path="alerts" element={<Alerts />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);
