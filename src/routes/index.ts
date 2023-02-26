
import React from "react";
import { AddWord, Home } from "../pages";

interface IRoutes {
  path: string;
  element: React.FC;
}

export const publicRoutes: IRoutes[] = [
  { path: "/", element: Home },
  { path: "/addWord", element: AddWord },
];

export const privateRoutes = [];
