import React from "react";
import { Home, DonateWord, Management,MyWord } from "../pages";

interface IRoutes {
  path: string;
  element: React.FC;
}

export const publicRoutes: IRoutes[] = [
  { path: "/", element: Home },
  { path: "/dword", element: DonateWord },
  { path: "/myWord", element: MyWord },
  
];

export const privateRoutes = [{ path: "/management", element: Management }];
