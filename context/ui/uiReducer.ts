import { UIState } from "./";

export enum UIActionTypes {
  OPEN_SIDEBAR = "UI - Open Sidebar",
  CLOSE_SIDEBAR = "UI - Close Sidebar",
  IS_DRAGGING_ENTRY = "UI - Is dragging entry",
  TOGGLE_DARK_THEME = "UI - Toggle theme",
}

type UIActions =
  | { type: UIActionTypes.OPEN_SIDEBAR }
  | { type: UIActionTypes.CLOSE_SIDEBAR }
  | { type: UIActionTypes.TOGGLE_DARK_THEME }
  | { type: UIActionTypes.IS_DRAGGING_ENTRY; payload: boolean };

export const uiReducer = (state: UIState, action: UIActions): UIState => {
  switch (action.type) {
    case UIActionTypes.OPEN_SIDEBAR:
      return {
        ...state,
        sidemenuOpen: true,
      };
    case UIActionTypes.CLOSE_SIDEBAR:
      return {
        ...state,
        sidemenuOpen: false,
      };
    case UIActionTypes.IS_DRAGGING_ENTRY:
      return {
        ...state,
        isDraggingEntry: action.payload,
      };
    case UIActionTypes.TOGGLE_DARK_THEME:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};
