import React from "react";
import { Home, DonateWord, Management } from "../pages";

interface IRoutes {
  path: string;
  element: React.FC;
}

export const publicRoutes: IRoutes[] = [
  { path: "/", element: Home },
  { path: "/dword", element: DonateWord },
];

export const privateRoutes = [{ path: "/management", element: Management }];
