import { ChangeEvent, FC, useMemo, useState, useContext } from "react";
import { GetServerSideProps } from "next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  TextField,
  RadioGroup,
  capitalize,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";

import { Layout } from "../../components/layouts/Layout";
import { Entry, EntryStatus } from "../../interfaces";
import { dateFunctions } from "../../utils";

import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { useRouter } from "next/router";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const [description, setDescription] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const router = useRouter();

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    if (description.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      description,
      status,
    };

    updateEntry(updatedEntry);
  };

  const handleConfirmDelete = () => {
    deleteEntry(entry._id);
    setDialogDeleteOpen(false);
    router.push("/");
  };

  const handleOpenDialog = () => {
    setDialogDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setDialogDeleteOpen(false);
  };

  const isValid = useMemo(
    () => description.length > 0 && touched,
    [description, touched]
  );

  return (
    <Layout title={description.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry: ${description}`}
              subheader={`Created ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )} ago`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="New entry"
                autoFocus
                multiline
                label="New entry"
                value={description}
                onChange={handleFieldChange}
                onBlur={() => setTouched(true)}
                helperText={!isValid && "Entry a value"}
                error={!isValid}
              />
              <FormControl>
                <FormLabel>State:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      label={capitalize(option)}
                      value={option}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                onClick={onSave}
                disabled={!isValid}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <IconButton
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            backgroundColor: "error.dark",
          }}
          onClick={handleOpenDialog}
        >
          <DeleteOutlineOutlined />
        </IconButton>

        <Dialog
          open={dialogDeleteOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete entry?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This record will be deleted, are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button onClick={handleConfirmDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { entry },
  };
};

export default EntryPage;
