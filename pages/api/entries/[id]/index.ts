import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return get(req, res);
    case "PUT":
      return update(req, res);
    case "DELETE":
      return deleteRecord(req, res);

    default:
      return res.status(400).json({ message: "Endpoint not exists" });
  }
}

const get = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entry = await Entry.findById(id);
  await db.disconnect();

  if (!entry) {
    return res.status(400).json({ message: "This record doesnt exists" });
  }

  res.status(200).json(entry);
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    db.disconnect();
    return res.status(400).json({ message: "This record doesnt exists" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry: IEntry | null = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      {
        runValidators: true,
        new: true,
      }
    );

    await db.disconnect();

    if (!updatedEntry) {
      return res.status(400).json({ message: "Not found" });
    }

    res.status(200).json(updatedEntry);
  } catch (err: any) {
    console.log({ err });
    const message: string = err.errors.status.message;

    await db.disconnect();

    res.status(400).json({ message });
  }
};

const deleteRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();

  const record = await Entry.findById(id);

  if (!record) {
    db.disconnect();
    return res.status(400).json({ message: "This record doesnt exists" });
  }

  try {
    const deleted = await Entry.findByIdAndDelete(id);

    await db.disconnect();

    if (!deleted) {
      return res.status(400).json({ message: "Not found" });
    }

    res.status(200).json({
      message: "Record deleted",
    });
  } catch (err: any) {
    console.log({ err });
    const message: string = err.errors.status.message;

    await db.disconnect();

    res.status(400).json({ message });
  }
};
