import { FC, useEffect, useReducer } from "react";
import { useSnackbar } from "notistack";

import { EntriesContext, entriesReducer, EntriesActionTypes } from "./";
import { Entry } from "../../interfaces";

import { entriesApi } from "../../apis";
import { useRouter } from "next/router";

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
  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar("Entry updated", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEntry = async (_id: string) => {
    try {
      await entriesApi.delete(`/entries/${_id}`);

      dispatch({ type: EntriesActionTypes.DELETE, payload: _id });

      enqueueSnackbar("Entry deleted", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      return true;
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Error with request, contact administrator", {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
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
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
