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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Home />}
        errorElement={<h1>Not found!</h1>}
      />
      <Route path="/home" element={<Home />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/profile" element={<Profile />} />
    </>
  )
);
