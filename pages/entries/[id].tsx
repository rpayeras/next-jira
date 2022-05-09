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
} from "@mui/material";
import { Layout } from "../../components/layouts/Layout";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Entry, EntryStatus } from "../../interfaces";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { ChangeEvent, FC, useMemo, useState, useContext } from "react";
import { GetServerSideProps } from "next";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext);
  const [description, setDescription] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

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
        >
          <DeleteOutlineOutlined />
        </IconButton>
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
