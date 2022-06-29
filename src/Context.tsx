import { FC, createContext, useState, useContext } from "react";

export enum State {
  IDLE,
  RECORDING,
  PROCESSING,
  DONE,
  ERROR,
}

type AppState = {
  status: State;
  setStatus: (nextState: State) => void;
};
const AppContext = createContext<AppState>({
  status: State.IDLE,
  setStatus(nextState) {},
});

export const AppProvider: FC = ({ children }) => {
  const [status, setStatus] = useState(State.IDLE);
  return (
    <AppContext.Provider value={{ status, setStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Cannot use AppState outside of context!");
  }

  return context;
};
