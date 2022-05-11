import { Entry } from "../../interfaces";
import { EntriesState } from "./";

export enum EntriesActionTypes {
  ADD = "[Entries] - Add",
  DELETE = "[Entries] - Delete",
  ADDING = "[Entries] - Adding",
  UPDATE = "[Entries] - Update",
  REFRESH = "[Entries] - Refresh",
}

type EntriesAction =
  | {
      type: EntriesActionTypes.ADD;
      payload: Entry;
    }
  | {
      type: EntriesActionTypes.ADDING;
      payload: boolean;
    }
  | {
      type: EntriesActionTypes.UPDATE;
      payload: Entry;
    }
  | {
      type: EntriesActionTypes.REFRESH;
      payload: Entry[];
    }
  | {
      type: EntriesActionTypes.DELETE;
      payload: string;
    };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesAction
): EntriesState => {
  switch (action.type) {
    case EntriesActionTypes.ADD:
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case EntriesActionTypes.ADDING:
      return {
        ...state,
        isAdding: action.payload,
      };
    case EntriesActionTypes.UPDATE:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }

          return entry;
        }),
      };
    case EntriesActionTypes.REFRESH:
      return {
        ...state,
        entries: [...action.payload],
      };
    case EntriesActionTypes.DELETE:
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
      };
    default:
      return state;
  }
};
