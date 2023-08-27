"use client";
import "@/styles/globals.scss";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import Layout from "@/components/Layout";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider maxSnack={3}>
          <Layout>{children}</Layout>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}
