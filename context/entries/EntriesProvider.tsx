import { FC, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { EntriesContext, entriesReducer, EntriesActionTypes } from "./";
import { Entry } from "../../interfaces";

import { entriesApi } from "../../apis";

export interface EntriesState {
  entries: Entry[];
  isAdding: boolean;
}

interface EntriesProviderProps {
  children: JSX.Element;
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
  isAdding: false,
};

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });

    dispatch({ type: EntriesActionTypes.ADD, payload: data });
  };

  const toggleAddingEntry = (value: boolean) => {
    dispatch({ type: EntriesActionTypes.ADDING, payload: value });
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });

      dispatch({ type: EntriesActionTypes.UPDATE, payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");

    dispatch({ type: EntriesActionTypes.REFRESH, payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

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
