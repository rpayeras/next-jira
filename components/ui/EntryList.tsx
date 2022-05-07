import { Paper, List } from "@mui/material";
import { DragEvent, FC, useContext, useMemo } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";

import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDraggingEntry, setIsDraggingEntry } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onDropEntry = (evt: DragEvent<HTMLElement>) => {
    const id = evt.dataTransfer.getData("text");
    const entry = entries.find((e) => e._id === id);

    if (!entry) return;

    entry.status = status;

    updateEntry(entry);
    setIsDraggingEntry(false);
  };

  const allowDrop = (evt: DragEvent<HTMLElement>) => {
    evt.preventDefault();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDraggingEntry ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          backgroundColor: "transparent",
          overflowY: "scroll",
          padding: "1px 5px",
        }}
      >
        <List
          sx={{ opacity: isDraggingEntry ? 0.2 : 1, transition: "all .3s" }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
