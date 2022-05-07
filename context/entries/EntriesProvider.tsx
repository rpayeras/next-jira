import { FC, useReducer } from "react";

import { v4 as uuidv4 } from "uuid";

import { EntriesContext, entriesReducer, EntriesActionTypes } from "./";

import { Entry } from "../../interfaces";

export interface EntriesState {
  entries: Entry[];
  isAdding: boolean;
}

interface EntriesProviderProps {
  children: JSX.Element;
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Minim exercitation sunt esse magna laboris occaecat Lorem dolore nostrud voluptate nisi aliquip anim.",
      status: "pending",
      createdAt: Date.now(),
    },
  ],
  isAdding: false,
};

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: EntriesActionTypes.ADD, payload: newEntry });
  };

  const toggleAddingEntry = (value: boolean) => {
    dispatch({ type: EntriesActionTypes.ADDING, payload: value });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: EntriesActionTypes.UPDATE, payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        toggleAddingEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
