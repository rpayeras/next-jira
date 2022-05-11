import { FC, useReducer } from "react";
import { UIContext, uiReducer, UIActionTypes } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  isDraggingEntry: boolean;
  darkMode: boolean;
}

interface UIProviderProps {
  children: JSX.Element;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isDraggingEntry: false,
  darkMode: false,
};

export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: UIActionTypes.OPEN_SIDEBAR });
  };

  const closeSideMenu = () => {
    dispatch({ type: UIActionTypes.CLOSE_SIDEBAR });
  };

  const setIsDraggingEntry = (value: boolean) => {
    dispatch({ type: UIActionTypes.IS_DRAGGING_ENTRY, payload: value });
  };

  const toggleDarkMode = () => {
    dispatch({ type: UIActionTypes.TOGGLE_DARK_THEME });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsDraggingEntry,
        toggleDarkMode,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
