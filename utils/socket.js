"use client";

import { io } from "socket.io-client";
const serverUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === "prod"
    ? process.env.NEXT_PUBLIC_SOCKET_IO_Production_SERVER 
    : process.env.NEXT_PUBLIC_SOCKET_IO_Production_SERVER ;
export const socket = io(serverUrl);