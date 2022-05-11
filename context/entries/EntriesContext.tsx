import { createContext } from "react";

import { Entry } from "../../interfaces";

interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  isAdding: boolean;
  toggleAddingEntry: (value: boolean) => void;
  updateEntry: (entry: Entry) => void;
  deleteEntry: (id: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);
