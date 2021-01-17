import React, { createContext } from "react";
import MainNav from "./src/navigation/mainNav";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { AppContext } from "./src/context";
import useDispute from "./src/hooks/useDispute";

export default function App() {
  const { disputes, addDispute } = useDispute([]);
  return (
    <AppContext.Provider value={{ disputes, addDispute }}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <MainNav />
      </ApplicationProvider>
    </AppContext.Provider>
  );
}
