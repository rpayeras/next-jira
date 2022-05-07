import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { DragEvent, FC, useContext } from "react";
import { UIContext } from "../../context/ui";
import { Entry } from "../../interfaces";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { description } = entry;
  const { setIsDraggingEntry } = useContext(UIContext);

  const onDragStart = (evt: DragEvent<HTMLDivElement>) => {
    evt.dataTransfer.setData("text", entry._id);
    setIsDraggingEntry(true);
  };

  const onDragEnd = (evt: DragEvent<HTMLDivElement>) => {
    setIsDraggingEntry(false);
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whitespace: "pre-line" }}>{description}</Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: "2" }}
        >
          <Typography variant="body2">30 min ago</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
