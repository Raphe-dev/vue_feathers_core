//import authenticationClient from "@feathersjs/authentication-client";
//import { feathers, type FeathersService } from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import { createPiniaClient, useInstanceDefaults } from "feathers-pinia";
import { createClient } from "project-template-backend";
import io from "socket.io-client";

import { pinia } from "./modules/pinia";

const host = (import.meta.env.VITE_MY_API_URL as string) || "http://localhost:3030";
const socket = io(host, { transports: ["websocket"] });

// export const feathersClient = feathers<Record<string, FeathersService>>()
//   .configure(socketio(socket))
//   .configure(authenticationClient({ storage: window.localStorage }));

export const feathersClient = createClient(socketio(socket), { storage: window.localStorage });

export const api = createPiniaClient(feathersClient, {
  pinia,
  idField: "_id",
  // optional
  ssr: false,
  whitelist: [],
  paramsForServer: [],
  syncWithStorage: true,
  skipGetIfExists: true,
  customSiftOperators: {},
  setupInstance(data) {
    return data;
  },
  customizeStore() {
    return {};
  },
  services: {
    boards: {
      setupInstance(data) {
        return useInstanceDefaults(
          {
            backgroundImage: "https://picsum.photos/200/200",
          },
          data,
        );
      },
    },
    columns: {
      setupInstance(data) {
        return useInstanceDefaults(
          {
            created_at: Date.now().toLocaleString(),
            color: "#fff",
          },
          data,
        );
      },
    },
  },
});

export function useFeathers() {
  return { api };
}

export const useFeathersService = (servicePath: string, clientAlias = "api") => {
  const clients = useFeathers();
  const client = clients[clientAlias as keyof typeof clients];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client.service(servicePath as any);
};
