import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";
import EntryModel from "../../../models/Entry";

type Data = { message: string } | IEntry[];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return get(res);
    case "POST":
      return insert(req, res);
    default:
      return res.status(400).json({ message: "Endpoint not exists" });
  }
}

const get = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: "asc" });
  await db.disconnect();

  res.status(200).json(entries);
};

const insert = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description = "" } = req.body;

  const newEntry = new EntryModel({
    description,
    createdAt: Date.now(),
    status: "pending",
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();

    return res.status(201).json(newEntry);
  } catch (err) {
    await db.disconnect();
    console.log(err);

    return res
      .status(500)
      .json({ message: "Something went wrong, contact with administrator" });
  }
};
