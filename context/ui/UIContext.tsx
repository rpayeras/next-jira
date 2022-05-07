import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  isDraggingEntry: boolean;
  setIsDraggingEntry: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
