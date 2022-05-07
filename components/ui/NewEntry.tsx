import React, { ChangeEvent, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useContext } from "react";
import { EntriesContext } from "../../context/entries";

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const { addNewEntry, isAdding, toggleAddingEntry } =
    useContext(EntriesContext);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    toggleAddingEntry(false);
    setTouched(false);
    setInputValue("");
  };

  const handleCancel = () => {
    setTouched(false);
    toggleAddingEntry(false);
    setInputValue("");
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAdding ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New entry"
            autoFocus
            multiline
            label="New entry"
            helperText={inputValue.length <= 0 && !touched && "Type a value"}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={handleFieldChange}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => toggleAddingEntry(true)}
        >
          Add todo
        </Button>
      )}
    </Box>
  );
};
