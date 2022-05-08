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
  // const { id } = req.query;

  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: "Id not valid" });
  // }

  switch (req.method) {
    case "GET":
      return get(req, res);
    case "PUT":
      return update(req, res);

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

const update = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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
    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // await entryToUpdate.save();

    const updatedEntry = await Entry.findByIdAndUpdate(
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
    res.status(200).json(updatedEntry);
  } catch (err) {
    console.log({ err });

    await db.disconnect();
    res.status(400).json({ message: err.errors.status.message });
  }
};
